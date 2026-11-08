import React from 'react';
import { motion } from 'framer-motion';

interface TraditionalDiyaProps {
  className?: string;
}

export const TraditionalDiya: React.FC<TraditionalDiyaProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Dynamic Wide Atmospheric Aura Glow */}
      <div 
        className="absolute -top-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-amber-warm/20 blur-3xl pointer-events-none animate-pulseGlow" 
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
      <div 
        className="absolute -top-12 w-48 h-48 rounded-full bg-festive-orange/25 blur-2xl pointer-events-none"
      />

      {/* Flame Container with Organic Motion */}
      <motion.div 
        className="relative z-20 flex flex-col items-center cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Animated Realistic Flame */}
        <div className="relative w-16 h-28 sm:w-20 sm:h-36 flex items-end justify-center mb-[-8px]">
          {/* Outermost Flame Corona */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-t from-festive-orange/40 via-amber-warm/60 to-transparent blur-md animate-flicker" />

          {/* Main Flame Body */}
          <div 
            className="relative w-10 sm:w-12 h-20 sm:h-26 rounded-[50%_50%_35%_35%/70%_70%_30%_30%] bg-gradient-to-t from-festive-orange via-amber-warm to-gold-primary shadow-[0_0_24px_#FFB347] animate-flicker"
            style={{ transformOrigin: 'center bottom' }}
          >
            {/* Inner Vibrant Core */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 sm:w-7 h-12 sm:h-16 rounded-[50%_50%_35%_35%/70%_70%_30%_30%] bg-gradient-to-t from-white via-ivory to-gold-glow opacity-95 shadow-[0_0_12px_#FFF3DA]" />
            {/* Blue base characteristic of real fire */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3 rounded-full bg-blue-500/70 blur-[1px]" />
          </div>

          {/* Cotton Wick (Batti) */}
          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-5 bg-gradient-to-t from-amber-950 to-neutral-900 rounded-full z-10" />
        </div>

        {/* Traditional Clay Diya (Mitti Ka Diya) SVG with Handcrafted Detailing */}
        <div className="relative z-10 w-64 sm:w-80 md:w-96 drop-shadow-[0_18px_30px_rgba(0,0,0,0.8)]">
          <svg
            viewBox="0 0 320 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <defs>
              {/* Diya Clay Gradient */}
              <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8A3319" />
                <stop offset="40%" stopColor="#C45525" />
                <stop offset="70%" stopColor="#6C240E" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>

              {/* Gold Ornament Rim Gradient */}
              <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A6724" />
                <stop offset="25%" stopColor="#E7BE70" />
                <stop offset="50%" stopColor="#FFF3DA" />
                <stop offset="75%" stopColor="#E7BE70" />
                <stop offset="100%" stopColor="#8A6724" />
              </linearGradient>

              {/* Oil Pond Gradient */}
              <radialGradient id="oilReflect" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE194" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#FFB347" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#9A3412" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#451A03" stopOpacity="1" />
              </radialGradient>

              {/* Drop Shadow Filter */}
              <filter id="diyaGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Pedestal / Footing */}
            <path
              d="M110 100 Q160 118 210 100 L215 110 Q160 128 105 110 Z"
              fill="#381005"
              opacity="0.95"
            />
            
            {/* Diya Clay Body Bowl */}
            <path
              d="M20 50 C20 90 90 115 160 115 C230 115 300 90 300 50 C280 62 230 75 160 75 C90 75 40 62 20 50 Z"
              fill="url(#terracottaGrad)"
            />

            {/* Engraved Traditional Fluting & Petal Motifs on Belly */}
            <path d="M70 70 Q90 95 105 105" stroke="#E7BE70" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
            <path d="M110 74 Q125 98 135 108" stroke="#E7BE70" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
            <path d="M160 75 L160 112" stroke="#E7BE70" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
            <path d="M210 74 Q195 98 185 108" stroke="#E7BE70" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
            <path d="M250 70 Q230 95 215 105" stroke="#E7BE70" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />

            {/* Outer Lip & Rim */}
            <ellipse
              cx="160"
              cy="50"
              rx="140"
              ry="26"
              fill="#521B0A"
              stroke="url(#goldRim)"
              strokeWidth="2.5"
            />

            {/* Inner Oil Basin Pool */}
            <ellipse
              cx="160"
              cy="52"
              rx="124"
              ry="20"
              fill="url(#oilReflect)"
            />

            {/* Brass / Gold Beaded Rim Detailing */}
            {Array.from({ length: 27 }).map((_, i) => {
              const angle = (i / 26) * Math.PI;
              const cx = 160 - Math.cos(angle) * 133;
              const cy = 52 + Math.sin(angle) * 23;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="1.8"
                  fill="#FFE194"
                  opacity="0.8"
                />
              );
            })}

            {/* Diya Spout / Nose for Wick (front center peak) */}
            <path
              d="M148 46 Q160 38 172 46 Q160 54 148 46 Z"
              fill="#300F05"
            />

            {/* Burning Ember Reflection on oil surface */}
            <ellipse
              cx="160"
              cy="48"
              rx="26"
              ry="7"
              fill="#FFF3DA"
              opacity="0.8"
              filter="url(#diyaGlow)"
            />
          </svg>
        </div>

        {/* Soft Shadow on Floor / Surface */}
        <div className="w-56 sm:w-72 h-5 mt-[-10px] rounded-[100%] bg-gradient-to-r from-transparent via-black/80 to-transparent blur-md" />
      </motion.div>
    </div>
  );
};

