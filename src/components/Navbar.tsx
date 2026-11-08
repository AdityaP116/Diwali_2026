import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onExploreClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExploreClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'About', href: '#about' },
  ];

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-festive-border shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary rounded-lg p-1"
          aria-label="DiwaliVerse Home"
        >
          {/* Flame Symbol */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-amber-warm/30 to-gold-primary/10 border border-gold-primary/30 flex items-center justify-center group-hover:border-gold-primary/70 transition-colors shadow-[0_0_12px_rgba(231,190,112,0.25)]">
            <svg
              className="w-4 h-4 text-amber-warm group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C10.5 5 8 8 8 12a4 4 0 0 0 8 0c0-4-2.5-7-4-10z" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-amber-warm/20 blur-[6px] -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>

          <span className="font-heading text-2xl tracking-wide font-bold bg-gradient-to-r from-ivory via-gold-glow to-gold-primary bg-clip-text text-transparent group-hover:brightness-110 transition-all">
            DiwaliVerse
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wider uppercase text-muted font-medium">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-1 hover:text-gold-glow transition-colors duration-200 group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-primary"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-primary to-amber-warm transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right-side Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sound Toggle UI Button */}
          <button
            onClick={toggleSound}
            type="button"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-festive-border bg-background-elevated/40 hover:bg-background-elevated hover:border-gold-primary/40 text-muted hover:text-ivory transition-all flex items-center gap-2 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
            aria-label={isMuted ? 'Unmute festive atmosphere sound' : 'Mute festive atmosphere sound'}
            title={isMuted ? 'Atmosphere sound muted (Visual demo)' : 'Atmosphere sound playing'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-muted group-hover:text-gold-primary" />
                <span className="hidden sm:inline tracking-wider">AUDIO OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-warm animate-pulse" />
                <span className="hidden sm:inline tracking-wider text-gold-glow">AUDIO ON</span>
              </>
            )}
          </button>

          {/* Explore Button */}
          <button
            onClick={onExploreClick}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT hover:shadow-[0_0_20px_rgba(231,190,112,0.4)] hover:brightness-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold-primary"
          >
            <Sparkles className="w-3.5 h-3.5 text-background" />
            <span>Explore</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-lg border border-festive-border bg-background-elevated/60 text-muted hover:text-ivory hover:border-gold-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-festive-border bg-background-secondary/95 backdrop-blur-xl px-6 py-6"
          >
            <nav className="flex flex-col gap-4 text-center">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm tracking-widest uppercase text-muted hover:text-gold-glow hover:bg-background-elevated/40 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onExploreClick();
                  }}
                  type="button"
                  className="w-full py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT shadow-md"
                >
                  Explore Experiences
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

