import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FireworksPlaygroundProps {
  onBackToHome: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  sparkle: boolean;
  gravity: number;
  friction: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  type: 'burst' | 'chrysanthemum' | 'willow' | 'ring' | 'chakra';
}

const FIREWORK_COLORS = [
  '#FFB347', // Amber
  '#E7BE70', // Antique Gold
  '#FF3366', // Festive Crimson
  '#00F0FF', // Cyan
  '#A855F7', // Royal Violet
  '#22C55E', // Green
  '#FFE194', // Pale Ivory Gold
];

export const FireworksPlayground: React.FC<FireworksPlaygroundProps> = ({ onBackToHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [fireworkType, setFireworkType] = useState<'burst' | 'chrysanthemum' | 'willow' | 'ring' | 'chakra'>('chrysanthemum');
  const [selectedColor, setSelectedColor] = useState<string>('random');
  const [autoLaunch, setAutoLaunch] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // Create explosion particles based on firework type
  const createExplosion = useCallback((x: number, y: number, color: string, type: Rocket['type']) => {
    if (soundEnabled) {
      sounds.playFireworkExplosion(type);
    }
    const count = type === 'willow' ? 95 : type === 'chrysanthemum' ? 85 : 65;

    for (let i = 0; i < count; i++) {
      let angle = (i / count) * Math.PI * 2;
      let speed = Math.random() * 4.5 + 2.0;

      if (type === 'ring') {
        speed = 4.2;
      } else if (type === 'chakra') {
        speed = Math.random() * 3 + 3;
        angle += Math.sin(i * 0.5) * 0.4;
      }

      const pColor = color === 'random' 
        ? FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)] 
        : color;

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: type === 'willow' ? 0.007 : 0.014 + Math.random() * 0.006,
        size: Math.random() * 2.5 + 1.2,
        color: pColor,
        sparkle: Math.random() > 0.4,
        gravity: type === 'willow' ? 0.07 : 0.045,
        friction: 0.975,
      });
    }
  }, [soundEnabled]);

  // Launch rocket
  const launchRocket = useCallback((startX: number, targetX: number, targetY: number) => {
    if (soundEnabled) {
      sounds.playRocketLaunch();
    }
    const color = selectedColor === 'random'
      ? FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
      : selectedColor;

    const angle = Math.atan2(targetY - (containerRef.current?.clientHeight || 600), targetX - startX);
    const speed = 13.5;

    rocketsRef.current.push({
      x: startX,
      y: (containerRef.current?.clientHeight || 600) + 10,
      targetY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      type: fireworkType,
    });
  }, [fireworkType, selectedColor]);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let lastAutoLaunch = Date.now();

    const loop = () => {
      // Soft trail fade creates beautiful motion blur
      ctx.fillStyle = 'rgba(8, 11, 24, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Auto launch periodically if enabled
      if (autoLaunch && Date.now() - lastAutoLaunch > 1400 + Math.random() * 800) {
        lastAutoLaunch = Date.now();
        const startX = width * 0.2 + Math.random() * width * 0.6;
        const targetX = startX + (Math.random() - 0.5) * 150;
        const targetY = height * 0.15 + Math.random() * height * 0.35;
        launchRocket(startX, targetX, targetY);
      }

      // Update & render rockets
      const rockets = rocketsRef.current;
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Sparkle tail
        ctx.fillStyle = '#FFE194';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          createExplosion(r.x, r.y, r.color, r.type);
          rockets.splice(i, 1);
        }
      }

      // Update & render particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.sparkle ? 8 : 3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [autoLaunch, createExplosion, launchRocket]);

  const handleCanvasClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;
    const startX = targetX + (Math.random() - 0.5) * 80;

    launchRocket(startX, targetX, targetY);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-festive-border bg-background-elevated/40 hover:bg-background-elevated text-xs uppercase tracking-wider text-muted hover:text-ivory transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
              soundEnabled
                ? 'border-gold-primary bg-background-elevated text-gold-glow'
                : 'border-festive-border bg-background-elevated/40 text-muted'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'FX Audio On' : 'FX Muted'}</span>
          </button>

          {/* Auto Show Toggle */}
          <button
            onClick={() => setAutoLaunch(!autoLaunch)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold border transition-all ${
              autoLaunch
                ? 'border-gold-primary bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background'
                : 'border-festive-border bg-background-elevated/50 text-muted hover:text-ivory'
            }`}
          >
            {autoLaunch ? 'Sky Show: Active' : 'Sky Show: Paused'}
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/20 bg-background-elevated/40 text-gold-primary text-xs uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-warm" />
          <span>Eco-Friendly Sky Celebration</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-normal text-ivory tracking-tight mb-2">
          Fireworks <span className="text-gold-gradient italic">Playground</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted font-light">
          Tap or click anywhere in the night sky to launch vibrant digital bursts.
        </p>
      </div>

      {/* Night Sky Canvas */}
      <div className="relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden border border-festive-border shadow-2xl bg-[#060814] mb-6">
        <canvas
          ref={canvasRef}
          onPointerDown={handleCanvasClick}
          className="w-full h-full block cursor-crosshair"
        />

        {/* Ambient Moon & Stars Backing */}
        <div className="absolute top-8 right-12 w-14 h-14 rounded-full bg-ivory/80 shadow-[0_0_35px_#FFF3DA] pointer-events-none" />

        {/* City/Sanctum Skyline Silhouette at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-background to-transparent flex items-end justify-between px-6 opacity-40">
          {Array.from({ length: 18 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-background-elevated/60 w-8"
              style={{ height: `${20 + (idx % 5) * 8}px` }}
            />
          ))}
        </div>

        {/* Floating Controls Overlay at Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 p-2 rounded-2xl glass-panel bg-background-secondary/85 border border-festive-border shadow-xl backdrop-blur-md">
          {/* Firework Types */}
          <div className="flex items-center gap-1">
            {[
              { id: 'chrysanthemum', label: 'Floral' },
              { id: 'burst', label: 'Burst' },
              { id: 'willow', label: 'Willow' },
              { id: 'ring', label: 'Ring' },
              { id: 'chakra', label: 'Chakra' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFireworkType(t.id as Rocket['type'])}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium border transition-all ${
                  fireworkType === t.id
                    ? 'border-gold-primary bg-background-elevated text-gold-glow'
                    : 'border-transparent text-muted hover:text-ivory'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-festive-border" />

          {/* Color Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedColor('random')}
              className={`w-6 h-6 rounded-full border text-[9px] font-bold flex items-center justify-center transition-all ${
                selectedColor === 'random'
                  ? 'border-gold-primary ring-2 ring-gold-glow text-ivory'
                  : 'border-festive-border text-muted hover:text-ivory'
              }`}
              title="Rainbow Random"
            >
              🌈
            </button>
            {FIREWORK_COLORS.slice(0, 4).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-5 h-5 rounded-full transition-all ${
                  selectedColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted/80 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-warm animate-flicker" />
        <span>Celebrate with zero pollution, full luminescence. Happy Diwali!</span>
      </div>
    </div>
  );
};
