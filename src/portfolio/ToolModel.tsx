import { memo, useEffect, useRef, useState } from 'react';

/** Loads the supplied OBJ/MTL only when its orbit opens. No render loop offscreen. */
function ToolModel({ name, paused, active = true }: { name: 'claude' | 'github'; paused: boolean; active?: boolean }) {
  const host = useRef<HTMLSpanElement>(null);
  const activity = useRef({ paused, active }), resumeRef = useRef<() => void>(() => {});
  useEffect(() => { activity.current = { paused, active }; resumeRef.current(); }, [paused, active]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false, cleanup = () => {};
    setReady(false);
    (async () => {
      const [THREE, { OBJLoader }, { MTLLoader }] = await Promise.all([
        import('three'), import('three/examples/jsm/loaders/OBJLoader.js'), import('three/examples/jsm/loaders/MTLLoader.js'),
      ]);
      if (disposed) return;
      const materials = await new MTLLoader().loadAsync(`/assets/tools-3d/${name}_logo_3d.mtl`);
      const object = await new OBJLoader().setMaterials(materials).loadAsync(`/assets/tools-3d/${name}_logo_3d.obj`);
      const releaseObject = () => object.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => material.dispose());
        }
      });
      if (disposed) { releaseObject(); return; }
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
      catch { releaseObject(); return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(120, 120);
      renderer.setClearColor(0, 0);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
      camera.position.z = 4.8;
      const bounds = new THREE.Box3().setFromObject(object), center = bounds.getCenter(new THREE.Vector3());
      object.position.sub(center);
      const group = new THREE.Group(); group.add(object); scene.add(group);
      scene.add(new THREE.AmbientLight(0xffffff, 1.8));
      const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(-3, 4, 6); scene.add(light);
      const fill = new THREE.DirectionalLight(0xbddb42, .65); fill.position.set(3, -2, 2); scene.add(fill);
      element.appendChild(renderer.domElement);
      let frame = 0, visible = true, mx = 0, my = 0;
      const render = (time = 0) => {
        group.rotation.y = activity.current.paused ? -.18 : -.18 + mx * .3 + Math.sin(time / 1700) * .1;
        group.rotation.x = activity.current.paused ? .1 : .1 + my * .2;
        renderer.render(scene, camera);
        if (!activity.current.paused && activity.current.active && visible && !document.hidden) frame = requestAnimationFrame(render);
      };
      const resume = () => { cancelAnimationFrame(frame); if (activity.current.active && visible && !document.hidden) render(performance.now()); };
      resumeRef.current = resume;
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
      observer.observe(element);
      const move = (event: PointerEvent) => { const rect = element.getBoundingClientRect(); mx = (event.clientX - rect.left) / rect.width - .5; my = (event.clientY - rect.top) / rect.height - .5; };
      element.addEventListener('pointermove', move);
      document.addEventListener('visibilitychange', resume);
      render(); setReady(true);
      cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', resume); element.removeEventListener('pointermove', move); renderer.dispose(); renderer.domElement.remove(); releaseObject(); };
    })().catch(() => { /* The labelled flat icon remains available if WebGL or loading fails. */ });
    return () => { disposed = true; cleanup(); };
  }, [name]);
  return <span className="tool-model" ref={host} aria-hidden="true">
    {!ready && (name === 'github' ? <span>GH</span> : <img src="/assets/claude.png" alt="" />)}
  </span>;
}
export default memo(ToolModel);
