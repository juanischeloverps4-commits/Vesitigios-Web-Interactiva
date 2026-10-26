import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BASEMENT_EVIDENCE } from '../data/vestigiosData';
import { BasementEvidence } from '../types';
import { ShieldAlert, ZoomIn, CheckCircle2, HelpCircle, FileText, Sparkles, MapPin, Layers, X, ChevronDown } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface BasementSceneProps {
  visitedEvidence: Set<string>;
  onSelectEvidence: (evidence: BasementEvidence) => void;
  onMarkEvidenceVisited: (evidenceId: string) => void;
  onHoverInteractive: (label: string, isEntering: boolean) => void;
  isAudioActive: boolean;
}

export const BasementScene: React.FC<BasementSceneProps> = ({
  visitedEvidence,
  onSelectEvidence,
  onMarkEvidenceVisited,
  onHoverInteractive,
  isAudioActive,
}) => {
  const [zoomedPhrase, setZoomedPhrase] = useState<BasementEvidence | null>(null);
  const [sectorEnlargeModal, setSectorEnlargeModal] = useState<'sb1' | 'sb2' | null>(null);
  const [lightOn, setLightOn] = useState<boolean>(true);
  const [showDidacticBox, setShowDidacticBox] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [hoveredSector, setHoveredSector] = useState<'sb1' | 'sb2' | null>(null);

  // Always scroll to the very top upon entering the basement scene
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Rhythmic basement flickering light
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const willTurnOff = Math.random() < 0.25;
      if (willTurnOff) {
        setLightOn(false);
        const restoreTimeout = setTimeout(() => {
          setLightOn(true);
        }, 120 + Math.random() * 280);
        return () => clearTimeout(restoreTimeout);
      }
    }, 2800);

    return () => clearInterval(flickerInterval);
  }, []);

  const handlePhraseClick = (evidence: BasementEvidence) => {
    audioSystem.playInspectClick();
    setZoomedPhrase(evidence);
    onMarkEvidenceVisited(evidence.id);
  };

  const handleCloseZoom = () => {
    setZoomedPhrase(null);
  };

  const phrases = BASEMENT_EVIDENCE.filter(e => e.type === 'frase_concreto');

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (zoomedPhrase || sectorEnlargeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomedPhrase, sectorEnlargeModal]);

  // Atmospheric Header & Warning info
  return (
    <div className="relative w-full min-h-screen pt-20 pb-28 px-4 md:px-8 flex flex-col items-center select-none space-y-6">
      {/* Downward Scroll Indicator (Fades out when scrolled) - In front of all boxes with z-50 */}
      {!hasScrolled && (
        <div
          onClick={() => window.scrollBy({ top: 400, behavior: 'smooth' })}
          className="fixed bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex flex-col items-center gap-1 transition-all duration-300 animate-bounce cursor-pointer group select-none"
        >
          <div className="text-[10px] sm:text-xs font-mono-archive text-white uppercase tracking-wider bg-[#141211]/95 px-4 py-1.5 rounded-full border border-[#e53935]/80 group-hover:border-[#e53935] backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.95)] flex items-center gap-2 transition-all">
            <span>Deslizá hacia abajo para explorar</span>
            <ChevronDown className="w-4 h-4 text-[#e53935]" />
          </div>
        </div>
      )}

      {/* Background Concrete Basement Wall Texture */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          lightOn ? 'opacity-90' : 'opacity-15'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, #1f1d1b 0%, #100f0e 60%, #070605 100%)',
        }}
      />

      {/* Atmospheric Header & Warning info */}
      <div className="max-w-6xl mx-auto w-full z-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7a1e1e]/30 border border-[#7a1e1e]/60 text-xs font-mono-archive text-[#e53935] mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#e53935]" />
            <span>Camino B · Sótanos Clandestinos SB1 y SB2 (1975-1978)</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-wide">
            LA ARQUITECTURA DEL TERROR
          </h2>

          <p className="font-body text-xs sm:text-sm text-[#c9b79c] max-w-2xl mt-1 leading-relaxed">
            Explorá la maqueta del edificio con la ubicación exacta de los dos sótanos (SB1 y SB2), las inscripciones reales y los elementos de tormento hallados bajo los escombros.
          </p>
        </div>
      </div>

      {/* Guide Didactic Box */}
      {showDidacticBox && (
        <div className="max-w-6xl mx-auto w-full z-20 p-4 rounded-xl bg-[#141211] border border-[#7a1e1e]/50 text-xs font-mono-archive text-[#eaeaea] relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#e53935] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-white font-bold uppercase tracking-wide">
                Guía de Memoria: ¿ ¿POR QUÉ ESTE SÓTANO DEMUESTRA LA EXISTENCIA DEL CENTRO CLANDESTINO??
              </span>
              <p className="text-[11px] font-body text-[#c9b79c] leading-relaxed">
                En 1978, al trasladar la Brigada de Investigaciones, la policía rellenó los sótanos con escombros y modificó la estructura del edificio para ocultar el centro clandestino de detención y garantizar su impunidad. En febrero de 2008, el Equipo Argentino de Antropología Forense (EAAF) excavó el lugar y descubrió el sótano tapiado, hallando una picana a pila, restos de instalaciones eléctricas e inscripciones de resistencia grabadas en los muros por las personas detenidas-desaparecidas, como “La sangre derramada no será negociada”. El intento de borrar toda huella material constituye una prueba fundamental del plan sistemático de ocultamiento montado por el terrorismo de Estado.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDidacticBox(false)}
            className="text-[10px] text-white/50 hover:text-white underline shrink-0 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Modal para Agrandar Fotografía de Sectores SB1 y SB2 (Renderizado en document.body para centrado absoluto en viewport) */}
      {sectorEnlargeModal && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setSectorEnlargeModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#121212] border-2 border-[#7a1e1e] rounded-2xl p-4 sm:p-6 text-[#eaeaea] shadow-[0_0_70px_rgba(122,30,30,0.8)] space-y-4 animate-scaleUp cursor-default overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-archive uppercase px-2 py-0.5 rounded bg-[#7a1e1e] text-white font-bold tracking-widest">
                    REGISTRO FOTOGRÁFICO CPM CHACO
                  </span>
                  <span className="text-[11px] font-mono-archive text-[#c9b79c]">
                    Excavación Forense EAAF 2008
                  </span>
                </div>
                <h3 className="font-display font-black text-lg sm:text-2xl text-white mt-1">
                  {sectorEnlargeModal === 'sb1'
                    ? 'SÓTANO MAYOR (SB1) — FOTOGRAFÍA FORENSE AMPLIADA'
                    : 'SÓTANO MENOR (SB2) — FOTOGRAFÍA FORENSE AMPLIADA'}
                </h3>
              </div>

              {/* Selector entre SB1 y SB2 + Botón de Cerrar */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="inline-flex rounded-lg bg-black/60 p-1 border border-white/15 text-xs font-mono-archive">
                  <button
                    onClick={() => {
                      audioSystem.playInspectClick();
                      setSectorEnlargeModal('sb1');
                      onMarkEvidenceVisited('sb1');
                      onMarkEvidenceVisited('sb2');
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      sectorEnlargeModal === 'sb1'
                        ? 'bg-[#7a1e1e] text-white font-bold shadow'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    SB1 (Mayor)
                  </button>
                  <button
                    onClick={() => {
                      audioSystem.playInspectClick();
                      setSectorEnlargeModal('sb2');
                      onMarkEvidenceVisited('sb1');
                      onMarkEvidenceVisited('sb2');
                    }}
                    className={`px-3 py-1 rounded transition-colors ${
                      sectorEnlargeModal === 'sb2'
                        ? 'bg-[#7a1e1e] text-white font-bold shadow'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    SB2 (Menor)
                  </button>
                </div>
                <button
                  onClick={() => {
                    audioSystem.playInspectClick();
                    setSectorEnlargeModal(null);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Cerrar imagen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Fotografía de Alta Resolución del Sector */}
            <div className="w-full rounded-xl overflow-hidden bg-black border border-white/20 p-1.5 sm:p-2 flex items-center justify-center relative shadow-inner">
              <img
                src={
                  sectorEnlargeModal === 'sb1'
                    ? 'https://i.ibb.co/GfYwsY6v/SOTANO-MAYOR-SB1-IMAGEN-DE-LA-COMISI-N-PROVINCIAL-POR-LA-MEMORIA.png'
                    : 'https://i.ibb.co/k6SCJVww/sotano-menos-sb2-imagen-de-la-comision-provincial-por-la-memoria.png'
                }
                alt={
                  sectorEnlargeModal === 'sb1'
                    ? 'Sótano Mayor SB1 - Registro Fotográfico de la Comisión Provincial por la Memoria'
                    : 'Sótano Menor SB2 - Registro Fotográfico de la Comisión Provincial por la Memoria'
                }
                className="w-full h-auto max-h-[68vh] object-contain rounded"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src =
                    sectorEnlargeModal === 'sb1'
                      ? '/sotano-mayor-sb1.png'
                      : '/sotano-menor-sb2.png';
                }}
              />
            </div>

            {/* Epígrafe y descripción */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-archive text-[#c9b79c] pt-2 border-t border-white/10">
              <p>
                {sectorEnlargeModal === 'sb1'
                  ? 'Epígrafe: Sector SB1 (Sótano Mayor) desenterrado por el EAAF. Se aprecian las huellas de los falsos tabiques, escombros y aislaciones.'
                  : 'Epígrafe: Sector SB2 (Sótano Menor) celda de aislamiento donde se hallaron las inscripciones talladas sobre el revoque original.'}
              </p>
              <button
                onClick={() => setSectorEnlargeModal(null)}
                className="px-5 py-2 rounded-lg bg-[#7a1e1e] hover:bg-[#8f2323] text-white font-bold transition-colors shrink-0 self-end sm:self-auto shadow-md cursor-pointer"
              >
                Cerrar ampliación
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Zoom In Modal on Concrete Phrase - Muestra la Fotografía Pericial Real de la Frase (Renderizado en document.body para centrado absoluto) */}
      {zoomedPhrase && typeof document !== 'undefined' && createPortal(
        <div
          onClick={handleCloseZoom}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-scaleUp cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-[#141211] border-2 border-[#7a1e1e] shadow-[0_0_60px_rgba(122,30,30,0.8)] space-y-3 sm:space-y-4 cursor-default my-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-archive uppercase tracking-widest text-[#e53935] px-2.5 py-1 rounded bg-[#7a1e1e]/30 border border-[#7a1e1e] font-bold">
                  RELEVAMIENTO FOTOGRÁFICO DE LA INSCRIPCIÓN
                </span>
                <span className="text-[10px] font-mono-archive text-[#c9b79c]">
                  CPM Chaco · EAAF 2008
                </span>
              </div>
              <button
                onClick={handleCloseZoom}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Cerrar foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Foto Real de la Inscripción con Escala Forense */}
            <div className="w-full rounded-xl overflow-hidden bg-black border border-white/20 shadow-2xl flex items-center justify-center p-2 relative">
              <img
                src={zoomedPhrase.image}
                alt={zoomedPhrase.title}
                className="w-full h-auto max-h-[55vh] object-contain rounded filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src =
                    zoomedPhrase.id === 'frase-sangre'
                      ? '/inscripcion-sangre-derramada.png'
                      : '/inscripcion-firmeza-y-luz.png';
                }}
              />
            </div>

            {/* Frase y epígrafe */}
            <div className="text-center py-1">
              <h2 className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                {zoomedPhrase.quote}
              </h2>
              <p className="text-xs text-[#c9b79c] font-mono-archive mt-1">
                {zoomedPhrase.caption}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-archive text-[#c9b79c]">
              <button
                onClick={() => {
                  audioSystem.playInspectClick();
                  handleCloseZoom();
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                Cerrar foto
              </button>
              <button
                onClick={() => {
                  audioSystem.playInspectClick();
                  const p = zoomedPhrase;
                  setZoomedPhrase(null);
                  if (p) {
                    onSelectEvidence(p);
                  }
                }}
                className="px-5 py-2 rounded-lg bg-[#7a1e1e] hover:bg-[#8f2323] text-white font-bold transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Ver ficha del peritaje judicial</span>
                <span>›</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full z-20 space-y-8">
        {/* PARTE 1: VECTOR DE LOS SÓTANOS (SB1 Y SB2) CON BOTONES PARA AGRANDAR SECTORES */}
        <div className="rounded-2xl bg-[#141211]/95 border border-white/15 p-5 sm:p-7 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono-archive uppercase tracking-widest text-[#e53935]">
                RELEVAMIENTO ARQUITECTÓNICO · EX BRIGADA DE INVESTIGACIONES
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                Plano Vectorial de los Sótanos: SB1 (Mayor) y SB2 (Menor)
              </h3>
            </div>
            <div className="text-xs font-mono-archive text-[#c9b79c] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#e53935]" />
              <span>Calle Marcelo T. de Alvear 32</span>
            </div>
          </div>

          {/* Vector del Sótano con Líneas Conectoras Forenses y Botones Interactivos Integrados en SB1 y SB2 */}
          <div className="w-full rounded-xl overflow-hidden bg-[#0a0908] border border-white/20 p-2 sm:p-4 shadow-2xl relative flex flex-col items-center">
            
            {/* Plano con Líneas Guía Forenses (Leader Lines) y Botones de Agrandar Integrados */}
            <div className="relative max-w-4xl w-full flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src="https://i.ibb.co/fG9p5hR1/plano-vector.png"
                alt="Plano Vectorial del Sótano - Sótano Mayor SB1 y Sótano Menor SB2"
                className="w-full h-auto block rounded-lg filter contrast-105 brightness-105 select-none"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "/plano-vector.png";
                }}
              />

              {/* Capa SVG con Líneas Guía Arquitectónicas y Flechas hacia SB1 y SB2 */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 1327 1185"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Marcador Flecha para SB2 (Ámbar) */}
                  <marker
                    id="arrow-sb2"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                  >
                    <path d="M 1 1.5 L 9 5 L 1 8.5 Z" fill="#f59e0b" />
                  </marker>

                  {/* Marcador Flecha para SB1 (Rojo) */}
                  <marker
                    id="arrow-sb1"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                  >
                    <path d="M 1 1.5 L 9 5 L 1 8.5 Z" fill="#e53935" />
                  </marker>

                  <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* --- LÍNEA GUÍA Y SEÑALIZACIÓN PARA SÓTANO MENOR (SB2) --- */}
                {/* Sale desde la caja naranja y desciende en diagonal directa tocando con la punta de la flecha la línea negra exterior del contorno de SB2 (510, 574) en todos los displays */}
                <path
                  d="M 320, 245 L 510, 574"
                  stroke="#f59e0b"
                  strokeWidth={hoveredSector === 'sb2' ? '3.5' : '2.5'}
                  strokeDasharray={hoveredSector === 'sb2' ? 'none' : '6 4'}
                  fill="none"
                  filter="url(#glow-line)"
                  markerEnd="url(#arrow-sb2)"
                  className="transition-all duration-300"
                />

                {/* --- LÍNEA GUÍA Y SEÑALIZACIÓN PARA SÓTANO MAYOR (SB1) --- */}
                {/* Sale del extremo izquierdo de la caja roja (910, 1070), avanza recta a la izquierda, dobla en ángulo recto hacia arriba y continúa a la izquierda tocando con exactitud el borde exterior negro de SB1 (618, 900) */}
                <path
                  d="M 910, 1070 L 700, 1070 L 700, 900 L 618, 900"
                  stroke="#e53935"
                  strokeWidth={hoveredSector === 'sb1' ? '3.5' : '2.5'}
                  strokeDasharray={hoveredSector === 'sb1' ? 'none' : '6 4'}
                  fill="none"
                  filter="url(#glow-line)"
                  markerEnd="url(#arrow-sb1)"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Botón interactivo dentro de la imagen: SÓTANO MENOR (SB2) - Conectado a la línea guía superior */}
              <div className="absolute top-[16%] left-[6%] sm:left-[10%] z-20">
                <button
                  onClick={() => {
                    audioSystem.playInspectClick();
                    setSectorEnlargeModal('sb2');
                    onMarkEvidenceVisited('sb1');
                    onMarkEvidenceVisited('sb2');
                  }}
                  onMouseEnter={() => {
                    setHoveredSector('sb2');
                    onHoverInteractive('Agrandar Sótano Menor (SB2)', true);
                  }}
                  onMouseLeave={() => {
                    setHoveredSector(null);
                    onHoverInteractive('', false);
                  }}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-white transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-2xl backdrop-blur-md ${
                    hoveredSector === 'sb2'
                      ? 'bg-[#b45309] border-2 border-white scale-105 shadow-[0_0_30px_rgba(245,158,11,0.9)]'
                      : 'bg-[#121110]/95 border-2 border-[#f59e0b] hover:bg-[#b45309]/90'
                  }`}
                  title="Hacé clic para agrandar la fotografía forense del Sótano Menor (SB2)"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] shrink-0 animate-ping" />
                  <ZoomIn className="w-4 h-4 text-[#f59e0b] group-hover:text-white shrink-0 transition-colors" />
                  <div className="text-left font-mono-archive leading-tight">
                    <span className="text-xs sm:text-sm font-bold block text-white">
                      Agrandar SB2 (Menor)
                    </span>
                    <span className="text-[10px] text-[#f59e0b] block hidden sm:inline">
                      Inscripciones y celdas
                    </span>
                  </div>
                </button>
              </div>

              {/* Botón interactivo dentro de la imagen: SÓTANO MAYOR (SB1) - Conectado a la línea guía inferior */}
              <div className="absolute bottom-[6%] right-[5%] sm:right-[8%] z-20">
                <button
                  onClick={() => {
                    audioSystem.playInspectClick();
                    setSectorEnlargeModal('sb1');
                    onMarkEvidenceVisited('sb1');
                    onMarkEvidenceVisited('sb2');
                  }}
                  onMouseEnter={() => {
                    setHoveredSector('sb1');
                    onHoverInteractive('Agrandar Sótano Mayor (SB1)', true);
                  }}
                  onMouseLeave={() => {
                    setHoveredSector(null);
                    onHoverInteractive('', false);
                  }}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-white transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-2xl backdrop-blur-md ${
                    hoveredSector === 'sb1'
                      ? 'bg-[#7a1e1e] border-2 border-white scale-105 shadow-[0_0_30px_rgba(229,57,53,0.9)]'
                      : 'bg-[#121110]/95 border-2 border-[#e53935] hover:bg-[#7a1e1e]/90'
                  }`}
                  title="Hacé clic para agrandar la fotografía forense del Sótano Mayor (SB1)"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e53935] shadow-[0_0_8px_#e53935] shrink-0 animate-ping" />
                  <ZoomIn className="w-4 h-4 text-[#e53935] group-hover:text-white shrink-0 transition-colors" />
                  <div className="text-left font-mono-archive leading-tight">
                    <span className="text-xs sm:text-sm font-bold block text-white">
                      Agrandar SB1 (Mayor)
                    </span>
                    <span className="text-[10px] text-[#e53935] block hidden sm:inline">
                      Subterráneo desenterrado
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono-archive text-[#c9b79c] mt-3 text-center">
            Epígrafe: Relevamiento pericial del sótano clandestino (CPM Chaco). Las líneas guía indican la posición de cada sótano (SB1 y SB2). Hacé clic en los botones dentro de la imagen para agrandar las fotografías forenses de alta resolución.
          </div>
        </div>

        {/* PARTE 2: FRASES REALES TALLADAS EN EL CONCRETO CON REGLAS FORENSES */}
        <div className="rounded-2xl bg-[#141211]/90 border border-white/15 p-4 sm:p-7 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h3 className="font-display font-black text-base sm:text-lg text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#e53935] shrink-0" />
              <span>Inscripciones Reales Grabadas en la Pared (Comisión Provincial por la Memoria)</span>
            </h3>
            <span className="text-xs font-mono-archive text-[#c9b79c] shrink-0">
              {phrases.filter(p => visitedEvidence.has(p.id)).length}/{phrases.length} analizadas
            </span>
          </div>

          <p className="text-xs font-body text-[#eaeaea]/85 mb-4">
            Fotografías periciales con las escalas métricas tomadas por la Justicia Federal durante los allanamientos. Hacé clic para ver el revelamiento fotográfico y la ficha pericial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phrases.map((phrase) => {
              const isVisited = visitedEvidence.has(phrase.id);

              return (
                <div
                  key={phrase.id}
                  onClick={() => handlePhraseClick(phrase)}
                  onMouseEnter={() => onHoverInteractive('Acercar Frase', true)}
                  onMouseLeave={() => onHoverInteractive('', false)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    isVisited
                      ? 'bg-[#181514] border-emerald-600/40'
                      : 'bg-[#100e0d] border-dashed border-[#e53935]/70 hover:border-[#e53935]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-archive uppercase text-[#c9b79c]">
                      {phrase.locationInBasement.replace('_', ' ')}
                    </span>
                    {isVisited ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono-archive text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Leída</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono-archive text-[#e53935]">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Ver revelamiento fotográfico</span>
                      </span>
                    )}
                  </div>

                  {/* Fotografía Forense Real de la Inscripción con Escala */}
                  <div className="aspect-[16/7] rounded-lg bg-[#0a0908] border border-white/20 my-2 relative overflow-hidden group-hover:border-[#e53935] transition-colors flex items-center justify-center">
                    <img
                      src={phrase.image}
                      alt={phrase.title}
                      className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src =
                          phrase.id === 'frase-sangre'
                            ? '/inscripcion-sangre-derramada.png'
                            : '/inscripcion-firmeza-y-luz.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 border border-[#e53935]/40 text-[9px] font-mono-archive text-white flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] animate-pulse" />
                      <span>FOTO FORENSE CPM</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="text-[11px] sm:text-xs font-display font-black text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)] line-clamp-1">
                        {phrase.quote}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] font-mono-archive text-[#c9b79c] italic mb-1">
                    {phrase.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PARTE 3: ELEMENTOS ENCONTRADOS EN LOS SÓTANOS (Página 2 de jis correcciones.pdf) */}
        <div className="rounded-2xl bg-[#141211]/95 border border-white/15 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4 pb-2 border-b border-white/10">
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                ELEMENTOS ENCONTRADOS EN LOS SÓTANOS & PRUEBAS FORENSES
              </h3>
              <p className="text-xs font-mono-archive text-[#c9b79c] mt-0.5">
                Tocá cada artefacto para ver su ficha pericial completa del EAAF
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="text-xs font-mono-archive text-[#c9b79c]">
                {visitedEvidence.size} de {BASEMENT_EVIDENCE.length} evidencias exploradas
              </span>
              {visitedEvidence.size >= BASEMENT_EVIDENCE.length && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-mono-archive font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  ✓ Sótano 100% investigado
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Artefact 1: Picana Eléctrica */}
            <div
              onClick={() => {
                const item = BASEMENT_EVIDENCE.find(e => e.id === 'picana-electrica') || BASEMENT_EVIDENCE[2];
                audioSystem.playInspectClick();
                onSelectEvidence(item);
              }}
              onMouseEnter={() => onHoverInteractive('Ver Picana', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
              className={`p-4 rounded-xl bg-[#090807] border cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between ${
                visitedEvidence.has('picana-electrica') ? 'border-emerald-600/40' : 'border-white/15 hover:border-[#e53935]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono-archive text-[#e53935] uppercase tracking-wider block">
                    HERRAMIENTA DE TORMENTO
                  </span>
                  {visitedEvidence.has('picana-electrica') && (
                    <span className="text-[10px] font-mono-archive text-emerald-400 font-bold">✓ Analizada</span>
                  )}
                </div>
                <div className="aspect-[16/8] rounded-lg bg-[#0d0c0b] border border-white/10 mb-2.5 flex items-center justify-center p-2 relative overflow-hidden group-hover:border-[#e53935]/50 transition-colors">
                  <img
                    src="https://i.ibb.co/tpt6c5XR/vector-picana-electrica.png"
                    alt="Picana Eléctrica a Batería"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "/vector picana electrica.png";
                    }}
                  />
                </div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-[#e53935] transition-colors">
                  Picana Eléctrica a Batería
                </h4>
                <p className="text-[11px] font-body text-white/70 line-clamp-2 mt-1">
                  Dispositivo con cables y pinzas hallado entre los escombros de SB1.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-white/10 text-[10px] font-mono-archive text-[#c9b79c] flex items-center justify-between">
                <span>Ver peritaje judicial</span>
                <span className="text-[#e53935]">›</span>
              </div>
            </div>

            {/* Artefact 2: Caja Eléctrica Oxidada */}
            <div
              onClick={() => {
                const item = BASEMENT_EVIDENCE.find(e => e.id === 'caja-electrica') || BASEMENT_EVIDENCE[3];
                audioSystem.playInspectClick();
                onSelectEvidence(item);
              }}
              onMouseEnter={() => onHoverInteractive('Ver Caja Eléctrica', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
              className={`p-4 rounded-xl bg-[#090807] border cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between ${
                visitedEvidence.has('caja-electrica') ? 'border-emerald-600/40' : 'border-white/15 hover:border-[#e53935]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono-archive text-[#e53935] uppercase tracking-wider block">
                    INSTALACIÓN OCULTA
                  </span>
                  {visitedEvidence.has('caja-electrica') && (
                    <span className="text-[10px] font-mono-archive text-emerald-400 font-bold">✓ Analizada</span>
                  )}
                </div>
                <div className="aspect-[16/8] rounded-lg bg-[#0d0c0b] border border-white/10 mb-2.5 flex items-center justify-center p-2 relative overflow-hidden group-hover:border-[#e53935]/50 transition-colors">
                  <img
                    src="https://i.ibb.co/JFQM18Dw/vector-caja-electrica.png"
                    alt="Caja Eléctrica y Tendido Clandestino"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "/vector caja electrica.png";
                    }}
                  />
                </div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-[#e53935] transition-colors">
                  Caja Eléctrica y Tendido Clandestino
                </h4>
                <p className="text-[11px] font-body text-white/70 line-clamp-2 mt-1">
                  Circuito independiente para no provocar bajas de tensión en la cuadra.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-white/10 text-[10px] font-mono-archive text-[#c9b79c] flex items-center justify-between">
                <span>Ver peritaje judicial</span>
                <span className="text-[#e53935]">›</span>
              </div>
            </div>

            {/* Artefact 3: Fusible Cerámico */}
            <div
              onClick={() => {
                const item = BASEMENT_EVIDENCE.find(e => e.id === 'fusible-ceramico') || BASEMENT_EVIDENCE[4];
                audioSystem.playInspectClick();
                onSelectEvidence(item);
              }}
              onMouseEnter={() => onHoverInteractive('Ver Fusible Cerámico', true)}
              onMouseLeave={() => onHoverInteractive('', false)}
              className={`p-4 rounded-xl bg-[#090807] border cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between ${
                visitedEvidence.has('fusible-ceramico') ? 'border-emerald-600/40' : 'border-white/15 hover:border-[#e53935]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono-archive text-[#e53935] uppercase tracking-wider block">
                    EVIDENCIA MATERIAL EAAF
                  </span>
                  {visitedEvidence.has('fusible-ceramico') && (
                    <span className="text-[10px] font-mono-archive text-emerald-400 font-bold">✓ Analizada</span>
                  )}
                </div>
                <div className="aspect-[16/8] rounded-lg bg-[#0d0c0b] border border-white/10 mb-2.5 flex items-center justify-center p-2 relative overflow-hidden group-hover:border-[#e53935]/50 transition-colors">
                  <img
                    src="https://i.ibb.co/67vwLggc/vector-fusible.png"
                    alt="Fusible Cerámico"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "/vector fusible.png";
                    }}
                  />
                </div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-[#e53935] transition-colors">
                  Fusible Cerámico
                </h4>
                <p className="text-[11px] font-body text-white/70 line-clamp-2 mt-1">
                  Pieza de porcelana técnica de aislamiento recuperada bajo la losa falsa del subsuelo.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-white/10 text-[10px] font-mono-archive text-[#c9b79c] flex items-center justify-between">
                <span>Ver peritaje judicial</span>
                <span className="text-[#e53935]">›</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
