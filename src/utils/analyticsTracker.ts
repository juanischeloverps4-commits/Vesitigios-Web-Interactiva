export interface UserInteractionEvent {
  timestamp: string;
  timeFormatted: string;
  action: string;
  category: 'navegacion' | 'interaccion' | 'audio' | 'lectura' | 'meta';
  details?: string;
}

export interface SessionData {
  sessionId: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  scenesVisited: string[];
  reachedMural: boolean;
  interactions: UserInteractionEvent[];
}

export interface AnalyticsSummary {
  totalSessions: number;
  completedMuralSessions: number;
  completionRatePercent: number;
  averageDurationSeconds: number;
  currentSessionDurationSeconds: number;
  currentSessionInteractionsCount: number;
  topActions: { action: string; count: number }[];
  currentSession: SessionData;
  recentSessions: SessionData[];
}

const STORAGE_KEY = 'vestigios_analytics_data_v1';
const CURRENT_SESSION_KEY = 'vestigios_current_session_id';

class AnalyticsTracker {
  private currentSession: SessionData;
  private sessionTimer: number | null = null;

  constructor() {
    this.currentSession = this.initCurrentSession();
    this.startDurationTimer();
  }

  private initCurrentSession(): SessionData {
    try {
      const existingId = sessionStorage.getItem(CURRENT_SESSION_KEY);
      const allSessions = this.loadAllSessions();

      if (existingId) {
        const found = allSessions.find(s => s.sessionId === existingId);
        if (found) return found;
      }

      const newId = `sesion_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      sessionStorage.setItem(CURRENT_SESSION_KEY, newId);

      const newSession: SessionData = {
        sessionId: newId,
        startTime: new Date().toISOString(),
        durationSeconds: 0,
        scenesVisited: ['intro'],
        reachedMural: false,
        interactions: [
          {
            timestamp: new Date().toISOString(),
            timeFormatted: new Date().toLocaleTimeString('es-AR'),
            action: 'Inicio de visita a la experiencia VESTIGIOS',
            category: 'meta',
          },
        ],
      };

      this.saveSession(newSession);
      return newSession;
    } catch {
      return {
        sessionId: `sesion_fallback_${Date.now()}`,
        startTime: new Date().toISOString(),
        durationSeconds: 0,
        scenesVisited: ['intro'],
        reachedMural: false,
        interactions: [],
      };
    }
  }

  private startDurationTimer() {
    if (typeof window === 'undefined') return;
    this.sessionTimer = window.setInterval(() => {
      this.currentSession.durationSeconds += 1;
      // Persist periodically
      if (this.currentSession.durationSeconds % 5 === 0) {
        this.saveSession(this.currentSession);
      }
    }, 1000);
  }

  private loadAllSessions(): SessionData[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private saveSession(session: SessionData) {
    try {
      const all = this.loadAllSessions();
      const idx = all.findIndex(s => s.sessionId === session.sessionId);
      if (idx >= 0) {
        all[idx] = session;
      } else {
        all.unshift(session);
      }
      // Keep up to 50 sessions
      const trimmed = all.slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // Storage unavailable or full
    }
  }

  public trackScene(sceneId: string) {
    if (!this.currentSession.scenesVisited.includes(sceneId)) {
      this.currentSession.scenesVisited.push(sceneId);
    }
    if (sceneId === 'mural') {
      this.currentSession.reachedMural = true;
    }

    const sceneLabels: Record<string, string> = {
      intro: 'Pantalla de Inicio (El Ruido)',
      vestibulo: 'Vestíbulo Central (Punto de Bifurcación)',
      camino_a: 'Camino A: Las Escaleras (Historias de Vida)',
      camino_b: 'Camino B: El Pasillo y Sótanos (Arquitectura)',
      mural: 'Mural Final: Rostros que Vencen al Olvido (Completado)',
    };

    this.trackAction(`Entró a escena: ${sceneLabels[sceneId] || sceneId}`, 'navegacion');
  }

  public trackAction(actionName: string, category: UserInteractionEvent['category'] = 'interaccion', details?: string) {
    const event: UserInteractionEvent = {
      timestamp: new Date().toISOString(),
      timeFormatted: new Date().toLocaleTimeString('es-AR'),
      action: actionName,
      category,
      details,
    };

    this.currentSession.interactions.unshift(event);
    if (this.currentSession.interactions.length > 200) {
      this.currentSession.interactions.pop();
    }
    this.saveSession(this.currentSession);
  }

  public getSummary(): AnalyticsSummary {
    const all = this.loadAllSessions();
    const totalSessions = Math.max(all.length, 1);
    const completed = all.filter(s => s.reachedMural).length;

    let totalDuration = 0;
    all.forEach(s => {
      totalDuration += s.durationSeconds || 0;
    });

    // Action frequencies
    const freq: Record<string, number> = {};
    all.forEach(s => {
      s.interactions.forEach(ev => {
        freq[ev.action] = (freq[ev.action] || 0) + 1;
      });
    });

    const topActions = Object.entries(freq)
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalSessions,
      completedMuralSessions: completed,
      completionRatePercent: Math.round((completed / totalSessions) * 100),
      averageDurationSeconds: Math.round(totalDuration / totalSessions),
      currentSessionDurationSeconds: this.currentSession.durationSeconds,
      currentSessionInteractionsCount: this.currentSession.interactions.length,
      topActions,
      currentSession: this.currentSession,
      recentSessions: all.slice(0, 10),
    };
  }

  public exportReport(): string {
    const summary = this.getSummary();
    return JSON.stringify(summary, null, 2);
  }

  public clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(CURRENT_SESSION_KEY);
      this.currentSession = this.initCurrentSession();
    } catch {}
  }
}

export const analyticsTracker = new AnalyticsTracker();
