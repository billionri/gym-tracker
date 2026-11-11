import React, { useState } from 'react';
import { Exercise } from '../types/workout';
import { Dumbbell, ExternalLink } from 'lucide-react';

interface ExerciseMediaProps {
  exercise: Exercise;
  userMode: 'beast' | 'queen' | 'iron';
  heightClass?: string;
  className?: string;
  showSourceTag?: boolean;
}

export const ExerciseMedia: React.FC<ExerciseMediaProps> = ({
  exercise,
  userMode,
  heightClass = 'h-44',
  className = '',
  showSourceTag = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  // Compute media source from gym-tracker.infinityfreeapp.com
  const isFemale = userMode === 'queen';
  const primarySrc = isFemale ? (exercise.femaleImageUrl || exercise.imageUrl) : exercise.imageUrl;
  const fallbackSrc = exercise.imageUrl;

  // Handle Outdoor sports icon
  if (exercise.icon) {
    return (
      <div
        className={`w-full ${heightClass} rounded-xl flex items-center justify-center text-5xl bg-orange-100 border-2 border-orange-200 ${className}`}
      >
        <span>{exercise.icon}</span>
      </div>
    );
  }

  // Handle Video
  if (exercise.isVideo && primarySrc && !hasError) {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-white border-2 border-orange-200 ${className}`}>
        <video
          src={primarySrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
        {showSourceTag && (
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-white/90 border border-orange-300 text-[9px] font-mono text-orange-900 font-bold">
            gym-tracker
          </span>
        )}
      </div>
    );
  }

  // Handle Image with onerror fallback to maleSrc or fallback illustration
  if (primarySrc && !hasError) {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-white border-2 border-orange-200 group ${className}`}>
        <img
          src={triedFallback ? fallbackSrc : primarySrc}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => {
            if (!triedFallback && fallbackSrc && fallbackSrc !== primarySrc) {
              setTriedFallback(true);
            } else {
              setHasError(true);
            }
          }}
        />
        {showSourceTag && (
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-white/90 border border-orange-300 text-[9px] font-mono text-orange-900 font-bold">
            gym-tracker
          </span>
        )}
      </div>
    );
  }

  // Fallback card if image couldn't load from infinityfreeapp
  return (
    <div
      className={`w-full ${heightClass} rounded-xl flex flex-col items-center justify-center bg-orange-50 border-2 border-orange-200 text-zinc-600 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center text-orange-700 mb-1.5">
        <Dumbbell className="w-5 h-5" />
      </div>
      <span className="text-xs font-bold text-zinc-800">{exercise.name}</span>
      <span className="text-[10px] font-mono text-orange-800 mt-0.5 font-medium">{exercise.category}</span>
    </div>
  );
};
