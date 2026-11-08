import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Sparkles, Copy, Check, Heart, Share2 } from 'lucide-react';

interface WishStudioProps {
  onBackToHome: () => void;
}

const FESTIVE_QUOTES = [
  {
    title: 'Warmth & Health',
    quote: 'May the radiant warmth of divine lamps fill your home with eternal joy, sound health, and boundless abundance.',
  },
  {
    title: 'Triumph of Light',
    quote: 'As lights illuminate every doorway, may darkness and doubt dissipate from your path. Happy Diwali!',
  },
  {
    title: 'Prosperity & Grace',
    quote: 'Wishing you peace that illuminates the heart and prosperity that brightens all your tomorrows.',
  },
  {
    title: 'Sacred Sanskrit',
    quote: 'शुभं करोति कल्याणमारोग्यं धनसंपदाम् । शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते ॥',
  },
];

const CARD_THEMES = [
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    bg: 'bg-gradient-to-br from-[#111D32] via-[#24334B] to-[#080E1C]',
    border: 'border-[#D9B66F]/40',
    accent: '#D9B66F',
  },
  {
    id: 'sacred-crimson',
    name: 'Sacred Crimson',
    bg: 'bg-gradient-to-br from-[#3b0d18] via-[#1a0812] to-[#080E1C]',
    border: 'border-[#FF7A33]/40',
    accent: '#FF7A33',
  },
  {
    id: 'royal-emerald',
    name: 'Royal Emerald',
    bg: 'bg-gradient-to-br from-[#072418] via-[#09161a] to-[#080E1C]',
    border: 'border-[#10B981]/40',
    accent: '#10B981',
  },
  {
    id: 'celestial-indigo',
    name: 'Celestial Indigo',
    bg: 'bg-gradient-to-br from-[#1e133d] via-[#110e28] to-[#080E1C]',
    border: 'border-[#A855F7]/40',
    accent: '#A855F7',
  },
];

