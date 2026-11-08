import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Palette, Sparkles, Heart, ArrowUpRight } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperiencesSectionProps {
  onSelectExperience: (id: string) => void;
}

const experiences: ExperienceItem[] = [
  {
    id: 'light-a-diya',
    title: 'Light a Diya',
    tagline: 'Illumination',
    description: 'Spread warmth and illuminate your digital celebration with personal intent.',
    iconName: 'flame',
  },
  {
    id: 'rangoli-studio',
    title: 'Rangoli Studio',
    tagline: 'Traditional Art',
    description: 'Create colorful traditional patterns with your imagination and geometry.',
    iconName: 'palette',
  },
  {
    id: 'fireworks-playground',
    title: 'Fireworks Playground',
    tagline: 'Night Sky Spectacle',
    description: 'Explore a sky full of color, light and celebration with sparkling bursts.',
    iconName: 'sparkles',
  },
  {
    id: 'wish-studio',
    title: 'Wish Studio',
    tagline: 'Festive Blessings',
    description: 'Create personalized Diwali greeting cards and share happiness with loved ones.',
    iconName: 'heart',
  },
];

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onSelectExperience }) => {
  const renderIcon = (name: ExperienceItem['iconName']) => {
    switch (name) {
      case 'flame':
        return <Flame className="w-6 h-6 text-amber-warm" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-gold-glow" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-amber-warm" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-rose-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold-primary" />;
    }
  };

  return (
    <section id="experiences" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting orb */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-amber-warm/5 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/20 bg-background-elevated/50 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-warm animate-ping" />
          <span className="text-xs uppercase tracking-widest text-gold-primary font-medium">Curated Interactive Spaces</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight mb-4"
        >
          Experience the <span className="text-gold-gradient italic font-serif">Magic of Diwali</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-muted font-light leading-relaxed"
        >
          Discover little moments that make this festival unforgettable.
        </motion.p>
      </div>

      {/* Grid of 4 Premium Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onSelectExperience(exp.id)}
            className="group relative flex flex-col justify-between p-7 rounded-2xl glass-panel glass-panel-hover border border-festive-border cursor-pointer select-none overflow-hidden"
          >
            {/* Subtle card top glow accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-primary/0 to-transparent group-hover:via-gold-primary/80 transition-all duration-500" />

            <div>
              {/* Header row: Icon & Arrow */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-background-elevated border border-festive-border flex items-center justify-center group-hover:border-gold-primary/50 group-hover:shadow-[0_0_18px_rgba(231,190,112,0.25)] transition-all">
                  {renderIcon(exp.iconName)}
                </div>

                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-muted group-hover:text-gold-primary group-hover:border-gold-primary/40 group-hover:bg-gold-primary/10 transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Tagline */}
              <div className="text-[11px] uppercase tracking-widest text-gold-secondary font-medium mb-1.5">
                {exp.tagline}
              </div>

              {/* Card Title */}
              <h3 className="font-heading text-2xl text-ivory group-hover:text-gold-glow transition-colors font-medium mb-3">
                {exp.title}
              </h3>

              {/* Short Description */}
              <p className="text-sm text-muted/90 font-light leading-relaxed mb-6">
                {exp.description}
              </p>
            </div>

            {/* Bottom action indicator */}
            <div className="pt-4 border-t border-festive-border/50 flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-gold-primary/80 group-hover:text-gold-primary transition-colors">
              <span>Explore Studio</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-warm">
                Open &rarr;
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

