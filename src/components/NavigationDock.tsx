import React from 'react';
import { ArrowLeft, ArrowRight, CornerDownLeft, Award } from 'lucide-react';
import { SceneId } from '../types';

interface NavigationDockProps {
  currentScene: SceneId;
  visitedA: number;
  totalA: number;
  visitedB: number;
  totalB: number;
  completedPaths: { a: boolean; b: boolean };
  onNavigate: (target: SceneId) => void;
  onHoverInteractive: (label: string, isEntering: boolean) => void;
  onOpenMural: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  currentScene,
  visitedA,
  totalA,
  visitedB,
  totalB,
  completedPaths,
  onNavigate,
  onHoverInteractive,
  onOpenMural,
}) => {
  if (currentScene === 'intro') return null;

  // Completion calculation: MUST complete ALL interactions in Escaleras AND ALL in Sótano
  const totalAll = totalA + totalB;
  const totalVisited = visitedA + visitedB;
  const progressPercent = totalAll > 0 ? Math.min(100, Math.round((totalVisited / totalAll) * 100)) : 0;
  const isProgressComplete =
    (completedPaths.a && completedPaths.b) ||
    (visitedA >= totalA && visitedB >= totalB && totalA > 0 && totalB > 0);

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-0 right-0 z-40 pointer-events-none px-2 sm:px-4 md:px-6 nav-dock-container">
      {/* Dock Bar con columnas flexibles: Volver abajo a la izquierda, Estado al centro, Continuar abajo a la derecha */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3 min-h-[44px] nav-dock-grid">
        {/* 1. Columna Izquierda (Abajo a la izquierda): Volver al vestíbulo / Volver a la Casa */}
        <div className="pointer-events-auto flex-1 flex items-center justify-start min-w-0 nav-dock-col-left">
          {currentScene !== 'vestibulo' && currentScene !== 'mural' && (
            <button
              onClick={() => onNavigate('vestibulo')}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#181615]/95 hover:bg-[#262422] active:bg-[#33302d] text-[#eaeaea] hover:text-white border-2 border-white/30 hover:border-white/60 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center gap-1.5 sm:gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              onMouseEnter={() => onHoverInteractive('Volver al Vestíbulo', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
              aria-label="Volver al vestíbulo central"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline truncate">Volver al vestíbulo</span>
              <span className="sm:hidden truncate">Volver</span>
            </button>
          )}

          {currentScene === 'mural' && (
            <button
              onClick={() => onNavigate('vestibulo')}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#181615]/95 hover:bg-[#262422] text-[#eaeaea] hover:text-white border-2 border-white/30 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
              onMouseEnter={() => onHoverInteractive('Volver a la Casa', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <CornerDownLeft className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline truncate">Volver a la Casa</span>
              <span className="sm:hidden truncate">A la Casa</span>
            </button>
          )}
        </div>

        {/* 2. Columna Centro: Estado del recorrido y Mural Final */}
        <div className="pointer-events-auto flex-shrink-0 flex items-center justify-center px-1 nav-dock-col-center">
          {currentScene !== 'mural' && (
            isProgressComplete ? (
              <button
                onClick={onOpenMural}
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#d32f2f] to-[#e53935] hover:scale-105 active:scale-95 text-white border-2 border-amber-300 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.9)] flex items-center gap-1.5 sm:gap-2 transition-all animate-pulse cursor-pointer whitespace-nowrap"
                onMouseEnter={() => onHoverInteractive('Terminar experiencia (Mural Final)', true)}
                onMouseLeave={() => onHoverInteractive('', false)}
                title="Experiencia completada: Entrar al Mural Final"
              >
                <Award className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="hidden xl:inline">Terminar experiencia (Mural Final)</span>
                <span className="hidden sm:inline xl:hidden">Mural Final · Completado</span>
                <span className="sm:hidden">Mural Final (Listo)</span>
              </button>
            ) : (
              <div
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#161514]/90 text-[#c9b79c] border border-white/20 text-xs font-mono-archive backdrop-blur-md shadow-lg flex items-center gap-1.5 select-none whitespace-nowrap"
                title="El Mural Final se desbloqueará una vez que recorras ambas secciones"
              >
                <Award className="w-3.5 h-3.5 text-[#c9b79c] shrink-0" />
                <span className="hidden sm:inline">Recorrido: {totalVisited}/{totalAll} partes ({progressPercent}%)</span>
                <span className="sm:hidden">{totalVisited}/{totalAll} ({progressPercent}%)</span>
              </div>
            )
          )}
        </div>

        {/* 3. Columna Derecha (Abajo a la derecha): Botón llamativo para SEGUIR ADELANTE / CONTINUAR */}
        <div className="pointer-events-auto flex-1 flex items-center justify-end min-w-0 nav-dock-col-right">
          {/* En Vestíbulo: Sugerir comenzar por Escaleras o Continuar al Sótano */}
          {currentScene === 'vestibulo' && (
            <button
              onClick={() => {
                if (!completedPaths.a) {
                  onNavigate('camino_a');
                } else if (!completedPaths.b) {
                  onNavigate('camino_b');
                } else {
                  onOpenMural();
                }
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#e53935] to-[#f59e0b] hover:from-[#d32f2f] hover:to-[#fbbf24] text-white border-2 border-white/70 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.95)] flex items-center gap-1.5 sm:gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive('Seguir adelante', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span className="hidden sm:inline truncate">
                {!completedPaths.a ? 'Seguir adelante: Escaleras' : !completedPaths.b ? 'Seguir adelante: Sótano' : 'Ir al Mural Final'}
              </span>
              <span className="sm:hidden truncate">
                {!completedPaths.a ? 'Seguir: Escaleras' : !completedPaths.b ? 'Seguir: Sótano' : 'Mural Final'}
              </span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {/* En Camino A (Escaleras): Botón de seguir adelante hacia el Sótano o al Mural si ya completó ambos */}
          {currentScene === 'camino_a' && (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                if (!completedPaths.b) {
                  onNavigate('camino_b');
                } else {
                  onOpenMural();
                }
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#e53935] to-[#f59e0b] hover:from-[#d32f2f] hover:to-[#fbbf24] text-white border-2 border-white/70 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.95)] flex items-center gap-1.5 sm:gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive(!completedPaths.b ? 'Continuar al Sótano' : 'Ir al Mural Final', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span className="hidden xl:inline truncate">
                {!completedPaths.b ? 'Seguir adelante: Pasillo del Sótano' : 'Seguir adelante: Mural Final'}
              </span>
              <span className="hidden sm:inline xl:hidden truncate">
                {!completedPaths.b ? 'Seguir al Sótano' : 'Ir al Mural'}
              </span>
              <span className="sm:hidden truncate">
                {!completedPaths.b ? 'Al Sótano' : 'Al Mural'}
              </span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {/* En Camino B (Sótano): Botón de seguir adelante hacia las Escaleras o al Mural si ya completó ambos */}
          {currentScene === 'camino_b' && (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                if (!completedPaths.a) {
                  onNavigate('camino_a');
                } else {
                  onOpenMural();
                }
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#e53935] to-[#f59e0b] hover:from-[#d32f2f] hover:to-[#fbbf24] text-white border-2 border-white/70 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.95)] flex items-center gap-1.5 sm:gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive(!completedPaths.a ? 'Continuar a Escaleras' : 'Ir al Mural Final', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span className="hidden sm:inline truncate">
                {!completedPaths.a ? 'Seguir adelante: Escaleras' : 'Seguir adelante: Mural Final'}
              </span>
              <span className="sm:hidden truncate">
                {!completedPaths.a ? 'A Escaleras' : 'Al Mural'}
              </span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
