import React from 'react';
import { motion } from 'framer-motion';

export const FestiveMessage: React.FC = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Warm ambient decorative radial backdrop */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,179,71,0.07)_0%,_rgba(16,22,41,0.4)_50%,_transparent_80%)] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Sanskrit Inscription Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="font-sanskrit text-lg sm:text-2xl text-gold-primary/80 tracking-widest font-normal">
            शुभं करोति कल्याणमारोग्यं धनसंपदाम् ।
          </span>
          <p className="text-xs uppercase tracking-[0.25em] text-muted/70 mt-2">
            Ancient invocation of light, health and prosperity
          </p>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/40" />
          <div className="w-2 h-2 rotate-45 border border-gold-primary/60 bg-amber-warm/30" />
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/40" />
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight mb-6"
        >
          May Your Life Be Filled With <span className="text-gold-gradient italic">Light.</span>
        </motion.h2>

        {/* Section Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-muted font-light leading-relaxed mb-12"
        >
          This Diwali, celebrate new beginnings, meaningful connections and the happiness of sharing.
          May the warmth of countless diyas brighten every corner of your journey.
        </motion.p>

        {/* Festive Golden Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-festive-border bg-background-elevated/40 backdrop-blur-md shadow-diya-inner mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-warm shadow-[0_0_8px_#FFB347] animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-wider text-ivory">
            Wishing You & Your Family A Blessed & Joyous Deepavali
          </span>
        </motion.div>

        {/* Elegant Creator Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted/80 font-light"
        >
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/30" />
          <p className="font-heading italic tracking-wide text-ivory/90 text-sm sm:text-base">
            A festive celebration, lovingly created and shared by <span className="not-italic font-medium text-gold-primary">Aditya Pushpakar</span>.
          </p>
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/30" />
        </motion.div>
      </div>
    </section>
  );
};

