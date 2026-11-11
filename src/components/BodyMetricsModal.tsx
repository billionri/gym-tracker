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
    <div className="space-y-6 text-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-orange-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-800 uppercase tracking-widest px-2.5 py-0.5 rounded-lg bg-orange-100 border border-orange-300">
              Physique Analytics
            </span>
          </div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Body Measurements & Composition
          </h2>
          <p className="text-sm text-zinc-600 mt-0.5">
            Original GymForge metric logs: Weight, Body Fat %, Chest, Waist, Arms, and Thighs.
          </p>
        </div>

        <button
          onClick={() => setShowLogForm(!showLogForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Measurements</span>
        </button>
      </div>

      {/* Log Form Accordion - Orange Div with Green Button */}
      {showLogForm && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl bg-orange-50 border-2 border-orange-300 p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-orange-200">
            <h3 className="font-bold text-zinc-900 text-base">New Body Measurement Entry</h3>
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1">
                Body Weight ({unit.toUpperCase()})
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1">
                Body Fat % (optional)
              </label>
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(Number(e.target.value))}
                className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1">
                Chest (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={chest}
                onChange={(e) => setChest(Number(e.target.value))}
                className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1">
                Waist (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1">
                Arms (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={arms}
                onChange={(e) => setArms(Number(e.target.value))}
                className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1">
                Thighs (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={thighs}
                onChange={(e) => setThighs(Number(e.target.value))}
                className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-orange-200">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
            >
              Save Measurements
            </button>
          </div>
        </form>
      )}

      {/* Metric Cards Overview - Orange Divs */}
      {latest && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Weight</span>
            <div className="text-xl font-black text-zinc-900 font-mono mt-1">
              {displayWeight(latest.weightKg)}
            </div>
            {weightDiff !== 0 && (
              <span className={`text-[10px] font-mono flex items-center gap-0.5 mt-1 font-bold ${weightDiff < 0 ? 'text-emerald-700' : 'text-orange-700'}`}>
                {weightDiff < 0 ? '▼' : '▲'} {Math.abs(weightDiff).toFixed(1)} kg trend
              </span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Body Fat</span>
            <div className="text-xl font-black text-orange-700 font-mono mt-1">
              {latest.bodyFatPercent ? `${latest.bodyFatPercent}%` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Chest</span>
            <div className="text-xl font-black text-zinc-900 font-mono mt-1">
              {latest.chestCm ? `${latest.chestCm} cm` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Waist</span>
            <div className="text-xl font-black text-zinc-900 font-mono mt-1">
              {latest.waistCm ? `${latest.waistCm} cm` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Arms</span>
            <div className="text-xl font-black text-zinc-900 font-mono mt-1">
              {latest.armsCm ? `${latest.armsCm} cm` : '--'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-2xs">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Thighs</span>
            <div className="text-xl font-black text-zinc-900 font-mono mt-1">
              {latest.thighsCm ? `${latest.thighsCm} cm` : '--'}
            </div>
          </div>
        </div>
      )}

      {/* History Log Table - Orange Div Container */}
      <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-5 shadow-sm">
        <h3 className="font-bold text-zinc-900 text-base mb-3">Measurement History</h3>
        <div className="overflow-x-auto bg-white rounded-xl border border-orange-200">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="text-[11px] font-mono text-zinc-500 uppercase border-b border-orange-200 pb-2 bg-orange-100/50">
                <th className="py-2.5 px-3">DATE</th>
                <th className="py-2.5 px-3">WEIGHT</th>
                <th className="py-2.5 px-3">BODY FAT</th>
                <th className="py-2.5 px-3">CHEST</th>
                <th className="py-2.5 px-3">WAIST</th>
                <th className="py-2.5 px-3">ARMS</th>
                <th className="py-2.5 px-3">THIGHS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 font-mono text-xs">
              {measurements.map((m) => (
                <tr key={m.id} className="hover:bg-orange-50/60 transition-colors">
                  <td className="py-3 px-3 text-zinc-600">{m.date}</td>
                  <td className="py-3 px-3 font-bold text-zinc-900">{displayWeight(m.weightKg)}</td>
                  <td className="py-3 px-3 text-orange-700 font-bold">{m.bodyFatPercent ? `${m.bodyFatPercent}%` : '--'}</td>
                  <td className="py-3 px-3 text-zinc-700">{m.chestCm ? `${m.chestCm} cm` : '--'}</td>
                  <td className="py-3 px-3 text-zinc-700">{m.waistCm ? `${m.waistCm} cm` : '--'}</td>
                  <td className="py-3 px-3 text-zinc-700">{m.armsCm ? `${m.armsCm} cm` : '--'}</td>
                  <td className="py-3 px-3 text-zinc-700">{m.thighsCm ? `${m.thighsCm} cm` : '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
