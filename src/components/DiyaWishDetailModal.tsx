import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Clock, User } from 'lucide-react';
import { DiyaWish } from '../types';

interface DiyaWishDetailModalProps {
  diya: DiyaWish | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export const DiyaWishDetailModal: React.FC<DiyaWishDetailModalProps> = ({
  diya,
  onClose,
  onLike,
}) => {
  if (!diya) return null;

  const timeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just moments ago';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
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
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md glass-panel bg-background-secondary/95 border border-festive-borderHover rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
        >
          {/* Top subtle ray */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-warm to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-festive-border bg-background-elevated/50 text-muted hover:text-ivory hover:border-gold-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Diya Header Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-warm/30 to-gold-primary/10 border border-gold-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,179,71,0.3)]">
              <Sparkles className="w-5 h-5 text-amber-warm animate-flicker" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gold-primary uppercase tracking-widest font-semibold">
                <User className="w-3.5 h-3.5" />
                <span>{diya.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted font-light">
                <Clock className="w-3 h-3" />
                <span>{timeAgo(diya.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* The Auspicious Message */}
          <div className="relative p-6 rounded-2xl bg-background-elevated/40 border border-festive-border mb-6">
            <span className="text-3xl font-serif text-gold-primary/30 absolute top-2 left-3 leading-none select-none">
              &ldquo;
            </span>
            <p className="font-heading text-lg sm:text-xl text-ivory italic leading-relaxed pt-2">
              {diya.message}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted/80">
              Flame Aura: <span className="text-gold-glow capitalize">{diya.flameHue}</span>
            </span>

            <button
              onClick={() => onLike(diya.id)}
              className="px-4 py-2 rounded-full border border-festive-border bg-background-elevated/60 hover:bg-background-elevated hover:border-rose-400/50 text-ivory flex items-center gap-2 text-xs font-medium active:scale-95 transition-all group"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20 group-hover:fill-rose-400 transition-colors" />
              <span>Bless Wish ({diya.likes})</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

