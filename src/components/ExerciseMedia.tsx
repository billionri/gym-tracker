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
        className={`w-full ${heightClass} rounded-xl flex items-center justify-center text-5xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-purple-500/15 border border-zinc-800 ${className}`}
      >
        <span>{exercise.icon}</span>
      </div>
    );
  }

  // Handle Video
  if (exercise.isVideo && primarySrc && !hasError) {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 ${className}`}>
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
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-zinc-950/80 border border-zinc-700/60 text-[9px] font-mono text-zinc-400">
            infinityfreeapp.com
          </span>
        )}
      </div>
    );
  }

  // Handle Image with onerror fallback to maleSrc or fallback illustration
  if (primarySrc && !hasError) {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group ${className}`}>
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
          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-zinc-950/80 border border-zinc-700/60 text-[9px] font-mono text-zinc-400">
            infinityfreeapp.com
          </span>
        )}
      </div>
    );
  }

  // Fallback card if image couldn't load from infinityfreeapp
  return (
    <div
      className={`w-full ${heightClass} rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 text-zinc-500 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-amber-400/80 mb-1.5">
        <Dumbbell className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold text-zinc-400">{exercise.name}</span>
      <span className="text-[10px] font-mono text-zinc-600 mt-0.5">{exercise.category}</span>
    </div>
  );
};
