// Sintetizador ligero de música chiptune y efectos retro arcade con Web Audio API (sin archivos externos).

export type MusicTheme = 'menu' | 'action' | 'victory';

interface NoteStep {
  lead: number | null;
  bass: number | null;
}

// Melodías chiptune simples (frecuencias en Hz)
const MENU_THEME: NoteStep[] = [
  { lead: 523.25, bass: 130.81 }, // C5 / C3
  { lead: 659.25, bass: null },   // E5
  { lead: 783.99, bass: 196.0 },  // G5 / G3
  { lead: 659.25, bass: null },   // E5
  { lead: 698.46, bass: 174.61 }, // F5 / F3
  { lead: 880.0, bass: null },    // A5
  { lead: 783.99, bass: 196.0 },  // G5 / G3
  { lead: null, bass: null },
  { lead: 659.25, bass: 164.81 }, // E5 / E3
  { lead: 587.33, bass: null },   // D5
  { lead: 523.25, bass: 130.81 }, // C5 / C3
  { lead: 587.33, bass: null },   // D5
  { lead: 659.25, bass: 196.0 },  // E5 / G3
  { lead: 587.33, bass: null },   // D5
  { lead: 523.25, bass: 130.81 }, // C5 / C3
  { lead: null, bass: 196.0 },
];

const ACTION_THEME: NoteStep[] = [
  { lead: 440.0, bass: 110.0 },   // A4 / A2
  { lead: 523.25, bass: 110.0 },  // C5
  { lead: 659.25, bass: 164.81 }, // E5 / E3
  { lead: 523.25, bass: 110.0 },  // C5
  { lead: 587.33, bass: 146.83 }, // D5 / D3
  { lead: 659.25, bass: 146.83 }, // E5
  { lead: 698.46, bass: 174.61 }, // F5 / F3
  { lead: 659.25, bass: 146.83 }, // E5
  { lead: 587.33, bass: 130.81 }, // D5 / C3
  { lead: 523.25, bass: 130.81 }, // C5
  { lead: 493.88, bass: 123.47 }, // B4 / B2
  { lead: 587.33, bass: 123.47 }, // D5
  { lead: 659.25, bass: 164.81 }, // E5 / E3
  { lead: 783.99, bass: 164.81 }, // G5
  { lead: 880.0, bass: 110.0 },   // A5 / A2
  { lead: 659.25, bass: 164.81 }, // E5
];

const VICTORY_THEME: NoteStep[] = [
  { lead: 523.25, bass: 130.81 }, // C5
  { lead: 659.25, bass: 164.81 }, // E5
  { lead: 783.99, bass: 196.0 },  // G5
  { lead: 1046.5, bass: 130.81 }, // C6
  { lead: 987.77, bass: 196.0 },  // B5
  { lead: 880.0, bass: 174.61 },  // A5
  { lead: 783.99, bass: 196.0 },  // G5
  { lead: null, bass: null },
  { lead: 698.46, bass: 174.61 }, // F5
  { lead: 783.99, bass: 196.0 },  // G5
  { lead: 880.0, bass: 174.61 },  // A5
  { lead: 783.99, bass: 196.0 },  // G5
  { lead: 659.25, bass: 130.81 }, // E5
  { lead: 587.33, bass: 196.0 },  // D5
  { lead: 523.25, bass: 130.81 }, // C5
  { lead: null, bass: null },
];

class SoundManager {
  private ctx: AudioContext | null = null;
  public muted = false;
  public musicEnabled = true;

  private musicTimer: number | null = null;
  private currentTheme: MusicTheme = 'menu';
  private stepIndex = 0;

  private ensureContext(ignoreMute = false): AudioContext | null {
    if (!ignoreMute && this.muted) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'square',
    gainLevel = 0.08,
    slideTo?: number
  ) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }
    gain.gain.setValueAtTime(gainLevel, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  private playMusicStep() {
    if (this.muted || !this.musicEnabled) return;
    const ctx = this.ensureContext(true);
    if (!ctx || ctx.state !== 'running') return;

    const pattern =
      this.currentTheme === 'action'
        ? ACTION_THEME
        : this.currentTheme === 'victory'
        ? VICTORY_THEME
        : MENU_THEME;

    const step = pattern[this.stepIndex % pattern.length];
    this.stepIndex = (this.stepIndex + 1) % pattern.length;

    const now = ctx.currentTime;
    const noteDur = this.currentTheme === 'action' ? 0.14 : 0.21;

    if (step.lead) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(step.lead, now);
      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + noteDur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + noteDur);
    }

    if (step.bass) {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(step.bass, now);
      bassGain.gain.setValueAtTime(0.036, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + noteDur * 1.15);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + noteDur * 1.15);
    }
  }

  unlockAndStartMusic(theme?: MusicTheme) {
    if (theme) this.currentTheme = theme;
    const ctx = this.ensureContext(true);
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => this.syncMusicLoop()).catch(() => {});
    } else {
      this.syncMusicLoop();
    }
  }

  setMusicTheme(theme: MusicTheme) {
    if (this.currentTheme === theme && this.musicTimer !== null) return;
    this.currentTheme = theme;
    this.stepIndex = 0;
    this.syncMusicLoop();
  }

  syncMusicLoop() {
    if (this.musicTimer !== null) {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.muted || !this.musicEnabled || typeof window === 'undefined') {
      return;
    }
    const intervalMs = this.currentTheme === 'action' ? 175 : 250;
    this.musicTimer = window.setInterval(() => {
      this.playMusicStep();
    }, intervalMs);
  }

  stopMusic() {
    if (this.musicTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playClick() {
    this.playTone(520, 0.07, 'triangle', 0.08, 720);
  }

  playJump() {
    this.playTone(260, 0.14, 'square', 0.06, 560);
  }

  playShoot() {
    this.playTone(680, 0.09, 'triangle', 0.06, 280);
  }

  playCoin() {
    this.playTone(880, 0.07, 'square', 0.06);
    setTimeout(() => this.playTone(1320, 0.11, 'square', 0.06), 60);
  }

  playEnemyDefeat() {
    this.playTone(420, 0.08, 'sawtooth', 0.07, 140);
    setTimeout(() => this.playTone(620, 0.1, 'triangle', 0.06, 880), 65);
  }

  playHit() {
    this.playTone(190, 0.2, 'sawtooth', 0.09, 75);
  }

  playUnlock() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, 0.14, 'triangle', 0.08), i * 85);
    });
  }
}

export const soundFX = new SoundManager();
