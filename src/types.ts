export type SceneId = 'intro' | 'vestibulo' | 'camino_a' | 'camino_b' | 'mural';

export interface TestimonialPiece {
  id: string;
  title: string;
  subtitle: string;
  person: string;
  category: 'testimonio' | 'saqueo' | 'resistencia_moral' | 'evidencia_judicial';
  year: string;
  expediente?: string;
  description: string;
  fullStory: string;
  quote: string;
  source: string;
  caption: string;
  visualType: 'photo' | 'document' | 'map' | 'artefact';
  image?: string;
  secondaryImage?: string;
  secondaryCaption?: string;
  secondaryPerson?: string;
  initialX: number; // percentage in scene
  initialY: number; // percentage in scene
  personLabel?: string;
  yearLabel?: string;
  expedienteLabel?: string;
  sourceLabel?: string;
  showYearInModal?: boolean;
}

export interface BasementEvidence {
  id: string;
  title: string;
  type: 'objeto_eaaf' | 'frase_concreto' | 'acordeon' | 'plano_arquitectonico';
  image?: string;
  discoveryYear: string;
  description: string;
  investigationNote: string;
  locationInBasement: string;
  quote?: string;
  source: string;
  caption: string;
  x: number; // percentage
  y: number; // percentage
}

export interface VictimFace {
  id: string;
  name: string;
  age?: number;
  profession?: string;
  status: string;
  date: string;
  caseRef: string;
  caption?: string;
  image?: string;
  link?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  area: string;
  initials: string;
  bio: string;
  image?: string;
  imagePosition?: string;
  instagram?: string;
  linkedin?: string;
  cv?: string;
  email?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  publisher: string;
  description: string;
  keyTopics: string[];
  chapters: { title: string; summary: string }[];
}

export type ModalType =
  | 'project'
  | 'team'
  | 'academic_framework'
  | 'contact'
  | 'library'
  | 'installation_video'
  | 'sensitive_warning'
  | 'piece_detail'
  | 'evidence_detail'
  | 'completion_dialog'
  | 'analytics'
  | null;

