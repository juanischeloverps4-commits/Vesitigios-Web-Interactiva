import React from 'react';
import { SceneId } from '../types';
import { ArrowUpRight, Footprints, Video, Layers, Compass } from 'lucide-react';

interface VestibuleSceneProps {
  onSelectPath: (scene: SceneId) => void;
  onOpenLibraryModal?: () => void;
  onOpenVideoModal: () => void;
  visitedA: number;
  totalA: number;
  visitedB: number;
  totalB: number;
  completedPaths: { a: boolean; b: boolean };
  onHoverInteractive: (label: string, isEntering: boolean) => void;
}

export const VestibuleScene: React.FC<VestibuleSceneProps> = ({
  onSelectPath,
  onOpenLibraryModal,
  onOpenVideoModal,
  visitedA,
  totalA,
  visitedB,
  totalB,
  completedPaths,
  onHoverInteractive,
}) => {
  return (
    <div className="relative w-full min-h-screen pt-16 sm:pt-20 md:pt-24 pb-36 sm:pb-44 landscape:pt-16 landscape:pb-36 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-start sm:justify-center select-none overflow-y-auto custom-scrollbar">
      {/* Unified centered column: Eliminates giant empty gaps on tablets and prevents any vertical clipping */}
      <div className="w-full max-w-3xl lg:max-w-4xl flex flex-col items-center z-20 shrink-0 space-y-3 sm:space-y-4 my-auto landscape:my-2">
        {/* Title & Guide Lead */}
        <div className="text-center max-w-xl space-y-0.5 shrink-0">
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9.5px] sm:text-xs font-mono-archive text-[#c9b79c] shadow-sm">
              <Footprints className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e53935]" />
              <span>Vestíbulo Central · Punto de Bifurcación</span>
            </div>
          </div>

          <h2 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white tracking-wide uppercase">
            ELEGÍ TU RECORRIDO
          </h2>

          <p className="font-body text-xs sm:text-sm md:text-base text-[#eaeaea]/90 leading-relaxed max-w-xl mx-auto px-2">
            Estás en el vestíbulo principal de la Casa por la Memoria. Podés subir a las escaleras o bajar a los sótanos clandestinos en el orden que prefieras.
          </p>
        </div>

        {/* Interactive 2.5D Split Portals (Camino A vs Camino B) - En Celular Rotado (Landscape) se colocan lado a lado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-3.5 sm:gap-4 md:gap-6 w-full">
          {/* Camino A: Las Escaleras (Historias de Vida) */}
          <div
            onClick={() => onSelectPath('camino_a')}
            onMouseEnter={() => onHoverInteractive('Explorar Escaleras', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            className="group relative rounded-xl sm:rounded-2xl bg-[#141312]/95 border border-white/15 hover:border-[#c9b79c] p-2.5 sm:p-3 md:p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9b79c]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c9b79c]/10 transition-colors" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1 sm:mb-1.5">
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono-archive tracking-wider text-[#c9b79c] uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">
                  CAMINO A · ESCALERAS
                </span>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono-archive text-[#eaeaea] shrink-0">
                  <span>{visitedA}/{totalA} historias</span>
                  {completedPaths.a && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                  )}
                </div>
              </div>

              {/* Illustration */}
              <div className="h-8 sm:h-11 md:h-14 landscape:h-8 md:landscape:h-12 rounded-lg sm:rounded-xl bg-[#0a0908] border border-white/10 mb-1 sm:mb-1.5 p-1 sm:p-1.5 flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 240 100" className="w-full h-full text-[#c9b79c] opacity-80 group-hover:opacity-100 transition-opacity">
                  <path d="M20 90 L60 90 L60 70 L100 70 L100 50 L140 50 L140 30 L180 30 L180 15 L220 15" stroke="currentColor" strokeWidth="3" fill="none" />
                  <circle cx="50" cy="25" r="4.5" fill="#f59e0b" className="animate-pulse" />
                  <circle cx="110" cy="18" r="4.5" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '300ms' }} />
                  <circle cx="170" cy="12" r="4.5" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '600ms' }} />
                </svg>
              </div>

              <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-white mb-1 group-hover:text-amber-300 transition-colors leading-tight">
                Las Escaleras · Historias de Vida
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#eaeaea]/90 leading-normal mb-2 line-clamp-2">
                Conocé a Sara y Pedro, la restitución de identidad de Guillermo Amarilla Molfino (Nieto 98) y los testimonios de vida.
              </p>
            </div>

            {/* Botón táctil llamativo y visible */}
            <div className="mt-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] border-2 border-amber-300/80 flex items-center justify-between text-xs sm:text-sm font-display font-bold text-white uppercase tracking-normal sm:tracking-wider transition-all shadow-[0_0_18px_rgba(245,158,11,0.55)] group-hover:scale-[1.02] w-full shrink-0">
              <span className="truncate">Continuar a las escaleras</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-1" />
            </div>
          </div>

          {/* Camino B: El Pasillo y el Sótano */}
          <div
            onClick={() => onSelectPath('camino_b')}
            onMouseEnter={() => onHoverInteractive('Explorar Sótano', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            className="group relative rounded-xl sm:rounded-2xl bg-[#141312]/95 border border-white/15 hover:border-white/40 p-2.5 sm:p-3 md:p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1 sm:mb-1.5">
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono-archive tracking-wider text-[#eaeaea] uppercase px-1.5 py-0.5 rounded bg-white/10 border border-white/20 shrink-0">
                  CAMINO B · SÓTANOS
                </span>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono-archive text-[#eaeaea] shrink-0">
                  <span>{visitedB}/{totalB} evidencias</span>
                  {completedPaths.b && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                  )}
                </div>
              </div>

              {/* Illustration: Vector Isométrico del Sótano Clandestino (SB1 y SB2 sin escaleras superpuestas) */}
              <div className="h-8 sm:h-11 md:h-14 landscape:h-8 md:landscape:h-12 rounded-lg sm:rounded-xl bg-[#0a0908] border border-white/10 mb-1 sm:mb-1.5 p-1 sm:p-1.5 flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 240 100" className="w-full h-full text-[#e53935] opacity-85 group-hover:opacity-100 transition-opacity">
                  {/* Sótano Mayor (SB1) - Bóveda isométrica subterránea principal */}
                  <polygon
                    points="50,54 88,34 126,54 88,74"
                    fill="rgba(229,57,53,0.18)"
                    stroke="#e53935"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="50,54 50,74 88,94 88,74"
                    fill="rgba(229,57,53,0.28)"
                    stroke="#e53935"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="88,74 88,94 126,74 126,54"
                    fill="rgba(229,57,53,0.12)"
                    stroke="#e53935"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Pasaje conector entre sótanos */}
                  <line
                    x1="115"
                    y1="46"
                    x2="138"
                    y2="35"
                    stroke="#c9b79c"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />

                  {/* Sótano Menor (SB2) - Celda de detención isométrica contigua */}
                  <polygon
                    points="138,35 166,21 194,35 166,49"
                    fill="rgba(245,158,11,0.18)"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="138,35 138,53 166,67 166,49"
                    fill="rgba(245,158,11,0.28)"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="166,49 166,67 194,53 194,35"
                    fill="rgba(245,158,11,0.12)"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />

                  {/* Tipografía técnica arquitectónica */}
                  <text
                    x="88"
                    y="57"
                    fill="#ffffff"
                    fontSize="7.5"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                    letterSpacing="0.5"
                  >
                    SB1 MAYOR
                  </text>
                  <text
                    x="166"
                    y="38"
                    fill="#ffffff"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                    letterSpacing="0.5"
                  >
                    SB2 MENOR
                  </text>

                  {/* 2 Nodos lumínicos de evidencia forense sobre los sótanos */}
                  <circle
                    cx="88"
                    cy="20"
                    r="4.5"
                    fill="#e53935"
                    className="animate-pulse"
                  />
                  <circle
                    cx="166"
                    cy="10"
                    r="4.5"
                    fill="#f59e0b"
                    className="animate-pulse"
                    style={{ animationDelay: '400ms' }}
                  />
                </svg>
              </div>

              <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-white mb-1 group-hover:text-red-300 transition-colors leading-tight">
                El Pasillo y el Sótano · Arquitectura
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#eaeaea]/90 leading-normal mb-2 line-clamp-2">
                Descubrí los sótanos clandestinos (SB1 y SB2) y las frases reales talladas en el concreto rescatadas por el EAAF.
              </p>
            </div>

            {/* Botón táctil llamativo y visible */}
            <div className="mt-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#b91c1c] to-[#e53935] hover:from-[#991b1b] hover:to-[#b91c1c] border-2 border-red-300/80 flex items-center justify-between text-xs sm:text-sm font-display font-bold text-white uppercase tracking-normal sm:tracking-wider transition-all shadow-[0_0_18px_rgba(229,57,53,0.55)] group-hover:scale-[1.02] w-full shrink-0">
              <span className="truncate">Continuar al sótano</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-1" />
            </div>
          </div>
        </div>

        {/* Epígrafe sin espacios vacíos por debajo ni por arriba */}
        <div className="max-w-md md:max-w-lg w-full py-1.5 px-3.5 rounded-lg bg-black/60 border border-white/10 text-center text-xs sm:text-sm text-[#c9b79c] font-mono-archive shadow-lg shrink-0 hidden sm:block landscape:hidden md:landscape:block">
          <span className="text-white/70">Epígrafe:</span> Relevamiento de planta baja de la ex Brigada de Investigaciones (Libro "El Golpe"). Escaleras (Camino A) y pasillo central hacia los sótanos tapiados (Camino B).
        </div>
      </div>
    </div>
  );
};
