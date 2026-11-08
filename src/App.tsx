import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperiencesSection } from './components/ExperiencesSection';
import { FestiveMessage } from './components/FestiveMessage';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { ExperienceModal } from './components/ExperienceModal';

export function App() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const scrollToExperiences = () => {
    const el = document.getElementById('experiences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterFestival = () => {
    setSelectedExperience('light-a-diya');
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

        {/* Main Content Area */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero 
            onEnterClick={handleEnterFestival} 
            onExploreClick={scrollToExperiences} 
          />

          {/* Experiences Section */}
          <ExperiencesSection onSelectExperience={(id) => setSelectedExperience(id)} />

          {/* Festive Message Section */}
          <FestiveMessage />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Experience Preview Modal / Placeholder Viewer */}
      <ExperienceModal
        experienceId={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </div>
  );
}

export default App;

