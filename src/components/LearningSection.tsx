import React, { useState } from 'react';
import { 
  BookOpen, Activity, Flame, Shield, Heart, Zap, Sparkles, 
  ChevronRight, ZoomIn, X, Info, Droplets, Wind, Scale, Check 
} from 'lucide-react';

export const LearningSection: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<'anatomy' | 'bmr' | 'bmi' | 'bodyfat' | 'protein' | 'fat_types' | 'recovery'>('anatomy');
  const [isMapZoomed, setIsMapZoomed] = useState(false);

  // BMR calculator state
  const [bmrAge, setBmrAge] = useState(25);
  const [bmrWeight, setBmrWeight] = useState(81);
  const [bmrHeight, setBmrHeight] = useState(178);
  const [bmrGender, setBmrGender] = useState<'male' | 'female'>('male');
  const [bmrActivity, setBmrActivity] = useState(1.55); // moderate exercise

  // BMI calculator state
  const [bmiWeight, setBmiWeight] = useState(81);
  const [bmiHeight, setBmiHeight] = useState(178);
  const [bmiWaist, setBmiWaist] = useState(82);

  // Body Fat & LBM state
  const [bfPercent, setBfPercent] = useState(16);
  const [bfWeight, setBfWeight] = useState(81);

  // Box Breathing Recovery state
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathCounter, setBreathCounter] = useState(4);

  // BMR Calculation (Mifflin-St Jeor)
  const calcBmrValue = () => {
    let bmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge;
    bmr += bmrGender === 'male' ? 5 : -161;
    const tdee = Math.round(bmr * bmrActivity);
    return { bmr: Math.round(bmr), tdee, cut: tdee - 400, bulk: tdee + 350 };
  };

  // BMI Calculation
  const calcBmiValue = () => {
    const heightM = bmiHeight / 100;
    const bmi = +(bmiWeight / (heightM * heightM)).toFixed(1);
    const whtr = +(bmiWaist / bmiHeight).toFixed(2); // Waist-to-Height Ratio
    let status = 'Normal';
    let color = 'text-emerald-400';
    if (bmi < 18.5) { status = 'Underweight'; color = 'text-sky-400'; }
    else if (bmi < 25) { status = 'Normal Weight'; color = 'text-emerald-400'; }
    else if (bmi < 30) { status = 'Overweight'; color = 'text-amber-400'; }
    else { status = 'Obese'; color = 'text-red-400'; }
    return { bmi, whtr, status, color };
  };

  // LBM Calculation
  const calcLbmValue = () => {
    const fatMassKg = +(bfWeight * (bfPercent / 100)).toFixed(1);
    const leanMassKg = +(bfWeight - fatMassKg).toFixed(1);
    return { fatMassKg, leanMassKg };
  };

  // Box Breathing cycle timer
  React.useEffect(() => {
    let timer: number | null = null;
    if (isBreathingActive) {
      timer = window.setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            setBreathPhase((cur) => {
              if (cur === 'Inhale') return 'Hold';
              if (cur === 'Hold') return 'Exhale';
              if (cur === 'Exhale') return 'Pause';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBreathingActive]);

  const bmrRes = calcBmrValue();
  const bmiRes = calcBmiValue();
  const lbmRes = calcLbmValue();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-amber-400 uppercase font-mono">
                GymForge Study Topics & Knowledge Vault
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Anatomy, Physiology & Athletic Science
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Original GymForge reference guide: Human body muscle anatomy map, TDEE, Body Composition, and Nervous System Recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Pills for Topics */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'anatomy', label: 'Anatomy Muscle Map', icon: Activity },
          { id: 'bmr', label: 'BMR & TDEE Metabolism', icon: Flame },
          { id: 'bmi', label: 'BMI & Waist Ratio', icon: Scale },
          { id: 'bodyfat', label: 'Body Fat % & LBM', icon: Zap },
          { id: 'fat_types', label: 'Subcutaneous vs Visceral', icon: Shield },
          { id: 'protein', label: 'Protein Science', icon: Sparkles },
          { id: 'recovery', label: 'Recovery & Breathing', icon: Wind },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOPIC 1: Human Anatomy Muscle Map (from study_topics.html) */}
      {activeTopic === 'anatomy' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  Anatomy Reference
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  Human Body Muscular Architecture
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  High-definition anatomical illustration mapping anterior and posterior muscle chains from GymForge.
                </p>
              </div>

              <button
                onClick={() => setIsMapZoomed(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700"
              >
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Zoom Anatomy Map</span>
              </button>
            </div>

            {/* Muscle Map Image from gym-tracker.infinityfreeapp.com */}
            <div
              onClick={() => setIsMapZoomed(true)}
              className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-zoom-in group max-h-[500px] flex items-center justify-center p-2"
            >
              <img
                src="https://gym-tracker.infinityfreeapp.com/images/Gym_the-muscles-of-the-human-body-with-their-names-on-a-gray-background-image-vector.jpg"
                alt="Human Muscle Anatomy"
                className="max-h-[480px] w-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
                onError={(e) => {
                  // Fallback to high quality anatomical diagram if infinityfree blocks hotlinking
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80";
                }}
              />
              <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5">
                <ZoomIn className="w-3 h-3 text-amber-400" />
                <span>Click to Fullscreen</span>
              </span>
            </div>

            {/* Muscle Group Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[
                {
                  group: 'Pectoralis Major & Minor (Chest)',
                  desc: 'Adducts and flexes the humerus across the thorax.',
                  exercises: 'Bench Press, Incline Dumbbell Press, Cable Flyes',
                  cue: 'Retract scapula into bench and lead with elbows.',
                },
                {
                  group: 'Latissimus Dorsi & Rhomboids (Back)',
                  desc: 'Draws arms downward and stabilizes the spine.',
                  exercises: 'Wide Grip Pull-Ups, Barbell Deadlift, Bent-Over Rows',
                  cue: 'Pull elbows into back pockets; do not heave with lower back.',
                },
                {
                  group: 'Quadriceps Femoris (Front Thighs)',
                  desc: 'Extends knees and drives vertical pressing power.',
                  exercises: 'Barbell Back Squat, Leg Press, Goblet Squat',
                  cue: 'Drive feet into floor; track knees directly over toes.',
                },
                {
                  group: 'Deltoids & Trapezius (Shoulders)',
                  desc: 'Rotates and lifts humerus vertically and overhead.',
                  exercises: 'Overhead Press, Dumbbell Lateral Raise, Shrugs',
                  cue: 'Keep core tight and elevate straight up without shrugging necks.',
                },
                {
                  group: 'Biceps & Triceps (Arms)',
                  desc: 'Flexes and extends the elbow joint under tension.',
                  exercises: 'Spider Curl, EZ-Bar Preacher Curl, Rope Pushdowns',
                  cue: 'Lock elbows in space to isolate the target arm head.',
                },
                {
                  group: 'Rectus Abdominis & Obliques (Core)',
                  desc: 'Resists spinal extension and provides anti-rotational stability.',
                  exercises: 'Plank, Hanging Leg Raise, Cable Woodchoppers',
                  cue: 'Posterior pelvic tilt; pull navel inward to engage deep transverse abs.',
                },
              ].map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <h4 className="font-bold text-sm text-amber-400">{m.group}</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{m.desc}</p>
                  <div className="mt-2.5 pt-2 border-t border-zinc-800/80 text-[11px] space-y-1">
                    <div>
                      <span className="text-zinc-500 font-semibold">Key Lifts: </span>
                      <span className="text-zinc-300">{m.exercises}</span>
                    </div>
                    <div>
                      <span className="text-amber-500 font-semibold">Iron Form: </span>
                      <span className="text-zinc-400">{m.cue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 2: BMR & TDEE Metabolism Calculator */}
      {activeTopic === 'bmr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          <div className="lg:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg space-y-4">
            <h3 className="font-bold text-white text-base">Mifflin-St Jeor BMR Calculator</h3>
            <p className="text-xs text-zinc-400">
              Basal Metabolic Rate is the baseline energy expenditure your body burns strictly at rest.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBmrGender('male')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      bmrGender === 'male' ? 'bg-amber-500 text-zinc-950 border-amber-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Male (Beast)
                  </button>
                  <button
                    onClick={() => setBmrGender('female')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      bmrGender === 'female' ? 'bg-amber-500 text-zinc-950 border-amber-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Female (Queen)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Age</label>
                  <input
                    type="number"
                    value={bmrAge}
                    onChange={(e) => setBmrAge(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={bmrWeight}
                    onChange={(e) => setBmrWeight(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={bmrHeight}
                    onChange={(e) => setBmrHeight(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Weekly Activity Level</label>
                <select
                  value={bmrActivity}
                  onChange={(e) => setBmrActivity(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white"
                >
                  <option value={1.2}>Sedentary (desk job, no training)</option>
                  <option value={1.375}>Light Active (1-3 gym days/wk)</option>
                  <option value={1.55}>Moderate Active (3-5 heavy gym days/wk)</option>
                  <option value={1.725}>Very Active (6-7 intense gym days/wk)</option>
                  <option value={1.9}>Extreme Athlete (2x daily sessions)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Resting BMR</span>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {bmrRes.bmr} <span className="text-xs text-zinc-500">kcal/day</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Basic coma survival expenditure.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-amber-500/40">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Total Daily TDEE</span>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {bmrRes.tdee} <span className="text-xs text-zinc-400">kcal/day</span>
                </div>
                <p className="text-[11px] text-zinc-300 mt-1">Maintenance energy target.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Caloric Strategy Targets</h4>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-400">Fat Loss Deficit (Cut)</span>
                    <p className="text-[10px] text-zinc-400">~0.4 kg/week fat burn without muscle wasting</p>
                  </div>
                  <span className="font-mono text-base font-bold text-white">{bmrRes.cut} kcal</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-400">Hypertrophy Surplus (Lean Bulk)</span>
                    <p className="text-[10px] text-zinc-400">Optimal rate for progressive muscular overload</p>
                  </div>
                  <span className="font-mono text-base font-bold text-white">{bmrRes.bulk} kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 3: BMI & Obesity Rating */}
      {activeTopic === 'bmi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          <div className="lg:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg space-y-4">
            <h3 className="font-bold text-white text-base">BMI & Waist Ratio Analysis</h3>
            <p className="text-xs text-zinc-400">
              Combines Body Mass Index with Waist-to-Height Ratio (WHtR) for lifters who carry dense muscle tissue.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Waist Circumference (cm)</label>
                <input
                  type="number"
                  value={bmiWaist}
                  onChange={(e) => setBmiWaist(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500">BMI Score</span>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  {bmiRes.bmi}
                </div>
                <span className={`text-xs font-bold mt-1 block ${bmiRes.color}`}>{bmiRes.status}</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Waist / Height (WHtR)</span>
                <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                  {bmiRes.whtr}
                </div>
                <span className="text-xs text-zinc-300 mt-1 block">
                  {bmiRes.whtr <= 0.5 ? '✓ Ideal Cardiovascular Profile' : '⚠️ Elevated Central Adiposity'}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Iron Lifter Caution Note</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                BMI does not distinguish between dense skeletal muscle and adiposity. If your waist circumference is under half your height (WHtR &lt; 0.5), higher BMI typically represents lean muscular development.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 4: Body Fat % & LBM */}
      {activeTopic === 'bodyfat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          <div className="lg:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg space-y-4">
            <h3 className="font-bold text-white text-base">Body Fat % to Lean Mass Calculator</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  value={bfWeight}
                  onChange={(e) => setBfWeight(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Body Fat Percentage (%)</label>
                <input
                  type="number"
                  value={bfPercent}
                  onChange={(e) => setBfPercent(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-emerald-500/30">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Lean Body Mass (LBM)</span>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  {lbmRes.leanMassKg} <span className="text-sm font-medium text-zinc-500">kg</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Muscle, organs, bones & blood volume.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Total Adipose Mass</span>
                <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                  {lbmRes.fatMassKg} <span className="text-sm font-medium text-zinc-500">kg</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Subcutaneous & visceral fat stores.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 5: Subcutaneous vs Visceral Fat */}
      {activeTopic === 'fat_types' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Adipose Tissue Science</span>
            <h3 className="text-xl font-black text-white mt-0.5">Subcutaneous Fat vs Visceral Fat</h3>
            <p className="text-xs text-zinc-400 mt-1">From the GymForge Clinical Guide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <span>Subcutaneous Fat (Pinchable)</span>
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Stored immediately under your dermis. This is the soft fat on thighs, lower abdomen, and arms that you can pinch between your fingers. It serves as thermal insulation and long-term caloric buffer.
              </p>
              <div className="text-xs text-emerald-400 pt-1 font-mono">
                Healthy range: 80–90% of total bodily fat
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/40 space-y-2">
              <h4 className="font-bold text-amber-400 text-base flex items-center gap-2">
                <span>Visceral Fat (Deep Organ Fat)</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Stored deep within the abdominal cavity wrapping vital organs (liver, pancreas, intestines). High levels cause systemic inflammation, insulin resistance, and cardiovascular strain.
              </p>
              <div className="text-xs text-amber-400 pt-1 font-mono">
                Optimal level: &lt; 10% of total fat mass
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 6: Protein Science */}
      {activeTopic === 'protein' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Nutritional Physiology</span>
            <h3 className="text-xl font-black text-white mt-0.5">Optimal Protein Intake Targets</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-xs font-bold text-white block">Hypertrophy & Heavy Lifts</span>
              <span className="text-xl font-black text-amber-400 font-mono mt-1 block">1.8 – 2.2 g/kg</span>
              <p className="text-[11px] text-zinc-400 mt-1">Maximizes muscle protein synthesis and minimizes DOMS soreness.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-xs font-bold text-white block">Aggressive Caloric Deficit</span>
              <span className="text-xl font-black text-cyan-400 font-mono mt-1 block">2.2 – 2.5 g/kg</span>
              <p className="text-[11px] text-zinc-400 mt-1">Prevents lean tissue breakdown during cutting phases.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-xs font-bold text-white block">Per-Meal Distribution</span>
              <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">30 – 45 g / meal</span>
              <p className="text-[11px] text-zinc-400 mt-1">Triggers the ~3g leucine threshold needed to initiate mTOR signaling.</p>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 7: Recovery & Box Breathing (from study_topics.html) */}
      {activeTopic === 'recovery' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Post-Workout Parasympathetic Reset</span>
              <h3 className="text-xl font-black text-white mt-0.5">Box Breathing (4-4-4-4) Protocol</h3>
              <p className="text-xs text-zinc-400 mt-1">Used by Navy SEALs and elite powerlifters to lower cortisol and accelerate recovery.</p>
            </div>

            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isBreathingActive
                  ? 'bg-red-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              {isBreathingActive ? 'Stop Breathing Session' : 'Start 4-Minute Session'}
            </button>
          </div>

          {/* Visual Breathing Circle */}
          <div className="py-8 flex flex-col items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800/80">
            <div
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 border-amber-400 bg-amber-500/10'
                  : breathPhase === 'Hold'
                  ? 'scale-110 border-orange-500 bg-orange-500/15'
                  : breathPhase === 'Exhale'
                  ? 'scale-90 border-sky-400 bg-sky-500/10'
                  : 'scale-90 border-zinc-700 bg-zinc-900'
              }`}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">{breathPhase}</span>
              <span className="text-4xl font-black text-white font-mono mt-1">{breathCounter}</span>
            </div>

            <p className="text-xs text-zinc-500 font-mono mt-4">
              Inhale 4s • Hold 4s • Exhale 4s • Pause 4s
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen Modal for Muscle Map */}
      {isMapZoomed && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-2">
              <h3 className="font-bold text-white text-base">Human Body Muscular Anatomy Reference</h3>
              <button
                onClick={() => setIsMapZoomed(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center">
              <img
                src="https://gym-tracker.infinityfreeapp.com/images/Gym_the-muscles-of-the-human-body-with-their-names-on-a-gray-background-image-vector.jpg"
                alt="Human Muscle Anatomy Full"
                className="max-h-[80vh] w-auto object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
