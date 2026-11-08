import React, { useState, useEffect } from 'react';
import { 
  Utensils, Droplets, Flame, Sparkles, Plus, Check, Clock, 
  ArrowRight, ShieldCheck, Heart, RotateCcw, ShoppingBag 
} from 'lucide-react';

interface MealSlot {
  time: string;
  name: string;
  foods: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
}

export const DietPlan: React.FC<{
  onNavigateToShop?: () => void;
  weightKg?: number;
}> = ({ onNavigateToShop, weightKg = 81.0 }) => {
  const [goal, setGoal] = useState<'fat_loss' | 'muscle_gain' | 'maintenance'>('muscle_gain');
  const [dietaryPref, setDietaryPref] = useState<'non_veg' | 'vegetarian' | 'vegan'>('non_veg');
  const [targetCalories, setTargetCalories] = useState<number>(2300);
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gymforge_water_glasses');
      return saved ? Number(saved) : 4;
    } catch {
      return 4;
    }
  });

  // Calculate recommended calories and macros based on goal and weight
  useEffect(() => {
    const baseTdee = Math.round(weightKg * 28); // baseline maintenance
    if (goal === 'fat_loss') {
      setTargetCalories(baseTdee - 400);
    } else if (goal === 'muscle_gain') {
      setTargetCalories(baseTdee + 350);
    } else {
      setTargetCalories(baseTdee);
    }
  }, [goal, weightKg]);

  const proteinG = Math.round(weightKg * 2.0); // 2g per kg
  const fatsG = Math.round((targetCalories * 0.25) / 9);
  const carbsG = Math.round((targetCalories - (proteinG * 4 + fatsG * 9)) / 4);

  // Generate 6 meals based on goal & preference
  const generateMeals = (): MealSlot[] => {
    const isVeg = dietaryPref === 'vegetarian';
    const isVegan = dietaryPref === 'vegan';

    if (isVegan) {
      return [
        {
          time: '07:30 AM',
          name: 'Breakfast',
          foods: 'Tofu scramble (150g) + 2 slices sprouted whole wheat toast + 1 banana + black coffee',
          calories: Math.round(targetCalories * 0.22),
          proteinG: Math.round(proteinG * 0.22),
          carbsG: Math.round(carbsG * 0.25),
          fatsG: Math.round(fatsG * 0.2),
        },
        {
          time: '10:30 AM',
          name: 'Mid-Morning Snack',
          foods: 'Handful of raw almonds (25g) + 1 green apple + pumpkin seeds',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.1),
          carbsG: Math.round(carbsG * 0.12),
          fatsG: Math.round(fatsG * 0.22),
        },
        {
          time: '01:00 PM',
          name: 'High-Protein Lunch',
          foods: 'Quinoa bowl with cooked chickpeas (1.5 cups) + roasted broccoli + tahini dressing + leafy greens',
          calories: Math.round(targetCalories * 0.28),
          proteinG: Math.round(proteinG * 0.28),
          carbsG: Math.round(carbsG * 0.3),
          fatsG: Math.round(fatsG * 0.25),
        },
        {
          time: '04:30 PM',
          name: 'Pre-Workout Fuel',
          foods: '1 large banana + 2 tbsp natural peanut butter + black coffee',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.1),
          carbsG: Math.round(carbsG * 0.15),
          fatsG: Math.round(fatsG * 0.15),
        },
        {
          time: '06:30 PM',
          name: 'Post-Workout Recovery',
          foods: 'Plant pea/rice isolate protein shake (30g protein) + 5g creatine monohydrate + 2 Medjool dates',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.2),
          carbsG: Math.round(carbsG * 0.08),
          fatsG: Math.round(fatsG * 0.05),
        },
        {
          time: '08:30 PM',
          name: 'Dinner',
          foods: 'Yellow lentil dal (1.5 cups) + brown rice or 2 rotis + mixed cucumber-tomato salad',
          calories: Math.round(targetCalories * 0.14),
          proteinG: Math.round(proteinG * 0.1),
          carbsG: Math.round(carbsG * 0.1),
          fatsG: Math.round(fatsG * 0.13),
        },
      ];
    }

    if (isVeg) {
      return [
        {
          time: '07:30 AM',
          name: 'Breakfast',
          foods: 'Moong dal chilla (3 pieces) with paneer stuffing + 1 cup Greek yogurt + black coffee',
          calories: Math.round(targetCalories * 0.24),
          proteinG: Math.round(proteinG * 0.24),
          carbsG: Math.round(carbsG * 0.22),
          fatsG: Math.round(fatsG * 0.22),
        },
        {
          time: '10:30 AM',
          name: 'Mid-Morning Snack',
          foods: 'Greek strained yogurt (150g) with handful of walnuts and blueberries',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.14),
          carbsG: Math.round(carbsG * 0.1),
          fatsG: Math.round(fatsG * 0.18),
        },
        {
          time: '01:00 PM',
          name: 'High-Protein Lunch',
          foods: 'Low-fat paneer bhurji (150g) + 2 whole wheat rotis + dal + fresh cucumber salad + buttermilk',
          calories: Math.round(targetCalories * 0.28),
          proteinG: Math.round(proteinG * 0.28),
          carbsG: Math.round(carbsG * 0.3),
          fatsG: Math.round(fatsG * 0.25),
        },
        {
          time: '04:30 PM',
          name: 'Pre-Workout Fuel',
          foods: '1 large banana + 25g crunchy peanut butter on 1 slice toast + espresso',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.08),
          carbsG: Math.round(carbsG * 0.16),
          fatsG: Math.round(fatsG * 0.15),
        },
        {
          time: '06:30 PM',
          name: 'Post-Workout Recovery',
          foods: '1 scoop Cold-Filtered Whey Isolate (27g protein) + 5g creatine monohydrate + 1 banana',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.2),
          carbsG: Math.round(carbsG * 0.08),
          fatsG: Math.round(fatsG * 0.05),
        },
        {
          time: '08:30 PM',
          name: 'Dinner',
          foods: '1 cup rajma / chole + 1 whole wheat roti + steamed vegetables + bowl of curd',
          calories: Math.round(targetCalories * 0.12),
          proteinG: Math.round(proteinG * 0.06),
          carbsG: Math.round(carbsG * 0.14),
          fatsG: Math.round(fatsG * 0.15),
        },
      ];
    }

    // Default Non-Veg (High Protein Bodybuilding split)
    return [
      {
        time: '07:30 AM',
        name: 'Breakfast',
        foods: '4 egg whites + 2 whole eggs scrambled + 60g rolled oats cooked with water + berries & black coffee',
        calories: Math.round(targetCalories * 0.25),
        proteinG: Math.round(proteinG * 0.26),
        carbsG: Math.round(carbsG * 0.22),
        fatsG: Math.round(fatsG * 0.22),
      },
      {
        time: '10:30 AM',
        name: 'Mid-Morning Snack',
        foods: '150g Greek yogurt + 1 scoop whey or handful of raw almonds (25g)',
        calories: Math.round(targetCalories * 0.12),
        proteinG: Math.round(proteinG * 0.15),
        carbsG: Math.round(carbsG * 0.08),
        fatsG: Math.round(fatsG * 0.18),
      },
      {
        time: '01:00 PM',
        name: 'High-Protein Lunch',
        foods: 'Grilled chicken breast (180g) + 1 cup steamed basmati brown rice + broccoli & olive oil drizzle',
        calories: Math.round(targetCalories * 0.28),
        proteinG: Math.round(proteinG * 0.32),
        carbsG: Math.round(carbsG * 0.32),
        fatsG: Math.round(fatsG * 0.24),
      },
      {
        time: '04:30 PM',
        name: 'Pre-Workout Fuel',
        foods: '1 large banana + 2 tbsp natural peanut butter + black coffee or pre-workout',
        calories: Math.round(targetCalories * 0.11),
        proteinG: Math.round(proteinG * 0.05),
        carbsG: Math.round(carbsG * 0.16),
        fatsG: Math.round(fatsG * 0.16),
      },
      {
        time: '06:30 PM',
        name: 'Post-Workout Anabolic Recovery',
        foods: '1 scoop Whey Isolate (27g protein) + 5g micronized creatine + 2 rice cakes with honey',
        calories: Math.round(targetCalories * 0.11),
        proteinG: Math.round(proteinG * 0.18),
        carbsG: Math.round(carbsG * 0.1),
        fatsG: Math.round(fatsG * 0.05),
      },
      {
        time: '08:30 PM',
        name: 'Dinner',
        foods: 'Baked white fish or lean ground turkey (160g) + roasted sweet potatoes (150g) + large spinach salad',
        calories: Math.round(targetCalories * 0.13),
        proteinG: Math.round(proteinG * 0.24),
        carbsG: Math.round(carbsG * 0.12),
        fatsG: Math.round(fatsG * 0.15),
      },
    ];
  };

  const meals = generateMeals();

  const handleUpdateWater = (glasses: number) => {
    const val = Math.max(0, Math.min(12, glasses));
    setWaterGlasses(val);
    localStorage.setItem('gymforge_water_glasses', val.toString());
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Utensils className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-amber-400 uppercase font-mono">
                GymForge Nutrition Architecture
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Personalized Athlete Diet Plan
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Precision macro ratios, daily meal timeline, and hydration tracking directly from the GymForge Study Topics knowledge vault.
            </p>
          </div>

          {onNavigateToShop && (
            <button
              onClick={onNavigateToShop}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Diet Groceries</span>
            </button>
          )}
        </div>
      </div>

      {/* Plan Configuration Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Preferences & Goal Config (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg space-y-4">
            <h3 className="font-bold text-white text-base">Plan Settings</h3>

            {/* Goal Toggle */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                1. Fitness Objective
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'fat_loss', label: 'Fat Loss', sub: '-400 kcal' },
                  { id: 'muscle_gain', label: 'Lean Bulk', sub: '+350 kcal' },
                  { id: 'maintenance', label: 'Recomp', sub: 'TDEE' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      goal === g.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{g.label}</div>
                    <div className="text-[10px] font-mono opacity-80">{g.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Style */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                2. Dietary Preference
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'non_veg', label: 'Non-Veg', desc: 'Chicken / Eggs' },
                  { id: 'vegetarian', label: 'Vegetarian', desc: 'Paneer / Dairy' },
                  { id: 'vegan', label: '100% Vegan', desc: 'Plant / Legumes' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDietaryPref(d.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      dietaryPref === d.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{d.label}</div>
                    <div className="text-[9px] text-zinc-500 truncate">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Calorie Readout */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Daily Energy</span>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {targetCalories} kcal
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-zinc-400">
                Body weight: <span className="text-white font-bold">{weightKg} kg</span>
              </div>
            </div>
          </div>

          {/* Daily Hydration Glass Tracker (from study_topics.html) */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Daily Hydration Log</h4>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    {waterGlasses * 250} ml / 2,000 ml goal
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleUpdateWater(0)}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                title="Reset water log"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* 8 visual water glasses */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
              {Array.from({ length: 8 }).map((_, idx) => {
                const isFilled = idx < waterGlasses;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleUpdateWater(isFilled ? idx : idx + 1)}
                    className={`py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isFilled
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm shadow-sky-500/20'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:border-zinc-700'
                    }`}
                  >
                    <Droplets className={`w-4 h-4 ${isFilled ? 'fill-sky-400' : ''}`} />
                    <span className="text-[9px] font-mono mt-1 font-bold">
                      {isFilled ? '250ml' : `G${idx + 1}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-1">
              <span>{waterGlasses >= 8 ? '✓ Optimum Hydration Reached!' : `${8 - waterGlasses} glasses remaining`}</span>
              <button
                onClick={() => handleUpdateWater(waterGlasses + 1)}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-sky-300"
              >
                +1 Glass (250ml)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Macro Targets & Meal Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Macro Breakdown Header */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Protein</span>
              <div className="text-xl font-black text-white font-mono mt-0.5">
                {proteinG}g
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                {Math.round((proteinG * 4 / targetCalories) * 100)}% of intake
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Complex Carbs</span>
              <div className="text-xl font-black text-white font-mono mt-0.5">
                {carbsG}g
              </div>
              <span className="text-[10px] text-amber-400 font-mono">
                {Math.round((carbsG * 4 / targetCalories) * 100)}% of intake
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Healthy Fats</span>
              <div className="text-xl font-black text-white font-mono mt-0.5">
                {fatsG}g
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">
                {Math.round((fatsG * 9 / targetCalories) * 100)}% of intake
              </span>
            </div>
          </div>

          {/* Meals Timeline */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="font-bold text-white text-base">Daily Nutrition Timeline</h3>
              <span className="text-xs font-mono text-amber-400">
                {meals.length} Scheduled Meals
              </span>
            </div>

            <div className="divide-y divide-zinc-800/60">
              {meals.map((meal, idx) => (
                <div key={idx} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-16 flex-shrink-0">
                      <span className="text-xs font-mono font-bold text-amber-400 block">
                        {meal.time}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium uppercase">
                        {meal.name}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {meal.foods}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 font-mono">
                    <span className="text-xs font-bold text-zinc-200 block">
                      {meal.calories} kcal
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      {meal.proteinG}g P
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GymForge Nutrition Rules (from study_topics.html) */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800/80 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GymForge Nutrition Iron Laws</span>
            </h4>
            <ul className="text-xs text-zinc-400 space-y-1.5 leading-relaxed">
              <li>• <b className="text-zinc-200">Protein with every meal:</b> Protects muscle tissue and boosts thermic effect of food.</li>
              <li>• <b className="text-zinc-200">Hydration target:</b> Aim for 3–4 litres of clean water daily; begin every meal with one tall glass.</li>
              <li>• <b className="text-zinc-200">Anabolic window:</b> Consume 25–30g rapid-digesting protein within 45 minutes post-workout for peak protein synthesis.</li>
              <li>• <b className="text-zinc-200">Consistency:</b> Meal prep on Sundays eliminates weekday takeout temptations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
