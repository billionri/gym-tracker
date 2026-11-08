/**
 * GymForge Audio Engine
 * Uses Web Audio API for interactive gym music generation and workout cues.
 */

class GymAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.7;
  private bpm = 130;
  private theme: string = 'phonk';
  private timerId: number | null = null;
  private currentStep = 0;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  private onStepListeners: ((step: number) => void)[] = [];

  constructor() {
    // Lazily init AudioContext upon user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setBpm(val: number) {
    this.bpm = Math.max(90, Math.min(180, val));
    if (this.isPlaying) {
      this.restartLoop();
    }
  }

  public getBpm(): number {
    return this.bpm;
  }

  public start(theme: string = 'phonk', bpm: number = 130) {
    this.initContext();
    this.theme = theme;
    this.bpm = bpm;
    this.isPlaying = true;
    this.currentStep = 0;
    this.startLoop();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private restartLoop() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.startLoop();
  }

  private startLoop() {
    if (!this.isPlaying) return;
    const intervalMs = (60 / this.bpm / 4) * 1000; // 16th notes
    this.timerId = window.setInterval(() => {
      this.step();
    }, intervalMs);
  }

  private step() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const step = this.currentStep % 16;
    const time = this.ctx.currentTime;

    // Trigger percussion according to workout beat pattern
    // Kick drum on 0, 4, 8, 12 (4-on-the-floor driving gym energy)
    if (step % 4 === 0) {
      this.playKick(time);
    }

    // Snare / Clack on 4, 12
    if (step === 4 || step === 12) {
      this.playSnare(time);
    }

    // Hi-hats on 2, 6, 10, 14 or 16th rolling for trap/phonk
    if (this.theme === 'trap' || this.theme === 'phonk') {
      if (step % 2 === 0 || (step % 4 === 3 && step > 8)) {
        this.playHiHat(time, step % 4 === 0);
      }
    } else {
      if (step % 2 === 0) {
        this.playHiHat(time, step % 4 === 2);
      }
    }

    // Bassline & Synth melody depending on theme
    this.playBassOrLead(step, time);

    this.onStepListeners.forEach((cb) => cb(step));
    this.currentStep++;
  }

  private playKick(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.23);
  }

  private playSnare(time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Noise buffer for snap
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.15);

    // Tone body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.08);

    oscGain.gain.setValueAtTime(0.4, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.09);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  private playHiHat(time: number, isOpen: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * (isOpen ? 0.08 : 0.03);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 7500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isOpen ? 0.35 : 0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + (isOpen ? 0.08 : 0.03));

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(time);
    source.stop(time + (isOpen ? 0.08 : 0.03));
  }

  private playBassOrLead(step: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Root notes based on workout vibe
    const baseFreqs: Record<string, number[]> = {
      phonk: [110, 110, 130.81, 146.83, 110, 164.81, 146.83, 130.81], // A2 minor grit
      bass: [55, 55, 65.41, 73.42, 55, 82.41, 73.42, 65.41],         // Sub 808
      electro: [130.81, 146.83, 164.81, 196.00, 220.00, 196.00, 164.81, 146.83],
      metal: [82.41, 82.41, 98.00, 110.00, 82.41, 123.47, 110.00, 98.00], // E low chug
      synthwave: [130.81, 130.81, 174.61, 174.61, 196.00, 196.00, 164.81, 146.83],
      trap: [65.41, 65.41, 87.31, 87.31, 98.00, 73.42, 65.41, 55.00],
    };

    const freqs = baseFreqs[this.theme] || baseFreqs.phonk;
    const freq = freqs[(step >> 1) % freqs.length];

    if (step % 2 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      if (this.theme === 'metal' || this.theme === 'phonk') {
        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, time);
      } else if (this.theme === 'bass' || this.theme === 'trap') {
        osc.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, time);
      } else {
        osc.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, time);
      }

      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.17);
    }
  }

  // Audio Cue for Rest Timer Beep
  public playRestBeep(isFinal: boolean = false) {
    this.initContext();
    if (!this.ctx) return;
    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isFinal ? 880 : 440, time);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isFinal ? 0.35 : 0.15));

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + (isFinal ? 0.36 : 0.16));
  }

  // Fanfare celebratory chime when finishing workout
  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    const chordNotes = [523.25, 659.25, 783.99, 1046.50]; // C Major
    chordNotes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const time = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.61);
    });
  }

  public subscribeStep(callback: (step: number) => void) {
    this.onStepListeners.push(callback);
    return () => {
      this.onStepListeners = this.onStepListeners.filter((cb) => cb !== callback);
    };
  }
}

export const audioEngine = new GymAudioEngine();
