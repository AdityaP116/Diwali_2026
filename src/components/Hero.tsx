import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Diya3DCanvas } from './Diya3DCanvas';

interface HeroProps {
  onEnterClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterClick, onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Lighting Gradients */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-radial-glow pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Classical Ornamental Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3 mb-6 select-none"
        >
          <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/40 to-gold-primary/80" />
          <div className="flex items-center gap-2">
            <span className="font-sanskrit text-sm text-gold-primary/90 font-medium">ॐ</span>
            <span className="font-heading text-xs sm:text-sm tracking-[0.35em] uppercase text-gold-glow font-medium">
              Deepotsava • The Sacred Light
            </span>
            <span className="font-sanskrit text-sm text-gold-primary/90 font-medium">ॐ</span>
          </div>
          <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-gold-primary/40 to-gold-primary/80" />
        </motion.div>

        {/* Editorial Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="space-y-1 sm:space-y-3"
        >
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ivory">
            Let Your Light <span className="font-italic text-gold-gradient italic">Shine.</span>
          </h1>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-muted">
            Celebrate <span className="text-gold-primary font-normal">Diwali.</span>
          </h2>
        </motion.div>

        {/* Visual Centerpiece: Interactive 3D WebGL Diya */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 sm:my-8 relative flex flex-col items-center"
        >
          {/* Subtle 3D Hint Badge */}
          <div className="absolute -top-3 z-10 px-3 py-1 rounded-full border border-gold-primary/30 bg-background-elevated/70 backdrop-blur-md text-[10px] uppercase tracking-widest text-gold-glow flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-warm animate-ping" />
            <span>Interactive 3D • Move Cursor to Rotate</span>
          </div>

          <Diya3DCanvas />
        </motion.div>

        {/* Hero Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="max-w-xl text-base sm:text-lg text-muted/90 font-light leading-relaxed mb-10"
        >
          A little light can make a big difference. Explore the magic of Diwali
          through creativity, celebration and shared happiness.
        </motion.p>

        {/* Primary and Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
        >
          {/* Primary CTA */}
          <button
            onClick={onEnterClick}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider font-semibold bg-gold-primary hover:bg-gold-glow text-background shadow-[0_0_24px_rgba(217,182,111,0.35)] hover:shadow-[0_0_32px_rgba(217,182,111,0.55)] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Light Your First Diya</span>
            <ArrowRight className="w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onExploreClick}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium border border-festive-border bg-background-secondary/60 hover:bg-background-elevated hover:border-gold-primary/50 text-ivory hover:text-gold-glow transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
          >
            <Compass className="w-4 h-4 text-gold-primary group-hover:rotate-45 transition-transform" />
            <span>Wander the Celebrations</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

