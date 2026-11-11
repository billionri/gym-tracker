import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Flame, Zap, 
  Sparkles, Music, Sliders, Plus, Disc, Radio, Check, RotateCcw 
} from 'lucide-react';
import { TrackItem, PlaylistPreset } from '../types/workout';
import { ALL_WORKOUT_TRACKS, WORKOUT_PLAYLIST_PRESETS } from '../data/playlists';
import { audioEngine } from '../services/audioPlayer';

interface PlaylistPlayerProps {
  currentTrack: TrackItem;
  setCurrentTrack: (track: TrackItem) => void;
  playlist: TrackItem[];
  setPlaylist: (tracks: TrackItem[]) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onStartWorkoutWithPlaylist?: () => void;
}

export const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({
  currentTrack,
  setCurrentTrack,
  playlist,
  setPlaylist,
  isPlaying,
  setIsPlaying,
  onStartWorkoutWithPlaylist,
}) => {
  const [bpm, setBpm] = useState<number>(currentTrack.bpm || 132);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  const [generatorWorkoutType, setGeneratorWorkoutType] = useState<string>('Chest & Push');
  const [generatorVibe, setGeneratorVibe] = useState<'Heavy Iron' | 'Cardio Rush' | 'Night Phonk' | 'High Energy'>('Heavy Iron');
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [customBpm, setCustomBpm] = useState(130);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sync BPM when track changes
  useEffect(() => {
    setBpm(currentTrack.bpm);
    if (isPlaying) {
      audioEngine.start(currentTrack.synthTheme, currentTrack.bpm);
    }
  }, [currentTrack]);

  // Audio Visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = audioEngine.getAnalyser();

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!analyser || !isPlaying) {
        // Draw idle wave bars
        const barCount = 32;
        const barWidth = canvas.width / barCount;
        for (let i = 0; i < barCount; i++) {
          const barHeight = 4 + Math.sin(Date.now() / 400 + i * 0.3) * 3;
          ctx.fillStyle = '#fdba74'; // orange-300
          ctx.fillRect(i * barWidth + 1, canvas.height - barHeight, barWidth - 2, barHeight);
        }
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = (canvas.width / 24);
      let x = 0;

      for (let i = 0; i < 24; i++) {
        const val = dataArray[i * 2] || 0;
        const percent = val / 255;
        const barHeight = Math.max(4, percent * canvas.height * 0.88);

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#10b981'); // emerald
        gradient.addColorStop(0.6, '#f97316'); // orange
        gradient.addColorStop(1, '#ea580c');

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, canvas.height - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.start(currentTrack.synthTheme, bpm);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    setCurrentTrack(nextTrack);
    if (isPlaying) {
      audioEngine.start(nextTrack.synthTheme, nextTrack.bpm);
    }
  };

  const handlePrev = () => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const prevTrack = playlist[prevIndex];
    setCurrentTrack(prevTrack);
    if (isPlaying) {
      audioEngine.start(prevTrack.synthTheme, prevTrack.bpm);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    audioEngine.setBpm(newBpm);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleLoadPreset = (preset: PlaylistPreset) => {
    setPlaylist(preset.tracks);
    setCurrentTrack(preset.tracks[0]);
    setBpm(preset.tracks[0].bpm);
    if (isPlaying) {
      audioEngine.start(preset.tracks[0].synthTheme, preset.tracks[0].bpm);
    }
  };

  const handleGenerateTodayPlaylist = () => {
    let selected: TrackItem[] = [];

    if (generatorVibe === 'Heavy Iron') {
      selected = [
        ALL_WORKOUT_TRACKS[1],
        ALL_WORKOUT_TRACKS[5],
        ALL_WORKOUT_TRACKS[0],
        ALL_WORKOUT_TRACKS[3],
        ALL_WORKOUT_TRACKS[4],
      ];
    } else if (generatorVibe === 'Cardio Rush') {
      selected = [
        ALL_WORKOUT_TRACKS[2],
        ALL_WORKOUT_TRACKS[6],
        ALL_WORKOUT_TRACKS[0],
        ALL_WORKOUT_TRACKS[4],
      ];
    } else if (generatorVibe === 'Night Phonk') {
      selected = [
        ALL_WORKOUT_TRACKS[0],
        ALL_WORKOUT_TRACKS[3],
        ALL_WORKOUT_TRACKS[7],
        ALL_WORKOUT_TRACKS[1],
      ];
    } else {
      selected = [...ALL_WORKOUT_TRACKS].sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    setPlaylist(selected);
    setCurrentTrack(selected[0]);
    setBpm(selected[0].bpm);
    setShowGenerator(false);

    if (isPlaying) {
      audioEngine.start(selected[0].synthTheme, selected[0].bpm);
    }
  };

  const handleAddCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;
    const newTrack: TrackItem = {
      id: 'custom-' + Date.now(),
      title: customTitle,
      artist: customArtist || 'Custom Gym Track',
      genre: 'Phonk',
      bpm: customBpm,
      vibe: 'High Energy',
      durationSeconds: 200,
      synthTheme: 'phonk',
    };
    setPlaylist([...playlist, newTrack]);
    setCustomTitle('');
    setCustomArtist('');
    setShowAddCustomModal(false);
  };

  return (
    <div className="space-y-6 text-zinc-900">
      {/* Top Banner - Orange Div with Green Action Buttons */}
      <div className="relative overflow-hidden rounded-2xl bg-orange-50 border-2 border-orange-300 p-6 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-orange-200 border border-orange-300 text-orange-800">
                <Music className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-orange-800 uppercase font-mono">
                Dynamic Audio Engine
              </span>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
              Workout Audio Forge
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-xl">
              Synthesized real-time electronic gym beats with adaptive BPM tempo control, rest chimes, and instant daily workout playlist generation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowGenerator(!showGenerator)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Make Playlist for Today</span>
            </button>
            {onStartWorkoutWithPlaylist && (
              <button
                onClick={onStartWorkoutWithPlaylist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-orange-100 text-orange-950 font-bold text-sm border-2 border-orange-300 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Start Workout Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Generator Accordion / Panel - Orange Div with Green Button */}
      {showGenerator && (
        <div className="rounded-2xl bg-orange-100/90 border-2 border-orange-400 p-5 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-orange-200 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-zinc-900 text-base">Generate Today's Workout Playlist</h3>
            </div>
            <button
              onClick={() => setShowGenerator(false)}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1.5 uppercase tracking-wider">
                1. Select Today's Workout Focus
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Chest & Push', 'Heavy Back & Pull', 'Legs & Quads', 'Cardio & HIIT'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGeneratorWorkoutType(type)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border-2 text-left transition-all cursor-pointer ${
                      generatorWorkoutType === type
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-orange-200 text-zinc-700 hover:border-orange-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-950 mb-1.5 uppercase tracking-wider">
                2. Select Audio Vibe & Tempo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Heavy Iron', desc: '135+ BPM • Metal & Bass' },
                  { id: 'Cardio Rush', desc: '145+ BPM • High Cadence' },
                  { id: 'Night Phonk', desc: '128 BPM • Drift & Trap' },
                  { id: 'High Energy', desc: '132 BPM • Full Synth' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGeneratorVibe(item.id as any)}
                    className={`p-2.5 rounded-xl text-left border-2 transition-all cursor-pointer ${
                      generatorVibe === item.id
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-orange-200 text-zinc-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="font-semibold text-xs">{item.id}</div>
                    <div className={`text-[10px] ${generatorVibe === item.id ? 'text-emerald-100' : 'text-zinc-500'}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-orange-200">
            <button
              onClick={handleGenerateTodayPlaylist}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              Build & Queue Playlist
            </button>
          </div>
        </div>
      )}

      {/* Main Interactive Music Player Deck - Orange Div with Green Play Button */}
      <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Track Info & Visualizer */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl bg-orange-500 p-0.5 shadow-md shadow-orange-500/30 flex-shrink-0">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                  <Disc className={`w-10 h-10 text-orange-600 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                </div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-orange-900 border border-orange-300">
                    {currentTrack.genre}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-600 font-bold">
                    {bpm} BPM
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 truncate mt-1">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-zinc-600 truncate">
                  {currentTrack.artist} • <span className="text-orange-700 font-bold">{currentTrack.vibe}</span>
                </p>
              </div>
            </div>

            {/* Audio Wave Visualizer */}
            <div className="bg-white rounded-xl p-2.5 border-2 border-orange-200">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mb-1.5 px-1">
                <span>SYNTH SPECTRUM</span>
                <span className={isPlaying ? 'text-emerald-700 font-bold' : ''}>
                  {isPlaying ? 'ACTIVE FREQUENCY' : 'STANDBY'}
                </span>
              </div>
              <canvas
                ref={canvasRef}
                width={320}
                height={48}
                className="w-full h-12 rounded"
              />
            </div>
          </div>

          {/* Center: Playback Controls - Green Play Button */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white hover:bg-orange-100 text-zinc-700 border border-orange-200 flex items-center justify-center transition-colors cursor-pointer"
                title="Previous track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white ml-1" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white hover:bg-orange-100 text-zinc-700 border border-orange-200 flex items-center justify-center transition-colors cursor-pointer"
                title="Next track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Live BPM Slider (Tempo control) */}
            <div className="w-full max-w-xs bg-white rounded-xl p-2.5 border-2 border-orange-200">
              <div className="flex items-center justify-between text-xs text-zinc-800 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Sliders className="w-3.5 h-3.5 text-orange-600" />
                  Cadence Speed
                </span>
                <span className="font-mono text-orange-700 font-black">{bpm} BPM</span>
              </div>
              <input
                type="range"
                min={90}
                max={175}
                value={bpm}
                onChange={(e) => handleBpmChange(Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-orange-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>90 (Warmup)</span>
                <span>132 (Lifting)</span>
                <span>175 (Max Sprint)</span>
              </div>
            </div>
          </div>

          {/* Right: Volume & Preset Shortcuts */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            {/* Volume Control */}
            <div className="bg-white rounded-xl p-3 border-2 border-orange-200">
              <div className="flex items-center justify-between text-xs text-zinc-700 mb-1.5">
                <span className="font-bold text-zinc-900">Volume</span>
                <span className="font-mono font-bold text-orange-700">{Math.round(volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-orange-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Playlist Switcher */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-orange-950 uppercase tracking-wider px-1">
                Curated Gym Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {WORKOUT_PLAYLIST_PRESETS.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleLoadPreset(p)}
                    className="p-2 rounded-lg bg-white hover:bg-orange-100 border border-orange-200 text-left transition-all cursor-pointer"
                  >
                    <div className="font-bold text-[11px] text-zinc-900 truncate">
                      {p.name.replace("Today's ", "")}
                    </div>
                    <div className="text-[9px] text-zinc-500 truncate">
                      {p.tracks.length} tracks • {p.targetWorkout}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Track Queue - Orange Div with Green Button */}
      <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-orange-200">
          <div>
            <h3 className="font-bold text-zinc-900 text-base">Active Workout Tracklist</h3>
            <p className="text-xs text-zinc-500">
              {playlist.length} track{playlist.length > 1 ? 's' : ''} queued for your session
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddCustomModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Track</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-orange-100 mt-2 bg-white rounded-xl border border-orange-200">
          {playlist.map((track, idx) => {
            const isCurrent = track.id === currentTrack.id;
            return (
              <div
                key={track.id + '-' + idx}
                onClick={() => {
                  setCurrentTrack(track);
                  if (isPlaying) {
                    audioEngine.start(track.synthTheme, track.bpm);
                  }
                }}
                className={`flex items-center justify-between p-3 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-orange-100/70 border-l-4 border-l-orange-500'
                    : 'hover:bg-orange-50/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 text-center font-mono text-xs text-zinc-400">
                    {isCurrent && isPlaying ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-ping" />
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm truncate ${isCurrent ? 'text-orange-900' : 'text-zinc-900'}`}>
                        {track.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                          PLAYING
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                      {track.artist}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-900 border border-orange-200">
                    {track.genre}
                  </span>
                  <span className="font-mono text-xs text-orange-800 font-bold">
                    {track.bpm} BPM
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {Math.floor(track.durationSeconds / 60)}:
                    {(track.durationSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Track Modal */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-orange-300 rounded-2xl p-6 max-w-md w-full shadow-2xl text-zinc-900">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Add Track to Workout Playlist</h3>
            <form onSubmit={handleAddCustomTrack} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Track Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Iron Will"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-orange-50/50 border border-orange-300 rounded-xl px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Artist / Source</label>
                <input
                  type="text"
                  placeholder="e.g. Gym Sound Lab"
                  value={customArtist}
                  onChange={(e) => setCustomArtist(e.target.value)}
                  className="w-full bg-orange-50/50 border border-orange-300 rounded-xl px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Cadence BPM: {customBpm}</label>
                <input
                  type="range"
                  min={100}
                  max={170}
                  value={customBpm}
                  onChange={(e) => setCustomBpm(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-orange-100 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
                >
                  Add Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
