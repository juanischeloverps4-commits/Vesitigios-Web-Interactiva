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
    <div className="relative w-full h-[100dvh] max-h-[100dvh] pt-12 sm:pt-14 md:pt-16 pb-14 sm:pb-16 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Unified centered column: Eliminates giant empty gaps on tablets and prevents any vertical scroll */}
      <div className="w-full max-w-3xl lg:max-w-4xl flex flex-col items-center my-auto z-20 shrink-0 space-y-1.5 sm:space-y-2 md:space-y-3">
        {/* Title & Guide Lead */}
        <div className="text-center max-w-xl space-y-0.5 shrink-0">
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9.5px] sm:text-xs font-mono-archive text-[#c9b79c] shadow-sm">
              <Footprints className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e53935]" />
              <span>Vestíbulo Central · Punto de Bifurcación</span>
            </div>
          </div>

          <h2 className="font-display font-black text-sm sm:text-lg md:text-2xl text-white tracking-wide uppercase">
            ELEGÍ TU RECORRIDO
          </h2>

          <p className="font-body text-[10px] sm:text-xs text-[#eaeaea]/85 leading-relaxed max-w-md mx-auto line-clamp-1 sm:line-clamp-2 hidden sm:block landscape:hidden md:landscape:block">
            Estás parado en el vestíbulo principal. Desde acá podés subir por las escaleras hacia las historias humanas de las víctimas o bajar por el pasillo hacia los sótanos clandestinos. Podés recorrer ambos caminos en el orden que prefieras.
          </p>
        </div>

        {/* Interactive 2.5D Split Portals (Camino A vs Camino B) - En Celular Rotado (Landscape) se colocan lado a lado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full">
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

              <h3 className="font-display font-bold text-xs sm:text-sm md:text-base text-white mb-0.5 group-hover:text-[#c9b79c] transition-colors leading-tight">
                Las Escaleras · Historias de Vida
              </h3>
              <p className="font-body text-[9px] sm:text-xs text-[#eaeaea]/80 leading-relaxed mb-1 line-clamp-1 sm:line-clamp-2 landscape:line-clamp-1 md:landscape:line-clamp-2">
                Conocé a Sara y Pedro, la restitución de identidad de Guillermo Amarilla Molfino (Nieto 98) y los testimonios de vida.
              </p>
            </div>

            {/* Botón táctil con superposición transparente interactiva */}
            <div className="mt-0.5 sm:mt-1 px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 hover:bg-[#c9b79c]/20 active:bg-[#c9b79c]/30 border border-white/10 hover:border-[#c9b79c]/50 flex items-center justify-between text-[10px] sm:text-xs font-mono-archive text-[#c9b79c] group-hover:text-white transition-all shadow-sm">
              <span>Continuar a las escaleras</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c9b79c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Camino B: El Pasillo y el Sótano */}
          <div
            onClick={() => onSelectPath('camino_b')}
            onMouseEnter={() => onHoverInteractive('Explorar Sótano', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            className="group relative rounded-xl sm:rounded-2xl bg-[#141312]/95 border border-white/15 hover:border-[#7a1e1e] p-2.5 sm:p-3 md:p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(122,30,30,0.4)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7a1e1e]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#7a1e1e]/20 transition-colors" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1 sm:mb-1.5">
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono-archive tracking-wider text-[#e53935] uppercase px-1.5 py-0.5 rounded bg-[#7a1e1e]/20 border border-[#7a1e1e]/40 shrink-0">
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

              <h3 className="font-display font-bold text-xs sm:text-sm md:text-base text-white mb-0.5 group-hover:text-[#e53935] transition-colors leading-tight">
                El Pasillo y el Sótano · Arquitectura
              </h3>
              <p className="font-body text-[9px] sm:text-xs text-[#eaeaea]/80 leading-relaxed mb-1 line-clamp-1 sm:line-clamp-2 landscape:line-clamp-1 md:landscape:line-clamp-2">
                Descubrí los sótanos clandestinos (SB1 y SB2) y las frases reales talladas en el concreto rescatadas por el EAAF.
              </p>
            </div>

            {/* Botón táctil con superposición transparente interactiva */}
            <div className="mt-0.5 sm:mt-1 px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#7a1e1e]/20 hover:bg-[#7a1e1e]/40 active:bg-[#7a1e1e]/60 border border-[#e53935]/30 hover:border-[#e53935]/70 flex items-center justify-between text-[10px] sm:text-xs font-mono-archive text-[#e53935] group-hover:text-white transition-all shadow-sm">
              <span>Continuar al sótano</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#e53935] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Epígrafe sin espacios vacíos por debajo ni por arriba */}
        <div className="max-w-md md:max-w-lg w-full py-1 px-3 rounded-lg bg-black/60 border border-white/10 text-center text-[9px] sm:text-[10px] text-[#c9b79c] font-mono-archive shadow-lg shrink-0 hidden sm:block landscape:hidden md:landscape:block">
          <span className="text-white/60">Epígrafe:</span> Relevamiento de planta baja de la ex Brigada de Investigaciones (Libro "El Golpe"). Escaleras (Camino A) y pasillo central hacia los sótanos tapiados (Camino B).
        </div>
      </div>
    </div>
  );
};
