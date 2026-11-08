import { useState, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperiencesSection } from './components/ExperiencesSection';
import { FestiveMessage } from './components/FestiveMessage';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';

// Code-split interactive experience studios for optimal initial bundle performance
const LightADiyaStudio = lazy(() =>
  import('./components/LightADiyaStudio').then((m) => ({ default: m.LightADiyaStudio }))
);
const RangoliStudio = lazy(() =>
  import('./components/RangoliStudio').then((m) => ({ default: m.RangoliStudio }))
);
const FireworksPlayground = lazy(() =>
  import('./components/FireworksPlayground').then((m) => ({ default: m.FireworksPlayground }))
);
const WishStudio = lazy(() =>
  import('./components/WishStudio').then((m) => ({ default: m.WishStudio }))
);

// Harmonious Festive Navy & Gold Loading Fallback
function StudioLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 select-none">
      <div className="relative flex items-center justify-center">
        {/* Ambient Pulsating Glow */}
        <div className="absolute w-24 h-24 rounded-full bg-amber-warm/20 blur-xl animate-pulseGlow" />
        {/* Spinning Gold Filament */}
        <div className="w-12 h-12 rounded-full border-2 border-festive-border border-t-gold-primary animate-spin" />
        {/* Inner Flame Dot */}
        <div className="absolute w-3 h-3 rounded-full bg-amber-warm shadow-[0_0_12px_#FFB347] animate-pulse" />
      </div>
      <p className="mt-5 font-heading text-lg sm:text-xl text-ivory tracking-wide font-normal italic">
        Illuminating the Studio...
      </p>
      <span className="text-[11px] uppercase tracking-[0.25em] text-gold-primary/70 mt-1">
        DiwaliVerse
      </span>
    </div>
  );
}

export type ActiveExperienceView = 'home' | 'light-a-diya' | 'rangoli-studio' | 'fireworks-playground' | 'wish-studio';

export function App() {
  const [activeView, setActiveView] = useState<ActiveExperienceView>('home');

  const scrollToExperiences = () => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById('experiences');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('experiences');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterFestival = () => {
    setActiveView('light-a-diya');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExperienceSelect = (id: string) => {
    if (
      id === 'light-a-diya' ||
      id === 'rangoli-studio' ||
      id === 'fireworks-playground' ||
      id === 'wish-studio'
    ) {
      setActiveView(id as ActiveExperienceView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background text-ivory selection:bg-gold-primary/30 selection:text-gold-glow flex flex-col justify-between overflow-hidden">
      {/* Dynamic Background Atmosphere */}
      <AmbientParticles />

      {/* Atmospheric lighting wash layers */}
      <div 
        className="fixed inset-0 pointer-events-none bg-radial-hero opacity-80 z-0" 
        aria-hidden="true" 
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Navigation Bar */}
        <Navbar onExploreClick={scrollToExperiences} />

        {/* Dynamic View Routing for All 4 Experiences with Suspense Boundary */}
        <main className="flex-grow">
          {activeView === 'home' && (
            <>
              {/* Hero Section */}
              <Hero 
                onEnterClick={handleEnterFestival} 
                onExploreClick={scrollToExperiences} 
              />

              {/* Experiences Section */}
              <ExperiencesSection onSelectExperience={handleExperienceSelect} />

              {/* Festive Message Section */}
              <FestiveMessage />
            </>
          )}

          {activeView !== 'home' && (
            <Suspense fallback={<StudioLoadingFallback />}>
              {activeView === 'light-a-diya' && (
                <LightADiyaStudio onBackToHome={handleBackToHome} />
              )}

              {activeView === 'rangoli-studio' && (
                <RangoliStudio onBackToHome={handleBackToHome} />
              )}

              {activeView === 'fireworks-playground' && (
                <FireworksPlayground onBackToHome={handleBackToHome} />
              )}

              {activeView === 'wish-studio' && (
                <WishStudio onBackToHome={handleBackToHome} />
              )}
            </Suspense>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
