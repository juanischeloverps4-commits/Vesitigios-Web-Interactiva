/**
 * Audio System Engine for VESTIGIOS — La Casa por la Memoria
 * Pure documentary audio player focused strictly on the user's authentic archives:
 *  1. Inicio: "Menu de inicio- Vestigio.wav"
 *  2. Vestíbulo y Escaleras: "segundo menu (onose).wav"
 *  3. Sótano: "acordion menu.wav"
 *  4. Picana eléctrica (SFX al apretar botón): "picana (para el click).wav"
 *  5. Mural final: "segundo menu (onose) 2.wav"
 *
 * Implements audio ducking: when an overlay sound (like picana) plays, the background
 * is attenuated and then smoothly restored once the overlay completes.
 */

export const AUDIO_TRACKS = {
  // 1. Menú principal (intro): Menu de inicio- Vestigio.wav
  mainMenu:
    'https://dn710100.ca.archive.org/0/items/menu-de-inicio-vestigio/Menu%20de%20inicio-%20Vestigio.wav',
  // 2. Segundo menú (vestíbulo) y Sección de escaleras (camino_a): segundo menu (onose).wav
  secondMenu:
    'https://dn710100.ca.archive.org/0/items/menu-de-inicio-vestigio/segundo%20menu%20%28onose%29.wav',
  stairs:
    'https://dn710100.ca.archive.org/0/items/menu-de-inicio-vestigio/segundo%20menu%20%28onose%29.wav',
  // 3. Sección del sótano (camino_b): acordion menu.wav
  basement:
    'https://dn710100.ca.archive.org/0/items/menu-de-inicio-vestigio/acordion%20menu.wav',
  // 4. Picana eléctrica (al apretar el botón de reproducir): picana (para el click).wav
  picana:
    'https://dn710100.ca.archive.org/0/items/menu-de-inicio-vestigio/picana%20%28para%20el%20click%29.wav',
  picanaClean: '/picana-click.wav',
  // 5. Sección de mural final: segundo menu (onose) 2.wav
  mural:
    'https://dn710100.ca.archive.org/0/items/menu-de-inicio-vestigio/segundo%20menu%20%28onose%29%202.wav',
};

export type AudioTrackType = 'trial' | 'radio' | 'accordion' | 'tension';

class AudioSystem {
  private isMuted: boolean = false;
  private isEnabled: boolean = true;
  private masterVolume: number = 0.7; // Global volume (0 to 1)

  // Active looping background audio element
  private currentBgAudio: HTMLAudioElement | null = null;
  private currentTrackUrl: string | null = null;
  private currentSceneId: string | null = null;
  private hasUnlockedAutoplay: boolean = false;

  // Active foreground sound (picana SFX)
  private currentFgAudio: HTMLAudioElement | null = null;
  private isDucked: boolean = false;
  private duckTimer: ReturnType<typeof setInterval> | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    this.setupAutoplayUnlock();
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public initAudio() {
    this.hasUnlockedAutoplay = true;
    this.getAudioContext();
    if (this.currentBgAudio && !this.isMuted && this.isEnabled && this.currentBgAudio.paused) {
      this.currentBgAudio.play().catch(() => {});
    }
  }

