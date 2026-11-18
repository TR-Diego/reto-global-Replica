export type GameScreen =
  | 'TITLE'
  | 'CHARACTER_SELECT'
  | 'NARRATOR_INTRO'
  | 'GREENHOUSE_ANIMATION'
  | 'VILLAGE_MAP'
  | 'MINIGAME_PLATFORMER'
  | 'MINIGAME_SHOOTER'
  | 'REWARD_SUMMARY'
  | 'INVEST_SECTOR'
  | 'VICTORY_SUMMARY';

export type CharacterId = 'girl' | 'boy';

export type SectorId =
  | 'transporte'
  | 'vehiculos'
  | 'energia'
  | 'reforestacion';

export type MinigameId = 'platformer' | 'shooter';

export interface InformativeCapsule {
  id: string;
  titulo: string;
  informacion: string;
  consecuencia: string;
  accion: string;
}

export interface SectorImprovement {
  id: SectorId;
  nombre: string;
  descripcionCorta: string;
  recomendacion: string;
  costo: number;
  esTextoConfirmadoEnFuentes: boolean;
}

export interface MinigameResult {
  minigameId: MinigameId;
  monedasGanadas: number;
  enemigosDerrotados: number;
  tiempoRestante?: number;
}
