import React from 'react';

export const FestiveAtmosphereBg: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Midnight Festive Sky with Radial Warmth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_rgba(65,30,85,0.45)_0%,_rgba(23,17,44,0.65)_35%,_rgba(8,11,24,0.95)_75%,_#050711_100%)]" 
      />

      {/* 2. Soft Amber & Golden Light Pockets */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-b from-amber-warm/15 via-gold-primary/5 to-transparent blur-[140px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-gold-primary/8 blur-[130px] rounded-full" />
      <div className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-amber-warm/8 blur-[140px] rounded-full" />

      {/* 3. Subtle Traditional Indian Temple Arch & Mandala Geometry (Vector Overlay) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045] mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mandalaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF3DA" />
            <stop offset="60%" stopColor="#E7BE70" />
            <stop offset="100%" stopColor="#080B18" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central Giant Sacred Mandala Geometry */}
        <g transform="translate(720, 380)">
          {/* Concentric rings */}
          <circle r="420" fill="none" stroke="url(#mandalaGrad)" strokeWidth="1.2" strokeDasharray="6 6" />
          <circle r="360" fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.8" />
          <circle r="290" fill="none" stroke="url(#mandalaGrad)" strokeWidth="1" strokeDasharray="3 4" />
          <circle r="210" fill="none" stroke="url(#mandalaGrad)" strokeWidth="1.2" />
          <circle r="140" fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.8" />
          <circle r="80" fill="none" stroke="url(#mandalaGrad)" strokeWidth="1.5" />

          {/* 16-Fold Sacred Lotus Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const rot = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${rot})`}>
                <path
                  d="M0,0 Q35,-140 0,-280 Q-35,-140 0,0 Z"
                  fill="none"
                  stroke="#E7BE70"
                  strokeWidth="0.75"
                />
                <circle cx="0" cy="-290" r="3.5" fill="#FFE194" />
                <path
                  d="M0,-80 Q20,-180 0,-240 Q-20,-180 0,-80 Z"
                  fill="none"
                  stroke="#FFB347"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}
        </g>

        {/* Hanging Festive Toran / Marigold Garland Wave at Top */}
        <path
          d="M0,25 Q120,65 240,25 Q360,65 480,25 Q600,65 720,25 Q840,65 960,25 Q1080,65 1200,25 Q1320,65 1440,25"
          fill="none"
          stroke="#E7BE70"
          strokeWidth="1.2"
        />
        <path
          d="M0,35 Q120,80 240,35 Q360,80 480,35 Q600,80 720,35 Q840,80 960,35 Q1080,80 1200,35 Q1320,80 1440,35"
          fill="none"
          stroke="#FFB347"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />

        {/* Little Hanging Brass Lamps across Toran */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 60 + i * 120;
          const y = (i % 2 === 0 ? 55 : 45);
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <line x1="0" y1="-25" x2="0" y2="0" stroke="#E7BE70" strokeWidth="0.8" />
              <ellipse cx="0" cy="5" rx="5" ry="3" fill="#E7BE70" />
              <circle cx="0" cy="9" r="2" fill="#FFE194" />
            </g>
          );
        })}
      </svg>

      {/* 4. Fine Organic Atmospheric Texture */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#e7be70_0.75px,transparent_0.75px)] [background-size:36px_36px] opacity-[0.035]" 
      />

      {/* 5. Deep Horizon Gradient Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050711] via-[#080B18]/80 to-transparent" />
    </div>
  );
};
