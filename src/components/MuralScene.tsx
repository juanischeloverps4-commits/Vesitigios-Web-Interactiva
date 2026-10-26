import React, { useState, useEffect, useRef } from 'react';
import { VICTIM_FACES, REFLEXIVE_QUOTES } from '../data/vestigiosData';
import { VictimFace } from '../types';
import { Instagram, Share2, AlertTriangle, Clock, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import { VestigiosLogo } from './VestigiosLogo';

interface MuralSceneProps {
  onHoverInteractive: (label: string, isEntering: boolean) => void;
}

export const MuralScene: React.FC<MuralSceneProps> = ({ onHoverInteractive }) => {
  const [selectedFace, setSelectedFace] = useState<VictimFace | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const detailCardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to detail card when a victim face is selected
  const handleSelectFace = (victim: VictimFace) => {
    setSelectedFace(victim);
    setTimeout(() => {
      detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Ensure window is strictly scrolled to the top when accessing the Mural Scene
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 60);
    return () => clearTimeout(scrollTimer);
  }, []);

  // Pick a fresh randomized solemn quote every time the mural is entered
  useEffect(() => {
    try {
      const last = sessionStorage.getItem('vestigios_last_mural_quote_idx');
      let nextIndex = Math.floor(Math.random() * REFLEXIVE_QUOTES.length);
      if (last !== null && REFLEXIVE_QUOTES.length > 1) {
        const lastNum = parseInt(last, 10);
        while (nextIndex === lastNum) {
          nextIndex = Math.floor(Math.random() * REFLEXIVE_QUOTES.length);
        }
      }
      sessionStorage.setItem('vestigios_last_mural_quote_idx', nextIndex.toString());
      setQuoteIndex(nextIndex);
    } catch {
      const randomIndex = Math.floor(Math.random() * REFLEXIVE_QUOTES.length);
      setQuoteIndex(randomIndex);
    }

    const handleScroll = () => {
      if (window.scrollY > 120) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Strip any leading/trailing quotes from the quote string
  const cleanQuote = (REFLEXIVE_QUOTES[quoteIndex] || '').replace(/^["«\s]+|["»\s]+$/g, '');

  return (
    <div className="relative w-full h-full min-h-screen pt-20 pb-32 px-4 md:px-8 flex flex-col items-center justify-between select-none">
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

      {/* Header of Mural */}
      <div className="text-center max-w-3xl mb-6 space-y-3 z-20">
        <VestigiosLogo size="md" showText={false} className="justify-center mb-2" />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-archive text-[#c9b79c]">
            <Clock className="w-3.5 h-3.5 text-[#e53935]" />
            <span>Mural de la Memoria · Tiempo de recorrido: 10 - 15 minutos</span>
          </div>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-wider">
          ROSTROS QUE VENCEN AL OLVIDO
        </h1>

        <p className="font-body text-xs sm:text-sm text-[#eaeaea]/85 max-w-2xl mx-auto leading-relaxed">
          Detrás de cada cifra y de cada expediente judicial hay vidas, familias enteras y proyectos truncados. Ningún discurso negacionista puede borrar sus nombres ni su presencia.
        </p>
      </div>

      {/* Mandatory Anti-Negationist Clarification Note (Point 16) */}
      <div className="max-w-4xl w-full mx-auto mb-5 p-4 rounded-xl bg-[#141211] border-l-4 border-[#e53935] text-xs font-mono-archive text-[#eaeaea] shadow-xl z-20 space-y-1.5">
        <div className="flex items-center gap-2 text-[#e53935] font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Aclaración Fundamental frente a los Discursos Negacionistas</span>
        </div>
        <p className="text-[11px] font-body text-[#c9b79c] leading-relaxed">
          <strong className="text-white">Los</strong> rostros que se exponen a continuación corresponden a una muestra documentada por el <strong className="text-white">Registro</strong> Único de la Verdad (RUV), disponible para su consulta dentro del apartado de <strong className="text-white">Biblioteca</strong> de este sitio. En la provincia del Chaco hubo cientos de víctimas que pasaron por la Brigada de Investigaciones, la Alcaidía y la Masacre de Margarita Belén, y a nivel nacional se denuncian 30.000 desaparecidos. La clandestinidad con la que operó el Estado, el miedo impuesto a las familias y la quema deliberada de archivos hacen imposible cerrar una lista definitiva. Discutir el número busca negar la sistematicidad del genocidio.
        </p>
      </div>

      {/* Carta / Frase Reflexiva única para el usuario (Biblia Transmedia, págs. 12-13 y 37) - Sin comillas ni botón extra */}
      <div className="max-w-3xl w-full mx-auto my-3 p-5 sm:p-7 rounded-2xl bg-[#141211]/95 border border-[#7a1e1e]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20 text-center relative">
        <div className="flex items-center justify-center mb-3">
          <span className="text-[10px] font-mono-archive uppercase tracking-widest text-[#e53935] px-2.5 py-1 rounded bg-[#7a1e1e]/30 border border-[#7a1e1e]/50 font-bold">
            Carta Reflexiva de Cierre
          </span>
        </div>
        <p className="font-display font-black text-base sm:text-xl text-[#eaeaea] leading-relaxed">
          {cleanQuote}
        </p>
      </div>

      {/* Progressive Collage of NEW Victim Faces (Point 16 - No repetition of earlier testimonies) */}
      <div className="max-w-5xl w-full mx-auto my-5 z-20">
        <div className="text-xs font-mono-archive text-[#c9b79c] mb-3 text-center sm:text-left flex items-center justify-between">
          <span>Algunos de los rostros y víctimas del Chaco (Registro de Difusión / RUV · Biblioteca):</span>
          <span className="hidden sm:inline text-white/50">Tocá una fotografía para ver la ficha histórica</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {VICTIM_FACES.map((victim, i) => {
            const isSelected = selectedFace?.id === victim.id;

            return (
              <div
                key={victim.id}
                onClick={() => handleSelectFace(victim)}
                onMouseEnter={() => onHoverInteractive('Ver Ficha', true)}
                onMouseLeave={() => onHoverInteractive('', false)}
                style={{ animationDelay: `${i * 90}ms` }}
                className={`p-2.5 sm:p-3.5 rounded-xl border cursor-pointer transition-all duration-300 animate-fadeIn flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#7a1e1e] border-white text-white shadow-[0_0_20px_rgba(122,30,30,0.8)] scale-105 z-10'
                    : 'bg-[#151312] border-white/10 hover:border-[#c9b79c] hover:-translate-y-1'
                }`}
              >
                {/* Archival portrait photograph from "PERSONAS DEL FINAL" */}
                <div className="aspect-square w-full rounded-lg bg-[#0a0908] border border-white/15 mb-2 relative overflow-hidden group/thumb">
                  {victim.image ? (
                    <img
                      src={victim.image}
                      alt={victim.name}
                      className={`w-full h-full object-cover object-top transition-all duration-300 ${
                        isSelected
                          ? 'grayscale-0 scale-105'
                          : 'grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105'
                      }`}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono-archive px-1.5 py-0.5 rounded bg-black/80 text-white/80 border border-white/10 z-10">
                    #{victim.id}
                  </span>
                </div>

                <div className="font-display font-bold text-xs text-white leading-snug line-clamp-2 min-h-[2rem]">
                  {victim.name}
                </div>
                <div className="text-[10px] font-mono-archive text-[#c9b79c] leading-tight line-clamp-2 mt-1">
                  {victim.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected victim detail strip with Epígrafe and Enlarged Portrait */}
        {selectedFace && (
          <div
            ref={detailCardRef}
            className="mt-5 p-4 sm:p-6 rounded-2xl bg-[#0e0d0c] border-2 border-[#c9b79c]/60 text-xs font-mono-archive flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 animate-fadeIn shadow-2xl scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              {selectedFace.image && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-[#c9b79c]/70 shrink-0 bg-black shadow-lg">
                  <img
                    src={selectedFace.image}
                    alt={selectedFace.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-white font-bold text-base sm:text-lg">{selectedFace.name}</span>
                  <span className="text-[#c9b79c] text-xs">({selectedFace.age ? `${selectedFace.age} años · ` : ''}{selectedFace.profession})</span>
                </div>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                  Estado: <strong className="text-[#e53935]">{selectedFace.status}</strong> · Período: {selectedFace.date} · {selectedFace.caseRef}
                </p>
                {selectedFace.caption && (
                  <p className="text-[11px] sm:text-xs text-[#c9b79c] italic leading-relaxed">
                    Epígrafe: {selectedFace.caption}
                  </p>
                )}
                {selectedFace.link && (
                  <div className="pt-1.5 flex flex-wrap gap-2">
                    <a
                      href={selectedFace.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7a1e1e]/50 hover:bg-[#7a1e1e] border border-[#e53935]/70 text-white text-xs font-mono-archive transition-all group shadow-sm"
                    >
                      <span>Consultar registro oficial / biografía</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#e53935] group-hover:text-white transition-colors" />
                    </a>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedFace(null)}
              className="text-xs text-[#c9b79c] hover:text-white px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors w-full sm:w-auto text-center shrink-0 cursor-pointer"
            >
              Cerrar ficha
            </button>
          </div>
        )}
      </div>

      {/* Transmedia Call-to-Action & Instagram Exclusivity (Points 5, 17) */}
      <div className="max-w-4xl w-full mx-auto mt-4 p-6 md:p-8 rounded-2xl bg-[#121110]/95 border border-white/15 z-20 space-y-6">
        <div className="text-center space-y-1.5">
          {/* No quotation marks as requested in Point 17 */}
          <h3 className="font-display font-black text-lg md:text-xl text-white">
            Si querés saber más o contribuir con la causa, sumate o contactanos
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#c9b79c]">
            La memoria colectiva se construye todos los días en las aulas, en las calles y en la comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Instagram link (Point 3) */}
          <a
            href="https://www.instagram.com/vestigios_negacionismo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0a0908] border border-white/10 hover:border-[#e53935] flex items-center gap-3.5 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#7a1e1e]/30 border border-[#e53935]/50 flex items-center justify-center text-[#e53935] shrink-0 group-hover:scale-105 transition-transform">
              <Instagram className="w-6 h-6 text-[#e53935]" />
            </div>
            <div>
              <div className="text-[11px] font-mono-archive text-[#c9b79c]">Canal oficial de Instagram</div>
              <div className="font-display font-bold text-sm text-white group-hover:text-[#e53935] transition-colors">
                @vestigios_negacionismo
              </div>
              <p className="text-[11px] font-body text-white/60">
                Seguinos para ver los carruseles y debates históricos.
              </p>
            </div>
          </a>

          {/* Share website link */}
          <div className="p-4 rounded-xl bg-[#0a0908] border border-white/10 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-xs font-mono-archive">
              <span className="text-[#c9b79c]">Difusión comunitaria:</span>
              <span className="text-white/60">FADyCC - UNNE</span>
            </div>
            <button
              onClick={handleShare}
              className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-xs text-[#eaeaea] font-mono-archive transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#c9b79c]" />
              <span>{copiedLink ? '¡Enlace copiado al portapapeles!' : 'Compartir sitio web con amigos'}</span>
            </button>
          </div>
        </div>

        {/* Institutional Accreditation Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-archive text-white/50 gap-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#e53935]" />
            <span>Casa por la Memoria · Marcelo T. de Alvear 32, Resistencia, Chaco</span>
          </div>
          <div>
            FADyCC — Universidad Nacional del Nordeste (UNNE) · 2026
          </div>
        </div>
      </div>
    </div>
  );
};
