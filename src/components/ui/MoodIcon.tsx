import React from 'react';
import { CloudRain, Cloud, CloudSun, Leaf, Sparkles } from 'lucide-react';

interface MoodIconProps {
  mood: string;
  className?: string;
  size?: number;
}

export const MoodIcon: React.FC<MoodIconProps> = ({ mood, className = 'w-5 h-5', size = 20 }) => {
  switch (mood) {
    case 'Very Low':
      return <CloudRain size={size} className={`text-blue-500 ${className}`} />;
    case 'Low':
      return <Cloud size={size} className={`text-slate-400 ${className}`} />;
    case 'Neutral':
      return <CloudSun size={size} className={`text-amber-500 ${className}`} />;
    case 'Good':
      return <Leaf size={size} className={`text-emerald-500 ${className}`} />;
    case 'Great':
      return <Sparkles size={size} className={`text-teal-500 ${className}`} />;
    default:
      return <Sparkles size={size} className={`text-teal-600 ${className}`} />;
  }
};
