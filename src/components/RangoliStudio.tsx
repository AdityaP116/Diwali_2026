import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Sparkles, Undo2 } from 'lucide-react';

interface RangoliStudioProps {
  onBackToHome: () => void;
}

const RANGOLI_PALETTE = [
  { name: 'Kunkum Red', hex: '#E11D48' },
  { name: 'Marigold Gold', hex: '#E7BE70' },
  { name: 'Bright Turmeric', hex: '#FACC15' },
  { name: 'Warm Amber', hex: '#FFB347' },
  { name: 'Sacred Orange', hex: '#FF7A33' },
  { name: 'Emerald Green', hex: '#10B981' },
  { name: 'Peacock Teal', hex: '#06B6D4' },
  { name: 'Royal Indigo', hex: '#6366F1' },
  { name: 'Lotus Rose', hex: '#F43F5E' },
  { name: 'Pure Rice White', hex: '#FFF3DA' },
];

export const RangoliStudio: React.FC<RangoliStudioProps> = ({ onBackToHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedColor, setSelectedColor] = useState(RANGOLI_PALETTE[1].hex);
  const [symmetryAxes, setSymmetryAxes] = useState<number>(8); // 4, 6, 8, 12, 16
  const [brushSize, setBrushSize] = useState<number>(4);
  const [brushStyle, setBrushStyle] = useState<'solid' | 'glow' | 'powder'>('glow');
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Canvas dimensions
  const [dimensions, setDimensions] = useState({ width: 650, height: 650 });

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.min(Math.floor(rect.width) - 32, 650);
      setDimensions({ width: size, height: size });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize or re-render background mandala guide
  const drawGuideGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!showGuides) return;
    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    ctx.strokeStyle = 'rgba(217, 182, 111, 0.15)';
    ctx.lineWidth = 1;

    // Concentric guideline circles
    const maxR = width * 0.46;
    for (let r = 40; r <= maxR; r += 45) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Symmetry radial lines
    for (let i = 0; i < symmetryAxes; i++) {
      const angle = (i * 2 * Math.PI) / symmetryAxes;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.stroke();
    }

    // Center sacred bindu dot
    ctx.fillStyle = 'rgba(217, 182, 111, 0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), data]);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    const previousState = newHistory.pop();
    setHistory(newHistory);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    saveHistoryState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Draw symmetric strokes around center
  const drawSymmetricStroke = (x: number, y: number, prevX: number, prevY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const relX = x - cx;
    const relY = y - cy;
    const relPrevX = prevX - cx;
    const relPrevY = prevY - cy;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = selectedColor;

    if (brushStyle === 'glow') {
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = brushSize * 2.5;
    } else if (brushStyle === 'powder') {
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = brushSize * 1.2;
    } else {
      ctx.shadowBlur = 0;
    }

    const angleStep = (2 * Math.PI) / symmetryAxes;

    for (let i = 0; i < symmetryAxes; i++) {
      const angle = i * angleStep;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Normal rotated point
      const rx1 = relPrevX * cos - relPrevY * sin + cx;
      const ry1 = relPrevX * sin + relPrevY * cos + cy;
      const rx2 = relX * cos - relY * sin + cx;
      const ry2 = relX * sin + relY * cos + cy;

      ctx.beginPath();
      ctx.moveTo(rx1, ry1);
      ctx.lineTo(rx2, ry2);
      ctx.stroke();

      // Mirror reflection along radial axis for natural rangoli balance
      const mx1 = -relPrevX * cos - relPrevY * sin + cx;
      const my1 = -relPrevX * sin + relPrevY * cos + cy;
      const mx2 = -relX * cos - relY * sin + cx;
      const my2 = -relX * sin + relY * cos + cy;

      ctx.beginPath();
      ctx.moveTo(mx1, my1);
      ctx.lineTo(mx2, my2);
      ctx.stroke();

      // If powder style, add slight grain dispersion
      if (brushStyle === 'powder') {
        for (let p = 0; p < 3; p++) {
          const offsetX = (Math.random() - 0.5) * brushSize * 2;
          const offsetY = (Math.random() - 0.5) * brushSize * 2;
          ctx.fillStyle = selectedColor;
          ctx.beginPath();
          ctx.arc(rx2 + offsetX, ry2 + offsetY, Math.random() * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  };

  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    saveHistoryState();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    lastPosRef.current = { x, y };
    setIsDrawing(true);
    // Draw initial dot
    drawSymmetricStroke(x, y, x, y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    drawSymmetricStroke(x, y, lastPosRef.current.x, lastPosRef.current.y);
    lastPosRef.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Render on temporary dark background canvas for clean export
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) return;

    // Dark midnight festive backdrop
    expCtx.fillStyle = '#080B18';
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    // Radial warm ambience
    const glow = expCtx.createRadialGradient(
      exportCanvas.width / 2,
      exportCanvas.height / 2,
      20,
      exportCanvas.width / 2,
      exportCanvas.height / 2,
      exportCanvas.width * 0.5
    );
    glow.addColorStop(0, 'rgba(255, 179, 71, 0.15)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    expCtx.fillStyle = glow;
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw artwork
    expCtx.drawImage(canvas, 0, 0);

    // Watermark
    expCtx.fillStyle = 'rgba(231, 190, 112, 0.7)';
    expCtx.font = '14px Cormorant Garamond, serif';
    expCtx.textAlign = 'right';
    expCtx.fillText('DiwaliVerse Rangoli Studio', exportCanvas.width - 24, exportCanvas.height - 24);

    const a = document.createElement('a');
    a.download = `diwali-rangoli-${Date.now()}.png`;
    a.href = exportCanvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between"
    >
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-festive-border bg-background-elevated/40 hover:bg-background-elevated text-xs uppercase tracking-wider text-muted hover:text-ivory transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="px-3 py-1.5 rounded-full border border-festive-border bg-background-elevated/50 text-xs text-muted hover:text-ivory hover:border-gold-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5"
            title="Undo stroke"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Undo</span>
          </button>

          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-full border border-festive-border bg-background-elevated/50 text-xs text-muted hover:text-ivory hover:border-gold-primary/50 transition-all flex items-center gap-1.5"
            title="Clear canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Rangoli</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/20 bg-background-elevated/40 text-gold-primary text-xs uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-warm" />
          <span>Symmetric Mandala & Petal Studio</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-normal text-ivory tracking-tight mb-2">
          Rangoli <span className="text-gold-gradient italic">Studio</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted font-light">
          Draw with your cursor or touch. Every stroke replicates radially into sacred geometric symmetry.
        </p>
      </div>

      {/* Main Studio Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Controls Panel (Left on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 glass-panel bg-background-secondary/90 border border-festive-border rounded-3xl p-5 space-y-6"
        >
          {/* Color Palette */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-3">
              Sacred Colors
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {RANGOLI_PALETTE.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-9 h-9 rounded-xl transition-all relative flex items-center justify-center ${
                    selectedColor === c.hex
                      ? 'scale-110 ring-2 ring-gold-glow shadow-[0_0_12px_rgba(231,190,112,0.5)]'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Symmetry Axes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">Symmetry</span>
              <span className="text-xs font-semibold text-gold-primary">{symmetryAxes} Fold</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  onClick={() => setSymmetryAxes(num)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    symmetryAxes === num
                      ? 'border-gold-primary bg-background-elevated text-gold-glow shadow-sm'
                      : 'border-festive-border bg-background-elevated/30 text-muted hover:text-ivory'
                  }`}
                >
                  {num}x
                </button>
              ))}
            </div>
          </div>

          {/* Brush Thickness */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">Stroke Width</span>
              <span className="text-xs font-semibold text-gold-primary">{brushSize}px</span>
            </div>
            <input
              type="range"
              min={2}
              max={24}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full accent-amber-warm cursor-pointer"
            />
          </div>

          {/* Brush Effect Style */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
              Powder Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'glow', label: 'Glowing' },
                { id: 'powder', label: 'Powder' },
                { id: 'solid', label: 'Solid' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setBrushStyle(style.id as typeof brushStyle)}
                  className={`py-1.5 rounded-lg text-xs font-medium border capitalize transition-all ${
                    brushStyle === style.id
                      ? 'border-gold-primary bg-background-elevated text-gold-glow'
                      : 'border-festive-border bg-background-elevated/30 text-muted hover:text-ivory'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Guides */}
          <div className="pt-2 border-t border-festive-border/50 flex items-center justify-between">
            <span className="text-xs text-muted">Mandala Guides</span>
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                showGuides
                  ? 'border-gold-primary text-gold-primary bg-gold-primary/10'
                  : 'border-festive-border text-muted bg-background-elevated/30'
              }`}
            >
              {showGuides ? 'Visible' : 'Hidden'}
            </button>
          </div>
        </motion.div>

        {/* Drawing Canvas Area (Center/Right on Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 flex flex-col items-center justify-center"
        >
          <div
            className="relative rounded-3xl overflow-hidden border border-festive-border shadow-2xl bg-background-secondary/90 flex items-center justify-center p-2"
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            {/* Guide Grid Canvas */}
            <canvas
              width={dimensions.width}
              height={dimensions.height}
              ref={(el) => {
                if (el) {
                  const ctx = el.getContext('2d');
                  if (ctx) {
                    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
                    drawGuideGrid(ctx, dimensions.width, dimensions.height);
                  }
                }
              }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* User Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              className="relative z-10 cursor-crosshair touch-none w-full h-full rounded-2xl"
            />
          </div>

          <div className="text-center mt-3 text-xs text-muted/70">
            Tip: Press and drag smoothly from the center outwards to create symmetric flower petals.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

