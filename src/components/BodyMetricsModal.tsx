import React, { useState } from 'react';
import { Activity, Plus, TrendingDown, Scale, Ruler, X, Check } from 'lucide-react';
import { BodyMeasurement } from '../types/workout';
import { storage } from '../services/storage';

interface BodyMetricsModalProps {
  measurements: BodyMeasurement[];
  setMeasurements: React.Dispatch<React.SetStateAction<BodyMeasurement[]>>;
  unit: 'kg' | 'lbs';
}

export const BodyMetricsModal: React.FC<BodyMetricsModalProps> = ({
  measurements,
  setMeasurements,
  unit,
}) => {
  const [showLogForm, setShowLogForm] = useState(false);
  const [weight, setWeight] = useState<number>(81.0);
  const [bodyFat, setBodyFat] = useState<number>(16.0);
  const [chest, setChest] = useState<number>(106);
  const [waist, setWaist] = useState<number>(81);
  const [arms, setArms] = useState<number>(39);
  const [thighs, setThighs] = useState<number>(61);

  const latest = measurements[0] || null;
  const previous = measurements[1] || null;

  const displayWeight = (kg: number) => {
    return unit === 'kg' ? `${kg.toFixed(1)} kg` : `${(kg * 2.20462).toFixed(1)} lbs`;
  };

  const weightDiff = latest && previous ? latest.weightKg - previous.weightKg : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeasurement: BodyMeasurement = {
      id: 'm-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      weightKg: weight,
      bodyFatPercent: bodyFat,
      chestCm: chest,
      waistCm: waist,
      armsCm: arms,
      thighsCm: thighs,
    };
    const updated = storage.saveMeasurement(newMeasurement);
    setMeasurements(updated);
    setShowLogForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Physique Analytics
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Body Measurements & Composition
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Original GymForge metric logs: Weight, Body Fat %, Chest, Waist, Arms, and Thighs.
          </p>
        </div>

        <button
          onClick={() => setShowLogForm(!showLogForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Measurements</span>
        </button>
      </div>

      {/* Log Form Accordion */}
      {showLogForm && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl bg-zinc-900 border border-amber-500/40 p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-white text-base">New Body Measurement Entry</h3>
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Body Weight ({unit.toUpperCase()})
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Body Fat % (optional)
              </label>
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Chest (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={chest}
                onChange={(e) => setChest(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Waist (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Arms (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={arms}
                onChange={(e) => setArms(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Thighs (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={thighs}
                onChange={(e) => setThighs(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
            >
              Save Measurements
            </button>
          </div>
        </form>
      )}

      {/* Metric Cards Overview */}
      {latest && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Weight</span>
            <div className="text-xl font-black text-white font-mono mt-1">
              {displayWeight(latest.weightKg)}
            </div>
            {weightDiff !== 0 && (
              <span className={`text-[10px] font-mono flex items-center gap-0.5 mt-1 ${weightDiff < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {weightDiff < 0 ? '▼' : '▲'} {Math.abs(weightDiff).toFixed(1)} kg trend
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Body Fat</span>
            <div className="text-xl font-black text-amber-400 font-mono mt-1">
              {latest.bodyFatPercent ? `${latest.bodyFatPercent}%` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Chest</span>
            <div className="text-xl font-black text-white font-mono mt-1">
              {latest.chestCm ? `${latest.chestCm} cm` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Waist</span>
            <div className="text-xl font-black text-white font-mono mt-1">
              {latest.waistCm ? `${latest.waistCm} cm` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Arms</span>
            <div className="text-xl font-black text-white font-mono mt-1">
              {latest.armsCm ? `${latest.armsCm} cm` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Thighs</span>
            <div className="text-xl font-black text-white font-mono mt-1">
              {latest.thighsCm ? `${latest.thighsCm} cm` : '--'}
            </div>
          </div>
        </div>
      )}

      {/* History Log Table */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg">
        <h3 className="font-bold text-white text-base mb-3">Measurement History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="text-[11px] font-mono text-zinc-500 uppercase border-b border-zinc-800 pb-2">
                <th className="pb-2">DATE</th>
                <th className="pb-2">WEIGHT</th>
                <th className="pb-2">BODY FAT</th>
                <th className="pb-2">CHEST</th>
                <th className="pb-2">WAIST</th>
                <th className="pb-2">ARMS</th>
                <th className="pb-2">THIGHS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 font-mono text-xs">
              {measurements.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 text-zinc-400">{m.date}</td>
                  <td className="py-3 font-bold text-white">{displayWeight(m.weightKg)}</td>
                  <td className="py-3 text-amber-400">{m.bodyFatPercent ? `${m.bodyFatPercent}%` : '--'}</td>
                  <td className="py-3 text-zinc-300">{m.chestCm ? `${m.chestCm} cm` : '--'}</td>
                  <td className="py-3 text-zinc-300">{m.waistCm ? `${m.waistCm} cm` : '--'}</td>
                  <td className="py-3 text-zinc-300">{m.armsCm ? `${m.armsCm} cm` : '--'}</td>
                  <td className="py-3 text-zinc-300">{m.thighsCm ? `${m.thighsCm} cm` : '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
