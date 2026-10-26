import React, { useEffect, useRef } from 'react';
import { SceneId } from '../types';

interface PortalCanvasProps {
  currentScene: SceneId;
  isTransitioning: boolean;
  transitionProgress: number; // 0 to 1
}

interface DustParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const PortalCanvas: React.FC<PortalCanvasProps> = ({
  currentScene,
  isTransitioning,
  transitionProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotX = useRef(0);
  const rotY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const particles = useRef<DustParticle[]>([]);
  const lastTime = useRef(performance.now());

  // Initialize atmospheric particles
  useEffect(() => {
    const p: DustParticle[] = [];
    const count = 70;
    for (let i = 0; i < count; i++) {
      p.push({
        x: (Math.random() - 0.5) * window.innerWidth * 1.5,
        y: (Math.random() - 0.5) * window.innerHeight * 1.5,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25 - 0.1, // gently floating
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.45 + 0.15,
      });
    }
    particles.current = p;
  }, []);

  // Pointer tilt tracking as specified in MotionSites
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      targetY.current = (e.clientX / window.innerWidth - 0.5) * 24; // degrees
      targetX.current = (e.clientY / window.innerHeight - 0.5) * -20;
    };

    const handlePointerLeave = () => {
      targetX.current = 0;
      targetY.current = 0;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Main canvas render loop
  useEffect(() => {
    let animId: number;

    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(40, time - lastTime.current);
      lastTime.current = time;

      // Update resolution
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Smooth tilt easing
      const factor = Math.min(1, dt * 0.007);
      rotX.current += (targetX.current - rotX.current) * factor;
      rotY.current += (targetY.current - rotY.current) * factor;

      // Draw subtle background vignette
      const cx = width / 2;
      const cy = height / 2;

      // Scene specific lighting effects
      if (currentScene === 'camino_b') {
        // Flashlight beam effect in basement
        const gradient = ctx.createRadialGradient(
          mousePos.current.x,
          mousePos.current.y,
          30,
          mousePos.current.x,
          mousePos.current.y,
          Math.max(width, height) * 0.55
        );
        gradient.addColorStop(0, 'rgba(235, 230, 220, 0.16)');
        gradient.addColorStop(0.35, 'rgba(180, 160, 140, 0.06)');
        gradient.addColorStop(1, 'rgba(9, 8, 7, 0.94)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else if (currentScene === 'camino_a') {
        // Warm ceiling bulb glows along top
        const ceilingGlow = ctx.createLinearGradient(0, 0, 0, height * 0.4);
        ceilingGlow.addColorStop(0, 'rgba(230, 190, 130, 0.12)');
        ceilingGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = ceilingGlow;
        ctx.fillRect(0, 0, width, height * 0.4);
      }

      // 3D Perspective Projection for suspended dust motes (focal length: 850)
      const focal = 850;
      const ax = (rotX.current * Math.PI) / 180;
      const ay = (rotY.current * Math.PI) / 180;
      const cosAx = Math.cos(ax);
      const sinAx = Math.sin(ax);
      const cosAy = Math.cos(ay);
      const sinAy = Math.sin(ay);

      ctx.fillStyle = currentScene === 'camino_b' ? '#c9b79c' : '#ffffff';

      particles.current.forEach((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < -height * 0.75) p.y = height * 0.75;
        if (p.x < -width * 0.75) p.x = width * 0.75;
        if (p.x > width * 0.75) p.x = -width * 0.75;

        // 3D tilt rotation
        const xx = p.x * cosAy;
        const yy = p.y * cosAx;
        const z = p.x * sinAy - p.y * sinAx + p.z;
        const scale = focal / (focal + z);

        if (scale > 0) {
          const sx = cx + xx * scale;
          const sy = cy + yy * scale;

          if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
            ctx.beginPath();
            ctx.globalAlpha = Math.min(1, p.alpha * scale);
            ctx.arc(sx, sy, p.size * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Bottom shade gradient (MotionSites specification)
      const shadeGradient = ctx.createLinearGradient(0, height * 0.65, 0, height);
      shadeGradient.addColorStop(0, 'rgba(9, 8, 7, 0)');
      shadeGradient.addColorStop(1, 'rgba(9, 8, 7, 0.88)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = shadeGradient;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      // Transition aperture expansion
      if (isTransitioning) {
        ctx.save();
        const maxRadius = Math.hypot(width, height);
        const radius = maxRadius * transitionProgress;

        ctx.fillStyle = '#7a1e1e';
        ctx.globalAlpha = 0.18 * (1 - transitionProgress);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [currentScene, isTransitioning, transitionProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
