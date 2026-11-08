import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronUp, Plus, Dumbbell, Sparkles, 
  Award, Check, Info, ShieldCheck, Flame, ExternalLink 
} from 'lucide-react';
import { MuscleCategory, Exercise } from '../types/workout';
import { EXERCISE_DATABASE } from '../data/exercises';
import { ExerciseMedia } from './ExerciseMedia';

interface ExerciseLibraryProps {
  onAddToWorkout: (exercise: Exercise) => void;
  onQuickStartSingle: (exercise: Exercise) => void;
  userMode: 'beast' | 'queen' | 'iron';
}

const CATEGORIES: (MuscleCategory | 'All')[] = [
  'All',
  'Chest',
  'Shoulders',
  'Back',
  'Legs',
  'Arms',
  'Core',
  'Cardio',
  'Flexibility',
  'Pilates',
  'Strength',
  'Outdoor',
];

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  onAddToWorkout,
  onQuickStartSingle,
  userMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MuscleCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [proOnly, setProOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredExercises = EXERCISE_DATABASE.filter((ex) => {
    if (selectedCategory !== 'All' && ex.category !== selectedCategory) {
      return false;
    }
    if (proOnly && !ex.isPro) {
      return false;
    }
    if (difficultyFilter !== 'All' && ex.difficulty !== difficultyFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name.toLowerCase().includes(q);
      const matchMuscles = ex.primaryMuscles.some((m) => m.toLowerCase().includes(q));
      const matchEquip = ex.equipment.toLowerCase().includes(q);
      if (!matchName && !matchMuscles && !matchEquip) return false;
    }
    return true;
  });

  const handleAdd = (ex: Exercise) => {
    onAddToWorkout(ex);
    setAddedIds((prev) => ({ ...prev, [ex.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [ex.id]: false }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              GymForge Vault
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              {filteredExercises.length} / {EXERCISE_DATABASE.length} EXERCISES
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Original GymForge Exercises
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Images sourced directly from <span className="text-amber-400 font-mono">gym-tracker.infinityfreeapp.com</span> across all 11 disciplines.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exercises, muscles, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? EXERCISE_DATABASE.length 
              : EXERCISE_DATABASE.filter(e => e.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-filters (PRO only, Difficulty) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Difficulty:</span>
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-zinc-800 text-amber-400 border-amber-500/40'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setProOnly(!proOnly)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                proOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>GymForge PRO Tier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExercises.map((ex) => {
          const isExpanded = expandedId === ex.id;
          const isAdded = !!addedIds[ex.id];

          return (
            <div
              key={`${ex.id}-${ex.category}`}
              className={`rounded-2xl border bg-zinc-900 transition-all flex flex-col justify-between overflow-hidden ${
                ex.isPro
                  ? 'border-zinc-800/80 hover:border-amber-500/50 shadow-md'
                  : 'border-zinc-800/60 hover:border-zinc-700'
              }`}
            >
              {/* Exercise Image from gym-tracker.infinityfreeapp.com */}
              <div className="p-3 pb-0">
                <ExerciseMedia
                  exercise={ex}
                  userMode={userMode}
                  heightClass="h-44 sm:h-48"
                  showSourceTag={true}
                />
              </div>

              <div className="p-4 pt-3 flex-1 flex flex-col justify-between">
                <div>
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {ex.category}
                        </span>
                        {ex.isPro && (
                          <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Award className="w-2.5 h-2.5" />
                            PRO
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {ex.name}
                      </h3>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      ex.difficulty === 'Beginner'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : ex.difficulty === 'Intermediate'
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {ex.difficulty}
                    </span>
                  </div>

                  {/* Muscle targets */}
                  <div className="mt-2 text-xs text-zinc-400 space-y-1">
                    <div>
                      <span className="text-zinc-500 font-semibold">Targets: </span>
                      <span className="text-zinc-300 font-medium">{ex.primaryMuscles.join(', ')}</span>
                    </div>
                    {ex.secondaryMuscles && ex.secondaryMuscles.length > 0 && (
                      <div className="text-[11px] text-zinc-500 truncate">
                        <span>Secondary: </span>
                        <span>{ex.secondaryMuscles.join(', ')}</span>
                      </div>
                    )}
                    <div className="text-[11px] text-zinc-500 pt-0.5 flex items-center justify-between">
                      <div>
                        <span>Equipment: </span>
                        <span className="text-amber-400/90 font-mono">{ex.equipment}</span>
                      </div>
                      {ex.imageUrl && (
                        <a
                          href={userMode === 'queen' && ex.femaleImageUrl ? ex.femaleImageUrl : ex.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-zinc-500 hover:text-amber-400 flex items-center gap-1 font-mono transition-colors"
                          title="View source asset on gym-tracker.infinityfreeapp.com"
                        >
                          <span>URL</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Form Instructions */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-300 space-y-2 animate-in fade-in duration-150">
                      <div>
                        <span className="font-bold text-zinc-200 block mb-0.5">Execution Form:</span>
                        <p className="leading-relaxed text-zinc-400">{ex.instructions}</p>
                      </div>
                      {ex.tips && (
                        <div className="p-2 rounded-lg bg-zinc-950/80 border border-amber-500/20 text-amber-300/90 text-[11px]">
                          <span className="font-bold text-amber-400">Iron Tip: </span>
                          {ex.tips}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <span>Hide Form</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Form Tips</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAdd(ex)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isAdded
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Workout</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-zinc-900 border border-zinc-800">
          <Dumbbell className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white">No exercises match your filter</h3>
          <p className="text-xs text-zinc-400 mt-1">Try resetting the search query or category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setDifficultyFilter('All');
              setProOnly(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
