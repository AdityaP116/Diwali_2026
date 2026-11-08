import React, { useRef, useEffect } from 'react';
import { DiyaWish } from '../types';

interface DiyaCourtyardCanvasProps {
  diyas: DiyaWish[];
  selectedDiyaId: string | null;
  onSelectDiya: (diya: DiyaWish) => void;
  onCanvasClickPlace: (coord: { x: number; y: number }) => void;
  isPlacementMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alpha: number;
  hue: number;
}

export const DiyaCourtyardCanvas: React.FC<DiyaCourtyardCanvasProps> = ({
  diyas,
  selectedDiyaId,
  onSelectDiya,
  onCanvasClickPlace,
  isPlacementMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const hoverCoordRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const getFlameColors = (hueType: DiyaWish['flameHue']) => {
      switch (hueType) {
        case 'amber':
          return { outer: '#FF7A33', mid: '#FFB347', core: '#FFF3DA', aura: 'rgba(255, 122, 51, 0.25)' };
        case 'rose':
          return { outer: '#F43F5E', mid: '#FB7185', core: '#FFE4E6', aura: 'rgba(244, 63, 94, 0.22)' };
        case 'sacred':
          return { outer: '#D97706', mid: '#F59E0B', core: '#FEF3C7', aura: 'rgba(217, 119, 6, 0.3)' };
        case 'gold':
        default:
          return { outer: '#E7BE70', mid: '#FFB347', core: '#FFFFFF', aura: 'rgba(231, 190, 112, 0.28)' };
      }
    };

    let tick = 0;

    const render = () => {
      tick += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Courtyard stepped water/stone platform aesthetic
      // Draw concentric sanctum rings in golden dusk
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Ambient radial darkness vignetting towards outer edges
      const ambientGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        width * 0.05,
        centerX,
        centerY,
        width * 0.7
      );
      ambientGlow.addColorStop(0, 'rgba(23, 31, 53, 0.7)');
      ambientGlow.addColorStop(0.5, 'rgba(16, 22, 41, 0.85)');
      ambientGlow.addColorStop(1, 'rgba(8, 11, 24, 0.98)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Delicate Sacred Mandala Geometry on Courtyard Floor
      ctx.save();
      ctx.strokeStyle = 'rgba(231, 190, 112, 0.07)';
      ctx.lineWidth = 1;
      for (let r = 80; r <= Math.max(width, height) * 0.5; r += 70) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // 12-ray star pattern
      for (let a = 0; a < 12; a++) {
        const angle = (a / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * width * 0.45, centerY + Math.sin(angle) * height * 0.45);
        ctx.stroke();
      }
      ctx.restore();

      // Render Each Diya
      diyas.forEach((diya) => {
        const px = (diya.x / 100) * width;
        const py = (diya.y / 100) * height;
        const isSelected = selectedDiyaId === diya.id;

        const flicker = Math.sin(tick * 3 + px * 0.05) * 0.12 + Math.cos(tick * 2.1 + py * 0.04) * 0.08;
        const scale = (diya.intensity + flicker) * (isSelected ? 1.25 : 1.0);
        const colors = getFlameColors(diya.flameHue);

        // 1. Broad Radiant Aura On The Stone
        const auraRadius = (isSelected ? 85 : 55) * scale;
        const auraGrad = ctx.createRadialGradient(px, py + 4, 2, px, py + 4, auraRadius);
        auraGrad.addColorStop(0, colors.aura);
        auraGrad.addColorStop(0.4, 'rgba(255, 179, 71, 0.12)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(px, py + 4, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Terracotta Clay Diya Body
        ctx.save();
        ctx.translate(px, py);

        // Shadow beneath diya
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.beginPath();
        ctx.ellipse(0, 14, 18 * scale, 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Clay bowl
        const clayGrad = ctx.createLinearGradient(-15 * scale, 0, 15 * scale, 12 * scale);
        clayGrad.addColorStop(0, '#A73F1D');
        clayGrad.addColorStop(0.5, '#68250F');
        clayGrad.addColorStop(1, '#3B1306');
        ctx.fillStyle = clayGrad;
        ctx.beginPath();
        ctx.ellipse(0, 7, 16 * scale, 7 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner oil basin
        const oilGrad = ctx.createRadialGradient(0, 6, 0, 0, 6, 12 * scale);
        oilGrad.addColorStop(0, '#FFE194');
        oilGrad.addColorStop(0.6, '#B98B43');
        oilGrad.addColorStop(1, '#3A1407');
        ctx.fillStyle = oilGrad;
        ctx.beginPath();
        ctx.ellipse(0, 6, 13 * scale, 4.5 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Gold rim ring
        ctx.strokeStyle = isSelected ? '#FFE194' : 'rgba(231, 190, 112, 0.7)';
        ctx.lineWidth = isSelected ? 2 : 1.2;
        ctx.beginPath();
        ctx.ellipse(0, 6, 15 * scale, 5.5 * scale, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Wick
        ctx.strokeStyle = '#230E05';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, 6);
        ctx.lineTo(0, -1);
        ctx.stroke();

        // 3. Realistic Dynamic Flame
        const flameHeight = (18 + Math.sin(tick * 4 + px) * 2.5) * scale;
        const flameWidth = (8 + Math.cos(tick * 3.5 + py) * 1.2) * scale;
        const flameTilt = Math.sin(tick * 2.5 + px * 0.1) * 1.8;

        // Outer Flame Body
        ctx.save();
        ctx.translate(flameTilt, -2);
        ctx.beginPath();
        ctx.moveTo(0, -flameHeight);
        ctx.bezierCurveTo(-flameWidth, -flameHeight * 0.45, -flameWidth, 0, 0, 0);
        ctx.bezierCurveTo(flameWidth, 0, flameWidth, -flameHeight * 0.45, 0, -flameHeight);
        ctx.closePath();

        const flameGrad = ctx.createLinearGradient(0, -flameHeight, 0, 0);
        flameGrad.addColorStop(0, colors.outer);
        flameGrad.addColorStop(0.4, colors.mid);
        flameGrad.addColorStop(1, 'rgba(255, 122, 51, 0.9)');
        ctx.fillStyle = flameGrad;
        ctx.shadowColor = colors.mid;
        ctx.shadowBlur = 12 * scale;
        ctx.fill();

        // Inner Bright Core
        ctx.beginPath();
        ctx.moveTo(0, -flameHeight * 0.65);
        ctx.bezierCurveTo(-flameWidth * 0.5, -flameHeight * 0.28, -flameWidth * 0.5, 0, 0, 0);
        ctx.bezierCurveTo(flameWidth * 0.5, 0, flameWidth * 0.5, -flameHeight * 0.28, 0, -flameHeight * 0.65);
        ctx.closePath();
        ctx.fillStyle = colors.core;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#FFFFFF';
        ctx.fill();

        ctx.restore(); // restore flame translate

        // Selection Target Ring when selected
        if (isSelected) {
          ctx.strokeStyle = 'rgba(231, 190, 112, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(0, 5, 26 * scale, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore(); // restore diya translate

        // Spawn occasional ember from flame
        if (Math.random() < 0.18) {
          particlesRef.current.push({
            x: px + (Math.random() - 0.5) * 6,
            y: py - 10,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -(Math.random() * 0.8 + 0.4),
            life: 0,
            maxLife: Math.random() * 45 + 30,
            size: Math.random() * 2 + 1,
            alpha: 0.9,
            hue: diya.flameHue === 'rose' ? 350 : diya.flameHue === 'amber' ? 30 : 42,
          });
        }
      });

      // Render Floating Embers
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Placement Guide Crosshair when in "Light a Diya" mode
      if (isPlacementMode && hoverCoordRef.current) {
        const hx = hoverCoordRef.current.x;
        const hy = hoverCoordRef.current.y;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 179, 71, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hx, hy, 16 + Math.sin(tick * 5) * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 179, 71, 0.2)';
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [diyas, selectedDiyaId, isPlacementMode]);

  // Handle Mouse / Touch interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normX = (clientX / rect.width) * 100;
    const normY = (clientY / rect.height) * 100;

    // Check if clicked close to an existing Diya (threshold ~ 4% radius)
    let closestDiya: DiyaWish | null = null;
    let minDist = 5.5; // percent threshold

    for (const diya of diyas) {
      const dx = diya.x - normX;
      const dy = diya.y - normY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closestDiya = diya;
      }
    }

    if (closestDiya) {
      onSelectDiya(closestDiya);
      return;
    }

    // Otherwise, if in placement mode, place at clicked spot
    if (isPlacementMode) {
      // Clamp coordinates gracefully within courtyard bounds
      const clampedX = Math.max(8, Math.min(92, normX));
      const clampedY = Math.max(12, Math.min(88, normY));
      onCanvasClickPlace({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPlacementMode) {
      hoverCoordRef.current = null;
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    hoverCoordRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerLeave = () => {
    hoverCoordRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[580px] lg:h-[650px] rounded-3xl overflow-hidden border border-festive-border shadow-2xl bg-background-secondary select-none"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`w-full h-full block ${
          isPlacementMode ? 'cursor-crosshair' : 'cursor-pointer'
        }`}
      />

      {/* Mode hint badge overlay */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-festive-border text-xs text-ivory">
        <span className="w-2 h-2 rounded-full bg-amber-warm animate-ping" />
        <span>
          {isPlacementMode
            ? 'Touch or click anywhere in the courtyard to set down your Diya'
            : 'Click any ignited Diya to read its blessed wish'}
        </span>
      </div>
    </div>
  );
};
