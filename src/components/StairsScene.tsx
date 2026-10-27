import React, { useState, useEffect } from 'react';
import { TESTIMONIAL_PIECES } from '../data/vestigiosData';
import { TestimonialPiece } from '../types';
import { Eye, FileCheck, CheckCircle2, ChevronRight, Sparkles, HelpCircle, ArrowLeft, Users, ShieldAlert, Scale } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface StairsSceneProps {
  visitedPieces: Set<string>;
  onSelectPiece: (piece: TestimonialPiece) => void;
  onHoverInteractive: (label: string, isEntering: boolean) => void;
}

export const StairsScene: React.FC<StairsSceneProps> = ({
  visitedPieces,
  onSelectPiece,
  onHoverInteractive,
}) => {
  // Navigation by 3 topics first (as requested in Point 2 of PDF)
  const [selectedTopic, setSelectedTopic] = useState<'vida' | 'saqueo' | 'resistencia' | null>(null);
  const [showDidacticBox, setShowDidacticBox] = useState<boolean>(true);

  // Always scroll to the top upon entering Stairs scene
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handlePieceClick = (piece: TestimonialPiece) => {
    audioSystem.playInspectClick();
    onSelectPiece(piece);
  };

  // Group pieces into the 3 topics
  const topicPieces = {
    vida: TESTIMONIAL_PIECES.filter(p => p.id === 'ayala-morel' || p.id === 'amarilla-molfino'),
    saqueo: TESTIMONIAL_PIECES.filter(p => p.id === 'saqueo-material'),
    resistencia: TESTIMONIAL_PIECES.filter(p => p.id === 'represor-delatado'),
  };

  const currentPieces = selectedTopic ? topicPieces[selectedTopic] : [];

  return (
    <div className="relative w-full min-h-screen pt-12 sm:pt-14 pb-16 px-3 sm:px-6 flex flex-col items-center justify-start select-none">
      {/* Ceiling Hanging String Bulbs - Compact */}
      <div className="w-full max-w-6xl mx-auto flex justify-between px-6 pointer-events-none mb-1">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px h-2 sm:h-4 bg-white/20" />
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#fcd34d] shadow-[0_0_12px_#f59e0b] animate-pulse"
              style={{ animationDuration: `${2.2 + (i % 3) * 0.4}s` }}
            />
          </div>
        ))}
      </div>

      {/* Header text */}
      <div className="max-w-6xl mx-auto w-full z-20 mb-2 sm:mb-2.5 flex flex-col md:flex-row md:items-end justify-between gap-2.5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-archive text-[#c9b79c] mb-1">
            <Eye className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Camino A · Pared de las Escaleras y Pasillo</span>
          </div>
          <h2 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-wide">
            {selectedTopic === null ? 'HISTORIAS DE VIDA & EVIDENCIAS' : selectedTopic === 'vida' ? 'TÓPICO 1: TESTIMONIOS DE VIDA' : selectedTopic === 'saqueo' ? 'TÓPICO 2: EL SAQUEO MATERIAL' : 'TÓPICO 3: EXPEDIENTES JUDICIALES'}
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#fcd34d] font-medium max-w-xl mt-0.5">
            {selectedTopic === null
              ? 'Para recorrer sin saturarte, elegí uno de los 3 tópicos temáticos para adentrarte en sus testimonios y actas judiciales.'
              : 'Hacé clic sobre cada cuadro para abrir la viñeta de testimonio con las declaraciones de la Causa Caballero.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-auto">
          {/* Back to 3 Topics button when inside a topic */}
          {selectedTopic !== null && (
            <button
              onClick={() => {
                audioSystem.playInspectClick();
                setSelectedTopic(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#1a1918] hover:bg-[#272523] border border-white/20 text-xs font-mono-archive text-[#eaeaea] flex items-center gap-2 transition-colors cursor-pointer"
              onMouseEnter={() => onHoverInteractive('Ver los 3 Tópicos', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <ArrowLeft className="w-4 h-4 text-[#c9b79c]" />
              <span>Volver a los 3 tópicos</span>
            </button>
          )}
        </div>
      </div>

      {/* Didactic Context Banner */}
      {showDidacticBox && (
        <div className="max-w-6xl mx-auto w-full z-20 mb-2 sm:mb-2.5 p-2.5 sm:p-3 rounded-xl bg-[#141312] border border-[#c9b79c]/30 text-xs font-mono-archive text-[#eaeaea] relative flex flex-col md:flex-row items-start md:items-center justify-between gap-2 shadow-lg">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#e53935] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-white font-bold uppercase tracking-wide text-[11px]">
                Guía de Memoria: ¿Qué es un delito de lesa humanidad?
              </span>
              <p className="text-[11px] font-body text-[#c9b79c] leading-relaxed">
                Son crímenes masivos y sistemáticos cometidos desde el propio Estado (como secuestros, torturas, desaparición forzada de personas y robo de bebés). Por su gravedad atroz contra la dignidad humana, la ley internacional establece que <strong className="text-white">nunca prescriben</strong> y no pueden ser perdonados ni amnistiados.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDidacticBox(false)}
            className="text-[10px] text-white/50 hover:text-white underline shrink-0 cursor-pointer"
          >
            Ocultar guía
          </button>
        </div>
      )}

      {/* VISTA 1: 3 GRANDES TÓPICOS TEMÁTICOS (Punto 2 de jis correcciones.pdf) */}
      {selectedTopic === null ? (
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 z-20 mt-1 mb-2">
          {/* Tópico 1: Testimonios de Vida */}
          <div
            onClick={() => {
              audioSystem.playInspectClick();
              setSelectedTopic('vida');
            }}
            onMouseEnter={() => onHoverInteractive('Explorar Tópico 1', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            className="aura-item group p-3.5 sm:p-4 rounded-2xl bg-[#151413] border border-white/15 hover:border-[#c9b79c] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono-archive tracking-widest text-[#c9b79c] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  TÓPICO 1 · 2 HISTORIAS
                </span>
                <Users className="w-4 h-4 text-[#c9b79c] group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="font-display font-black text-lg sm:text-xl text-white mb-1.5 group-hover:text-[#c9b79c] transition-colors">
                Testimonios de Vida
              </h3>

              <p className="font-body text-xs sm:text-sm text-[#eaeaea]/90 leading-relaxed mb-2.5">
                La solidaridad en cautiverio de Gerardo Delgado y el rescate de Viviana Morel; y la restitución de identidad de Guillermo Martín Amarilla Molfino (Nieto 98).
              </p>

              {/* Avatares con fotos reales de los Testimonios */}
              <div className="flex items-center gap-2 mb-3 p-1.5 rounded-xl bg-black/40 border border-white/10">
                <div className="flex -space-x-2 overflow-hidden">
                  <img src="/assets/aistudio/MOREL_098e2180.png" alt="Familia Morel" className="inline-block h-7 w-7 rounded-full ring-2 ring-[#7a1e1e] object-cover object-top grayscale" />
                  <img src="/assets/aistudio/Delgado_HD_7abc2798.png" alt="Gerardo Delgado" className="inline-block h-7 w-7 rounded-full ring-2 ring-[#7a1e1e] object-cover object-top grayscale" />
                  <img src="/assets/aistudio/AMARILLA_e11dc7ad.png" alt="Guillermo Amarilla" className="inline-block h-7 w-7 rounded-full ring-2 ring-[#7a1e1e] object-cover object-top grayscale" />
                </div>
                <span className="text-xs font-mono-archive text-[#c9b79c]">Delgado & Morel · Amarilla Molfino</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono-archive text-[#c9b79c] group-hover:text-white">
              <span>Ingresar a los testimonios</span>
              <ChevronRight className="w-4 h-4 text-[#e53935] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tópico 2: El Saqueo Material */}
          <div
            onClick={() => {
              audioSystem.playInspectClick();
              setSelectedTopic('saqueo');
            }}
            onMouseEnter={() => onHoverInteractive('Explorar Tópico 2', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            className="aura-item group p-3.5 sm:p-4 rounded-2xl bg-[#151413] border border-white/15 hover:border-[#c9b79c] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono-archive tracking-widest text-[#e53935] uppercase px-2 py-0.5 rounded bg-[#7a1e1e]/20 border border-[#7a1e1e]/40">
                  TÓPICO 2 · BOTÍN DE GUERRA
                </span>
                <Scale className="w-4 h-4 text-[#e53935] group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="font-display font-black text-lg sm:text-xl text-white mb-1.5 group-hover:text-[#e53935] transition-colors">
                El Saqueo Material
              </h3>

              <p className="font-body text-xs sm:text-sm text-[#eaeaea]/90 leading-relaxed mb-2.5 line-clamp-3">
                El mito de la "gesta patriótica" contra la realidad del robo: los grupos de tareas robaban cuadros artísticos y muebles de las casas secuestradas para decorar los despachos policiales de la Brigada.
              </p>

              {/* Avatares con fotos de Testimonios del Saqueo */}
              <div className="flex items-center gap-2 mb-3 p-1.5 rounded-xl bg-black/40 border border-white/10">
                <div className="flex -space-x-2 overflow-hidden">
                  <img src="/assets/aistudio/teresa_presa_HD_a6a115b1.png" alt="Teresa Presa" className="inline-block h-7 w-7 rounded-full ring-2 ring-[#e53935] object-cover object-top grayscale" />
                  <img src="/assets/aistudio/silvia_robles_HD_5bf4740c.png" alt="Silvia Robles" className="inline-block h-7 w-7 rounded-full ring-2 ring-[#e53935] object-cover object-top grayscale" />
                </div>
                <span className="text-[10px] font-mono-archive text-[#c9b79c]">Teresa Presa · Silvia Robles</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono-archive text-[#c9b79c] group-hover:text-white">
              <span>Ingresar a las pruebas</span>
              <ChevronRight className="w-4 h-4 text-[#e53935] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tópico 3: El Policía que Dijo NO */}
          <div
            onClick={() => {
              audioSystem.playInspectClick();
              setSelectedTopic('resistencia');
            }}
            onMouseEnter={() => onHoverInteractive('Explorar Tópico 3', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            className="aura-item group p-3.5 sm:p-4 rounded-2xl bg-[#151413] border border-white/15 hover:border-[#c9b79c] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono-archive tracking-widest text-[#c9b79c] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  TÓPICO 3 · EXPEDIENTE JUDICIAL
                </span>
                <ShieldAlert className="w-4 h-4 text-[#c9b79c] group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="font-display font-black text-lg sm:text-xl text-white mb-1.5 group-hover:text-[#c9b79c] transition-colors">
                Los Legajos Oficiales
              </h3>

              <p className="font-body text-xs sm:text-sm text-[#eaeaea]/90 leading-relaxed mb-2.5 line-clamp-3">
                Decían ser simples administrativos, pero sus legajos oficiales desclasificados los felicitaban por escrito por su "labor contrasubversiva" en la ex Brigada.
              </p>

              {/* Avatares de Legajos de Represores */}
              <div className="flex items-center gap-2 mb-3 p-1.5 rounded-xl bg-black/40 border border-white/10">
                <div className="flex -space-x-2 overflow-hidden">
                  <img src="/assets/aistudio/Jose_rodriguez_Valiente_HD_4f998583.png" alt="Rodríguez Valiente" className="inline-block h-7 w-7 rounded-full ring-2 ring-white/30 object-cover object-top grayscale" />
                  <img src="/assets/aistudio/Ramon_Meza_HD_7e8aa7e0.png" alt="Ramón Meza" className="inline-block h-7 w-7 rounded-full ring-2 ring-white/30 object-cover object-[50%_55%] grayscale" />
                </div>
                <span className="text-xs font-mono-archive text-[#c9b79c]">Rodríguez Valiente · Ramón Meza</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono-archive text-[#c9b79c] group-hover:text-white">
              <span>Ingresar al expediente</span>
              <ChevronRight className="w-4 h-4 text-[#e53935] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ) : (
        /* VISTA 2: DESPLIEGUE ESPECÍFICO DEL TÓPICO SELECCIONADO */
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-20 animate-fadeIn">
          {currentPieces.map((piece) => {
            const isVisited = visitedPieces.has(piece.id);

            return (
              <div
                key={piece.id}
                onClick={() => handlePieceClick(piece)}
                onMouseEnter={() => onHoverInteractive('Inspeccionar Pieza', true)}
                onMouseLeave={() => onHoverInteractive('', false)}
                className="aura-item group relative rounded-xl bg-[#151413] border border-white/15 hover:border-[#c9b79c] p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[350px]"
              >
                {/* Visited status ribbon */}
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono-archive">
                  <span className="text-[#c9b79c] uppercase tracking-wider">
                    {piece.category.replace('_', ' ')}
                  </span>
                  {isVisited ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Leído</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-white/40">
                      <Eye className="w-3.5 h-3.5 text-[#e53935]" />
                      <span>Por explorar</span>
                    </span>
                  )}
                </div>

                {/* Archival Frame / Photo Preview with Authentic Image */}
                <div className="relative aspect-[16/10] w-full rounded-lg bg-[#0a0908] border border-white/10 mb-3 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                  {piece.image ? (
                    <>
                      <img
                        src={piece.image}
                        alt={piece.person}
                        className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
                  )}
                  
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-[#7a1e1e]/90 text-[9px] font-mono-archive uppercase text-white tracking-widest border border-[#e53935]/40 backdrop-blur-sm">
                    {piece.year}
                  </div>

                  {/* Secondary thumbnail if there is a second person in this testimony */}
                  {piece.secondaryImage && (
                    <div className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full overflow-hidden border border-white/60 shadow-lg bg-black group-hover:scale-110 transition-transform">
                      <img
                        src={piece.secondaryImage}
                        alt={piece.secondaryPerson || ''}
                        className={`w-full h-full object-cover ${
                          piece.secondaryImage.includes('Ramon_Meza') ? 'object-[50%_55%]' : 'object-top'
                        } filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300`}
                      />
                    </div>
                  )}

                  <div className="z-10 space-y-1 mt-auto pb-1">
                    <div className="text-white font-display font-black text-base sm:text-lg leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {piece.person}
                    </div>
                    <div className="text-xs text-[#c9b79c] font-mono-archive line-clamp-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {piece.subtitle}
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 z-10 text-[10px] text-white/80 font-mono-archive flex items-center gap-1 bg-black/75 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    <FileCheck className="w-3 h-3 text-[#c9b79c]" />
                    <span>Causa Caballero</span>
                  </div>
                </div>

                {/* Epígrafe visible */}
                <div className="text-xs font-mono-archive text-[#c9b79c] line-clamp-2 mb-2 italic">
                  {piece.caption}
                </div>

                {/* Text Snippet / Quote */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#c9b79c] transition-colors leading-snug">
                    {piece.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#eaeaea]/90 line-clamp-2 leading-relaxed">
                    {piece.quote}
                  </p>
                </div>

                {/* Footer CTA */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono-archive font-bold text-[#c9b79c] group-hover:text-white">
                  <span>Abrir viñeta completa</span>
                  <ChevronRight className="w-4 h-4 text-[#e53935] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
