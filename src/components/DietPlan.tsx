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
    <div className="space-y-6 text-zinc-900">
      {/* Top Banner - Orange Div with Green Button */}
      <div className="relative overflow-hidden rounded-2xl bg-orange-50 border-2 border-orange-300 p-6 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-orange-200 border border-orange-300 text-orange-800">
                <Utensils className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-orange-800 uppercase font-mono">
                GymForge Nutrition Architecture
              </span>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
              Personalized Athlete Diet Plan
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-xl">
              Precision macro ratios, daily meal timeline, and hydration tracking directly from the GymForge Study Topics knowledge vault.
            </p>
          </div>

          {onNavigateToShop && (
            <button
              onClick={onNavigateToShop}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Diet Groceries</span>
            </button>
          )}
        </div>
      </div>

      {/* Plan Configuration Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Preferences & Goal Config (5 cols) - Orange Div */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-zinc-900 text-base">Plan Settings</h3>

            {/* Goal Toggle - Green Button when active */}
            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1.5 uppercase tracking-wider">
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
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      goal === g.id
                        ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white border-orange-200 text-zinc-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{g.label}</div>
                    <div className={`text-[10px] font-mono ${goal === g.id ? 'text-emerald-100' : 'text-zinc-500'}`}>{g.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Style - Green Button when active */}
            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1.5 uppercase tracking-wider">
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
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      dietaryPref === d.id
                        ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white border-orange-200 text-zinc-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{d.label}</div>
                    <div className={`text-[9px] truncate ${dietaryPref === d.id ? 'text-emerald-100' : 'text-zinc-500'}`}>{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Calorie Readout */}
            <div className="p-3.5 rounded-xl bg-white border-2 border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Daily Energy</span>
                <div className="text-xl font-black text-orange-700 font-mono">
                  {targetCalories} kcal
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-zinc-600">
                Body weight: <span className="text-zinc-900 font-bold">{weightKg} kg</span>
              </div>
            </div>
          </div>

          {/* Daily Hydration Glass Tracker - Orange Div with Green Button */}
          <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 border border-sky-300 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">Daily Hydration Log</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    {waterGlasses * 250} ml / 2,000 ml goal
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleUpdateWater(0)}
                className="text-[11px] text-zinc-500 hover:text-zinc-800 flex items-center gap-1 cursor-pointer font-medium"
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
                    className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isFilled
                        ? 'bg-sky-500 border-sky-600 text-white shadow-xs'
                        : 'bg-white border-orange-200 text-zinc-400 hover:border-orange-300'
                    }`}
                  >
                    <Droplets className={`w-4 h-4 ${isFilled ? 'fill-white' : ''}`} />
                    <span className="text-[9px] font-mono mt-1 font-bold">
                      {isFilled ? '250ml' : `G${idx + 1}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[11px] text-zinc-600 pt-1">
              <span className="font-medium">{waterGlasses >= 8 ? '✓ Optimum Hydration Reached!' : `${8 - waterGlasses} glasses remaining`}</span>
              <button
                onClick={() => handleUpdateWater(waterGlasses + 1)}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                +1 Glass (250ml)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Macro Targets & Meal Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Macro Breakdown Header - Orange Divs */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-orange-800 font-bold">Protein</span>
              <div className="text-xl font-black text-zinc-900 font-mono mt-0.5">
                {proteinG}g
              </div>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">
                {Math.round((proteinG * 4 / targetCalories) * 100)}% of intake
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-orange-800 font-bold">Complex Carbs</span>
              <div className="text-xl font-black text-zinc-900 font-mono mt-0.5">
                {carbsG}g
              </div>
              <span className="text-[10px] text-orange-700 font-mono font-bold">
                {Math.round((carbsG * 4 / targetCalories) * 100)}% of intake
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-orange-800 font-bold">Healthy Fats</span>
              <div className="text-xl font-black text-zinc-900 font-mono mt-0.5">
                {fatsG}g
              </div>
              <span className="text-[10px] text-sky-700 font-mono font-bold">
                {Math.round((fatsG * 9 / targetCalories) * 100)}% of intake
              </span>
            </div>
          </div>

          {/* Meals Timeline - Orange Div */}
          <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-orange-200">
              <h3 className="font-bold text-zinc-900 text-base">Daily Nutrition Timeline</h3>
              <span className="text-xs font-mono font-bold text-orange-800">
                {meals.length} Scheduled Meals
              </span>
            </div>

            <div className="divide-y divide-orange-200/70">
              {meals.map((meal, idx) => (
                <div key={idx} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-16 flex-shrink-0">
                      <span className="text-xs font-mono font-bold text-orange-800 block">
                        {meal.time}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">
                        {meal.name}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 leading-relaxed">
                        {meal.foods}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 font-mono">
                    <span className="text-xs font-bold text-zinc-800 block">
                      {meal.calories} kcal
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {meal.proteinG}g P
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GymForge Nutrition Rules - Orange Div */}
          <div className="rounded-2xl bg-orange-100/70 border-2 border-orange-300 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>GymForge Nutrition Iron Laws</span>
            </h4>
            <ul className="text-xs text-zinc-700 space-y-1.5 leading-relaxed">
              <li>• <b className="text-zinc-900">Protein with every meal:</b> Protects muscle tissue and boosts thermic effect of food.</li>
              <li>• <b className="text-zinc-900">Hydration target:</b> Aim for 3–4 litres of clean water daily; begin every meal with one tall glass.</li>
              <li>• <b className="text-zinc-900">Anabolic window:</b> Consume 25–30g rapid-digesting protein within 45 minutes post-workout for peak protein synthesis.</li>
              <li>• <b className="text-zinc-900">Consistency:</b> Meal prep on Sundays eliminates weekday takeout temptations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
