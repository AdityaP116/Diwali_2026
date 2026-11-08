import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-festive-border bg-background-secondary/60 backdrop-blur-md pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Brand & Flame Symbol */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-warm/40 to-gold-primary/20 border border-gold-primary/40 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-amber-warm"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C10.5 5 8 8 8 12a4 4 0 0 0 8 0c0-4-2.5-7-4-10z" />
            </svg>
          </div>
          <span className="font-heading text-2xl font-bold tracking-wide bg-gradient-to-r from-ivory to-gold-primary bg-clip-text text-transparent">
            DiwaliVerse
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gold-primary/90 font-light tracking-widest uppercase text-center mb-8">
          Light Up the Festival. Share the Happiness.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs sm:text-sm uppercase tracking-widest text-muted font-medium mb-10">
          <a href="#hero" className="hover:text-gold-glow transition-colors">
            Home
          </a>
          <a href="#experiences" className="hover:text-gold-glow transition-colors">
            Experiences
          </a>
          <a href="#about" className="hover:text-gold-glow transition-colors">
            About
          </a>
        </div>

        {/* Small Festive Closing Message */}
        <div className="flex flex-col items-center gap-1.5 text-xs text-muted/75 mb-4 text-center">
          <div className="flex items-center gap-2">
            <span>Crafted with celebration & devotion</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
            <span>for Diwali 2026</span>
          </div>
          <div className="text-[13px] font-heading italic text-ivory/90 tracking-wide mt-1">
            With warm wishes, <span className="not-italic font-medium text-gold-primary">Aditya Pushpakar</span> ❤️
          </div>
        </div>

        {/* Copyright notice */}
        <p className="text-[11px] text-muted/50 tracking-wider">
          &copy; {new Date().getFullYear()} DiwaliVerse. All festive rights reserved.
        </p>
      </div>
    </footer>
  );
};

