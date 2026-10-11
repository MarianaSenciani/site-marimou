// Continuous shape interpolation: each source is registered to the same mesh.
// A triangle in cursor space selects three poses; crossing a boundary retains
// the shared poses and therefore does not introduce a discrete image switch.
export function poseWeights(x, y, poses) {
  for (let a = 1; a < poses.length; a++) {
    const b = a === poses.length - 1 ? 1 : a + 1;
    const [ax, ay] = poses[a].cursor;
    const [bx, by] = poses[b].cursor;
    const det = ax * by - ay * bx;
    const wa = (x * by - y * bx) / det;
    const wb = (ax * y - ay * x) / det;
    if (wa >= -1e-6 && wb >= -1e-6 && wa + wb <= 1.000001) {
      return { indices: [0, a, b], weights: [Math.max(0, 1 - wa - wb), Math.max(0, wa), Math.max(0, wb)] };
    }
  }
  return { indices: [0, 1, 2], weights: [1, 0, 0] };
}

const VERTEX = `#version 300 es
in vec2 position;
in vec2 uvA;
in vec2 uvB;
in vec2 uvC;
out vec2 a;
out vec2 b;
out vec2 c;
void main() {
  a=uvA; b=uvB; c=uvC;
  gl_Position=vec4(position.x*2.0-1.0,1.0-position.y*2.0,0.0,1.0);
}`;
const FRAGMENT = `#version 300 es
precision highp float;
in vec2 a;
in vec2 b;
in vec2 c;
uniform sampler2D imageA;
uniform sampler2D imageB;
uniform sampler2D imageC;
uniform vec3 weights;
uniform vec4 eyesA;
uniform vec4 eyesB;
uniform vec4 eyesC;
uniform vec2 gaze;
out vec4 color;
vec4 samplePose(sampler2D image, vec2 uv, vec4 eyes) {
  vec2 dl=(uv-eyes.xy)/vec2(.055,.028);
  vec2 dr=(uv-eyes.zw)/vec2(.055,.028);
  float eye=max(exp(-dot(dl,dl)*1.8),exp(-dot(dr,dr)*1.8));
  uv-=gaze*eye;
  if(any(lessThan(uv,vec2(0.0))) || any(greaterThan(uv,vec2(1.0)))) return vec4(0.0);
  vec4 pixel=texture(image,vec2(uv.x,1.0-uv.y));
  return vec4(pixel.rgb*pixel.a,pixel.a);
}
void main() {
  color=samplePose(imageA,a,eyesA)*weights.x+
        samplePose(imageB,b,eyesB)*weights.y+
        samplePose(imageC,c,eyesC)*weights.z;
}`;

export async function createPoseRenderer(canvas, signal) {
  const response = await fetch('/assets/memoji/poses/mesh.json', { signal });
  if (!response.ok) throw new Error('Pose mesh unavailable');
  const mesh = await response.json();
  const images = await Promise.all(mesh.poses.map(pose => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Missing pose: ${pose.id}`));
    image.src = pose.src;
  })));
  if (signal.aborted) return null;
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return null;
  const resources = [];
  const keep = (object, release) => { resources.push(() => release.call(gl, object)); return object; };
  const dispose = () => resources.reverse().forEach(release => release());
  try {
    const program = keep(gl.createProgram(), gl.deleteProgram);
    for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]]) {
      const shader = keep(gl.createShader(type), gl.deleteShader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const makeBuffer = data => {
      const buffer = keep(gl.createBuffer(), gl.deleteBuffer);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return buffer;
    };
    const positions = new Float32Array(mesh.poses[0].positions.length);
    const positionBuffer = makeBuffer(positions);
    const posePositions = mesh.poses.map(pose => new Float32Array(pose.positions));
    const uvBuffers = mesh.poses.map(pose => makeBuffer(new Float32Array(pose.uv)));
    const indices = [];
    for (let y=0; y<mesh.rows; y++) for(let x=0; x<mesh.columns; x++) {
      const i=y*(mesh.columns+1)+x, j=i+mesh.columns+1;
      indices.push(i,j,i+1,i+1,j,j+1);
    }
    const elementBuffer = keep(gl.createBuffer(), gl.deleteBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    const textures = images.map(image => {
      const texture = keep(gl.createTexture(), gl.deleteTexture);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      const raster = document.createElement('canvas');
      raster.width = 640;
      raster.height = Math.round(image.height / image.width * 640);
      raster.getContext('2d').drawImage(image,0,0,raster.width,raster.height);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,raster);
      return texture;
    });
    const bindAttribute = (name, buffer) => {
      const location = gl.getAttribLocation(program,name);
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0);
    };
    bindAttribute('position',positionBuffer);
    const letters=['A','B','C'];
    letters.forEach((letter,i) => gl.uniform1i(gl.getUniformLocation(program,`image${letter}`),i));
    const weightLocation=gl.getUniformLocation(program,'weights');
    const gazeLocation=gl.getUniformLocation(program,'gaze');
    const eyesLocations=letters.map(letter=>gl.getUniformLocation(program,`eyes${letter}`));
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0,0,0,0);
    let active='';
    return {
      draw(x,y,targetX=x,targetY=y) {
        const selected=poseWeights(x,y,mesh.poses);
        const key=selected.indices.join(',');
        if(key!==active) {
          selected.indices.forEach((pose,i)=>{
            bindAttribute(`uv${letters[i]}`,uvBuffers[pose]);
            gl.activeTexture(gl.TEXTURE0+i);
            gl.bindTexture(gl.TEXTURE_2D,textures[pose]);
            gl.uniform4fv(eyesLocations[i],mesh.poses[pose].eyes);
          });
          active=key;
        }
        const [pa,pb,pc]=selected.indices.map(i=>posePositions[i]);
        const [wa,wb,wc]=selected.weights;
        for(let i=0;i<positions.length;i++) positions[i]=pa[i]*wa+pb[i]*wb+pc[i]*wc;
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER,0,positions);
        gl.uniform3fv(weightLocation,selected.weights);
        gl.uniform2f(gazeLocation,(targetX-x)*.01+x*.002,(targetY-y)*.008+y*.002);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
      }, dispose,
    };
  } catch(error) { dispose(); throw error; }
}
