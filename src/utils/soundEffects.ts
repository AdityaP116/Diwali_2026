// Web Audio API Sound Synthesizer for DiwaliVerse
// Zero external mp3 dependencies, zero broken asset links, zero latency, ultra-lightweight.

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;

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
    if (this.ambientGain) {
      const ctx = this.getContext();
      if (ctx) {
        this.ambientGain.gain.setValueAtTime(
          muted ? 0 : 0.05,
          ctx.currentTime
        );
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft Indian temple bell / chiming sound for button clicks, card opens & UI interactions
  public playTempleBell(freq: number = 880) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Slight pitch glide downwards like a brass bell
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      // Add harmonic overtone
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2.76, ctx.currentTime); // authentic bell chime ratio
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
      // Ignored if audio blocked
    }
  }

  // Sacred Diya ignition whoosh / flame spark sound
  public playDiyaIgnition() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Warm resonant bell chord
      this.playTempleBell(587.33); // D5 note
      setTimeout(() => this.playTempleBell(880), 80); // A5 note

      // Gentle flame whoosh using filtered white noise
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
      // Silently guarded
    }
  }

  // Rocket launch whistle sound (rising high frequency)
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

      // Lowpass filter to soften the harshness of the whistle
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
      // Silently guarded
    }
  }

  // Rich, layered firework explosion with bass thump, crackle & floral shimmer
  public playFireworkExplosion(type: string = 'burst') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Deep Sub-bass Thump
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

      // 3. Crackling Gold Sparkles (Chakra, Chrysanthemum or Willow)
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
      // Silently guarded
    }
  }

  // Subtle traditional tanpura / sacred drone ambient bed
  public startFestiveAmbience() {
    if (this.isAmbientPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.045, ctx.currentTime);

      // Sa-Pa harmonic root (D3 & A3) for warm meditative Indian festival warmth
      const freqs = [146.83, 220.0, 293.66]; // D3, A3, D4

      freqs.forEach((freq, idx) => {
        if (!ctx || !this.ambientGain) return;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft LFO tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);

        lfo.connect(osc.frequency);
        lfo.start();

        osc.connect(this.ambientGain);
        osc.start();
        this.ambientOscs.push(osc);
      });

      this.ambientGain.connect(ctx.destination);
      this.isAmbientPlaying = true;
    } catch {
      // Silently guarded
    }
  }

  public stopFestiveAmbience() {
    this.ambientOscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // no-op
      }
    });
    this.ambientOscs = [];
    this.isAmbientPlaying = false;
  }
}

export const sounds = new SoundSynthesizer();

