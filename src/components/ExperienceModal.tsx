import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface ExperienceModalProps {
  experienceId: string | null;
  onClose: () => void;
}

const modalDetails: Record<string, { title: string; category: string; description: string; nextPhaseNote: string }> = {
  'light-a-diya': {
    title: 'Light a Diya',
    category: 'Interactive Illumination',
    description: 'Immerse yourself in a serene 3D terrace where every touch lights an authentic mitti ka diya. Leave your auspicious thoughts to join an illuminated constellation of community diyas.',
    nextPhaseNote: 'Interactive canvas diya lighting with particle flame shaders is scheduled for Phase 2.',
  },
  'rangoli-studio': {
    title: 'Rangoli Studio',
    category: 'Sacred Geometric Art',
    description: 'Design vibrant traditional and modern geometric rangolis using a kaleidoscopic radial canvas. Blend auspicious colored powders, marigold petals, and brass accents.',
    nextPhaseNote: 'Interactive multi-symmetric canvas brush engine scheduled for Phase 3.',
  },
  'fireworks-playground': {
    title: 'Fireworks Playground',
    category: 'Sky of Lights',
    description: 'Paint the midnight navy sky with eco-friendly digital sparklers, chakras, rockets, and anar fountains powered by high-fidelity physics.',
    nextPhaseNote: 'HTML5 Canvas particle physics fireworks playground scheduled for Phase 4.',
  },
  'wish-studio': {
    title: 'Wish Studio',
    category: 'Personalized Festive Greetings',
    description: 'Compose gold-embossed digital cards featuring custom festive messages, traditional shlokas, and personalized motifs to share with friends and family.',
    nextPhaseNote: 'Greeting card export and web-share system scheduled for Phase 5.',
  },
};

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experienceId, onClose }) => {
  if (!experienceId) return null;
  const details = modalDetails[experienceId] || {
    title: 'Diwali Experience',
    category: 'Festive Module',
    description: 'An interactive celebratory journey is being prepared for you.',
    nextPhaseNote: 'Upcoming feature in the DiwaliVerse suite.',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg glass-panel bg-background-secondary/95 border border-festive-borderHover rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle top golden light ray */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-festive-border bg-background-elevated/50 text-muted hover:text-ivory hover:border-gold-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/30 bg-gold-primary/10 text-gold-primary text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{details.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-3xl sm:text-4xl text-ivory font-normal mb-3">
            {details.title}
          </h3>

          {/* Description */}
          <p className="text-muted/95 text-sm sm:text-base leading-relaxed mb-6 font-light">
            {details.description}
          </p>

          {/* Milestone notice box */}
          <div className="p-4 rounded-xl border border-festive-border bg-background-elevated/40 mb-8">
            <div className="text-[11px] uppercase tracking-wider text-amber-warm font-semibold mb-1">
              Phase 1 Prototype Status
            </div>
            <div className="text-xs text-muted leading-relaxed">
              {details.nextPhaseNote}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-festive-border text-muted hover:text-ivory hover:bg-background-elevated transition-colors"
            >
              Back to Showcase
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(231,190,112,0.3)] hover:brightness-105 active:scale-95 transition-all"
            >
              <span>Explore Preview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

