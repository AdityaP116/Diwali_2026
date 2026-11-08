export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'flame' | 'palette' | 'sparkles' | 'heart';
  badge?: string;
  tagline: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface DiyaWish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  x: number; // percentage 0-100 across courtyard
  y: number; // percentage 0-100 across courtyard
  intensity: number; // 0.8 - 1.2 flicker multiplier
  flameHue: 'gold' | 'amber' | 'rose' | 'sacred';
  likes: number;
}
