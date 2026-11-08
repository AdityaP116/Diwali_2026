// High-Fidelity Indian Classical Raga / Festive Music Synthesizer for DiwaliVerse
// Zero external mp3 dependencies, zero 404 broken links, zero loading lag, full Web Audio API synthesis.

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private scheduledInterval: number | null = null;
  private activeNoteOscs: OscillatorNode[] = [];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.musicGain) {
      const ctx = this.getContext();
      if (ctx) {
        this.musicGain.gain.setValueAtTime(
          muted ? 0 : 0.08,
          ctx.currentTime
        );
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --- Melodic Bamboo Flute (Bansuri) / Santoor Note Synthesizer ---
  private playFluteNote(freq: number, duration: number, time: number) {
    if (this.isMuted || !this.ctx || !this.musicGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine with slight triangle harmonics creates warm woody flute timbre
      osc.type = 'sine';
      // Graceful microtonal meend (slide) characteristic of Indian flute
      osc.frequency.setValueAtTime(freq * 0.98, time);
      osc.frequency.exponentialRampToValueAtTime(freq, time + 0.08);

      // Soft breath envelope
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.065, time + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      // Lowpass resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 2.2, time);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration);
      this.activeNoteOscs.push(osc);
    } catch {
      // Ignored
    }
  }

  // Play peaceful Santoor/Bell chime plucks
  private playSantoorPluck(freq: number, time: number) {
    if (this.isMuted || !this.ctx || !this.musicGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.045, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 1.2);
      this.activeNoteOscs.push(osc);
    } catch {
      // Ignored
    }
  }

  // --- Background Festive Raga Music Engine (Raga Yaman / Kalavati - Festive Evening Joy) ---
  public startFestiveAmbience() {
    if (this.isMusicPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.musicGain = ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.085, ctx.currentTime);
      this.musicGain.connect(ctx.destination);

      // Continuous Tanpura Drone chord in key of D (Sa - Pa - Sa' - Kharaj)
      const droneFreqs = [146.83, 220.0, 293.66, 73.42]; // D3, A3, D4, D2
      droneFreqs.forEach((freq, idx) => {
        if (!ctx || !this.musicGain) return;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle harmonic oscillation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.08, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.8, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.045, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.musicGain);
        osc.start();
        this.activeNoteOscs.push(osc);
      });

      // Melodic Evening Raga Phrase sequence (Frequencies in Hz: Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa')
      // Raga Yaman/Bhoopali scale (D, E, F#, A, B, D)
      const melodyNotes = [
        { f: 293.66, d: 2.2 }, // D4 (Sa)
        { f: 329.63, d: 1.8 }, // E4 (Re)
        { f: 369.99, d: 2.4 }, // F#4 (Ga)
        { f: 440.00, d: 2.0 }, // A4 (Pa)
        { f: 493.88, d: 2.5 }, // B4 (Dha)
        { f: 587.33, d: 3.2 }, // D5 (Sa')
        { f: 493.88, d: 1.8 }, // B4
        { f: 440.00, d: 2.2 }, // A4
        { f: 369.99, d: 2.8 }, // F#4
        { f: 329.63, d: 2.0 }, // E4
        { f: 293.66, d: 3.8 }, // D4
      ];

      let noteIndex = 0;
      const playMelodyCycle = () => {
        if (!this.isMusicPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const note = melodyNotes[noteIndex % melodyNotes.length];

        // Play flute lead
        this.playFluteNote(note.f, note.d, now);

        // Play companion santoor chime on select accented beats
        if (noteIndex % 2 === 0) {
          this.playSantoorPluck(note.f * 2, now + 0.1);
        }

        noteIndex++;
      };

      // Play immediate first note
      playMelodyCycle();

      // Schedule periodic melodic notes (every 2.2s)
      this.scheduledInterval = window.setInterval(playMelodyCycle, 2200);
      this.isMusicPlaying = true;
    } catch {
      // Ignored
    }
  }

  public stopFestiveAmbience() {
    if (this.scheduledInterval) {
      clearInterval(this.scheduledInterval);
      this.scheduledInterval = null;
    }
    this.activeNoteOscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // no-op
      }
    });
    this.activeNoteOscs = [];
    this.isMusicPlaying = false;
  }

  // --- UI & Event Sound Effects ---
  public playTempleBell(freq: number = 880) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2.76, ctx.currentTime);
      gainHarmonic.gain.setValueAtTime(0.04, ctx.currentTime);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);
      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(ctx.destination);

      osc.start();
      oscHarmonic.start();
      osc.stop(ctx.currentTime + 1.2);
      oscHarmonic.stop(ctx.currentTime + 0.7);
    } catch {
      // Ignored
    }
  }

  public playDiyaIgnition() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.playTempleBell(587.33);
      setTimeout(() => this.playTempleBell(880), 90);

      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignored
    }
  }

  public playRocketLaunch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400 + Math.random() * 300, ctx.currentTime + 0.45);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignored
    }
  }

  public playFireworkExplosion(type: string = 'burst') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Sub-bass Thump
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.45);

      subGain.gain.setValueAtTime(0.3, now);
      subGain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.45);

      // 2. Burst Noise Body
      const noiseDur = type === 'willow' ? 0.9 : 0.55;
      const bufferSize = ctx.sampleRate * noiseDur;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(180, now + noiseDur);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDur);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + noiseDur);

      // 3. Crackling Sparkles
      if (type === 'chrysanthemum' || type === 'willow' || type === 'chakra') {
        const sparkleCount = 6;
        for (let s = 0; s < sparkleCount; s++) {
          const delay = 0.15 + s * 0.07 + Math.random() * 0.04;
          const spOsc = ctx.createOscillator();
          const spGain = ctx.createGain();
          spOsc.type = 'square';
          spOsc.frequency.setValueAtTime(1200 + Math.random() * 1200, now + delay);

          spGain.gain.setValueAtTime(0.03, now + delay);
          spGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);

          spOsc.connect(spGain);
          spGain.connect(ctx.destination);
          spOsc.start(now + delay);
          spOsc.stop(now + delay + 0.05);
        }
      }
    } catch {
      // Ignored
    }
  }
}

export const sounds = new SoundSynthesizer();
