import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Compass, Footprints, Award, ArrowRight, X, HelpCircle } from 'lucide-react';

interface NavigationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationGuideModal: React.FC<NavigationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const modalNode = (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 md:pt-22 pb-4 sm:pb-6 landscape:pt-14 landscape:pb-3 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Container - Perfectamente centrado con márgenes que evitan colisión con la cabecera */}
      <div
        className="relative w-full max-w-2xl lg:max-w-3xl max-h-[calc(100dvh-5rem)] landscape:max-h-[calc(100dvh-3.75rem)] flex flex-col bg-[#121110] border-2 border-amber-400/50 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.25)] text-left overflow-hidden animate-scaleUp m-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorativo degradado en cabecera superior */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d97706] via-[#e53935] to-[#f59e0b] z-10" />

        {/* Botón de cierre superior derecho */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/80 hover:text-white flex items-center justify-center border border-white/20 transition-all z-20 cursor-pointer shadow-md"
          aria-label="Cerrar guía de navegación"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Cuerpo del modal con tipografía aumentada un 10% y scroll personalizado */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-4 sm:space-y-5">
          {/* Encabezado */}
          <div className="space-y-2 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/35 text-[11px] sm:text-xs font-mono-archive text-amber-300 font-semibold shadow-sm">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>GUÍA DE USO · CÓMO NAVEGAR</span>
            </div>

            <h2
              id="guide-title"
              className="font-display font-black text-lg sm:text-2xl md:text-[27px] text-white tracking-wide uppercase leading-tight"
            >
              INVESTIGÁ AMBAS RUTAS PARA DESBLOQUEAR EL MURAL
            </h2>

            <p className="text-sm sm:text-[15px] md:text-base font-body text-[#eaeaea]/90 leading-relaxed">
              La Casa por la Memoria está estructurada en dos relatos complementarios. Para acceder al homenaje del <strong>Mural Final</strong>, deberás explorar ambas rutas:
            </p>
          </div>

          {/* Tarjetas de pasos con tamaño de fuente ajustado +10% */}
          <div className="grid grid-cols-1 gap-3">
            {/* Paso 1: Dos rutas independientes */}
            <div className="p-3.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-[#181615] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-amber-400 text-xs sm:text-sm font-bold font-mono-archive shrink-0">
                  1
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base md:text-[17px] text-white">
                  Dos recorridos independientes
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-body text-white/85 pt-0.5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-black/45 border border-amber-500/25">
                  <span className="font-mono-archive text-[11px] sm:text-xs text-amber-300 uppercase block mb-1 font-semibold">
                    Camino A · Escaleras
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#eaeaea]/95 leading-relaxed">
                    Historias de vida, testimonios y la restitución de identidad de Guillermo Amarilla Molfino (Nieto 98).
                  </p>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-black/45 border border-red-500/25">
                  <span className="font-mono-archive text-[11px] sm:text-xs text-red-300 uppercase block mb-1 font-semibold">
                    Camino B · Sótanos
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#eaeaea]/95 leading-relaxed">
                    Evidencias forenses del EAAF, objetos rescatados y el registro arquitectónico del centro clandestino.
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 2: Exploración en libertad */}
            <div className="p-3.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-[#181615] border border-white/10 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#e53935]/20 border border-[#e53935]/40 flex items-center justify-center text-red-400 text-xs sm:text-sm font-bold font-mono-archive shrink-0">
                  2
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base md:text-[17px] text-white">
                  Elegí tu orden e interactuá con el material
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] font-body text-[#eaeaea]/85 leading-relaxed pl-8 sm:pl-9">
                Podés ingresar primero a las escaleras o al sótano. En cada espacio, hacé clic en las fichas, audios y testimonios para marcarlos como investigados y sumar progreso.
              </p>
            </div>

            {/* Paso 3: Desbloqueo del Mural Final */}
            <div className="p-3.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#2a0e0e] to-[#1a1208] border border-amber-500/45 space-y-2 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-400/30 border border-amber-400 flex items-center justify-center text-amber-300 text-xs sm:text-sm font-bold font-mono-archive shrink-0">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base md:text-[17px] text-amber-200">
                  Desbloqueo al 100% del recorrido
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] font-body text-[#eaeaea]/95 leading-relaxed pl-8 sm:pl-9">
                Cuando completes las <strong>11 partes (historias y evidencias)</strong>, el botón central <strong>Mural Final</strong> se iluminará en dorado y podrás ingresar al homenaje a las víctimas y dejar tu propio testimonio.
              </p>
            </div>
          </div>
        </div>

        {/* Barra de acción inferior */}
        <div className="p-3.5 sm:p-5 bg-[#0d0c0b] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono-archive text-[#c9b79c]">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Podés volver a ver esta guía desde el vestíbulo</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white font-display font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Entendido · Comenzar recorrido</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalNode, document.body);
  }
  return modalNode;
};
