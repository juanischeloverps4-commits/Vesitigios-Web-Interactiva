import React, { useState } from 'react';
import { VestigiosLogo } from './VestigiosLogo';
import { Volume2, Volume1, VolumeX, Info, Users, BookOpen, Instagram, Compass, GraduationCap, Menu, X } from 'lucide-react';
import { SceneId } from '../types';

interface HeaderProps {
  currentScene: SceneId;
  isMuted: boolean;
  volume?: number;
  onChangeVolume?: (volume: number) => void;
  progressPercent?: number;
  visitedCount?: number;
  totalCount?: number;
  onToggleAudio: () => void;
  onOpenProjectModal: () => void;
  onOpenLibraryModal: () => void;
  onOpenTeamModal: () => void;
  onOpenAcademicModal: () => void;
  onOpenContactModal: () => void;
  onGoToScene: (scene: SceneId) => void;
  onHoverInteractive: (label: string, isEntering: boolean) => void;
  isHostUnlocked?: boolean;
  onHostAccess?: () => void;
  onOpenAnalytics?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScene,
  isMuted,
  volume = 0.7,
  onChangeVolume,
  progressPercent = 0,
  visitedCount = 0,
  totalCount = 12,
  onToggleAudio,
  onOpenProjectModal,
  onOpenLibraryModal,
  onOpenTeamModal,
  onOpenAcademicModal,
  onOpenContactModal,
  onGoToScene,
  onHoverInteractive,
  isHostUnlocked = false,
  onHostAccess,
  onOpenAnalytics,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    onGoToScene('intro');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-3.5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-[#090807]/90 border-b border-white/10 transition-all duration-300">
        {/* Zone 1: Brand Wordmark / Isotype on the Left + Mobile Menu Button */}
        <div className="flex items-center gap-2 z-10 shrink-0">
          <button
            onClick={handleLogoClick}
            className="text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#e53935]"
            onMouseEnter={() => onHoverInteractive('Inicio', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            aria-label="Volver a la portada de Vestigios"
            title="Volver a la portada de Vestigios"
          >
            <VestigiosLogo size="sm" showText={true} />
          </button>

          {/* Botones exclusivos visibles SOLO para el Host / Dueño una vez activado (en desktop) */}
          {isHostUnlocked && (
            <div className="hidden xl:flex items-center gap-1.5 shrink-0">
              {onHostAccess && (
                <button
                  onClick={onHostAccess}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-[#7a1e1e] hover:from-amber-500 hover:to-[#912424] text-white border border-amber-400/80 text-[10px] font-mono-archive font-bold shadow-[0_0_15px_rgba(245,158,11,0.6)] items-center gap-1.5 cursor-pointer animate-pulse shrink-0"
                  title="Acceso exclusivo del Host / Dueño al Mural Final"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>HOST: MURAL</span>
                </button>
              )}
              {onOpenAnalytics && (
                <button
                  onClick={onOpenAnalytics}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white border border-emerald-400/80 text-[10px] font-mono-archive font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)] items-center gap-1.5 cursor-pointer shrink-0"
                  title="Panel de Métricas y Diagnóstico en Vivo (?panel=metricas)"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>HOST: MÉTRICAS</span>
                </button>
              )}
            </div>
          )}

          {/* Botón de Menú para Celulares y Tablets (pantallas menores a xl / 1280px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#e53935]" /> : <Menu className="w-4 h-4 text-[#c9b79c]" />}
          </button>
        </div>

        {/* Zone 2: Navigation Links Centered in the Middle of the Top Screen for DESKTOP (xl and above) */}
        <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium z-10 max-w-[calc(100%-280px)]">
          <button
            onClick={onOpenProjectModal}
            className="px-2 sm:px-2.5 py-1.5 rounded-md text-[#eaeaea] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 focus:outline-none shrink-0"
            onMouseEnter={() => onHoverInteractive('El Proyecto', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
          >
            <Info className="w-3.5 h-3.5 text-[#c9b79c]" />
            <span className="hidden sm:inline">El Proyecto</span>
            <span className="sm:hidden">Proyecto</span>
          </button>

          {/* Biblioteca Tab */}
          <button
            onClick={onOpenLibraryModal}
            className="px-2 sm:px-2.5 py-1.5 rounded-md text-[#eaeaea] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 focus:outline-none shrink-0"
            onMouseEnter={() => onHoverInteractive('Biblioteca', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c9b79c]" />
            <span>Biblioteca</span>
          </button>

          <button
            onClick={onOpenTeamModal}
            className="px-2 sm:px-2.5 py-1.5 rounded-md text-[#eaeaea] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 focus:outline-none shrink-0"
            onMouseEnter={() => onHoverInteractive('Nosotros', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
          >
            <Users className="w-3.5 h-3.5 text-[#c9b79c]" />
            <span>Nosotros</span>
          </button>

          {/* Marco Académico Tab - a la derecha de Nosotros y antes de Instagram */}
          <button
            onClick={onOpenAcademicModal}
            className="px-2 sm:px-2.5 py-1.5 rounded-md text-[#eaeaea] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 focus:outline-none shrink-0"
            onMouseEnter={() => onHoverInteractive('Marco Académico', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#c9b79c]" />
            <span className="hidden sm:inline">Marco Académico</span>
            <span className="sm:hidden">Académico</span>
          </button>

          <button
            onClick={onOpenContactModal}
            className="px-2 sm:px-2.5 py-1.5 rounded-md text-[#eaeaea] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 focus:outline-none shrink-0"
            onMouseEnter={() => onHoverInteractive('Instagram', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            title="Instagram oficial: @vestigios_negacionismo"
          >
            <Instagram className="w-3.5 h-3.5 text-[#c9b79c]" />
            <span className="hidden lg:inline">@vestigios_negacionismo</span>
            <span className="lg:hidden">Instagram</span>
          </button>
        </nav>

        {/* Zone 3: Progress capsule, scene status and Audio toggle on the Right */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 z-10 shrink-0">
          {currentScene !== 'intro' && (
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-[#141211]/95 border border-white/20 text-xs font-mono-archive shadow-lg transition-all select-none"
              title={`Progreso del recorrido: ${progressPercent}% (${visitedCount}/${totalCount} evidencias exploradas)`}
              onMouseEnter={() => onHoverInteractive(`Progreso: ${progressPercent}% (${visitedCount}/${totalCount})`, true)}
              onMouseLeave={() => onHoverInteractive('', false)}
            >
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-[#c9b79c] uppercase tracking-wider font-semibold hidden sm:inline">Progreso</span>
                  <span className="font-bold text-white">{progressPercent}%</span>
                </div>
                <div className="w-10 sm:w-20 h-1.5 rounded-full bg-black/80 border border-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7a1e1e] via-[#e53935] to-[#10b981] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {currentScene !== 'intro' && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono-archive text-[#c9b79c]">
              <Compass className="w-3 h-3 text-[#c9b79c]" />
              <span>
                {currentScene === 'vestibulo' && 'Vestíbulo'}
                {currentScene === 'camino_a' && 'Camino A'}
                {currentScene === 'camino_b' && 'Camino B'}
                {currentScene === 'mural' && 'Mural'}
              </span>
            </div>
          )}

          {/* Audio & Volume Control Capsule */}
          <div
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs font-mono-archive border transition-all duration-200 select-none ${
              isMuted || volume === 0
                ? 'border-white/20 bg-white/5 text-[#c9b79c]'
                : 'border-[#7a1e1e] bg-[#7a1e1e]/30 text-white shadow-[0_0_12px_rgba(122,30,30,0.35)]'
            }`}
            onMouseEnter={() =>
              onHoverInteractive(
                `Volumen: ${isMuted || volume === 0 ? 'Silenciado' : `${Math.round(volume * 100)}%`}`,
                true
              )
            }
            onMouseLeave={() => onHoverInteractive('', false)}
          >
            {/* Mute / Unmute Button */}
            <button
              onClick={onToggleAudio}
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
              title={isMuted || volume === 0 ? 'Activar sonido' : 'Silenciar sonido'}
              aria-label={isMuted || volume === 0 ? 'Activar sonido ambiente' : 'Silenciar sonido'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 hover:text-white" />
              ) : volume < 0.45 ? (
                <Volume1 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e53935]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e53935]" />
              )}
            </button>

            {/* Volume Slider - Visible ONLY on desktop (xl screens and above) */}
            <div className="hidden xl:flex items-center gap-1.5">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={isMuted ? 0 : Math.round(volume * 100)}
                onChange={(e) => {
                  const newVol = parseInt(e.target.value, 10) / 100;
                  if (onChangeVolume) {
                    onChangeVolume(newVol);
                  }
                }}
                className="w-14 sm:w-20 md:w-24 h-1.5 bg-black/80 rounded-lg appearance-none cursor-pointer accent-[#e53935] focus:outline-none"
                title={`Ajustar volumen: ${isMuted || volume === 0 ? '0%' : `${Math.round(volume * 100)}%`}`}
                aria-label="Ajustar volumen de sonido"
              />
              <span className="text-[10px] font-mono-archive text-[#c9b79c] w-7 text-right">
                {isMuted || volume === 0 ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Animated audio bar indicator */}
            {!isMuted && volume > 0 && (
              <span className="hidden xl:flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 bg-[#e53935] h-full animate-pulse" />
                <span
                  className="w-0.5 bg-[#e53935] h-2/3 animate-pulse"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-0.5 bg-[#e53935] h-4/5 animate-pulse"
                  style={{ animationDelay: '300ms' }}
                />
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Menú Desplegable para Celulares y Tablets (xl:hidden) */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-[49px] sm:top-[53px] left-0 right-0 bg-[#0d0c0b]/98 border-b border-white/20 p-3 sm:p-4 shadow-2xl backdrop-blur-xl z-50 animate-fadeIn space-y-1.5 max-h-[85vh] overflow-y-auto">
          {/* Host shortcuts inside drawer on mobile and tablet */}
          {isHostUnlocked && (
            <div className="space-y-1.5 pb-1">
              {onHostAccess && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onHostAccess();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600/30 to-[#7a1e1e]/40 border-2 border-amber-400 text-amber-200 text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer animate-pulse"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div>
                    <span className="font-bold block text-sm text-white">HOST: ACCESO AL MURAL FINAL</span>
                    <span className="text-[10px] text-amber-300">Atajo exclusivo de creador / dueño</span>
                  </div>
                </button>
              )}
              {onOpenAnalytics && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAnalytics();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border-2 border-emerald-400 text-emerald-200 text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div>
                    <span className="font-bold block text-sm text-white">HOST: PANEL DE CONTROL & FEEDBACK</span>
                    <span className="text-[10px] text-emerald-300">Monitoreo en vivo de visitantes y métricas</span>
                  </div>
                </button>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProjectModal();
            }}
            className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <Info className="w-4 h-4 text-[#c9b79c] shrink-0" />
            <div>
              <span className="font-bold block text-sm">El Proyecto</span>
              <span className="text-[10px] text-[#c9b79c]">Sobre Vestigios y su propósito transmedia</span>
            </div>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLibraryModal();
            }}
            className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#c9b79c] shrink-0" />
            <div>
              <span className="font-bold block text-sm">Biblioteca</span>
              <span className="text-[10px] text-[#c9b79c]">Documentos, libros desclasificados y fichas</span>
            </div>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTeamModal();
            }}
            className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#c9b79c] shrink-0" />
            <div>
              <span className="font-bold block text-sm">Nosotros</span>
              <span className="text-[10px] text-[#c9b79c]">Equipo de realizadores y docentes</span>
            </div>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAcademicModal();
            }}
            className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#c9b79c] shrink-0" />
            <div>
              <span className="font-bold block text-sm">Marco Académico</span>
              <span className="text-[10px] text-[#c9b79c]">UNNE - FADyCC y Comisión por la Memoria</span>
            </div>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContactModal();
            }}
            className="w-full px-3 py-2 rounded-xl bg-[#7a1e1e]/25 hover:bg-[#7a1e1e]/40 border border-[#e53935]/40 text-white text-xs font-mono-archive flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#e53935] shrink-0" />
            <div>
              <span className="font-bold block text-sm">Instagram Oficial</span>
              <span className="text-[10px] text-white/70">@vestigios_negacionismo</span>
            </div>
          </button>
        </div>
      )}
    </>
  );
};
