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

  // Realistic Multi-Layered Indian Diwali Firecracker Audio
  // Simulates authentic supersonic shockwaves, gunpowder boom, multiple rapid crackle chains (ladi), and fountain sizzles
  public playFireworkExplosion(type: string = 'burst') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Initial High-Velocity Gunpowder Shockwave / Crack (Loud transient punch)
      const snapNoise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
      const snapData = snapNoise.getChannelData(0);
      for (let i = 0; i < snapData.length; i++) {
        snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.006));
      }
      const snapSource = ctx.createBufferSource();
      snapSource.buffer = snapNoise;

      const snapFilter = ctx.createBiquadFilter();
      snapFilter.type = 'highpass';
      snapFilter.frequency.setValueAtTime(1400, now);

      const snapGain = ctx.createGain();
      snapGain.gain.setValueAtTime(0.55, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      snapSource.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapSource.start(now);
      snapSource.stop(now + 0.04);

      // 2. Heavy Subwoofer Ground-shaking Thump (40Hz - 25Hz)
      const boomOsc = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boomOsc.type = 'triangle';
      boomOsc.frequency.setValueAtTime(160, now);
      boomOsc.frequency.exponentialRampToValueAtTime(30, now + 0.55);

      boomGain.gain.setValueAtTime(0.48, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      boomOsc.connect(boomGain);
      boomGain.connect(ctx.destination);
      boomOsc.start(now);
      boomOsc.stop(now + 0.55);

      // 3. Resonant Air Shockwave Rumble & Reverb
      const rumbleDur = type === 'willow' ? 1.3 : 0.85;
      const rumbleBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * rumbleDur), ctx.sampleRate);
      const rumbleData = rumbleBuf.getChannelData(0);
      for (let i = 0; i < rumbleData.length; i++) {
        rumbleData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.35));
      }
      const rumbleSource = ctx.createBufferSource();
      rumbleSource.buffer = rumbleBuf;

      const rumbleFilter = ctx.createBiquadFilter();
      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(650, now);
      rumbleFilter.frequency.exponentialRampToValueAtTime(90, now + rumbleDur);

      const rumbleGain = ctx.createGain();
      rumbleGain.gain.setValueAtTime(0.38, now);
      rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + rumbleDur);

      rumbleSource.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);
      rumbleSource.start(now);
      rumbleSource.stop(now + rumbleDur);

      // 4. Authentic Firecracker "Ladi" / "Chilli Bomb" Crackle Salvo
      // Simulates real metallic gunpowder pops popping across the sky
      const crackleCount = type === 'willow' ? 14 : type === 'chrysanthemum' || type === 'chakra' ? 12 : 6;
      for (let c = 0; c < crackleCount; c++) {
        const popDelay = 0.08 + Math.random() * (type === 'willow' ? 0.95 : 0.55);
        const popDuration = 0.02 + Math.random() * 0.025;
        const popBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * popDuration), ctx.sampleRate);
        const popData = popBuf.getChannelData(0);
        for (let p = 0; p < popData.length; p++) {
          popData[p] = (Math.random() * 2 - 1) * Math.exp(-p / (ctx.sampleRate * 0.004));
        }

        const popSource = ctx.createBufferSource();
        popSource.buffer = popBuf;

        const popFilter = ctx.createBiquadFilter();
        popFilter.type = 'bandpass';
        popFilter.frequency.setValueAtTime(1800 + Math.random() * 2200, now + popDelay);
        popFilter.Q.setValueAtTime(3.5, now + popDelay);

        const popGain = ctx.createGain();
        popGain.gain.setValueAtTime(0.18 + Math.random() * 0.12, now + popDelay);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + popDelay + popDuration);

        popSource.connect(popFilter);
        popFilter.connect(popGain);
        popGain.connect(ctx.destination);
        popSource.start(now + popDelay);
        popSource.stop(now + popDelay + popDuration);
      }
    } catch {
      // Ignored
    }
  }

  // Authentic Firecracker Whistle & Sizzle for Anar / Rockets
  public playRocketLaunch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Screamer / Whistle (Rapid frequency flare)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(1800 + Math.random() * 400, now + 0.42);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      // 2. Burning Gunpowder Fuse Sizzle (high frequency noise)
      const sizzleBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.4), ctx.sampleRate);
      const sizzleData = sizzleBuf.getChannelData(0);
      for (let i = 0; i < sizzleData.length; i++) {
        sizzleData[i] = Math.random() * 2 - 1;
      }
      const sizzle = ctx.createBufferSource();
      sizzle.buffer = sizzleBuf;

      const sizzleFilter = ctx.createBiquadFilter();
      sizzleFilter.type = 'highpass';
      sizzleFilter.frequency.setValueAtTime(3500, now);

      const sizzleGain = ctx.createGain();
      sizzleGain.gain.setValueAtTime(0.06, now);
      sizzleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      sizzle.connect(sizzleFilter);
      sizzleFilter.connect(sizzleGain);
      sizzleGain.connect(ctx.destination);
      sizzle.start(now);
      sizzle.stop(now + 0.4);
    } catch {
      // Ignored
    }
  }
}

export const sounds = new SoundSynthesizer();
