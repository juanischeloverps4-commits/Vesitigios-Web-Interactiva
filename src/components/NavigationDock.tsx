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
      {/* Dock Bar con columnas flexibles: Centro con espacio completo sin cortes ni truncado */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-1 sm:gap-2.5 min-h-[44px] nav-dock-grid">
        {/* 1. Columna Izquierda: Volver al vestíbulo / Volver a la Casa */}
        <div className="pointer-events-auto flex-1 flex items-center justify-start min-w-0 nav-dock-col-left">
          {currentScene !== 'vestibulo' && currentScene !== 'mural' && (
            <button
              onClick={() => onNavigate('vestibulo')}
              className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#121212]/95 hover:bg-[#1f1e1d] text-[#eaeaea] border border-white/20 hover:border-white/40 text-[11px] sm:text-xs md:text-sm font-medium backdrop-blur-md shadow-xl flex items-center gap-1 sm:gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive('Volver al Vestíbulo', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
              aria-label="Volver al vestíbulo central"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9b79c] shrink-0" />
              <span className="hidden sm:inline truncate">Volver al vestíbulo</span>
              <span className="sm:hidden truncate">Vestíbulo</span>
            </button>
          )}

          {currentScene === 'mural' && (
            <button
              onClick={() => onNavigate('vestibulo')}
              className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#121212]/95 hover:bg-[#1f1e1d] text-[#eaeaea] border border-white/20 text-[11px] sm:text-xs md:text-sm font-medium backdrop-blur-md shadow-xl flex items-center gap-1 sm:gap-2 transition-all cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive('Volver a la Casa', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <CornerDownLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9b79c] shrink-0" />
              <span className="hidden sm:inline truncate">Volver a la Casa</span>
              <span className="sm:hidden truncate">A la Casa</span>
            </button>
          )}
        </div>

        {/* 2. Columna Centro: Terminar experiencia (Mural Final) — Centrado y sin truncado */}
        <div className="pointer-events-auto flex-shrink-0 flex items-center justify-center px-1 nav-dock-col-center">
          {currentScene !== 'mural' && (
            isProgressComplete ? (
              <button
                onClick={onOpenMural}
                className="px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2.5 rounded-full bg-[#7a1e1e] hover:bg-[#962222] text-white border-2 border-[#e53935] text-[10px] sm:text-xs md:text-sm font-bold tracking-wide backdrop-blur-md shadow-[0_0_25px_rgba(229,57,53,0.75)] flex items-center gap-1 sm:gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer whitespace-nowrap"
                onMouseEnter={() => onHoverInteractive('Terminar experiencia (Mural Final)', true)}
                onMouseLeave={() => onHoverInteractive('', false)}
                title="Experiencia completada: Entrar al Mural Final"
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                <span className="hidden xl:inline">Terminar experiencia (Mural Final)</span>
                <span className="hidden sm:inline xl:hidden">Mural Final · Completado</span>
                <span className="sm:hidden">Mural Final (Completado)</span>
              </button>
            ) : (
              <button
                disabled
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-[#161514]/90 text-[#c9b79c] border border-white/20 text-[10px] sm:text-xs font-mono-archive backdrop-blur-md shadow-lg flex items-center gap-1 sm:gap-1.5 cursor-not-allowed opacity-90 select-none whitespace-nowrap"
                title="Este botón se desbloqueará una vez que recorras ambas secciones (escaleras y sótano)"
                onMouseEnter={() => onHoverInteractive('Mural Final: Se desbloquea al completar el recorrido', true)}
                onMouseLeave={() => onHoverInteractive('', false)}
              >
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9b79c] shrink-0" />
                <span className="hidden xl:inline">Mural Final · Se desbloquea al completar</span>
                <span className="hidden sm:inline xl:hidden">Mural: Al completar todo</span>
                <span className="sm:hidden">Mural (Al completar)</span>
              </button>
            )
          )}
        </div>

        {/* 3. Columna Derecha: Ir a las escaleras o al pasillo del sótano */}
        <div className="pointer-events-auto flex-1 flex items-center justify-end min-w-0 nav-dock-col-right">
          {currentScene === 'vestibulo' && (
            <button
              onClick={() => onNavigate('camino_a')}
              className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#1f1e1d] hover:bg-[#2c2a28] text-[#eaeaea] border border-white/20 hover:border-[#c9b79c] text-[11px] sm:text-xs md:text-sm font-medium backdrop-blur-md shadow-xl flex items-center gap-1 sm:gap-2 transition-all group cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive('Ir a Escaleras', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span className="hidden sm:inline truncate">Ir a las escaleras</span>
              <span className="sm:hidden truncate">Escaleras</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9b79c] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {currentScene === 'camino_a' && (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                onNavigate('camino_b');
              }}
              className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#7a1e1e] hover:bg-[#912424] text-white border border-[#e53935]/40 text-[11px] sm:text-xs md:text-sm font-medium backdrop-blur-md shadow-xl flex items-center gap-1 sm:gap-2 transition-all group cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive('Ir al Sótano', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span className="hidden xl:inline truncate">Continuar hacia el pasillo del sótano</span>
              <span className="hidden sm:inline xl:hidden truncate">Pasillo del sótano</span>
              <span className="sm:hidden truncate">Al Sótano</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {currentScene === 'camino_b' && (
            <button
              onClick={() => onNavigate('camino_a')}
              className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#1f1e1d] hover:bg-[#2c2a28] text-[#eaeaea] border border-white/20 text-[11px] sm:text-xs md:text-sm font-medium backdrop-blur-md shadow-xl flex items-center gap-1 sm:gap-2 transition-all group cursor-pointer max-w-full"
              onMouseEnter={() => onHoverInteractive('Ir a Escaleras', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <span className="hidden sm:inline truncate">Ir a las escaleras</span>
              <span className="sm:hidden truncate">Escaleras</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9b79c] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
