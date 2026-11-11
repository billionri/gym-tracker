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
    <div className="space-y-6 text-zinc-900">
      {/* Header - White Background with Orange Accents */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-orange-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-800 uppercase tracking-widest px-2.5 py-0.5 rounded-lg bg-orange-100 border border-orange-300">
              GymForge Vault
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              {filteredExercises.length} / {EXERCISE_DATABASE.length} EXERCISES
            </span>
          </div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Original GymForge Exercises
          </h2>
          <p className="text-sm text-zinc-600 mt-0.5">
            Images sourced directly from <span className="text-orange-700 font-bold font-mono">gym-tracker.infinityfreeapp.com</span> across all 11 disciplines.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-orange-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exercises, muscles, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-orange-200 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="space-y-3">
        {/* Category Pills - Green when active, Orange div button when inactive */}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'bg-orange-50 text-orange-950 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-orange-200 text-orange-800'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-filters (PRO only, Difficulty) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-600 font-medium">Difficulty:</span>
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  difficultyFilter === diff
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                    : 'bg-white text-zinc-700 border-orange-200 hover:border-orange-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setProOnly(!proOnly)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                proOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-orange-50 text-orange-900 border-orange-300 hover:bg-orange-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>GymForge PRO Tier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Grid - Orange Divs with Green Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExercises.map((ex) => {
          const isExpanded = expandedId === ex.id;
          const isAdded = !!addedIds[ex.id];

          return (
            <div
              key={`${ex.id}-${ex.category}`}
              className="rounded-2xl border-2 border-orange-200 bg-orange-50/70 hover:border-orange-400 transition-all flex flex-col justify-between overflow-hidden shadow-2xs text-zinc-900"
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
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-orange-900 border border-orange-200">
                          {ex.category}
                        </span>
                        {ex.isPro && (
                          <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500 text-white shadow-2xs">
                            <Award className="w-2.5 h-2.5" />
                            PRO
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                        {ex.name}
                      </h3>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      ex.difficulty === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : ex.difficulty === 'Intermediate'
                        ? 'bg-sky-100 text-sky-800 border-sky-300'
                        : 'bg-red-100 text-red-800 border-red-300'
                    }`}>
                      {ex.difficulty}
                    </span>
                  </div>

                  {/* Muscle targets */}
                  <div className="mt-2 text-xs text-zinc-600 space-y-1">
                    <div>
                      <span className="text-zinc-500 font-semibold">Targets: </span>
                      <span className="text-zinc-800 font-bold">{ex.primaryMuscles.join(', ')}</span>
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
                        <span className="text-orange-800 font-mono font-bold">{ex.equipment}</span>
                      </div>
                      {ex.imageUrl && (
                        <a
                          href={userMode === 'queen' && ex.femaleImageUrl ? ex.femaleImageUrl : ex.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-orange-600 hover:text-orange-800 flex items-center gap-1 font-mono transition-colors"
                          title="View source asset on gym-tracker.infinityfreeapp.com"
                        >
                          <span>URL</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Form Instructions - Orange Div with White Box */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-orange-200 text-xs text-zinc-800 space-y-2 animate-in fade-in duration-150">
                      <div className="p-2.5 bg-white rounded-xl border border-orange-200">
                        <span className="font-bold text-zinc-900 block mb-0.5">Execution Form:</span>
                        <p className="leading-relaxed text-zinc-700">{ex.instructions}</p>
                      </div>
                      {ex.tips && (
                        <div className="p-2 rounded-lg bg-orange-100 border border-orange-300 text-orange-950 text-[11px]">
                          <span className="font-bold text-orange-800">Iron Tip: </span>
                          {ex.tips}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Actions - Green Button */}
                <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                    className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1 transition-colors font-medium cursor-pointer"
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
                      className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-400'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-xs'
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
        <div className="text-center py-12 rounded-2xl bg-orange-50 border-2 border-orange-300">
          <Dumbbell className="w-10 h-10 text-orange-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-zinc-900">No exercises match your filter</h3>
          <p className="text-xs text-zinc-500 mt-1">Try resetting the search query or category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setDifficultyFilter('All');
              setProOnly(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
