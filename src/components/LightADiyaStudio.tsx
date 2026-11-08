import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, PlusCircle, ArrowLeft } from 'lucide-react';
import { DiyaCourtyardCanvas } from './DiyaCourtyardCanvas';
import { LightDiyaForm } from './LightDiyaForm';
import { DiyaWishDetailModal } from './DiyaWishDetailModal';
import { DiyaWish } from '../types';
import { getStoredDiyas, addDiyaWish, toggleDiyaLike } from '../utils/diyaStorage';

interface LightADiyaStudioProps {
  onBackToHome: () => void;
}

export const LightADiyaStudio: React.FC<LightADiyaStudioProps> = ({ onBackToHome }) => {
  const [diyas, setDiyas] = useState<DiyaWish[]>([]);
  const [selectedDiya, setSelectedDiya] = useState<DiyaWish | null>(null);
  const [isPlacementMode, setIsPlacementMode] = useState(false);
  const [pendingCoord, setPendingCoord] = useState<{ x: number; y: number } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setDiyas(getStoredDiyas());
  }, []);

  const handleSelectDiya = (diya: DiyaWish) => {
    setSelectedDiya(diya);
  };

  const handleCanvasClickPlace = (coord: { x: number; y: number }) => {
    setPendingCoord(coord);
    setIsPlacementMode(false);
    setIsFormOpen(true);
  };

  const handleStartPlacement = () => {
    setIsPlacementMode(true);
  };

  const handleCreateWish = (newWishData: {
    name: string;
    message: string;
    flameHue: DiyaWish['flameHue'];
    x: number;
    y: number;
    intensity: number;
  }) => {
    const created = addDiyaWish(newWishData);
    setDiyas(getStoredDiyas());
    setSelectedDiya(created);
    setPendingCoord(null);
  };

  const handleLikeDiya = (id: string) => {
    const updated = toggleDiyaLike(id);
    setDiyas(updated);
    if (selectedDiya && selectedDiya.id === id) {
      setSelectedDiya({ ...selectedDiya, likes: selectedDiya.likes + 1 });
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Bar with Back Button and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-festive-border bg-background-elevated/40 hover:bg-background-elevated text-xs uppercase tracking-wider text-muted hover:text-ivory transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className="flex items-center gap-4 text-xs">
          <div className="px-3.5 py-1.5 rounded-full border border-festive-border bg-background-elevated/50 flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-amber-warm animate-flicker" />
            <span className="text-muted">Total Ignited:</span>
            <span className="font-semibold text-gold-glow">{diyas.length} Diyas</span>
          </div>

          <button
            onClick={handleStartPlacement}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-md ${
              isPlacementMode
                ? 'bg-amber-warm text-background ring-2 ring-gold-primary animate-pulse'
                : 'bg-gradient-to-r from-gold-secondary via-gold-primary to-amber-warm text-background-DEFAULT hover:brightness-105 active:scale-95'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-background" />
            <span>{isPlacementMode ? 'Click Canvas to Set' : 'Light a New Diya'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Introduction Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/20 bg-background-elevated/40 text-gold-primary text-xs uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-warm" />
          <span>Interactive Illumination Sanctuary</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-normal text-ivory tracking-tight mb-3">
          The Courtyard of <span className="text-gold-gradient italic">Eternal Light</span>
        </h1>
        <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
          Step into our quiet digital sanctum. Light your mitti ka diya, dedicate a prayer or wish for peace, and watch it illuminate alongside thousands across the world.
        </p>
      </div>

      {/* The Interactive Canvas Courtyard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full relative"
      >
        <DiyaCourtyardCanvas
          diyas={diyas}
          selectedDiyaId={selectedDiya?.id || null}
          onSelectDiya={handleSelectDiya}
          onCanvasClickPlace={handleCanvasClickPlace}
          isPlacementMode={isPlacementMode}
        />
      </motion.div>

      {/* Light Diya Wish Form Modal */}
      <LightDiyaForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setPendingCoord(null);
        }}
        pendingCoord={pendingCoord}
        onSubmit={handleCreateWish}
      />

      {/* Diya Detail / Blessing Modal */}
      <DiyaWishDetailModal
        diya={selectedDiya}
        onClose={() => setSelectedDiya(null)}
        onLike={handleLikeDiya}
      />
    </div>
  );
};
