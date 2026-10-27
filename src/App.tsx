/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Analytics } from '@vercel/analytics/react';
import React, { useState, useEffect, useCallback } from 'react';
import { SceneId, TestimonialPiece, BasementEvidence, ModalType } from './types';
import { TESTIMONIAL_PIECES, BASEMENT_EVIDENCE } from './data/vestigiosData';
import { Header } from './components/Header';
import { NavigationDock } from './components/NavigationDock';
import { PieceCounter } from './components/PieceCounter';
import { CustomCursor } from './components/CustomCursor';
import { PortalCanvas } from './components/PortalCanvas';
import { Modals } from './components/Modals';
import { NoiseIntro } from './components/NoiseIntro';
import { VestibuleScene } from './components/VestibuleScene';
import { StairsScene } from './components/StairsScene';
import { BasementScene } from './components/BasementScene';
import { MuralScene } from './components/MuralScene';
import { audioSystem } from './utils/audioSystem';
import { analyticsTracker } from './utils/analyticsTracker';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<'in' | 'out'>('in');

  // Tracking visited content
  const [visitedPieces, setVisitedPieces] = useState<Set<string>>(new Set());
  const [visitedEvidence, setVisitedEvidence] = useState<Set<string>>(new Set());
  const [counterMessage, setCounterMessage] = useState<string | null>(null);

  // Completed paths status
  const [completedPaths, setCompletedPaths] = useState<{ a: boolean; b: boolean }>({
    a: false,
    b: false,
  });
  const [hasShownCompletionModal, setHasShownCompletionModal] = useState(false);

  // Modals state (includes academic_framework, library and installation_video modals)
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPiece, setSelectedPiece] = useState<TestimonialPiece | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<BasementEvidence | null>(null);

  // Audio system state
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => audioSystem.getVolume());
  const [isAudioActive, setIsAudioActive] = useState(true);

  // Custom Cursor
  const [cursorLabel, setCursorLabel] = useState('');
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const handleHoverInteractive = useCallback((label: string, isEntering: boolean) => {
    setCursorLabel(label);
    setIsHoveringInteractive(isEntering);
  }, []);

  // Audio volume change
  const handleChangeVolume = (newVol: number) => {
    const adjusted = audioSystem.setVolume(newVol);
    setVolume(adjusted);
    const muted = audioSystem.getIsMuted();
    setIsMuted(muted);
    if (!muted && adjusted > 0) {
      setIsAudioActive(true);
    }
    analyticsTracker.trackAction(`Ajustó volumen a ${Math.round(adjusted * 100)}%`, 'audio');
  };

  // Audio mute toggle
  const handleToggleAudio = () => {
    const muted = audioSystem.toggleMute();
    setIsMuted(muted);
    setVolume(audioSystem.getVolume());
    if (!muted) {
      setIsAudioActive(true);
    }
    analyticsTracker.trackAction(muted ? 'Silenció el audio documental' : 'Activó el audio documental', 'audio');
  };

  // Preload authentic documentary audio tracks and key images for rapid scene loading
  useEffect(() => {
    audioSystem.preloadAllTracks();

    const PRELOAD_IMAGES = [
      'https://i.ibb.co/mVnfsVwW/fachada-3-D-casa-por-la-memoria.jpg',
      'https://i.ibb.co/GfYwsY6v/SOTANO-MAYOR-SB1-IMAGEN-DE-LA-COMISI-N-PROVINCIAL-POR-LA-MEMORIA.png',
      'https://i.ibb.co/b5ss7nHh/Inscripci-n-en-la-pared-FIRMEZA-Y-LUZ-COMO-CRISTAL-DE-ROCA-COMISI-N-PROVINCIAL-POR-LA-MEMORIA.png',
      'https://i.ibb.co/tpt6c5XR/vector-picana-electrica.png',
      'https://i.ibb.co/JFQM18Dw/vector-caja-electrica.png',
      'https://i.ibb.co/67vwLggc/vector-fusible.png',
      '/assets/aistudio/SEBA_8a04cb39.png',
      '/assets/aistudio/JUANI_a65e27b3.jpeg',
      '/assets/aistudio/TIAGO_fd1d1e70.jpeg',
      '/assets/aistudio/MAURO_0e23c1aa.jpeg',
      '/assets/aistudio/LAILA_b24d19d0.png',
      '/assets/aistudio/CIELO_9edf063b.jpeg',
      '/assets/aistudio/LUCAS_bf19a7b5.JPEG',
    ];

    PRELOAD_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Conmute authentic documentary audio landscapes per scene
  useEffect(() => {
    audioSystem.transitionToScene(currentScene, isMuted);
  }, [currentScene, isMuted]);

  // Infinite zoom transitions as specified in Guión
  const performTransition = useCallback(
    (targetScene: SceneId, direction: 'in' | 'out') => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTransitionDirection(direction);

      const startTime = performance.now();
      const duration = 750; // ms

      const step = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        setTransitionProgress(ease);

        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          setCurrentScene(targetScene);
          setTransitionProgress(0);
          setIsTransitioning(false);
          analyticsTracker.trackScene(targetScene);
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      };

      requestAnimationFrame(step);
    },
    [isTransitioning]
  );

  // Unconditional top scroll whenever the active scene changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentScene]);

  // Navigation handlers
  const handleGoToScene = (target: SceneId) => {
    if (target === currentScene) return;

    if (target === 'camino_b') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setActiveModal('sensitive_warning');
      return;
    }

    const direction = target === 'vestibulo' || target === 'intro' ? 'out' : 'in';
    performTransition(target, direction);
  };

  const handleConfirmSensitiveAudio = (enableAudio: boolean) => {
    setActiveModal(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (enableAudio) {
      setIsMuted(false);
      setIsAudioActive(true);
      const activeVol = volume > 0 ? volume : 0.7;
      setVolume(activeVol);
      audioSystem.setVolume(activeVol);
      audioSystem.setEnabled(true);
      audioSystem.transitionToScene('camino_b', false);
    } else {
      setIsMuted(true);
      setIsAudioActive(false);
      audioSystem.setEnabled(false);
      audioSystem.transitionToScene('camino_b', true);
    }
    performTransition('camino_b', 'in');
  };

  // Inspecting a piece in Camino A
  const handleSelectPiece = (piece: TestimonialPiece) => {
    setSelectedPiece(piece);
    setActiveModal('piece_detail');
    analyticsTracker.trackAction(`Abrió testimonio de vida: ${piece.title} (${piece.person})`, 'lectura');

    setVisitedPieces((prev) => {
      const next = new Set(prev).add(piece.id);
      const count = next.size;
      const total = TESTIMONIAL_PIECES.length;
      setCounterMessage(`Viste ${count} de ${total} historias de vida`);

      if (count === total && !completedPaths.a) {
        setCompletedPaths((cp) => {
          const updated = { ...cp, a: true };
          if (updated.b && !hasShownCompletionModal) {
            setHasShownCompletionModal(true);
            setTimeout(() => setActiveModal('completion_dialog'), 900);
          }
          return updated;
        });
      }

      return next;
    });
  };

  // Mark evidence as visited without opening modal
  const handleMarkEvidenceVisited = (evidenceId: string) => {
    setVisitedEvidence((prev) => {
      if (prev.has(evidenceId)) return prev;
      const next = new Set(prev).add(evidenceId);
      const count = next.size;
      const total = BASEMENT_EVIDENCE.length;
      setCounterMessage(`Viste ${count} de ${total} evidencias del sótano`);

      if (count === total && !completedPaths.b) {
        setCompletedPaths((cp) => {
          const updated = { ...cp, b: true };
          if (updated.a && !hasShownCompletionModal) {
            setHasShownCompletionModal(true);
            setTimeout(() => setActiveModal('completion_dialog'), 900);
          }
          return updated;
        });
      }

      return next;
    });
  };

  // Inspecting evidence in Camino B (opens full judicial peritaje modal)
  const handleSelectEvidence = (evidence: BasementEvidence) => {
    handleMarkEvidenceVisited(evidence.id);
    setSelectedEvidence(evidence);
    setActiveModal('evidence_detail');
    analyticsTracker.trackAction(`Abrió peritaje de evidencia: ${evidence.title}`, 'lectura');
  };

  // Progress computation
  const totalA = TESTIMONIAL_PIECES.length;
  const totalB = BASEMENT_EVIDENCE.length;
  const totalAll = totalA + totalB;
  const visitedA = visitedPieces.size;
  const visitedB = visitedEvidence.size;
  const totalVisited = visitedA + visitedB;
  const progressPercent = totalAll > 0 ? Math.min(100, Math.round((totalVisited / totalAll) * 100)) : 0;

  // Trigger completion modal if progress completes
  useEffect(() => {
    if (progressPercent >= 100 && !hasShownCompletionModal) {
      setHasShownCompletionModal(true);
      const timer = setTimeout(() => {
        setActiveModal('completion_dialog');
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [progressPercent, hasShownCompletionModal]);

  // Host / Owner secret shortcut to access the final mural directly
  const [isHostUnlocked, setIsHostUnlocked] = useState(false);

  const handleHostAccess = () => {
    setIsHostUnlocked(true);
    setCompletedPaths({ a: true, b: true });
    performTransition('mural', 'in');
    analyticsTracker.trackAction('Acceso directo al Mural Final ejecutado por Host', 'meta');
  };

  // Acceso exclusivo y privado para el publicador/creador a través de la URL (sin atajos de teclado públicos)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      if (
        searchParams.get('panel') === 'metricas' ||
        searchParams.get('admin') === 'true' ||
        hash === '#metricas'
      ) {
        setIsHostUnlocked(true);
        setActiveModal('analytics');
        analyticsTracker.trackAction('Acceso al Panel de Control y Métricas vía URL', 'meta');
      } else if (
        searchParams.get('panel') === 'mural' ||
        searchParams.get('host') === 'mural' ||
        hash === '#mural'
      ) {
        setIsHostUnlocked(true);
        setCompletedPaths({ a: true, b: true });
        performTransition('mural', 'in');
        analyticsTracker.trackAction('Acceso directo al Mural Final ejecutado por Host vía URL', 'meta');
      }
    } catch {}
  }, []);

  return (
    <div
      className={`relative w-full ${
        currentScene === 'intro' || currentScene === 'vestibulo'
          ? 'h-[100dvh] max-h-[100dvh] overflow-hidden'
          : 'min-h-screen overflow-x-hidden'
      } bg-[#090807] text-[#eaeaea] font-display`}
    >
      {/* Interactive Custom Cursor */}
      <CustomCursor
        cursorLabel={cursorLabel}
        isHoveringInteractive={isHoveringInteractive}
      />

      {/* 3D Portal Canvas Overlay */}
      <PortalCanvas
        currentScene={currentScene}
        isTransitioning={isTransitioning}
        transitionProgress={transitionProgress}
      />

      {/* Fixed Top Bar Header with Biblioteca link and Upper Right Progress Capsule */}
      <Header
        currentScene={currentScene}
        isMuted={isMuted}
        volume={volume}
        onChangeVolume={handleChangeVolume}
        progressPercent={progressPercent}
        visitedCount={totalVisited}
        totalCount={totalAll}
        onToggleAudio={handleToggleAudio}
        onOpenProjectModal={() => setActiveModal('project')}
        onOpenLibraryModal={() => setActiveModal('library')}
        onOpenTeamModal={() => setActiveModal('team')}
        onOpenAcademicModal={() => setActiveModal('academic_framework')}
        onOpenContactModal={() => setActiveModal('contact')}
        onGoToScene={handleGoToScene}
        onHoverInteractive={handleHoverInteractive}
        isHostUnlocked={isHostUnlocked}
        onHostAccess={handleHostAccess}
        onOpenAnalytics={() => setActiveModal('analytics')}
      />

      {/* Main Content Area — Confinado estrictamente a 100dvh sin scroll en intro y vestíbulo */}
      <main
        className={`relative z-20 w-full transition-all duration-700 ${
          currentScene === 'intro' || currentScene === 'vestibulo'
            ? 'h-[100dvh] max-h-[100dvh] overflow-hidden'
            : 'min-h-screen'
        } ${
          isTransitioning
            ? transitionDirection === 'in'
              ? 'scale-125 opacity-0 blur-md'
              : 'scale-90 opacity-0 blur-md'
            : 'opacity-100'
        }`}
      >
        {currentScene === 'intro' && (
          <NoiseIntro
            onEnterHouse={() => performTransition('vestibulo', 'in')}
            onHoverInteractive={handleHoverInteractive}
          />
        )}

        {currentScene === 'vestibulo' && (
          <VestibuleScene
            onSelectPath={handleGoToScene}
            onOpenLibraryModal={() => setActiveModal('library')}
            onOpenVideoModal={() => setActiveModal('installation_video')}
            visitedA={visitedPieces.size}
            totalA={TESTIMONIAL_PIECES.length}
            visitedB={visitedEvidence.size}
            totalB={BASEMENT_EVIDENCE.length}
            completedPaths={completedPaths}
            onHoverInteractive={handleHoverInteractive}
          />
        )}

        {currentScene === 'camino_a' && (
          <StairsScene
            visitedPieces={visitedPieces}
            onSelectPiece={handleSelectPiece}
            onHoverInteractive={handleHoverInteractive}
          />
        )}

        {currentScene === 'camino_b' && (
          <BasementScene
            visitedEvidence={visitedEvidence}
            onSelectEvidence={handleSelectEvidence}
            onMarkEvidenceVisited={handleMarkEvidenceVisited}
            onHoverInteractive={handleHoverInteractive}
            isAudioActive={isAudioActive}
          />
        )}

        {currentScene === 'mural' && (
          <MuralScene onHoverInteractive={handleHoverInteractive} />
        )}
      </main>

      {/* Permanent Navigation Dock */}
      <NavigationDock
        currentScene={currentScene}
        visitedA={visitedPieces.size}
        totalA={TESTIMONIAL_PIECES.length}
        visitedB={visitedEvidence.size}
        totalB={BASEMENT_EVIDENCE.length}
        completedPaths={completedPaths}
        onNavigate={handleGoToScene}
        onHoverInteractive={handleHoverInteractive}
        onOpenMural={() => performTransition('mural', 'in')}
      />

      {/* Corner Toast Counter */}
      <PieceCounter message={counterMessage} />

      {/* Global Modals */}
      <Modals
        activeModal={activeModal}
        selectedPiece={selectedPiece}
        selectedEvidence={selectedEvidence}
        isMuted={isMuted}
        onClose={() => setActiveModal(null)}
        onConfirmSensitiveAudio={handleConfirmSensitiveAudio}
        onOpenMural={() => performTransition('mural', 'in')}
        onHoverInteractive={handleHoverInteractive}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}