  private setupAutoplayUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      this.initAudio();
      window.removeEventListener('click', unlock);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('click', unlock, { once: true, passive: true });
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
  }

  /* =========================================================================
   * VOLUME & MUTE CONTROLS
   * ========================================================================= */
  public getVolume(): number {
    return this.masterVolume;
  }

  public setVolume(volume: number): number {
    this.initAudio();
    const clamped = Math.max(0, Math.min(1, volume));
    this.masterVolume = clamped;

    if (clamped > 0) {
      this.isMuted = false;
      this.isEnabled = true;
      if (this.currentSceneId && (!this.currentBgAudio || this.currentBgAudio.paused)) {
        this.transitionToScene(this.currentSceneId, false);
      }
    } else if (clamped === 0) {
      this.isMuted = true;
    }

    this.applyVolume();
    return this.masterVolume;
  }

  public toggleMute(): boolean {
    this.initAudio();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.isEnabled = true;
      if (this.masterVolume === 0) {
        this.masterVolume = 0.7;
      }
      if (this.currentSceneId) {
        this.transitionToScene(this.currentSceneId, false);
      }
    }
    this.applyVolume();
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    this.applyVolume();
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public getIsPlaying(): boolean {
    return this.currentBgAudio !== null && !this.currentBgAudio.paused && !this.isMuted && this.isEnabled;
  }

  private applyVolume() {
    const isActuallyMuted = this.isMuted || !this.isEnabled || this.masterVolume === 0;

    if (this.currentBgAudio) {
      this.currentBgAudio.muted = isActuallyMuted;
      if (isActuallyMuted) {
        this.currentBgAudio.volume = 0;
        try {
          this.currentBgAudio.pause();
        } catch {}
      } else {
        const effective = this.isDucked ? this.masterVolume * 0.15 : this.masterVolume;
        this.currentBgAudio.volume = effective;
        if (this.currentBgAudio.paused) {
          this.currentBgAudio.play().catch(() => {});
        }
      }
    }

    if (this.currentFgAudio) {
      this.currentFgAudio.muted = isActuallyMuted;
      if (isActuallyMuted) {
        this.currentFgAudio.volume = 0;
        try {
          this.currentFgAudio.pause();
        } catch {}
      } else {
        this.currentFgAudio.volume = this.masterVolume;
      }
    }
  }

  /* =========================================================================
   * AUDIO DUCKING & RESTORATION
   * Automatically lowers background volume when a sound effect (like picana) plays,
   * and smoothly restores background volume when the sound effect ends.
   * ========================================================================= */
  public duckBackgroundAudio() {
    if (!this.currentBgAudio || this.isMuted || !this.isEnabled) return;
    this.isDucked = true;

    if (this.duckTimer) {
      clearInterval(this.duckTimer);
      this.duckTimer = null;
    }

    const targetVol = this.masterVolume * 0.15;
    let curVol = this.currentBgAudio.volume;
    const step = (curVol - targetVol) / 6;

    this.duckTimer = setInterval(() => {
      if (!this.currentBgAudio) {
        if (this.duckTimer) clearInterval(this.duckTimer);
        this.duckTimer = null;
        return;
      }
      curVol = Math.max(targetVol, curVol - step);
      this.currentBgAudio.volume = curVol;
      if (curVol <= targetVol + 0.02) {
        this.currentBgAudio.volume = targetVol;
        if (this.duckTimer) clearInterval(this.duckTimer);
        this.duckTimer = null;
      }
    }, 30);
  }

  public restoreBackgroundAudio() {
    this.isDucked = false;

    if (this.duckTimer) {
      clearInterval(this.duckTimer);
      this.duckTimer = null;
    }

    if (!this.currentBgAudio) return;

    if (this.isMuted || !this.isEnabled) {
      this.currentBgAudio.volume = 0;
      return;
    }

    const targetVol = this.masterVolume;
    let curVol = this.currentBgAudio.volume;
    const step = (targetVol - curVol) / 8;

    this.duckTimer = setInterval(() => {
      if (!this.currentBgAudio || this.isDucked) {
        if (this.duckTimer) clearInterval(this.duckTimer);
        this.duckTimer = null;
        return;
      }
      curVol = Math.min(targetVol, curVol + step);
      this.currentBgAudio.volume = curVol;
      if (curVol >= targetVol - 0.02) {
        this.currentBgAudio.volume = targetVol;
        if (this.duckTimer) clearInterval(this.duckTimer);
        this.duckTimer = null;
      }
    }, 35);

    if (this.currentBgAudio.paused && !this.isMuted && this.isEnabled && targetVol > 0) {
      this.currentBgAudio.play().catch(() => {});
    }
  }

  private audioPool: Map<string, HTMLAudioElement> = new Map();

  // Preloads and caches Audio objects for instant playback
  public preloadAllTracks() {
    if (typeof window === 'undefined') return;
    try {
      Object.values(AUDIO_TRACKS).forEach((url) => {
        if (!this.audioPool.has(url)) {
          const a = new Audio(url);
          a.preload = 'auto';
          a.loop = true;
          this.audioPool.set(url, a);
        }
      });
    } catch {}
  }

  private getPreloadedAudio(trackUrl: string): HTMLAudioElement {
    let audio = this.audioPool.get(trackUrl);
    if (!audio) {
      audio = new Audio(trackUrl);
      audio.loop = true;
      audio.preload = 'auto';
      this.audioPool.set(trackUrl, audio);
    }
    return audio;
  }

  /* =========================================================================
   * PRIMARY BACKGROUND MUSIC STREAMER
   * Preloaded, instantaneous start with smooth 500ms crossfade transitions
   * ========================================================================= */
  public playTrack(trackUrl: string) {
    const isActuallyMuted = this.isMuted || !this.isEnabled || this.masterVolume === 0;

    // If muted, set tracking but do not start playback
    if (isActuallyMuted) {
      this.currentTrackUrl = trackUrl;
      if (this.currentBgAudio) {
        this.currentBgAudio.muted = true;
        this.currentBgAudio.volume = 0;
        try {
          this.currentBgAudio.pause();
        } catch {}
      }
      return;
    }

    const effectiveVol = this.isDucked ? this.masterVolume * 0.15 : this.masterVolume;

    // If the exact same track is already playing, preserve playback without cutting or restarting
    if (this.currentTrackUrl === trackUrl && this.currentBgAudio && !this.currentBgAudio.paused) {
      this.currentBgAudio.muted = false;
      this.currentBgAudio.volume = effectiveVol;
      return;
    }

    // 1. Smoothly fade out previous track (desvanecimiento suave al salir)
    const oldAudio = this.currentBgAudio;
    if (oldAudio && oldAudio !== this.audioPool.get(trackUrl)) {
      let curVol = oldAudio.volume;
      const fadeSteps = 12;
      const step = curVol / fadeSteps;
      const fadeOutTimer = setInterval(() => {
        curVol = Math.max(0, curVol - step);
        try {
          oldAudio.volume = curVol;
        } catch {}
        if (curVol <= 0.01) {
          clearInterval(fadeOutTimer);
          try {
            oldAudio.pause();
          } catch {}
        }
      }, 35);
    }

    // 2. Obtener pista precargada y realizar fade-in progresivo (0 -> effectiveVol)
    try {
      const audio = this.getPreloadedAudio(trackUrl);
      audio.loop = true;
      audio.muted = false;
      audio.volume = 0; // Inicia en 0 para entrada cinematográfica
      this.currentBgAudio = audio;
      this.currentTrackUrl = trackUrl;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            let inVol = 0;
            const inSteps = 14;
            const inStep = effectiveVol / inSteps;
            const fadeInTimer = setInterval(() => {
              inVol = Math.min(effectiveVol, inVol + inStep);
              try {
                if (this.currentBgAudio === audio) {
                  audio.volume = inVol;
                }
              } catch {}
              if (inVol >= effectiveVol - 0.01) {
                clearInterval(fadeInTimer);
                if (this.currentBgAudio === audio) {
                  audio.volume = effectiveVol;
                }
              }
            }, 35);
          })
          .catch(() => {
            if (!this.hasUnlockedAutoplay) {
              this.setupAutoplayUnlock();
            }
          });
      }
    } catch (e) {
      console.warn('Error loading audio track:', e);
    }
  }

  public stopTrack(fadeTimeMs: number = 400) {
    if (!this.currentBgAudio) return;
    const audio = this.currentBgAudio;
    this.currentTrackUrl = null;

    let vol = audio.volume;
    const step = vol / (fadeTimeMs / 40);
    const timer = setInterval(() => {
      vol = Math.max(0, vol - step);
      try {
        audio.volume = vol;
      } catch {}
      if (vol <= 0.01) {
        clearInterval(timer);
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.src = '';
        } catch {}
      }
    }, 40);
  }

  /* =========================================================================
   * SCENE-BASED CONMUTATION
   * Automatically switches to the correct authentic WAV track for each scene:
   * 1. intro: "Menu de inicio- Vestigio.wav"
   * 2. vestibulo & camino_a (escaleras): "segundo menu (onose).wav"
   * 3. camino_b (sótano): "acordion menu.wav"
   * 4. mural: "segundo menu (onose) 2.wav"
   * ========================================================================= */
  public transitionToScene(sceneId: string, isMuted: boolean) {
    this.currentSceneId = sceneId;

    if (isMuted || !this.isEnabled || this.masterVolume === 0) {
      if (this.currentBgAudio) {
        this.currentBgAudio.muted = true;
        this.currentBgAudio.volume = 0;
        try {
          this.currentBgAudio.pause();
        } catch {}
      }
      return;
    }

    switch (sceneId) {
      case 'intro':
        // 1. Menú principal (intro): Menu de inicio- Vestigio.wav
        this.playTrack(AUDIO_TRACKS.mainMenu);
        break;

      case 'vestibulo':
        // 2. Segundo menú (vestíbulo): segundo menu (onose).wav
        this.playTrack(AUDIO_TRACKS.secondMenu);
        break;

      case 'camino_a':
        // Sección de escaleras: reproduce segundo menu (onose).wav
        // (Continúa sin reiniciarse si venía del vestíbulo)
        this.playTrack(AUDIO_TRACKS.stairs);
        break;

      case 'camino_b':
        // 3. Sección del sótano: acordion menu.wav
        this.playTrack(AUDIO_TRACKS.basement);
        break;

      case 'mural':
        // 5. Sección de mural final: segundo menu (onose) 2.wav
        this.playTrack(AUDIO_TRACKS.mural);
        break;

      default:
        break;
    }
  }

  /* =========================================================================
   * 4. PICANA SFX: "picana (para el click).wav"
   * Plays ONLY when clicking the "Reproducir sonido" button in the picana modal.
   * Ducks background audio and smoothly restores it once playback finishes!
   * ========================================================================= */
  public playPicanaSound(volume: number = 0.9): Promise<void> {
    this.initAudio();

    // Check if background music was ACTUALLY playing before this sound
    const wasBgPlaying =
      !this.isMuted &&
      this.isEnabled &&
      this.currentBgAudio !== null &&
      !this.currentBgAudio.paused &&
      this.currentBgAudio.volume > 0;

    // Calculate an audible volume for the picana:
    // If master volume is positive, scale with it; if user entered muted, make it clearly audible
    const picanaVol =
      this.masterVolume > 0.05
        ? Math.max(0.2, Math.min(1, volume * this.masterVolume))
        : 0.85;

    // 1. If background audio was actively playing, duck it; otherwise do NOT alter background!
    if (wasBgPlaying) {
      this.duckBackgroundAudio();
    }

    // Stop any existing foreground playback
    if (this.currentFgAudio) {
      try {
        this.currentFgAudio.pause();
        this.currentFgAudio.currentTime = 0;
      } catch {}
      this.currentFgAudio = null;
    }

    return new Promise((resolve) => {
      let resolved = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          this.currentFgAudio = null;
          // 2. ONLY restore background audio if it was ACTUALLY playing before!
          // If the user entered muted, the accordion MUST NOT be triggered or activated!
          if (wasBgPlaying) {
            this.restoreBackgroundAudio();
          }
          resolve();
        }
      };

      try {
        const audio = new Audio(AUDIO_TRACKS.picana);
        audio.volume = picanaVol;
        this.currentFgAudio = audio;

        audio.addEventListener('ended', finish);
        audio.addEventListener('error', () => {
          // Fallback to local copy if network fails
          try {
            const fallback = new Audio(AUDIO_TRACKS.picanaClean);
            fallback.volume = picanaVol;
            this.currentFgAudio = fallback;
            fallback.addEventListener('ended', finish);
            fallback.addEventListener('error', finish);
            fallback.play().catch(finish);
          } catch {
            finish();
          }
        });

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            try {
              const fallback = new Audio(AUDIO_TRACKS.picanaClean);
              fallback.volume = picanaVol;
              this.currentFgAudio = fallback;
              fallback.addEventListener('ended', finish);
              fallback.addEventListener('error', finish);
              fallback.play().catch(finish);
            } catch {
              finish();
            }
          });
        }
      } catch {
        finish();
      }
    });
  }

  public stopForegroundAudio() {
    if (this.currentFgAudio) {
      try {
        this.currentFgAudio.pause();
        this.currentFgAudio.currentTime = 0;
      } catch {}
      this.currentFgAudio = null;
    }
    if (this.isDucked) {
      this.restoreBackgroundAudio();
    }
  }

  /* =========================================================================
   * TACTILE ARCHIVAL RESPONSE SOUND (Click / Papel)
   * Generates a subtle, organic sound of archival document handling/paper rustle
   * upon clicking interactive elements in Camino A and El Sótano.
   * ========================================================================= */
  public playInspectClick(intensity: number = 0.35) {
    if (this.isMuted || !this.isEnabled || this.masterVolume === 0) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const baseVol = Math.max(0.08, Math.min(0.45, this.masterVolume * intensity));

      // 1. Friction & paper texture (bandpass-shaped pink noise burst)
      const duration = 0.052; // ~52ms
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (ctx.sampleRate * 0.013));
        data[i] = (Math.random() * 2 - 1) * decay;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1750, now);
      bandpass.Q.setValueAtTime(1.6, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(baseVol * 0.75, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // 2. Subtle soft tactile click/paper tap pulse (low body)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(155, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.035);

      oscGain.gain.setValueAtTime(baseVol * 0.45, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Graceful fallback if Web Audio is restricted
    }
  }

  public playDoorOpen() {
    // No-op
  }

  public playDigitalBlip() {
    // No-op
  }

  public startAccordionSoundscape(_volume?: number) {
    // Controlled via transitionToScene
  }

  public stopAccordionSoundscape() {
    // No-op to prevent killing scene music
  }

  public setAccordionVolume(_volume: number) {
    // No-op
  }

  public startTensionSoundscape(_volume?: number) {
    // Removed to prevent synthetic buzzing
  }

  public stopTensionSoundscape() {
    // No-op
  }

  public startTrialSoundscape(_volume?: number) {
    // Removed
  }

  public stopTrialSoundscape() {
    // No-op
  }

  public startRadioSoundscape(_volume?: number) {
    // No-op
  }

  public stopRadioSoundscape() {
    // No-op
  }

  public startAmbientDrone(_volume?: number) {
    // No-op
  }

  public stopAmbientDrone() {
    // No-op
  }
}

export const audioSystem = new AudioSystem();
