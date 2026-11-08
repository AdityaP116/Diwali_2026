import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperiencesSection } from './components/ExperiencesSection';
import { FestiveMessage } from './components/FestiveMessage';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { LightADiyaStudio } from './components/LightADiyaStudio';
import { RangoliStudio } from './components/RangoliStudio';
import { FireworksPlayground } from './components/FireworksPlayground';
import { WishStudio } from './components/WishStudio';

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

        {/* Dynamic View Routing for All 4 Experiences */}
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
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
