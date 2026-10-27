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
    <div className="fixed bottom-2 sm:bottom-6 left-0 right-0 z-40 pointer-events-none px-1.5 sm:px-4 md:px-6 nav-dock-container">
      {/* Helper text row: positioned cleanly above so it NEVER crushes the buttons on mobile, hidden in vestibulo so it doesn't block cards */}
      {currentScene !== 'mural' && currentScene !== 'vestibulo' && !isProgressComplete && (
        <div className="w-full flex justify-center mb-1 sm:mb-1.5 pointer-events-none px-2">
          <span className="text-[9.5px] sm:text-xs font-mono-archive text-[#eaeaea] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,1)] px-2.5 sm:px-3 py-0.5 rounded-full bg-black/90 border border-white/20 text-center select-none shadow-lg">
            Mural final se desbloquea al completar todo el recorrido
          </span>
        </div>
      )}

      {/* Dock Bar con columnas flexibles: Volver abajo a la izquierda, Estado al centro, Avanzar abajo a la derecha */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-1 sm:gap-3 min-h-[40px] sm:min-h-[44px]">
        {/* 1. Columna Izquierda: Volver al vestíbulo / Volver a la Casa */}
        <div className="pointer-events-auto shrink-0 flex items-center justify-start">
          {currentScene !== 'vestibulo' && currentScene !== 'mural' && (
            <button
              onClick={() => onNavigate('vestibulo')}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-[#181615]/95 hover:bg-[#262422] active:bg-[#33302d] text-[#eaeaea] hover:text-white border-2 border-white/30 hover:border-white/60 text-[11px] sm:text-sm font-semibold backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap shrink-0"
              onMouseEnter={() => onHoverInteractive('Volver al Vestíbulo', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
              aria-label="Volver al vestíbulo central"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Volver al vestíbulo</span>
              <span className="sm:hidden">Volver</span>
            </button>
          )}

          {currentScene === 'mural' && (
            <button
              onClick={() => onNavigate('vestibulo')}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-[#181615]/95 hover:bg-[#262422] text-[#eaeaea] hover:text-white border-2 border-white/30 text-[11px] sm:text-sm font-semibold backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
              onMouseEnter={() => onHoverInteractive('Volver a la Casa', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <CornerDownLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Volver a la Casa</span>
              <span className="sm:hidden">A la Casa</span>
            </button>
          )}
        </div>

        {/* 2. Columna Centro: Estado del recorrido y Mural Final */}
        <div className="pointer-events-auto shrink-0 flex items-center justify-center px-0.5">
          {currentScene !== 'mural' && (
            isProgressComplete ? (
              <button
                onClick={onOpenMural}
                className="px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#d32f2f] to-[#e53935] hover:scale-105 active:scale-95 text-white border-2 border-amber-300 text-[11px] sm:text-sm font-bold tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.9)] flex items-center gap-1 sm:gap-2 transition-all animate-pulse cursor-pointer whitespace-nowrap shrink-0"
                onMouseEnter={() => onHoverInteractive('Terminar experiencia (Mural Final)', true)}
                onMouseLeave={() => onHoverInteractive('', false)}
                title="Experiencia completada: Entrar al Mural Final"
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                <span className="hidden xl:inline">Terminar experiencia (Mural Final)</span>
                <span className="hidden sm:inline xl:hidden">Mural Final · Listo</span>
                <span className="sm:hidden">Mural Final</span>
              </button>
            ) : (
              <div
                className="px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-[#161514]/90 text-[#c9b79c] border border-white/20 text-[10px] sm:text-sm font-mono-archive backdrop-blur-md shadow-lg flex items-center gap-1 sm:gap-1.5 select-none whitespace-nowrap shrink-0"
                title="El Mural Final se desbloqueará una vez que recorras ambas secciones"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9b79c] shrink-0" />
                <span className="hidden sm:inline">Recorrido: {totalVisited}/{totalAll} partes ({progressPercent}%)</span>
                <span className="sm:hidden">{totalVisited}/{totalAll} ({progressPercent}%)</span>
              </div>
            )
          )}
        </div>

        {/* 3. Columna Derecha: Botón llamativo para AVANZAR (completamente visible sin cortes) */}
        <div className="pointer-events-auto shrink-0 flex items-center justify-end">
          {/* En Camino A (Escaleras): Avanzar al Sótano */}
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
              className="px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#e53935] to-[#f59e0b] hover:from-[#d32f2f] hover:to-[#fbbf24] text-white border-2 border-white/70 text-[11px] sm:text-sm font-bold tracking-tight sm:tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.95)] flex items-center gap-1 sm:gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer whitespace-nowrap shrink-0"
              onMouseEnter={() => onHoverInteractive(!completedPaths.b ? 'Avanzar al sótano' : 'Ir al Mural Final', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span>
                {!completedPaths.b ? 'Avanzar al sótano' : 'Ir al Mural Final'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {/* En Camino B (Sótano): Avanzar a Escaleras */}
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
              className="px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#e53935] to-[#f59e0b] hover:from-[#d32f2f] hover:to-[#fbbf24] text-white border-2 border-white/70 text-[11px] sm:text-sm font-bold tracking-tight sm:tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.95)] flex items-center gap-1 sm:gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer whitespace-nowrap shrink-0"
              onMouseEnter={() => onHoverInteractive(!completedPaths.a ? 'Avanzar a escaleras' : 'Ir al Mural Final', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span>
                {!completedPaths.a ? 'Avanzar a escaleras' : 'Ir al Mural Final'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