export const WishStudio: React.FC<WishStudioProps> = ({ onBackToHome }) => {
  const [recipient, setRecipient] = useState('Beloved Family & Friends');
  const [sender, setSender] = useState('Aarav & Aditi');
  const [selectedQuote, setSelectedQuote] = useState(FESTIVE_QUOTES[0].quote);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
  const [selectedMotif, setSelectedMotif] = useState<'diya' | 'rangoli' | 'fireworks'>('diya');
  const [includeCreatorSignature, setIncludeCreatorSignature] = useState(true);
  const [copied, setCopied] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCopyText = () => {
    let fullText = `🪔 Happy Diwali! 🪔\n\nDear ${recipient},\n\n"${selectedQuote}"\n\nWith festive blessings and love,\n${sender}`;
    if (includeCreatorSignature) {
      fullText += `\n\nWith love and warm wishes, Aditya Pushpakar ❤️`;
    }
    fullText += `\n\n— Created on DiwaliVerse`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCard = () => {
    // Generate clean Canvas-drawn Greeting Card
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark backdrop with rich gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 1000);
    grad.addColorStop(0, '#0F162B');
    grad.addColorStop(0.5, '#171F38');
    grad.addColorStop(1, '#080B18');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1000);

    // Warm radial core
    const radial = ctx.createRadialGradient(400, 450, 20, 400, 450, 450);
    radial.addColorStop(0, 'rgba(255, 179, 71, 0.18)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 800, 1000);

    // Gold filigree border
    ctx.strokeStyle = '#E7BE70';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 740, 940);
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, 716, 916);

    // Corner flourishes
    const drawFlourish = (cx: number, cy: number) => {
      ctx.save();
      ctx.fillStyle = '#FFE194';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawFlourish(42, 42);
    drawFlourish(758, 42);
    drawFlourish(42, 958);
    drawFlourish(758, 958);

    // Top Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E7BE70';
    ctx.font = '20px Inter, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('A SACRED FESTIVAL OF LIGHTS', 400, 130);

    ctx.fillStyle = '#FFF3DA';
    ctx.font = 'bold 54px Cormorant Garamond, serif';
    ctx.fillText('Happy Diwali', 400, 200);

    // Recipient
    ctx.fillStyle = '#FFB347';
    ctx.font = 'italic 26px Cormorant Garamond, serif';
    ctx.fillText(`Dearest ${recipient},`, 400, 310);

    // Message Body with wrapped text
    ctx.fillStyle = '#FFF3DA';
    ctx.font = '28px Cormorant Garamond, serif';

    const words = selectedQuote.split(' ');
    let line = '';
    let y = 410;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 600 && n > 0) {
        ctx.fillText(line, 400, y);
        line = words[n] + ' ';
        y += 42;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 400, y);

    // Sender Signature
    ctx.fillStyle = '#E7BE70';
    ctx.font = 'italic 24px Cormorant Garamond, serif';
    ctx.fillText('With prayers & warm festive wishes,', 400, 775);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px Cormorant Garamond, serif';
    ctx.fillText(sender, 400, 820);

    // Optional Creator Signature
    if (includeCreatorSignature) {
      ctx.fillStyle = 'rgba(255, 243, 218, 0.88)';
      ctx.font = 'italic 20px Cormorant Garamond, serif';
      ctx.fillText('With love and warm wishes, Aditya Pushpakar ❤️', 400, 875);
    }

    // Footer Watermark
    ctx.fillStyle = 'rgba(231, 190, 112, 0.6)';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('DIWALIVERSE 2026', 400, 935);

    const a = document.createElement('a');
    a.download = `diwali-greeting-${recipient.replace(/\s+/g, '-').toLowerCase()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-festive-border bg-background-elevated/40 hover:bg-background-elevated text-xs uppercase tracking-wider text-muted hover:text-ivory transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyText}
            className="px-4 py-1.5 rounded-full border border-festive-border bg-background-elevated/50 text-xs text-muted hover:text-ivory hover:border-gold-primary transition-all flex items-center gap-2"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Wish!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadCard}
            className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res Card</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/20 bg-background-elevated/40 text-gold-primary text-xs uppercase tracking-widest mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Personalized Festive Greeting Maker</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-normal text-ivory tracking-tight mb-2">
          Wish <span className="text-gold-gradient italic">Studio</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted font-light">
          Craft gold-embossed digital cards with sacred blessings to send love and prosperity to your dear ones.
        </p>
      </div>

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customization Form (5 cols) */}
        <div className="lg:col-span-5 glass-panel bg-background-secondary/90 border border-festive-border rounded-3xl p-6 space-y-5">
          {/* Recipient */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
              Wishing (Recipient)
            </label>
            <input
              type="text"
              value={recipient}
              maxLength={35}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Grandma Kalyani / The Sharma Family"
              className="w-full px-4 py-2.5 rounded-xl bg-background-elevated/60 border border-festive-border text-ivory placeholder-muted/50 text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
            />
          </div>

          {/* Sender */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
              With Love From (Sender)
            </label>
            <input
              type="text"
              value={sender}
              maxLength={35}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g. Rohan & Pooja"
              className="w-full px-4 py-2.5 rounded-xl bg-background-elevated/60 border border-festive-border text-ivory placeholder-muted/50 text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
            />
          </div>

          {/* Quick Festive Quote Templates */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
              Blessing & Inscription Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FESTIVE_QUOTES.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedQuote(item.quote)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedQuote === item.quote
                      ? 'border-gold-primary bg-background-elevated text-gold-glow shadow-sm'
                      : 'border-festive-border bg-background-elevated/40 text-muted hover:text-ivory'
                  }`}
                >
                  <div className="font-semibold text-ivory mb-0.5">{item.title}</div>
                  <div className="line-clamp-2 text-[11px] text-muted/80">{item.quote}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message input */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
              Customize Dedicated Message
            </label>
            <textarea
              rows={3}
              maxLength={220}
              value={selectedQuote}
              onChange={(e) => setSelectedQuote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-background-elevated/60 border border-festive-border text-ivory placeholder-muted/50 text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all resize-none"
            />
          </div>

          {/* Theme Palette */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
              Card Background Ambience
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CARD_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                    selectedTheme.id === theme.id
                      ? 'border-gold-primary bg-background-elevated text-gold-glow ring-1 ring-gold-primary'
                      : 'border-festive-border bg-background-elevated/30 text-muted hover:text-ivory'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Motif Choice */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
              Centerpiece Motif
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'diya', label: 'Diya Flame 🪔' },
                { id: 'rangoli', label: 'Mandala 💮' },
                { id: 'fireworks', label: 'Sparkler ✨' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMotif(m.id as typeof selectedMotif)}
                  className={`py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedMotif === m.id
                      ? 'border-gold-primary bg-background-elevated text-gold-glow'
                      : 'border-festive-border bg-background-elevated/30 text-muted hover:text-ivory'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Creator Signature Toggle */}
          <div className="pt-2 border-t border-festive-border/50 flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-ivory font-medium">Include Creator Signature</div>
              <div className="text-[11px] text-muted">With love and warm wishes, Aditya Pushpakar ❤️</div>
            </div>
            <button
              type="button"
              onClick={() => setIncludeCreatorSignature(!includeCreatorSignature)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                includeCreatorSignature
                  ? 'border-gold-primary text-gold-glow bg-gold-primary/15'
                  : 'border-festive-border text-muted bg-background-elevated/30'
              }`}
            >
              {includeCreatorSignature ? 'Included' : 'Off'}
            </button>
          </div>
        </div>

        {/* Right: Live Card Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full max-w-md aspect-[4/5] rounded-3xl p-8 sm:p-10 ${selectedTheme.bg} border-2 ${selectedTheme.border} shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between text-center overflow-hidden`}
          >
            {/* Ornate inner gold frame border */}
            <div className="absolute inset-3 border border-gold-primary/30 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 border border-gold-primary/15 rounded-xl pointer-events-none" />

            {/* Corner jewels */}
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gold-primary/80 shadow-[0_0_8px_#FFE194]" />
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold-primary/80 shadow-[0_0_8px_#FFE194]" />
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gold-primary/80 shadow-[0_0_8px_#FFE194]" />
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gold-primary/80 shadow-[0_0_8px_#FFE194]" />

            {/* Card Header */}
            <div className="relative z-10 pt-2">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-primary/90 font-medium mb-1">
                A Sacred Festival of Lights
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl text-ivory font-bold tracking-wide">
                Happy Diwali
              </h2>
            </div>

            {/* Center Motif & Blessing */}
            <div className="relative z-10 my-4 space-y-4">
              {/* Motif Icon */}
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-warm/15 border border-gold-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,179,71,0.3)]">
                {selectedMotif === 'diya' && (
                  <Sparkles className="w-7 h-7 text-amber-warm animate-flicker" />
                )}
                {selectedMotif === 'rangoli' && (
                  <span className="text-2xl select-none">💮</span>
                )}
                {selectedMotif === 'fireworks' && (
                  <Sparkles className="w-7 h-7 text-gold-glow animate-pulse" />
                )}
              </div>

              <div className="text-xs uppercase tracking-widest text-gold-primary font-medium">
                Dearest {recipient || 'Loved Ones'},
              </div>

              <p className="font-heading text-lg sm:text-xl text-ivory/95 italic leading-relaxed px-2 font-normal">
                &ldquo;{selectedQuote}&rdquo;
              </p>
            </div>

            {/* Card Footer Signature */}
            <div className="relative z-10 pb-2">
              <div className="text-xs text-muted/90 font-light mb-1">
                With endless love & festive prayers,
              </div>
              <div className="font-heading text-2xl text-gold-glow font-bold tracking-wide">
                {sender || 'Family'}
              </div>
              {includeCreatorSignature && (
                <div className="text-xs font-heading italic text-ivory/85 tracking-wide mt-2">
                  With love and warm wishes, <span className="not-italic font-medium text-gold-primary">Aditya Pushpakar</span> ❤️
                </div>
              )}
              <div className="text-[10px] uppercase tracking-widest text-gold-primary/40 mt-3">
                DiwaliVerse Celebration
              </div>
            </div>
          </motion.div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Share2 className="w-3.5 h-3.5 text-gold-primary" />
            <span>Click &ldquo;Download High-Res Card&rdquo; to save directly as an image ready for WhatsApp & Instagram.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

