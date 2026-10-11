import { useEffect, useRef } from 'react';
import atlas from '../../public/assets/memoji/motion-atlas.json';
import { pointerPose, poseFrame } from './headPose.js';

export default function InteractiveHeadAtlas({ paused = false, trackingAreaRef }) {
  const headRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const head = headRef.current;
    const video = videoRef.current;
    const area = trackingAreaRef?.current || head;
    if (!head || !video || !area) return;

    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let geometry;
    let frame = 0;
    let lastTime = 0;
    let requestedFrame = -1;
    let waitingForFrame = false;
    let seekStarted = 0;
    let seekCompleted = false;
    let videoCallback = null;
    let disposed = false;
    let seekCount = 0;
    let seekTotalMs = 0;

    // Layout is measured only when it changes, never in pointermove or RAF.
    const measure = () => {
      const bounds = area.getBoundingClientRect();
      const visual = head.getBoundingClientRect();
      geometry = { left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom,
        x: visual.left + visual.width / 2, y: visual.top + visual.height / 2 };
    };
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    observer.observe(head);
    measure();

    const leave = () => { target = { x: 0, y: 0 }; };
    const move = event => {
      if (!paused && geometry) target = pointerPose(event.clientX, event.clientY, geometry);
    };
    const release = event => { if (event.pointerType === 'touch') leave(); };
    const loaded = () => {
      video.pause();
      requestedFrame = Math.floor(video.currentTime * atlas.fps + .001);
      waitingForFrame = false;
    };
    const seeked = () => {
      seekCompleted = true;
      if (!video.requestVideoFrameCallback) waitingForFrame = false;
    };
    const visibility = () => {
      leave();
      lastTime = 0;
    };

    const requestPose = (index, now) => {
      if (video.readyState < 2 || video.seeking || waitingForFrame || requestedFrame === index) return;
      requestedFrame = index;
      waitingForFrame = true;
      seekCompleted = false;
      seekStarted = now;
      if (videoCallback !== null) video.cancelVideoFrameCallback?.(videoCallback);
      if (video.requestVideoFrameCallback) {
        videoCallback = video.requestVideoFrameCallback((_, metadata) => {
          if (disposed) return;
          videoCallback = null;
          waitingForFrame = false;
          head.dataset.poseFrame = String(Math.floor(metadata.mediaTime * atlas.fps + .001));
          if (import.meta.env.DEV) {
            seekTotalMs += performance.now() - seekStarted;
            seekCount += 1;
            head.dataset.meanSeekMs = (seekTotalMs / seekCount).toFixed(1);
            head.dataset.seekCount = String(seekCount);
          }
        });
      }
      // Seek inside the requested frame, away from timestamp boundaries.
      // A single permanently visible video keeps the last decoded image while
      // seeking. There is no opacity swap, crossfade or source replacement.
      video.currentTime = (index + .25) / atlas.fps;
    };

    const tick = now => {
      const dt = Math.min(.05, (now - (lastTime || now)) / 1000);
      lastTime = now;
      if (!document.hidden) {
        const factor = 1 - Math.exp(-18 * dt);
        let dx = (target.x - current.x) * factor;
        let dy = (target.y - current.y) * factor;
        // Bound sudden reversals while keeping raw input immediate. Smoothing
        // both coordinates also passes through generated angular poses.
        const distance = Math.hypot(dx, dy);
        const maximum = 7 * dt;
        if (distance > maximum && maximum > 0) { dx *= maximum / distance; dy *= maximum / distance; }
        current = { x: current.x + dx, y: current.y + dy };
        if (Math.hypot(target.x - current.x, target.y - current.y) < .0005) current = { ...target };
        // Some browsers suppress a paused video's frame callback when a tab
        // is occluded. A completed seek can safely release that wait.
        if (waitingForFrame && seekCompleted && !video.seeking && now - seekStarted > 150) waitingForFrame = false;
        requestPose(poseFrame(current.x, current.y, atlas), now);
      }
      frame = requestAnimationFrame(tick);
    };

    video.pause();
    if (video.readyState >= 2) loaded();
    video.addEventListener('loadeddata', loaded);
    video.addEventListener('seeked', seeked);
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerleave', leave);
    area.addEventListener('pointerup', release);
    area.addEventListener('pointercancel', leave);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('blur', leave);
    document.addEventListener('visibilitychange', visibility);
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (videoCallback !== null) video.cancelVideoFrameCallback?.(videoCallback);
      observer.disconnect();
      video.removeEventListener('loadeddata', loaded);
      video.removeEventListener('seeked', seeked);
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerleave', leave);
      area.removeEventListener('pointerup', release);
      area.removeEventListener('pointercancel', leave);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('blur', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [paused, trackingAreaRef]);

  return <div className="head-tracking" ref={headRef} role="img" aria-label="Memoji interativo da Mari">
    <video ref={videoRef} className="head-video" src={atlas.src} muted playsInline preload="auto" aria-hidden="true" />
  </div>;
}
