import React, { useState, useEffect, useRef } from 'react';
import { NEGATIONIST_NOISE_COMMENTS } from '../data/vestigiosData';
import { Shield } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

interface NoiseIntroProps {
  onEnterHouse: () => void;
  onHoverInteractive: (label: string, isEntering: boolean) => void;
}

interface ActiveComment {
  id: number;
  text: string;
  user: string;
  timeAgo: string;
  desktopX: number;
  desktopY: number;
  desktopRotate: number;
  mobileX: number;
  mobileY: number;
  mobileRotate: number;
  delay: number;
  hideOnMobile?: boolean;
}

interface DraggableCommentBubbleProps {
  comment: ActiveComment;
  isExploding: boolean;
  isMobile: boolean;
}

const DraggableCommentBubble: React.FC<DraggableCommentBubbleProps> = ({ comment, isExploding, isMobile }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: offset.x,
      initialY: offset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    setOffset({
      x: dragStartRef.current.initialX + dx,
      y: dragStartRef.current.initialY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDragging(false);
    }
  };

  const currentX = isMobile ? (comment.mobileX ?? 10) : (comment.desktopX ?? 20);
  const currentY = isMobile ? (comment.mobileY ?? 50) : (comment.desktopY ?? 50);
  const currentRotation = isMobile ? (comment.mobileRotate || 0) : (comment.desktopRotate || 0);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${currentRotation}deg)`,
        touchAction: 'none',
      }}
      className={`absolute select-none w-[255px] sm:w-[310px] max-w-[86vw] p-3 sm:p-3.5 rounded-xl bg-[#181615]/95 border shadow-[0_12px_28px_rgba(0,0,0,0.95)] backdrop-blur-md text-left transition-shadow duration-150 pointer-events-auto box-border overflow-hidden ${
        isDragging
          ? 'cursor-grabbing border-amber-400 shadow-[0_15px_40px_rgba(245,158,11,0.5)] scale-105 z-50 ring-2 ring-amber-400'
          : 'cursor-grab border-[#7a1e1e]/85 hover:border-[#e53935] hover:scale-[1.02] z-30'
      } ${comment.hideOnMobile ? 'hidden md:block' : 'block'} ${
        isExploding ? 'scale-50 opacity-0 translate-y-16 blur-md pointer-events-none' : ''
      }`}
      title="Hacé clic o arrastrá para mover este comentario a cualquier lugar de la pantalla"
    >
      {/* Header con nombre de usuario y fecha completamente contenidos dentro de la caja sin salirse */}
      <div className="flex items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-white/10 w-full min-w-0">
        <span className="text-[11px] sm:text-xs font-mono-archive text-[#e53935] font-bold truncate min-w-0 flex-1">
          {comment.user}
        </span>
        <span className="text-[9.5px] sm:text-[11px] text-[#c9b79c]/80 whitespace-nowrap shrink-0 font-mono-archive pl-1">
          {comment.timeAgo}
        </span>
      </div>
      <p className="text-xs sm:text-[13.5px] md:text-sm landscape:text-xs font-sans text-[#eaeaea] font-medium leading-snug break-words">
        {comment.text}
      </p>
    </div>
  );
};

export const NoiseIntro: React.FC<NoiseIntroProps> = ({
  onEnterHouse,
  onHoverInteractive,
}) => {
  const [comments, setComments] = useState<ActiveComment[]>([]);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configure comments:
  // - Randomized dynamically on each visit: order, timestamps, and position offsets
  // - Clustered tightly over and around the 'ENTRAR A LA CASA' button (y: 66% - 78%)
  // - Fully legible usernames and quotes without any text being cut off
  useEffect(() => {
    const generated: ActiveComment[] = [];

    // Pool of realistic timestamps randomized dynamically (with compact abbreviations)
    const TIMESTAMPS_POOL = [
      'hace 18 min',
      'hace 45 min',
      'hace 1 h',
      'hace 2 h',
      'hace 5 h',
      'hace 14 h',
      'hace 1 d',
      'hace 2 d',
      'hace 4 d',
      'hace 1 sem',
      'hace 3 sem',
      'hace 1 m',
      'hace 2 m',
      'hace 3 m',
    ];

    // Base disordered anchor positions on mobile clustered overlapping the button
    const mobileAnchorPositions = [
      { x: 10, y: 68, rotate: -3 },
      { x: 26, y: 70, rotate: 3 },
      { x: 12, y: 73, rotate: -2 },
      { x: 28, y: 75, rotate: 2 },
      { x: 14, y: 77, rotate: -1 },
      { x: 22, y: 66, rotate: 2 },
    ];

    // Base disordered anchor positions on desktop/tablet clustered tightly together overlapping the button
    const desktopAnchorPositions = [
      { x: 38, y: 69, rotate: -3 },
      { x: 47, y: 70, rotate: 3 },
      { x: 33, y: 73, rotate: -2 },
      { x: 51, y: 73, rotate: 2 },
      { x: 41, y: 66, rotate: 1 },
      { x: 45, y: 76, rotate: -2 },
      { x: 28, y: 70, rotate: -3 },
      { x: 56, y: 71, rotate: 3 },
      { x: 30, y: 76, rotate: 2 },
      { x: 54, y: 76, rotate: -2 },
      { x: 36, y: 78, rotate: -1 },
      { x: 48, y: 78, rotate: 2 },
    ];

    // Shuffle comments and randomize times & micro-offsets
    const shuffledComments = [...NEGATIONIST_NOISE_COMMENTS].sort(() => Math.random() - 0.5);
    const shuffledTimestamps = [...TIMESTAMPS_POOL].sort(() => Math.random() - 0.5);

    shuffledComments.forEach((c, idx) => {
      const dBase = desktopAnchorPositions[idx % desktopAnchorPositions.length];
      const mBase = mobileAnchorPositions[idx % mobileAnchorPositions.length];
      const isVisibleOnMobile = idx < mobileAnchorPositions.length;

      // Small natural random jitter (+/- 1% in X, +/- 1% in Y, +/- 2 deg in rotation)
      const xJitter = (Math.random() - 0.5) * 2;
      const yJitter = (Math.random() - 0.5) * 1.5;
      const rotJitter = Math.round((Math.random() - 0.5) * 3);

      generated.push({
        id: idx,
        text: c.text,
        user: c.user || '@usuario_anonimo',
        timeAgo: shuffledTimestamps[idx % shuffledTimestamps.length],
        desktopX: Math.max(12, Math.min(68, Math.round(dBase.x + xJitter))),
        desktopY: Math.max(66, Math.min(80, Math.round(dBase.y + yJitter))),
        desktopRotate: dBase.rotate + rotJitter,
        mobileX: Math.max(5, Math.min(35, Math.round(mBase.x + xJitter))),
        mobileY: Math.max(65, Math.min(78, Math.round(mBase.y + yJitter))),
        mobileRotate: mBase.rotate + rotJitter,
        delay: 300 + idx * 200,
        hideOnMobile: !isVisibleOnMobile,
      });
    });

    setComments(generated);

    // Enter button appears smoothly
    const buttonTimer = setTimeout(() => {
      setShowEnterButton(true);
    }, 1000);

    return () => clearTimeout(buttonTimer);
  }, []);

  // Persistent toast banner - will NOT auto-dismiss so the user has time to read and close manually
  const [showToastHint, setShowToastHint] = useState(true);

  const handleEnterClick = () => {
    setIsExploding(true);

    setTimeout(() => {
      onEnterHouse();
    }, 600);
  };

  return (
    <div
      onClick={() => {
        audioSystem.initAudio();
        if (!audioSystem.getIsPlaying()) {
          audioSystem.transitionToScene('intro', false);
        }
      }}
      className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center select-none px-3 sm:px-4 pt-14 sm:pt-16 md:pt-16 landscape:pt-10 pb-14 sm:pb-16 landscape:pb-8 cursor-default"
    >
      {/* Main Column */}
      <div
        className={`relative z-10 transition-transform duration-700 max-w-4xl w-full flex flex-col items-center text-center my-auto ${
          isExploding ? 'scale-150 opacity-0 blur-lg' : 'scale-100 opacity-100'
        }`}
      >
        {/* Toast informativo persistente universal — Integrado en el flujo vertical, ARRIBA del título y badge, nunca tapa nada */}
        {showToastHint && (
          <div className="w-full max-w-lg mb-1 sm:mb-1.5 landscape:mb-0.5 z-30 transition-all duration-300 animate-fadeIn select-none px-1">
            <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 landscape:py-0.5 rounded-xl sm:rounded-full bg-[#161413]/98 border-2 border-[#e53935] text-[#eaeaea] shadow-[0_0_25px_rgba(229,57,53,0.7)] backdrop-blur-md">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <span className="w-2 h-2 rounded-full bg-[#e53935] animate-ping shrink-0" />
                <span className="font-medium text-left text-[9.5px] sm:text-xs landscape:text-[8.5px] text-[#eaeaea] leading-tight">
                  Mover los comentarios para poder acceder a la casa por la memoria
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowToastHint(false);
                }}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 hover:bg-[#e53935] text-[#c9b79c] hover:text-white text-[9px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 border border-white/20 active:scale-95 whitespace-nowrap"
                title="Cerrar esta ventana"
              >
                <span className="sm:hidden">Cerrar ✕</span>
                <span className="hidden sm:inline">Cerrar esta ventana ✕</span>
              </button>
            </div>
          </div>
        )}

        {/* Title Lockup in accessible, human language — Siempre visible en celular horizontal y tablets */}
        <div className="space-y-0.5 sm:space-y-1 mb-1 sm:mb-2 landscape:mb-0.5 shrink-0">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-0.5">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9.5px] sm:text-xs font-mono-archive text-[#c9b79c]">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e53935]" />
              <span>Resistencia, Chaco · Marcelo T. de Alvear 32</span>
            </div>
          </div>

          <h1 className="font-display font-black text-lg sm:text-3xl md:text-4xl landscape:text-base sm:landscape:text-2xl tracking-wide text-white uppercase drop-shadow-md">
            LA CASA POR LA MEMORIA
          </h1>

          <p className="font-body text-[10px] sm:text-xs text-[#eaeaea]/85 max-w-lg mx-auto leading-relaxed line-clamp-2 md:line-clamp-none hidden sm:block landscape:hidden md:landscape:block">
            Un edificio donde se intentó borrar la verdad tapiando sótanos con escombros. Hoy abrimos sus puertas para confrontar el negacionismo de las pantallas con las pruebas de la historia.
          </p>
        </div>

        {/* Real House Facade Photo Container - Div ajustado exactamente al tamaño de la imagen (w-fit) sin espacios vacíos laterales */}
        <div className="relative w-fit max-w-[94vw] mx-auto mb-1 sm:mb-2.5 landscape:mb-0.5 flex items-center justify-center shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/25 bg-[#0d0c0b] p-0 shrink-0">
          {/* Authentic Documentary Photographic Facade (Marcelo T. de Alvear 32) */}
          <img 
            src="https://i.ibb.co/mVnfsVwW/fachada-3-D-casa-por-la-memoria.jpg" 
            alt="Fachada Casa por la Memoria" 
            className="h-[20vh] sm:h-[26vh] md:h-[35vh] lg:h-[40vh] landscape:h-[19vh] md:landscape:h-[30vh] w-auto max-w-[92vw] md:max-w-[85vw] object-cover pointer-events-none block"
            loading="eager"
          />

          {/* Subtle bottom warm entrance illumination */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#7a1e1e]/25 blur-lg pointer-events-none" />
        </div>

        {/* ACTION BUTTON: "ENTRAR A LA CASA" con efecto de GLOW PARPADEANTE llamativo visible detrás de los comentarios */}
        <div
          className={`transition-all duration-1000 ease-out flex flex-col items-center justify-center relative z-10 shrink-0 ${
            showEnterButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Resplandor / Glow parpadeante de fondo que se asoma y llama la atención del usuario a través de los comentarios */}
          <div className="absolute inset-0 -m-8 sm:-m-12 rounded-full bg-[#e53935]/40 blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-0 -m-4 sm:-m-6 rounded-full bg-[#e53935]/60 blur-xl animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '2.8s' }} />

          <button
            onClick={handleEnterClick}
            className="relative px-6 sm:px-10 py-2 sm:py-3.5 landscape:py-1.5 landscape:px-6 rounded-full bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#f59e0b] hover:from-[#b91c1c] hover:via-[#ef4444] hover:to-[#fbbf24] text-white font-sans font-black text-xs sm:text-base landscape:text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(239,68,68,0.95),0_0_25px_rgba(245,158,11,0.6)] border-2 border-white ring-4 ring-red-500/60 animate-pulse flex items-center justify-center group focus:outline-none cursor-pointer"
            onMouseEnter={() => onHoverInteractive('Entrar', true)}
            onMouseLeave={() => onHoverInteractive('', false)}
            aria-label="Entrar a la Casa por la Memoria"
          >
            <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Entrar a la Casa</span>
          </button>
          <p className="text-[9px] sm:text-[10px] font-mono-archive text-[#c9b79c] mt-0.5 sm:mt-1.5 animate-pulse transition-opacity duration-1000 hidden sm:block landscape:hidden md:landscape:block">
            Haz clic para ingresar al vestíbulo central y comenzar el recorrido
          </p>
        </div>
      </div>

      {/* Floating Negationist Popups - Fully Draggable with Mouse Cursor or Mobile Touch */}
      {comments.map((c) => (
        <DraggableCommentBubble key={c.id} comment={c} isExploding={isExploding} isMobile={isMobile} />
      ))}

      {/* Disclaimer fijado al fondo de la pantalla con z-40 — Todo el texto queda contenido dentro de su caja sin salirse ni tapar el botón */}
      <div className="fixed bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92vw] sm:w-auto px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-full bg-[#121110]/95 border border-[#7a1e1e] text-[8px] sm:text-[10px] font-mono-archive text-[#c9b79c] text-center shadow-[0_4px_24px_rgba(0,0,0,0.95)] backdrop-blur-md pointer-events-none animate-fadeIn select-none leading-tight box-border">
        <span className="block sm:inline">
          Los comentarios son frases reales tomadas de redes y declaraciones públicas.{' '}
        </span>
        <span className="block sm:inline text-[#c9b79c]/80">
          Los usuarios son ficticios.
        </span>
      </div>
    </div>
  );
};
