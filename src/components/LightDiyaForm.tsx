import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, X, ShieldCheck } from 'lucide-react';
import { DiyaWish } from '../types';

interface LightDiyaFormProps {
  isOpen: boolean;
  onClose: () => void;
  pendingCoord: { x: number; y: number } | null;
  onSubmit: (wish: {
    name: string;
    message: string;
    flameHue: DiyaWish['flameHue'];
    x: number;
    y: number;
    intensity: number;
  }) => void;
}

export const LightDiyaForm: React.FC<LightDiyaFormProps> = ({
  isOpen,
  onClose,
  pendingCoord,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [flameHue, setFlameHue] = useState<DiyaWish['flameHue']>('gold');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Default to random placement near center if not specified
    const x = pendingCoord ? pendingCoord.x : Math.floor(Math.random() * 60) + 20;
    const y = pendingCoord ? pendingCoord.y : Math.floor(Math.random() * 50) + 25;

    onSubmit({
      name: name.trim(),
      message: message.trim(),
      flameHue,
      x,
      y,
      intensity: 1.05 + Math.random() * 0.15,
    });

    setName('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg glass-panel bg-background-secondary/95 border border-festive-borderHover rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
        >
          {/* Top Gold Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-festive-border bg-background-elevated/50 text-muted hover:text-ivory hover:border-gold-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-warm/20 border border-gold-primary/40 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-warm animate-flicker" />
            </div>
            <span className="text-xs uppercase tracking-widest text-gold-primary font-semibold">
              Sacred Illumination
            </span>
          </div>

          <h3 className="font-heading text-3xl text-ivory font-normal mb-2">
            Ignite Your Diya
          </h3>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            Every lighted flame radiates positivity, blessing the community courtyard with your wish.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                Your Name / Family
              </label>
              <input
                type="text"
                required
                maxLength={40}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya & Devraj"
                className="w-full px-4 py-2.5 rounded-xl bg-background-elevated/60 border border-festive-border text-ivory placeholder-muted/50 text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                Blessing or Festive Wish
              </label>
              <textarea
                required
                rows={3}
                maxLength={180}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayers for peace, joy, healing or new beginnings..."
                className="w-full px-4 py-2.5 rounded-xl bg-background-elevated/60 border border-festive-border text-ivory placeholder-muted/50 text-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
                Choose Flame Aura
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'gold', label: 'Gold', color: 'from-gold-primary to-amber-warm' },
                  { id: 'amber', label: 'Amber', color: 'from-amber-warm to-orange-500' },
                  { id: 'sacred', label: 'Sacred Fire', color: 'from-amber-600 to-yellow-500' },
                  { id: 'rose', label: 'Rose Radiance', color: 'from-rose-400 to-pink-600' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFlameHue(item.id as DiyaWish['flameHue'])}
                    className={`py-2 px-1 rounded-xl border text-[11px] font-medium flex flex-col items-center gap-1 transition-all ${
                      flameHue === item.id
                        ? 'border-gold-primary bg-background-elevated shadow-[0_0_12px_rgba(231,190,112,0.3)] text-ivory'
                        : 'border-festive-border bg-background-elevated/40 text-muted hover:text-ivory'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${item.color}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-[11px] text-muted flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                Saved locally to your constellation
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT shadow-[0_0_20px_rgba(231,190,112,0.35)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Light Flame</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
