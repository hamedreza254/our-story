import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; r: number;
  baseAlpha: number; twinkleSpeed: number; twinklePhase: number;
}

interface Particle {
  x: number; y: number; r: number; alpha: number;
  vx: number; vy: number; life: number; maxLife: number;
}

export default function StarField({ brightness = 1 }: { brightness?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0;
    let stars: Star[] = [];
    let particles: Particle[] = [];
    let t = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(Math.floor((w * h) / 6000), 400);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.2 + 0.4,
          baseAlpha: Math.random() * 0.55 + 0.15,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnParticle = () => {
      if (particles.length > 25) return;
      particles.push({
        x: Math.random() * w, y: h + 5,
        r: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.3 + 0.08,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.4 + 0.15),
        life: 0, maxLife: Math.random() * 500 + 250,
      });
    };

    const loop = () => {
      t++;
      ctx.clearRect(0, 0, w, h);

      const mx = w * 0.13, my = h * 0.1;
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
      glow.addColorStop(0, `rgba(200,185,255,${0.07 * brightness})`);
      glow.addColorStop(0.4, `rgba(200,185,255,${0.025 * brightness})`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(mx, my, 220, 0, Math.PI * 2); ctx.fill();

      const disc = ctx.createRadialGradient(mx - 3, my - 3, 0, mx, my, 20);
      disc.addColorStop(0, `rgba(235,225,255,${0.85 * brightness})`);
      disc.addColorStop(1, `rgba(190,175,240,${0.35 * brightness})`);
      ctx.fillStyle = disc;
      ctx.beginPath(); ctx.arc(mx, my, 18, 0, Math.PI * 2); ctx.fill();

      for (const s of stars) {
        if (prefersReduced) {
          ctx.globalAlpha = s.baseAlpha * brightness;
        } else {
          const tw = Math.sin(t * s.twinkleSpeed + s.twinklePhase);
          ctx.globalAlpha = s.baseAlpha * (0.45 + 0.55 * tw) * brightness;
        }
        ctx.fillStyle = '#d5d0e8';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReduced) {
        if (t % 18 === 0) spawnParticle();
        particles = particles.filter(p => p.life < p.maxLife);
        for (const p of particles) {
          p.x += p.vx; p.y += p.vy; p.life++;
          const ratio = p.life / p.maxLife;
          const fade = ratio < 0.1 ? ratio / 0.1 : 1 - ratio;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
          grad.addColorStop(0, `rgba(212,160,185,${fade * p.alpha * brightness})`);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2); ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [brightness]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `linear-gradient(180deg,
          #060612 0%, #0a0822 35%, #0f0a2a 60%, #0b0718 100%)`,
      }}
    />
  );
}
