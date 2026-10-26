import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, ShieldAlert, FileText, Map, Award, BookOpen, Video, ExternalLink, Play, Pause, Instagram, Linkedin, Mail, Sparkles, Search, ChevronDown, ChevronRight, Copy, Check, FileCheck, Layers, Bookmark, Quote, Download, Folder, GraduationCap, School, Activity, BarChart3, RefreshCw, Smartphone, Laptop, Monitor, Radio, Compass, Trash2, Link as LinkIcon, ShieldCheck, Clock } from 'lucide-react';
import { ModalType, TestimonialPiece, BasementEvidence } from '../types';
import { TEAM_MEMBERS } from '../data/vestigiosData';
import { LIBRARY_DOCUMENTS, GOOGLE_DRIVE_FOLDER_URL } from '../data/libraryDocumentsData';
import { downloadLibraryPdf, openLibraryPdfInNewTab } from '../utils/pdfGenerator';
import { VestigiosLogo } from './VestigiosLogo';
import { audioSystem } from '../utils/audioSystem';
import { analyticsTracker, AnalyticsSummary } from '../utils/analyticsTracker';

interface ModalsProps {
  activeModal: ModalType;
  selectedPiece: TestimonialPiece | null;
  selectedEvidence: BasementEvidence | null;
  isMuted: boolean;
  onClose: () => void;
  onConfirmSensitiveAudio: (enableAudio: boolean) => void;
  onOpenMural: () => void;
  onHoverInteractive: (label: string, isEntering: boolean) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  selectedPiece,
  selectedEvidence,
  isMuted: _isMuted,
  onClose,
  onConfirmSensitiveAudio,
  onOpenMural,
  onHoverInteractive: _onHoverInteractive,
}) => {
  const [libraryCategory, setLibraryCategory] = useState<'el_golpe' | 'negacionismo' | 'difusion'>('el_golpe');
  const [activeDifusionDocId, setActiveDifusionDocId] = useState<string>('difusion-org');
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isTrialAudioPlaying, setIsTrialAudioPlaying] = useState<boolean>(false);
  const [isEvidenceAudioPlaying, setIsEvidenceAudioPlaying] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary>(() => analyticsTracker.getSummary());
  const [copiedAnalyticsReport, setCopiedAnalyticsReport] = useState<boolean>(false);
  const [copiedDirectLink, setCopiedDirectLink] = useState<boolean>(false);

  // Auto-refresh analytics summary while the modal is open
  useEffect(() => {
    if (activeModal === 'analytics') {
      setAnalyticsSummary(analyticsTracker.getSummary());
      const timer = setInterval(() => {
        setAnalyticsSummary(analyticsTracker.getSummary());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeModal]);

  const handleDownloadDoc = (docItem: typeof currentDoc) => {
    setDownloadingDocId(docItem.id);
    try {
      downloadLibraryPdf(docItem);
    } catch (e) {
      console.error('Error generating PDF:', e);
    }
    setTimeout(() => {
      setDownloadingDocId(null);
    }, 2000);
  };

  const handleCopyQuote = (text: string) => {
    try {
      navigator.clipboard?.writeText(text);
      setCopiedQuote(text);
      setTimeout(() => setCopiedQuote(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleModalClose = () => {
    audioSystem.stopForegroundAudio();
    setIsTrialAudioPlaying(false);
    setIsEvidenceAudioPlaying(false);
    onClose();
  };

  if (!activeModal) return null;

  const currentDoc = LIBRARY_DOCUMENTS.find(doc => {
    if (libraryCategory === 'el_golpe') return doc.category === 'el_golpe';
    if (libraryCategory === 'negacionismo') return doc.category === 'negacionismo';
    return doc.id === activeDifusionDocId;
  }) || LIBRARY_DOCUMENTS[0];

  const filteredSections = currentDoc.sections.filter(s => {
    if (!docSearchQuery.trim()) return true;
    const q = docSearchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) ||
           s.summary.toLowerCase().includes(q) ||
           s.content.toLowerCase().includes(q) ||
           (s.quotes && s.quotes.some(quote => quote.toLowerCase().includes(q)));
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={handleModalClose} />

      {/* 1. Modal: EL PROYECTO (Accessible Language - Point 4) */}
      {activeModal === 'project' && (
        <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#121212] border border-white/20 rounded-xl p-5 sm:p-8 text-[#eaeaea] shadow-2xl z-10">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <VestigiosLogo size="sm" showText={false} />
              <div>
                <h2 className="font-display font-black text-lg text-white">EL PROYECTO VESTIGIOS</h2>
                <p className="text-xs text-[#c9b79c] font-mono-archive">Memoria, Verdad y Justicia para las nuevas generaciones</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-body text-[#eaeaea]/90 leading-relaxed">
            <p>
              <strong className="text-white font-sans font-bold">VESTIGIOS</strong> es una experiencia documental que busca acercar la historia real del terrorismo de Estado en el Chaco a los jóvenes de hoy, combatiendo la desinformación y las frases hechas que muchas veces se leen en redes sociales.
            </p>
            <p>
              En el centro de Resistencia (Marcelo T. de Alvear 32) existe un edificio histórico que hoy es la <strong className="text-white">Casa por la Memoria</strong>. Entre 1975 y 1978 funcionó allí la Brigada de Investigaciones de la policía provincial. En ese lugar se secuestró, torturó y desapareció a cientos de personas de manera clandestina.
            </p>
            <p>
              Antes de que la dictadura terminara, los represores intentaron borrar todas las huellas: tiraron toneladas de escombros en los sótanos y construyeron baños y pisos falsos encima para decir que "ahí no había nada". Pero las pruebas sobrevivieron: frases desesperadas que los secuestrados tallaron en las paredes de concreto, herramientas de tortura desenterradas por peritos científicos y testimonios de quienes lograron salir con vida.
            </p>

            <div className="p-4 rounded-lg bg-[#090807] border border-[#7a1e1e]/40 my-3">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#e53935] mb-2">
                Un Ecosistema en 3 Partes:
              </h4>
              <ul className="text-xs space-y-2 font-mono-archive text-[#c9b79c]">
                <li>• <strong className="text-white">Instagram (@vestigios_negacionismo):</strong> Videos y carruseles ágiles para desmontar mentiras negacionistas en el celular.</li>
                <li>• <strong className="text-white">Página Web Interactiva:</strong> Un recorrido guiado en primera persona por la Casa, los testimonios y los sótanos.</li>
                <li>• <strong className="text-white">Instalación Física:</strong> Una experiencia inmersiva que da vida a las voces de las victimas de la dictadura cívico-militar en
Argentina a través de una silueta proyectada.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: BIBLIOTECA (El Golpe, Negacionismo, Difusión) */}
      {activeModal === 'library' && (
        <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#121212] border border-white/20 rounded-xl p-4 sm:p-7 text-[#eaeaea] shadow-2xl z-10 custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7a1e1e]/40 border border-[#e53935] flex items-center justify-center text-[#e53935] shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg sm:text-xl text-white tracking-wide">
                  BIBLIOTECA DE MEMORIA Y DERECHOS HUMANOS
                </h2>
                <p className="text-xs text-[#c9b79c] font-mono-archive">
                  Documentos, expedientes y cuadernillos pedagógicos del RUV y la CPM Chaco
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors focus:outline-none"
                aria-label="Cerrar biblioteca"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3 Main Action Buttons: "El Golpe", "Negacionismo", "Difusión" */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4">
            <button
              onClick={() => {
                setLibraryCategory('el_golpe');
                setExpandedSectionId(null);
                setDocSearchQuery('');
              }}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all relative overflow-hidden group focus:outline-none ${
                libraryCategory === 'el_golpe'
                  ? 'bg-[#7a1e1e] border-white text-white shadow-[0_0_20px_rgba(229,57,53,0.45)] ring-1 ring-white/50'
                  : 'bg-[#181615] border-white/15 hover:border-[#c9b79c] text-[#eaeaea]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-black text-sm sm:text-base uppercase tracking-wider">
                  EL GOLPE
                </span>
                <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-black/40 text-[#c9b79c] border border-white/10">
                  148 págs
                </span>
              </div>
              <div className="text-[11px] font-mono-archive text-[#c9b79c] truncate">
                ELGOLPE.pdf
              </div>
              <div className="text-[10px] text-white/60 mt-1 line-clamp-1">
                Informe DDHH Diputados Chaco (1985)
              </div>
            </button>

            <button
              onClick={() => {
                setLibraryCategory('negacionismo');
                setExpandedSectionId(null);
                setDocSearchQuery('');
              }}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all relative overflow-hidden group focus:outline-none ${
                libraryCategory === 'negacionismo'
                  ? 'bg-[#7a1e1e] border-white text-white shadow-[0_0_20px_rgba(229,57,53,0.45)] ring-1 ring-white/50'
                  : 'bg-[#181615] border-white/15 hover:border-[#c9b79c] text-[#eaeaea]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-black text-sm sm:text-base uppercase tracking-wider">
                  NEGACIONISMO
                </span>
                <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-black/40 text-[#c9b79c] border border-white/10">
                  117 págs
                </span>
              </div>
              <div className="text-[11px] font-mono-archive text-[#c9b79c] truncate">
                ANM - Cuadernillo negacionismo_0322.pdf
              </div>
              <div className="text-[10px] text-white/60 mt-1 line-clamp-1">
                Secretaría de DDHH de la Nación (2021)
              </div>
            </button>

            <button
              onClick={() => {
                setLibraryCategory('difusion');
                setExpandedSectionId(null);
                setDocSearchQuery('');
              }}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all relative overflow-hidden group focus:outline-none ${
                libraryCategory === 'difusion'
                  ? 'bg-[#7a1e1e] border-white text-white shadow-[0_0_20px_rgba(229,57,53,0.45)] ring-1 ring-white/50'
                  : 'bg-[#181615] border-white/15 hover:border-[#c9b79c] text-[#eaeaea]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-black text-sm sm:text-base uppercase tracking-wider">
                  DIFUSIÓN
                </span>
                <span className="text-[10px] font-mono-archive px-2 py-0.5 rounded bg-black/40 text-[#c9b79c] border border-white/10">
                  3 Archivos
                </span>
              </div>
              <div className="text-[11px] font-mono-archive text-[#c9b79c] truncate">
                Colección RUV Chaco
              </div>
              <div className="text-[10px] text-white/60 mt-1 line-clamp-1">
                Organizaciones, Educación e Identidad
              </div>
            </button>
          </div>

          {/* Sub-selector when DIFUSIÓN is active */}
          {libraryCategory === 'difusion' && (
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#090807] border border-white/15 mb-4 animate-fadeIn">
              <div className="text-[10px] font-mono-archive text-[#c9b79c] mb-2 px-1 flex items-center justify-between">
                <span>SELECCIONAR DOCUMENTO DE DIFUSIÓN:</span>
                <span className="text-[#e53935]">Colección RUV Chaco</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setActiveDifusionDocId('difusion-org');
                    setExpandedSectionId(null);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-xs font-mono-archive text-left transition-all flex items-center gap-2 border ${
                    activeDifusionDocId === 'difusion-org'
                      ? 'bg-[#7a1e1e]/60 border-white text-white shadow-md'
                      : 'bg-[#141312] border-white/5 text-[#eaeaea]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#e53935] shrink-0" />
                  <div className="truncate">
                    <div className="font-bold">1 - Organizaciones.pdf</div>
                    <div className="text-[10px] text-[#c9b79c] truncate">Ligas, UES y PRT/ERP</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveDifusionDocId('difusion-edu');
                    setExpandedSectionId(null);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-xs font-mono-archive text-left transition-all flex items-center gap-2 border ${
                    activeDifusionDocId === 'difusion-edu'
                      ? 'bg-[#7a1e1e]/60 border-white text-white shadow-md'
                      : 'bg-[#141312] border-white/5 text-[#eaeaea]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#e53935] shrink-0" />
                  <div className="truncate">
                    <div className="font-bold">2 - Educación.pdf</div>
                    <div className="text-[10px] text-[#c9b79c] truncate">Correntinazo y UNNE</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveDifusionDocId('difusion-identidad');
                    setExpandedSectionId(null);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-xs font-mono-archive text-left transition-all flex items-center gap-2 border ${
                    activeDifusionDocId === 'difusion-identidad'
                      ? 'bg-[#7a1e1e]/60 border-white text-white shadow-md'
                      : 'bg-[#141312] border-white/5 text-[#eaeaea]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#e53935] shrink-0" />
                  <div className="truncate">
                    <div className="font-bold">3 - Identidad.pdf</div>
                    <div className="text-[10px] text-[#c9b79c] truncate">Nietos Restituidos</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE DOCUMENT PRESENTATION AND UNFOLDED READER */}
          <div className="space-y-4 animate-fadeIn">
            {/* Document Header Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#090807] border border-white/15 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                {/* Interactive Download Original Authentic PDF Button */}
                <a
                  href={currentDoc.driveDownloadUrl || `/${encodeURIComponent(currentDoc.pdfFileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={currentDoc.pdfFileName}
                  onClick={() => handleDownloadDoc(currentDoc)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7a1e1e]/50 hover:bg-[#7a1e1e] border border-[#e53935] hover:border-white text-xs font-mono-archive text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(229,57,53,0.4)] group cursor-pointer focus:outline-none"
                  title={`Haz clic para descargar el archivo original ${currentDoc.pdfFileName}`}
                >
                  <Download className={`w-3.5 h-3.5 text-[#e53935] group-hover:text-white transition-colors ${downloadingDocId === currentDoc.id ? 'animate-bounce text-emerald-400' : ''}`} />
                  <span className="font-bold underline decoration-[#e53935]/60 group-hover:decoration-white">{currentDoc.pdfFileName}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-[#c9b79c] group-hover:text-white border border-white/10 uppercase tracking-wider flex items-center gap-1">
                    {downloadingDocId === currentDoc.id ? 'Descargando...' : 'Descargar PDF Original'}
                  </span>
                </a>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-[11px] font-mono-archive text-[#c9b79c]">
                    {currentDoc.badge}
                  </div>
                  {currentDoc.driveViewUrl && (
                    <a
                      href={currentDoc.driveViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-mono-archive border border-white/20 transition-all cursor-pointer focus:outline-none"
                      title={`Abrir visor de ${currentDoc.pdfFileName} en Google Drive`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#e53935]" />
                      <span className="hidden sm:inline">Ver en Drive</span>
                    </a>
                  )}
                  <a
                    href={currentDoc.driveDownloadUrl || `/${encodeURIComponent(currentDoc.pdfFileName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={currentDoc.pdfFileName}
                    onClick={() => handleDownloadDoc(currentDoc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#7a1e1e] hover:bg-[#992222] text-white text-xs font-mono-archive border border-[#e53935]/50 transition-all cursor-pointer focus:outline-none shadow-sm"
                    title={`Descargar archivo oficial original ${currentDoc.pdfFileName}`}
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>{downloadingDocId === currentDoc.id ? 'Descargando...' : 'Guardar Archivo'}</span>
                  </a>
                </div>
              </div>

              <h3 className="font-display font-black text-lg sm:text-2xl text-white mt-1">
                {currentDoc.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#c9b79c] font-mono-archive mb-3">
                {currentDoc.subtitle} · {currentDoc.publisher} ({currentDoc.year})
              </p>
              <p className="text-xs sm:text-sm font-body text-[#eaeaea]/90 leading-relaxed mb-3">
                {currentDoc.description}
              </p>

              <div className="p-3 rounded-lg bg-[#141312] border border-white/10 text-xs text-white/70 font-mono-archive">
                <span className="text-[#e53935] font-bold">Contexto Histórico: </span>
                <span>{currentDoc.context}</span>
              </div>
            </div>

            {/* Key Topics Tags */}
            <div className="p-3.5 rounded-xl bg-[#151413] border border-white/10">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#c9b79c] mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#e53935]" />
                <span>Ejes Temáticos Documentados:</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono-archive text-white/85">
                {currentDoc.keyTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 bg-black/40 p-2 rounded border border-white/5">
                    <span className="text-[#e53935] font-bold">›</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Document Interactive Reader & Sections */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#e53935]" />
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
                    Capítulos y Secciones Desplegables ({filteredSections.length} de {currentDoc.sections.length}):
                  </h4>
                </div>

                {/* Search Bar inside Document */}
                <div className="relative max-w-xs w-full">
                  <Search className="w-3.5 h-3.5 text-[#c9b79c] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={docSearchQuery}
                    onChange={(e) => setDocSearchQuery(e.target.value)}
                    placeholder="Filtrar temas o testimonios..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#090807] border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#e53935] font-mono-archive"
                  />
                  {docSearchQuery && (
                    <button
                      onClick={() => setDocSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/50 hover:text-white"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Sections Accordion */}
              <div className="space-y-2.5">
                {filteredSections.map((sec) => {
                  const isExpanded = expandedSectionId === sec.id || filteredSections.length === 1;
                  return (
                    <div
                      key={sec.id}
                      className={`rounded-xl border transition-all ${
                        isExpanded
                          ? 'bg-[#181615] border-[#e53935]/80 shadow-lg'
                          : 'bg-[#090807] border-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* Section Title Bar */}
                      <button
                        onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                        className="w-full p-3.5 text-left flex items-start justify-between gap-3 focus:outline-none"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-display font-black text-sm text-white">
                              {sec.title}
                            </span>
                            {sec.page && (
                              <span className="text-[10px] font-mono-archive px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#c9b79c]">
                                {sec.page}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/70 font-body leading-snug">
                            {sec.summary}
                          </p>
                        </div>
                        <div className="p-1 rounded-md bg-white/5 text-white/70 mt-1 shrink-0">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#e53935]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#c9b79c]" />
                          )}
                        </div>
                      </button>

                      {/* Unfolded Full Text & Verbatim Excerpts */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-white/10 space-y-3 animate-fadeIn">
                          <div className="text-xs sm:text-sm font-body text-[#eaeaea]/90 leading-relaxed whitespace-pre-line pt-2">
                            {sec.content}
                          </div>

                          {/* Historical Quotes from Document */}
                          {sec.quotes && sec.quotes.length > 0 && (
                            <div className="space-y-2 pt-2">
                              {sec.quotes.map((quote, qIdx) => (
                                <div
                                  key={qIdx}
                                  className="p-3 rounded-lg bg-black/60 border-l-2 border-[#e53935] flex items-start justify-between gap-3"
                                >
                                  <div className="flex items-start gap-2 text-xs font-mono-archive text-[#c9b79c] italic leading-relaxed">
                                    <Quote className="w-4 h-4 text-[#e53935] shrink-0 mt-0.5" />
                                    <span>{quote}</span>
                                  </div>
                                  <button
                                    onClick={() => handleCopyQuote(quote)}
                                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors shrink-0"
                                    title="Copiar cita"
                                  >
                                    {copiedQuote === quote ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredSections.length === 0 && (
                  <div className="p-6 text-center text-xs font-mono-archive text-white/50 bg-[#090807] rounded-xl border border-white/10">
                    No se encontraron secciones con el término "{docSearchQuery}".
                  </div>
                )}
              </div>
            </div>

            {/* Toast feedback for download */}
            {downloadingDocId && (
              <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-mono-archive text-center animate-fadeIn shadow-lg flex items-center justify-center gap-2">
                <Download className="w-4 h-4 animate-bounce text-emerald-400" />
                <span>Generando y descargando archivo <strong>{currentDoc.pdfFileName}</strong>...</span>
              </div>
            )}

            {/* Toast feedback for copied quote */}
            {copiedQuote && (
              <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono-archive text-center animate-fadeIn">
                ✓ Cita textual copiada al portapapeles para estudio y difusión.
              </div>
            )}

            {/* Institutional Footer */}
            <div className="p-3 rounded-lg bg-[#090807] border border-white/10 text-[11px] font-mono-archive text-white/50 text-center leading-relaxed">
              Documentación digitalizada de acceso público. Los ejemplares físicos, copias certificadas y legajos probatorios se encuentran en el Centro de Documentación de la Comisión Provincial por la Memoria del Chaco (Marcelo T. de Alvear 32, Resistencia).
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: VIDEO HORIZONTAL DE LA INSTALACIÓN (Point 12) */}
      {activeModal === 'installation_video' && (
        <div className="relative w-full max-w-3xl bg-[#121212] border border-white/20 rounded-xl p-5 sm:p-7 text-[#eaeaea] shadow-2xl z-10 animate-scaleUp">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#e53935]" />
              <h2 className="font-display font-black text-base sm:text-lg text-white">
                REGISTRO AUDIOVISUAL DE LA INSTALACIÓN
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Simulated 16:9 Cinematic Video Player with installation registration */}
          <div className="relative aspect-video w-full rounded-xl bg-black border border-white/15 overflow-hidden flex flex-col items-center justify-center mb-4 shadow-2xl">
            {/* Visual footage representation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 flex items-center justify-center p-6 text-center">
              <div className="space-y-3 max-w-md">
                <div className="inline-block px-3 py-1 rounded-full bg-[#7a1e1e]/60 border border-[#e53935] text-[10px] font-mono-archive text-white uppercase tracking-wider">
                  Experiencia Inmersiva con Vendas y Sombras
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  El Aula Intervenida: De la Oscuridad a la Verdad
                </h3>
                <p className="text-xs font-body text-[#c9b79c] leading-relaxed">
                  Los visitantes ingresan con los ojos vendados mientras se oyen pasos y el acordeón a lo lejos. Al retirarse las vendas, el videomapping y las fotos revelan las historias reales.
                </p>
                {/* Simulated Player Controls */}
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-mono-archive inline-flex items-center gap-2 transition-colors"
                >
                  {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-[#e53935]" /> : <Play className="w-3.5 h-3.5 text-[#e53935]" />}
                  <span>{isVideoPlaying ? 'Pausar registro' : 'Reproducir registro'}</span>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
              <div className="h-full bg-[#e53935] w-2/5 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-archive">
            <span className="text-[#c9b79c]">Montaje audiovisual & Sonido: Lucas Cabrera y Sebastián Candia</span>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#7a1e1e] hover:bg-[#912424] text-white font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Ver video completo en YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* 4. Modal: NOSOTROS (10 Team Members con fotos de gran tamaño, tipografía legible y enlaces directos) */}
      {activeModal === 'team' && (
        <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#121212] border border-white/20 rounded-2xl p-4 sm:p-7 text-[#eaeaea] shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
          {/* Header sin botón de Drive */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 shrink-0 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-[11px] font-mono-archive uppercase px-2.5 py-0.5 rounded bg-[#7a1e1e] text-white font-bold tracking-widest">
                  GRUPO 04 · VESTIGIOS
                </span>
                <span className="text-xs font-mono-archive text-[#c9b79c]">
                  10 Integrantes
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide">
                EQUIPO DE PRODUCCIÓN
              </h2>
              <p className="text-xs sm:text-sm text-[#c9b79c] font-mono-archive mt-0.5">
                Seminario de Integración de Imagen, Sonido y Multimedia · FADyCC — UNNE 2026
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid con fotos de gran tamaño y tipografía ampliada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-[#161514] border border-white/10 hover:border-[#7a1e1e] transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 group hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
              >
                {/* Fotografía destacada en gran formato */}
                {member.image && !failedImages[member.name] ? (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-[#e53935] shadow-xl shrink-0 transition-all duration-300 bg-[#0d0c0b]">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={() => setFailedImages((prev) => ({ ...prev, [member.name]: true }))}
                      className={`w-full h-full object-cover ${member.imagePosition || 'object-top'} filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500`}
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#262321] to-[#121110] border-2 border-white/20 flex flex-col items-center justify-center text-white font-display font-black text-3xl shrink-0 group-hover:border-[#e53935] group-hover:text-[#e53935] shadow-xl transition-all">
                    <span>{member.initials}</span>
                    <span className="text-[10px] font-mono-archive text-[#c9b79c] font-normal uppercase mt-1">Equipo</span>
                  </div>
                )}

                {/* Información y Biografía con texto más grande */}
                <div className="space-y-1.5 min-w-0 flex-1 flex flex-col justify-between h-full text-center sm:text-left">
                  <div>
                    <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white leading-tight">
                      {member.name}
                    </h3>
                    <div className="text-xs sm:text-sm text-[#e53935] font-bold leading-tight mt-0.5">
                      {member.role}
                    </div>
                    <div className="text-[11px] sm:text-xs font-mono-archive text-[#c9b79c] uppercase tracking-wider mt-0.5">
                      {member.area}
                    </div>
                    <p className="text-xs sm:text-sm font-body text-white/85 leading-relaxed mt-2">
                      {member.bio}
                    </p>
                  </div>

                  {/* Botones de Redes Sociales, CV y Contacto */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-950/50 border border-pink-700/60 hover:border-pink-500 text-pink-300 hover:text-white text-xs font-mono-archive font-bold transition-all shadow-sm group/link"
                        title={`Instagram de ${member.name}`}
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover/link:scale-110 transition-transform" />
                        <span>Instagram</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    )}

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-950/50 border border-blue-700/60 hover:border-blue-500 text-blue-300 hover:text-white text-xs font-mono-archive font-bold transition-all shadow-sm group/link"
                        title={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover/link:scale-110 transition-transform" />
                        <span>LinkedIn</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    )}

                    {member.cv && (
                      <a
                        href={member.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/50 border border-emerald-700/60 hover:border-emerald-500 text-emerald-300 hover:text-white text-xs font-mono-archive font-bold transition-all shadow-sm group/link"
                        title={`Curriculum Vitae de ${member.name}`}
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover/link:scale-110 transition-transform" />
                        <span>Ver CV</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/50 border border-amber-700/60 hover:border-amber-500 text-amber-300 hover:text-white text-xs font-mono-archive font-bold transition-all shadow-sm group/link"
                        title={`Enviar correo a ${member.email}`}
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-400 group-hover/link:scale-110 transition-transform" />
                        <span className="truncate max-w-[160px]">{member.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nota institucional al pie */}
          <div className="mt-3.5 pt-3 border-t border-white/15 text-center text-xs sm:text-sm font-mono-archive text-[#eaeaea] bg-[#090807] p-3 rounded-xl shrink-0 border border-[#c9b79c]/30">
            Trabajo académico y de extensión universitaria desarrollado en articulación con la Casa por la Memoria y el Registro Único de la Verdad (RUV) del Chaco.
          </div>
        </div>
      )}

      {/* 5. Modal: CONTACTO (Instagram oficial: vestigios_negacionismo - Point 3) */}
      {activeModal === 'contact' && (
        <div className="relative w-full max-w-md bg-[#121212] border border-white/20 rounded-xl p-6 sm:p-8 text-[#eaeaea] shadow-2xl z-10">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div>
              <h2 className="font-display font-black text-lg text-white">CONTACTO & VINCULACIÓN</h2>
              <p className="text-xs text-[#c9b79c] font-mono-archive">Canales oficiales del proyecto VESTIGIOS</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <a
              href="https://www.instagram.com/vestigios_negacionismo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#171514] border border-[#e53935]/40 hover:border-[#e53935] flex items-center gap-3.5 transition-colors group block shadow-lg"
            >
              <div className="w-11 h-11 rounded-lg bg-[#7a1e1e]/40 flex items-center justify-center text-[#e53935] shrink-0">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono-archive text-[#c9b79c] uppercase">Instagram Oficial</span>
                <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#e53935] transition-colors">
                  @vestigios_negacionismo
                </div>
                <p className="text-xs font-body text-white/70 mt-0.5">
                  Seguinos en https://www.instagram.com/vestigios_negacionismo/
                </p>
              </div>
            </a>

            <div className="p-4 rounded-xl bg-[#0a0908] border border-white/10 text-xs font-mono-archive space-y-1">
              <span className="text-white font-bold block mb-1">Sede de la Casa por la Memoria:</span>
              <p className="text-[#c9b79c]">Marcelo T. de Alvear 32, Resistencia, Chaco.</p>
              <p className="text-white/60 text-[11px]">Centro de documentación histórica y visitas guiadas.</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal: ADVERTENCIA DE AUDIO SENSIBLE - Compacto y centrado en celular horizontal */}
      {activeModal === 'sensitive_warning' && (
        <div className="relative w-full max-w-md landscape:max-w-sm bg-[#121212] border-2 border-[#7a1e1e] rounded-xl p-4 sm:p-8 landscape:p-3 text-[#eaeaea] shadow-2xl z-10 animate-scaleUp my-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 landscape:top-2 landscape:right-2 p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Cerrar y seguir investigando"
            aria-label="Cerrar modal de advertencia"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3 text-[#e53935] mb-2 sm:mb-3 landscape:mb-1.5 pr-6 sm:pr-8">
            <ShieldAlert className="w-5 h-5 sm:w-8 sm:h-8 landscape:w-5 landscape:h-5 shrink-0 animate-pulse" />
            <h2 className="font-display font-black text-sm sm:text-lg landscape:text-xs text-white">AVISO DE MATERIAL SENSIBLE</h2>
          </div>

          <p className="text-xs sm:text-sm landscape:text-[10.5px] font-body text-[#eaeaea] leading-relaxed mb-1.5 sm:mb-3 landscape:mb-1">
            Estás a punto de ingresar al subsuelo clandestino de la ex Brigada.
          </p>
          <p className="text-[10px] sm:text-xs landscape:text-[9.5px] text-[#c9b79c] font-mono-archive mb-3 sm:mb-6 landscape:mb-2 leading-relaxed landscape:leading-tight">
            Se escucharán sonidos de época y el acordeón que utilizaban los represores para tapar los gritos durante las torturas. Podés elegir si continuar con audio o silenciado.
          </p>

          <div className="flex flex-col gap-1.5 sm:gap-2.5 landscape:gap-1">
            <button
              onClick={() => onConfirmSensitiveAudio(true)}
              className="w-full py-2 sm:py-3 landscape:py-1.5 px-3 sm:px-4 rounded-lg bg-[#7a1e1e] hover:bg-[#912424] text-white font-sans font-bold text-[10.5px] sm:text-xs landscape:text-[9.5px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Continuar con audio activado</span>
            </button>

            <button
              onClick={() => onConfirmSensitiveAudio(false)}
              className="w-full py-1.5 sm:py-2.5 landscape:py-1 px-3 sm:px-4 rounded-lg bg-[#1f1e1d] hover:bg-[#2c2a28] text-[#c9b79c] hover:text-white font-sans text-[10.5px] sm:text-xs landscape:text-[9.5px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
            >
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Continuar con audio desactivado</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-1 sm:py-2 landscape:py-0.5 px-3 sm:px-4 rounded-lg bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-mono-archive text-[9.5px] sm:text-[11px] landscape:text-[8.5px] tracking-wider transition-all flex items-center justify-center gap-1.5 border border-white/5 hover:border-white/15 mt-0.5 cursor-pointer"
            >
              <span>Cancelar y seguir investigando</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. Modal: DETALLE DE PIEZA DE TESTIMONIO (Camino A) */}
      {activeModal === 'piece_detail' && selectedPiece && (
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#121212] border border-white/20 rounded-xl p-5 sm:p-8 text-[#eaeaea] shadow-2xl z-10">
          <div className="flex items-start justify-between pb-3 mb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-[11px] font-mono-archive uppercase px-2 py-0.5 rounded bg-[#7a1e1e]/60 text-white border border-[#e53935]/40">
                {selectedPiece.category.toUpperCase().replace('_', ' ')}
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-1.5">
                {selectedPiece.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#c9b79c] font-body mt-0.5">
                {selectedPiece.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
              {/* Authentic Archival Photograph(s) from "TESTIMONIOS" folder */}
              {selectedPiece.image && (
                <div className="rounded-xl overflow-hidden border border-white/20 bg-black/70 p-3 sm:p-4 shadow-xl">
                  <div className={`grid ${selectedPiece.secondaryImage ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-3 w-full`}>
                    <div className="relative rounded-lg overflow-hidden border border-white/20 bg-[#0a0908] aspect-[4/3] flex items-center justify-center group">
                      <img
                        src={selectedPiece.image}
                        alt={selectedPiece.person}
                        className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-2.5 text-left">
                        <span className="text-xs font-mono-archive text-white font-bold block">{selectedPiece.person}</span>
                        <span className="text-[10px] font-mono-archive text-[#c9b79c] block">{selectedPiece.year}</span>
                      </div>
                    </div>
                    {selectedPiece.secondaryImage && (
                      <div className="relative rounded-lg overflow-hidden border border-white/20 bg-[#0a0908] aspect-[4/3] flex items-center justify-center group">
                        <img
                          src={selectedPiece.secondaryImage}
                          alt={selectedPiece.secondaryPerson || ''}
                          className={`w-full h-full object-cover ${
                            selectedPiece.secondaryImage.includes('Ramon_Meza') ? 'object-[50%_55%]' : 'object-top'
                          } filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300`}
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-2.5 text-left">
                          <span className="text-xs font-mono-archive text-white font-bold block">{selectedPiece.secondaryPerson}</span>
                          <span className="text-[10px] font-mono-archive text-[#c9b79c] block">Expediente Causa Caballero</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Epígrafe visible */}
              <div className="p-2.5 rounded bg-[#090807] border border-white/10 text-[11px] font-mono-archive text-[#c9b79c] italic space-y-1">
                <div>{selectedPiece.caption}</div>
                {selectedPiece.secondaryCaption && (
                  <div className="pt-1 border-t border-white/10">{selectedPiece.secondaryCaption}</div>
                )}
              </div>



              {/* Highlighted Quote */}
              <div className="p-4 rounded-lg bg-[#090807] border-l-2 border-[#e53935] italic font-body text-sm md:text-base text-[#eaeaea]">
                {selectedPiece.quote}
              </div>

              {/* Full Narrative Text in Accessible Prose */}
              <div className="text-xs sm:text-sm font-body text-[#eaeaea]/90 leading-relaxed whitespace-pre-line space-y-3">
                {selectedPiece.fullStory}
              </div>

              {/* Explicit Citation of Sources (Points 8, 10, 11) */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-archive text-[#c9b79c]">
                <div className={selectedPiece.showYearInModal === false ? 'sm:col-span-2' : ''}>
                  <span className="text-white/60">{selectedPiece.personLabel || 'Persona'}:</span> {selectedPiece.person}
                </div>
                {selectedPiece.showYearInModal !== false && selectedPiece.year && (
                  <div>
                    <span className="text-white/60">{selectedPiece.yearLabel || 'Fecha'}:</span> {selectedPiece.year}
                  </div>
                )}
                {selectedPiece.expediente && (
                  <div className="sm:col-span-2">
                    <span className="text-white/60">{selectedPiece.expedienteLabel || 'Expediente judicial'}:</span> {selectedPiece.expediente}
                  </div>
                )}
                <div className="sm:col-span-2 text-[11px] text-white/70">
                  <span className="text-white">{selectedPiece.sourceLabel || 'Citado de Fuentes'}:</span> {selectedPiece.source}
                </div>
              </div>
            </div>
        </div>
      )}

      {/* 8. Modal: DETALLE DE EVIDENCIA ARQUITECTÓNICA / EAAF (Camino B) */}
      {activeModal === 'evidence_detail' && selectedEvidence && (
        selectedEvidence.type === 'frase_concreto' ? (
          /* Modal centrado, con tamaño proporcionado que no se corta arriba y con fuentes 100% legibles */
          <div className="relative w-full max-w-2xl sm:max-w-3xl max-h-[90vh] flex flex-col bg-[#121212] border-2 border-[#7a1e1e] rounded-2xl p-4 sm:p-5 md:p-6 text-[#eaeaea] shadow-[0_0_60px_rgba(122,30,30,0.7)] z-10 animate-scaleUp overflow-y-auto my-auto">
            {/* Cabecera */}
            <div className="flex items-start justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-white/10 gap-3 shrink-0">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono-archive uppercase px-2 sm:px-2.5 py-0.5 rounded bg-[#7a1e1e] text-white tracking-widest font-bold inline-block">
                  RELEVAMIENTO FORENSE EAAF · COMISIÓN PROVINCIAL POR LA MEMORIA
                </span>
                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white mt-1 leading-tight">
                  {selectedEvidence.title}
                </h2>
                <p className="text-[11px] sm:text-xs text-[#c9b79c] font-mono-archive mt-0.5">
                  Ubicación: {selectedEvidence.locationInBasement.replace('_', ' ')} · Hallazgo: {selectedEvidence.discoveryYear}
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 cursor-pointer"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido centrado, ajustado y legible */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Fotografía Pericial Real de la Inscripción con Escala Forense */}
              {selectedEvidence.image && (
                <div className="w-full h-28 sm:h-36 md:h-44 rounded-xl bg-[#090807] border border-[#7a1e1e]/60 p-2 flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
                  <img
                    src={selectedEvidence.image}
                    alt={selectedEvidence.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                    loading="eager"
                    onError={(e) => {
                      if (selectedEvidence.id === 'frase-sangre') e.currentTarget.src = '/inscripcion-sangre-derramada.png';
                      else if (selectedEvidence.id === 'frase-firmeza') e.currentTarget.src = '/inscripcion-firmeza-y-luz.png';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded bg-black/85 border border-[#7a1e1e]/50 text-[10px] font-mono-archive text-[#c9b79c] flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e53935]" />
                    <span>REGISTRO CPM CHACO · 2008</span>
                  </div>
                </div>
              )}

              {/* Frase en Concreto Destacada */}
              <div className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg bg-[#0a0908] border border-white/15 text-center shrink-0">
                <div className="font-display font-black text-base sm:text-xl md:text-2xl text-white tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  {selectedEvidence.quote}
                </div>
              </div>

              {/* Textos legibles, explicativos y de calidad pericial */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#161413] border border-white/10 space-y-1.5 sm:space-y-2">
                <p className="text-xs sm:text-sm md:text-base font-body font-semibold text-[#f5f5f5] leading-relaxed">
                  {selectedEvidence.description}
                </p>
                <p className="text-[11px] sm:text-xs md:text-sm font-body text-[#c9b79c] leading-relaxed">
                  
                </p>
              </div>

              {/* Pie con Fuente Completa y Botón de Volver (sin truncar, 100% legible) */}
              <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono-archive shrink-0">
                <div className="flex-1 text-[11px] sm:text-xs leading-relaxed text-[#c9b79c] pr-2">
                  <span className="text-[#e53935] font-bold uppercase tracking-wider mr-1">Fuente:</span>
                  <span className="text-[#eaeaea] font-mono-archive font-medium">{selectedEvidence.source}</span>
                </div>
                <button
                  onClick={handleModalClose}
                  className="px-5 py-2 rounded-lg bg-[#7a1e1e] hover:bg-[#8f2323] text-white font-bold transition-all shrink-0 shadow-md cursor-pointer self-end sm:self-auto text-xs sm:text-sm hover:scale-105 active:scale-95"
                >
                  Volver al sótano
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Modal para los 3 objetos periciales (Picana, Caja eléctrica, Fusible) */
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#121212] border border-[#7a1e1e]/60 rounded-xl p-5 sm:p-8 text-[#eaeaea] shadow-2xl z-10">
            <div className="flex items-start justify-between pb-3 mb-4 border-b border-white/10 gap-4">
              <div>
                <span className="text-[11px] font-mono-archive uppercase px-2 py-0.5 rounded bg-[#7a1e1e] text-white">
                  RELEVAMIENTO DEL EAAF (2008)
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-1.5">
                  {selectedEvidence.title}
                </h2>
                <p className="text-xs text-[#c9b79c] font-mono-archive mt-0.5">
                  Ubicación: {selectedEvidence.locationInBasement.replace('_', ' ')} · Hallazgo: {selectedEvidence.discoveryYear}
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Visual Evidence Archival Image */}
              {selectedEvidence.image && (
                <div className="w-full aspect-[16/8] sm:aspect-[16/7] rounded-xl bg-[#090807] border border-[#7a1e1e]/60 p-3 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <img
                    src={selectedEvidence.image}
                    alt={selectedEvidence.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                    loading="eager"
                    onError={(e) => {
                      if (selectedEvidence.id === 'picana-electrica') e.currentTarget.src = '/vector picana electrica.png';
                      else if (selectedEvidence.id === 'caja-electrica') e.currentTarget.src = '/vector caja electrica.png';
                      else if (selectedEvidence.id === 'fusible-ceramico') e.currentTarget.src = '/vector fusible.png';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/85 border border-[#7a1e1e]/50 text-[9px] font-mono-archive text-[#c9b79c] flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e53935]" />
                    <span>EAAF · {selectedEvidence.discoveryYear}</span>
                  </div>
                </div>
              )}

              {/* Epígrafe */}
              <div className="p-2.5 rounded bg-[#090807] border border-white/10 text-[11px] font-mono-archive text-[#c9b79c] italic">
                {selectedEvidence.caption}
              </div>

              {/* Reproductor de audio solo para picana sin cortar atmósfera de fondo */}
              {selectedEvidence.id === 'picana-electrica' && (
                <div className="p-3.5 rounded-xl bg-[#0a0908] border border-[#7a1e1e]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#7a1e1e]/40 border border-[#e53935]/50 flex items-center justify-center text-[#e53935] shrink-0">
                      <Volume2 className={`w-5 h-5 ${isEvidenceAudioPlaying ? 'animate-pulse' : ''}`} />
                    </div>
                    <div>
                      <div className="text-xs font-mono-archive text-white font-bold flex items-center gap-2">
                        <span>Sonido: Picana Eléctrica a Batería</span>
                        {isEvidenceAudioPlaying && (
                          <span className="px-1.5 py-0.5 rounded bg-[#e53935] text-white text-[9px] uppercase tracking-wider font-bold animate-pulse">
                            Reproduciendo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono-archive text-[#c9b79c] mt-0.5">
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!isEvidenceAudioPlaying) {
                        setIsEvidenceAudioPlaying(true);
                        audioSystem.playPicanaSound(0.9).then(() => {
                          setIsEvidenceAudioPlaying(false);
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-mono-archive flex items-center justify-center gap-2 transition-all font-bold shrink-0 bg-[#e53935] hover:bg-[#c62828] text-white shadow-[0_0_15px_rgba(229,57,53,0.5)]"
                  >
                    <Play className="w-4 h-4 text-white" />
                    <span>Reproducir sonido</span>
                  </button>
                </div>
              )}

              <p className="text-xs sm:text-sm font-body text-[#eaeaea] leading-relaxed">
                {selectedEvidence.description}
              </p>

              <div className="p-4 rounded-lg bg-[#090807] border border-white/10 text-xs font-mono-archive text-[#c9b79c] space-y-2 whitespace-pre-line">
                <strong className="text-white block font-sans">Informe Pericial y Contexto Histórico:</strong>
                <div className="font-body text-[#eaeaea]/90 leading-relaxed text-xs sm:text-sm">
                  {selectedEvidence.investigationNote}
                </div>
              </div>

              <div className="text-[11px] font-mono-archive text-white/70 pt-2 border-t border-white/10">
                <span className="text-white font-bold">Citado de Fuentes:</span> {selectedEvidence.source}
              </div>
            </div>
          </div>
        )
      )}

      {/* 8.5 Modal: MARCO ACADÉMICO */}
      {activeModal === 'academic_framework' && (
        <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#121212] border border-[#7a1e1e] rounded-2xl p-5 sm:p-8 text-[#eaeaea] shadow-2xl z-10 custom-scrollbar">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 mb-4 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c9b79c]/20 border border-[#c9b79c]/40 flex items-center justify-center text-[#c9b79c] shrink-0 shadow">
                <GraduationCap className="w-5 h-5 text-[#c9b79c]" />
              </div>
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide uppercase">
                  MARCO ACADÉMICO
                </h2>
                <p className="text-xs text-[#c9b79c] font-mono-archive">
                  Universidad Nacional del Nordeste · FADyCC · CPM Chaco
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 text-xs sm:text-sm font-body text-[#eaeaea]/90 leading-relaxed">
            {/* Logos Institucionales: UNNE - FADyCC y SEM III */}
            <div className="w-full rounded-xl bg-black/90 border border-white/15 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 shadow-lg">
              <img
                src="/assets/LOGO-UNNE-FADy-CC-BLANCO.png"
                alt="Universidad Nacional del Nordeste - Facultad de Artes, Diseño y Ciencias de la Cultura"
                className="max-h-14 sm:max-h-16 w-auto object-contain filter drop-shadow-md"
                loading="eager"
              />
              <div className="hidden sm:block w-[1px] h-10 bg-white/20 shrink-0" />
              <img
                src="/assets/seminario.png"
                alt="Seminario Taller de Integración: Imagen, Sonido y Multimedia 3 (SEM III)"
                className="max-h-11 sm:max-h-14 w-auto object-contain rounded-md filter drop-shadow-md"
                loading="eager"
              />
            </div>

            {/* Texto de Marco Institucional */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#171514] border border-white/10 space-y-2">
              <p className="text-sm sm:text-base text-white leading-relaxed font-body">
                Este proyecto se desarrolla en el marco de la Universidad Nacional del Nordeste, Facultad de Artes, Diseño y Ciencias de la Cultura.
                  Y la Comisión Provincial por la Memoria del Chaco.
              </p>
            </div>

            {/* Cátedras de */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#171514] border border-white/10 space-y-3">
              <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c9b79c]" />
                <span>Cátedras de</span>
              </h3>
              <ul className="space-y-2 pl-2 text-xs sm:text-sm font-mono-archive text-[#eaeaea]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#c9b79c] mt-0.5 shrink-0">•</span>
                  <span>
                    Seminario Taller de Integración: Imagen, Sonido{' '}
                    <span className="whitespace-nowrap">y Multimedia 3</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#c9b79c] mt-0.5 shrink-0">•</span>
                  <span>Animación 2D, 3D y Diseño Web</span>
                </li>
              </ul>
            </div>

            {/* EQUIPO DOCENTE */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#171514] border border-white/10 space-y-3">
              <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c9b79c]" />
                <span>EQUIPO DOCENTE</span>
              </h3>
              <p className="text-xs text-[#c9b79c] font-mono-archive">
                Con la supervisión y el acompañamiento de:
              </p>
              <ul className="space-y-1.5 pl-2 text-xs sm:text-sm font-sans text-white font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#c9b79c]">•</span>
                  <span>Verónica Seniquel</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#c9b79c]">•</span>
                  <span>Pablo Marcelo Sánchez</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#c9b79c]">•</span>
                  <span>Cristian Cochia</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#c9b79c]">•</span>
                  <span>Natalia Uferer</span>
                </li>
              </ul>
            </div>

            {/* Footer con botón de cierre */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#7a1e1e] hover:bg-[#8f2323] text-white font-bold transition-all text-xs cursor-pointer shadow-md"
              >
                Cerrar marco académico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal: COMPLETION DIALOG - DESBLOQUEASTE EL MURAL FINAL */}
      {activeModal === 'completion_dialog' && (
        <div className="relative w-full max-w-lg bg-[#121212] border-2 border-[#e53935] rounded-2xl p-6 sm:p-8 text-center text-[#eaeaea] shadow-[0_0_60px_rgba(229,57,53,0.6)] z-10 animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Cerrar y seguir investigando"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#7a1e1e]/40 border-2 border-[#e53935] flex items-center justify-center text-[#e53935] shadow-[0_0_25px_rgba(229,57,53,0.5)]">
            <Award className="w-8 h-8 animate-bounce" />
          </div>

          <span className="text-[10px] font-mono-archive uppercase px-3 py-1 rounded-full bg-[#e53935]/20 text-[#e53935] border border-[#e53935]/40 font-bold tracking-widest inline-block mb-2">
            ¡DESBLOQUEASTE EL MURAL FINAL!
          </span>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
            RECORRIDO COMPLETO
          </h2>
          <p className="text-xs sm:text-sm font-body text-[#c9b79c] leading-relaxed mb-6">
            Has completado las dos subtramas de la Casa: los testimonios de vida en las escaleras y las evidencias forenses del EAAF en los sótanos. Podés acceder ahora al mural conmemorativo o cerrar esta ventana si deseás continuar investigando la Casa.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenMural();
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#7a1e1e] hover:bg-[#962222] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(122,30,30,0.7)] border border-[#e53935] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-white" />
              <span>Acceder al Mural Final</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-[#eaeaea] hover:text-white font-mono-archive text-xs transition-colors cursor-pointer"
            >
              Seguir investigando
            </button>
          </div>
        </div>
      )}

      {/* 10. Modal: PANEL DE CONTROL & FEEDBACK DEL SISTEMA (EXCLUSIVO PARA EL HOST / DUEÑO) */}
      {activeModal === 'analytics' && (
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#100f0e] border border-amber-500/40 rounded-2xl p-4 sm:p-6 md:p-8 text-[#eaeaea] shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10 animate-scaleUp font-display">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-base sm:text-xl text-white tracking-wide">
                    PANEL DE CONTROL & FEEDBACK
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[9px] font-mono-archive font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    EN VIVO
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#c9b79c] font-sans">
                  Monitoreo funcional de usuarios, estado de audio, avance del recorrido y registro cronológico de acciones.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setAnalyticsSummary(analyticsTracker.getSummary())}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#c9b79c] hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title="Actualizar datos"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Refrescar</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Cerrar panel de control"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enlace Directo para el Dueño */}
          <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-mono-archive text-amber-200">
              <LinkIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-white text-[11px] sm:text-xs">Enlace de acceso directo para el Host:</span>
              <code className="px-2 py-0.5 rounded bg-black/60 text-amber-300 text-[10px] sm:text-xs select-all">
                ?panel=metricas
              </code>
            </div>
            <button
              onClick={() => {
                const url = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?panel=metricas` : '';
                navigator.clipboard?.writeText(url);
                setCopiedDirectLink(true);
                setTimeout(() => setCopiedDirectLink(false), 2500);
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono-archive text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
            >
              {copiedDirectLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDirectLink ? '¡Enlace Copiado!' : 'Copiar URL del Panel'}</span>
            </button>
          </div>

          {/* 4 Cards de Métricas Principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono-archive text-[#c9b79c] uppercase tracking-wider">
                Visitas Totales
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono-archive">
                  {analyticsSummary.totalSessions}
                </span>
                <span className="text-[10px] text-white/50">sesiones</span>
              </div>
              <span className="text-[9px] text-[#c9b79c]/80 mt-1">Registradas localmente</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono-archive text-[#c9b79c] uppercase tracking-wider">
                Llegaron al Mural
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono-archive">
                  {analyticsSummary.completionRatePercent}%
                </span>
                <span className="text-[10px] text-white/50">
                  ({analyticsSummary.completedMuralSessions} de {analyticsSummary.totalSessions})
                </span>
              </div>
              <span className="text-[9px] text-emerald-400/80 mt-1">Recorrieron toda la Casa</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono-archive text-[#c9b79c] uppercase tracking-wider">
                Tiempo Promedio
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono-archive">
                  {Math.floor(analyticsSummary.averageDurationSeconds / 60)}m {analyticsSummary.averageDurationSeconds % 60}s
                </span>
              </div>
              <span className="text-[9px] text-[#c9b79c]/80 mt-1">Permanencia por visita</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#7a1e1e]/20 border border-[#e53935]/40 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-archive text-amber-300 uppercase tracking-wider">
                  Sesión Actual
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono-archive">
                  {Math.floor(analyticsSummary.currentSessionDurationSeconds / 60)}m {analyticsSummary.currentSessionDurationSeconds % 60}s
                </span>
              </div>
              <span className="text-[9px] text-white/70 mt-1">
                {analyticsSummary.currentSessionInteractionsCount} acciones registradas
              </span>
            </div>
          </div>

          {/* Diagnóstico de Salud & Entorno */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-5">
            <h3 className="text-xs font-mono-archive uppercase font-bold text-white mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Diagnóstico de Salud & Entorno del Visitante</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono-archive">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] text-[#c9b79c] mb-1 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-[#c9b79c]" />
                  <span>Viewport / Pantalla</span>
                </div>
                <div className="font-bold text-white text-[11px]">
                  {typeof window !== 'undefined' ? `${window.innerWidth} × ${window.innerHeight} px` : '---'}
                </div>
                <div className="text-[9px] text-emerald-400 mt-0.5">
                  {typeof window !== 'undefined' && window.innerWidth >= 1280
                    ? 'Computadora (Desktop)'
                    : typeof window !== 'undefined' && window.innerWidth >= 768
                    ? 'Tablet'
                    : 'Celular (Mobile)'}
                  {' · '}
                  {typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? 'Horizontal' : 'Vertical'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] text-[#c9b79c] mb-1 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#c9b79c]" />
                  <span>Audio Documental</span>
                </div>
                <div className="font-bold text-white text-[11px]">
                  {audioSystem.getIsMuted() ? 'Silenciado' : `Activo (${Math.round(audioSystem.getVolume() * 100)}%)`}
                </div>
                <div className="text-[9px] text-emerald-400 mt-0.5">
                  WebAudio API operativo
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] text-[#c9b79c] mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#c9b79c]" />
                  <span>Escenas en esta Sesión</span>
                </div>
                <div className="font-bold text-white text-[11px]">
                  {analyticsSummary.currentSession.scenesVisited.length} de 5 escenas
                </div>
                <div className="text-[9px] text-amber-300 mt-0.5">
                  {analyticsSummary.currentSession.reachedMural ? 'Completó hasta el Mural' : 'En exploración'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] text-[#c9b79c] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Almacenamiento Local</span>
                </div>
                <div className="font-bold text-white text-[11px]">
                  LocalStorage OK
                </div>
                <div className="text-[9px] text-emerald-400 mt-0.5">
                  Persistencia de sesiones activa
                </div>
              </div>
            </div>
          </div>

          {/* Embudo de Navegación */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-5">
            <h3 className="text-xs font-mono-archive uppercase font-bold text-white mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Embudo de Navegación del Usuario (Sesión Actual)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {[
                { id: 'intro', label: '1. Portada (Ruido)' },
                { id: 'vestibulo', label: '2. Vestíbulo' },
                { id: 'camino_a', label: '3. Escaleras (Vida)' },
                { id: 'camino_b', label: '4. Sótanos (EAAF)' },
                { id: 'mural', label: '5. Mural Final' },
              ].map((step) => {
                const visited = analyticsSummary.currentSession.scenesVisited.includes(step.id);
                return (
                  <div
                    key={step.id}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      visited
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-black/30 border-white/5 text-white/40'
                    }`}
                  >
                    <div className="text-[11px] font-bold font-sans">{step.label}</div>
                    <div className="text-[9px] font-mono-archive mt-1 font-bold">
                      {visited ? '✓ VISITADA' : '○ PENDIENTE'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registro en Vivo de Interacciones */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono-archive uppercase font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e53935]" />
                <span>Registro Cronológico en Vivo (Últimas Acciones)</span>
              </h3>
              <span className="text-[10px] font-mono-archive text-[#c9b79c]">
                {analyticsSummary.currentSession.interactions.length} eventos en esta visita
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 font-mono-archive text-xs">
              {analyticsSummary.currentSession.interactions.length === 0 ? (
                <div className="text-center py-6 text-[#c9b79c] text-xs">
                  No hay interacciones registradas aún en esta sesión.
                </div>
              ) : (
                analyticsSummary.currentSession.interactions.slice(0, 25).map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-black/50 border border-white/5 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] text-white/50 shrink-0 font-mono-archive">
                        {ev.timeFormatted}
                      </span>
                      <span className="text-[11px] text-white truncate font-sans font-medium">
                        {ev.action}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold shrink-0 ${
                        ev.category === 'navegacion'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : ev.category === 'audio'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : ev.category === 'lectura'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : ev.category === 'meta'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {ev.category}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Barra de Acciones y Exportación */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  try {
                    navigator.clipboard?.writeText(analyticsTracker.exportReport());
                    setCopiedAnalyticsReport(true);
                    setTimeout(() => setCopiedAnalyticsReport(false), 2500);
                  } catch {}
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono-archive font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedAnalyticsReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAnalyticsReport ? '¡Reporte Copiado!' : 'Copiar JSON'}</span>
              </button>

              <button
                onClick={() => {
                  try {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(analyticsTracker.exportReport());
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', `vestigios_metricas_${new Date().toISOString().slice(0, 10)}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  } catch {}
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono-archive font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar JSON</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('¿Reiniciar las métricas y eventos almacenados en este navegador?')) {
                    analyticsTracker.clearAllData();
                    setAnalyticsSummary(analyticsTracker.getSummary());
                  }
                }}
                className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-mono-archive transition-all cursor-pointer"
                title="Reiniciar métricas guardadas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#7a1e1e] hover:bg-[#8f2323] text-white font-sans font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              Cerrar Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
