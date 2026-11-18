import React from 'react';
import { CharacterId, SectorId } from '../../types/game';

/**
 * Gráficos vectoriales originales inspirados en el estilo del prototipo
 * de alta fidelidad de Reto Global (sin fotogramas ni recursos externos).
 */

export const RetoGlobalEmblem: React.FC<{ className?: string }> = ({
  className = 'w-80 h-80',
}) => (
  <svg viewBox="0 0 360 320" className={className} role="img" aria-label="Emblema de Reto Global">
    {/* Halo oscuro detrás del planeta */}
    <circle cx="180" cy="155" r="102" fill="#062036" />

    {/* Fábricas humeantes arriba */}
    <g transform="translate(120, 26)">
      <rect x="8" y="22" width="12" height="32" fill="#475569" />
      <rect x="28" y="14" width="14" height="40" fill="#64748B" />
      <rect x="50" y="20" width="12" height="34" fill="#475569" />
      <rect x="0" y="38" width="72" height="22" fill="#334155" />
      {/* Humo */}
      <circle cx="38" cy="10" r="8" fill="#E2E8F0" opacity="0.9" />
      <circle cx="52" cy="8" r="10" fill="#CBD5E1" opacity="0.85" />
      <circle cx="68" cy="11" r="11" fill="#E2E8F0" opacity="0.8" />
      <circle cx="84" cy="15" r="9" fill="#CBD5E1" opacity="0.7" />
    </g>

    {/* Edificios inclinados derecha */}
    <g transform="translate(238, 72) rotate(24)">
      <rect x="0" y="0" width="24" height="60" fill="#0EA5E9" stroke="#0F172A" strokeWidth="2" />
      <rect x="24" y="14" width="20" height="46" fill="#0284C7" stroke="#0F172A" strokeWidth="2" />
      <rect x="5" y="8" width="6" height="8" fill="#E0F2FE" />
      <rect x="14" y="8" width="6" height="8" fill="#E0F2FE" />
      <rect x="5" y="22" width="6" height="8" fill="#E0F2FE" />
      <rect x="14" y="22" width="6" height="8" fill="#E0F2FE" />
    </g>

    {/* Edificios naranja izquierda */}
    <g transform="translate(76, 86) rotate(-25)">
      <rect x="0" y="10" width="24" height="50" fill="#EA580C" stroke="#0F172A" strokeWidth="2" />
      <rect x="24" y="0" width="22" height="60" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
      <rect x="28" y="8" width="6" height="8" fill="#FFEDD5" />
      <rect x="36" y="8" width="6" height="8" fill="#FFEDD5" />
    </g>

    {/* Hielo polar derritiéndose abajo */}
    <path
      d="M128 242 L156 266 L195 256 L225 268 L234 238 Z"
      fill="#E0F2FE"
      stroke="#0F172A"
      strokeWidth="2"
    />
    <circle cx="154" cy="264" r="14" fill="#F8FAFC" opacity="0.9" />
    <circle cx="174" cy="272" r="11" fill="#E2E8F0" opacity="0.85" />

    {/* Planeta Tierra */}
    <circle cx="180" cy="155" r="78" fill="#0284C7" stroke="#0F172A" strokeWidth="4" />
    {/* Continentes */}
    <path
      d="M126 118 C142 98, 178 92, 198 106 C214 118, 206 140, 188 148 C176 154, 170 170, 184 184 C196 196, 178 220, 156 214 C138 208, 128 184, 134 166 C138 152, 114 136, 126 118 Z"
      fill="#16A34A"
    />
    <path
      d="M214 132 C230 128, 246 142, 244 162 C242 182, 224 196, 210 186 C200 178, 204 142, 214 132 Z"
      fill="#22C55E"
    />
    {/* Reflejo sutil */}
    <path
      d="M126 105 A66 66 0 0 1 228 96"
      fill="none"
      stroke="#FFFFFF"
      strokeOpacity="0.28"
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* Listón beige con título RETO GLOBAL */}
    <path
      d="M24 138 L64 132 L72 184 L20 192 L36 164 Z"
      fill="#D6B56E"
      stroke="#451A03"
      strokeWidth="2.5"
    />
    <path
      d="M336 138 L296 132 L288 184 L340 192 L324 164 Z"
      fill="#D6B56E"
      stroke="#451A03"
      strokeWidth="2.5"
    />
    <path
      d="M52 126 Q180 144 308 126 L300 196 Q180 214 60 196 Z"
      fill="#F3DDA5"
      stroke="#451A03"
      strokeWidth="3"
    />
    <text
      x="114"
      y="153"
      textAnchor="middle"
      fill="#FFFFFF"
      stroke="#0F172A"
      strokeWidth="4"
      paintOrder="stroke"
      fontFamily="Outfit, sans-serif"
      fontWeight="800"
      fontSize="24"
      letterSpacing="2"
    >
      RETO
    </text>
    <text
      x="182"
      y="188"
      textAnchor="middle"
      fill="#15803D"
      stroke="#052E16"
      strokeWidth="3"
      paintOrder="stroke"
      fontFamily="Outfit, sans-serif"
      fontWeight="800"
      fontSize="44"
      letterSpacing="1"
    >
      GLOBAL
    </text>
  </svg>
);

export const CharacterSprite: React.FC<{
  character: CharacterId;
  className?: string;
}> = ({ character, className = 'w-24 h-28' }) => {
  const isGirl = character === 'girl';
  return (
    <svg
      viewBox="0 0 80 96"
      className={className}
      role="img"
      aria-label={isGirl ? 'Personaje niña' : 'Personaje niño'}
    >
      {/* Sombra */}
      <ellipse cx="40" cy="90" rx="18" ry="4" fill="#0F172A" opacity="0.25" />
      {/* Piernas y zapatos */}
      <rect x="28" y="72" width="9" height="11" rx="2" fill="#F3C6A5" stroke="#0F172A" strokeWidth="2" />
      <rect x="43" y="72" width="9" height="11" rx="2" fill="#F3C6A5" stroke="#0F172A" strokeWidth="2" />
      <rect x="26" y="81" width="12" height="7" rx="3" fill="#0284C7" stroke="#0F172A" strokeWidth="2" />
      <rect x="42" y="81" width="12" height="7" rx="3" fill="#0284C7" stroke="#0F172A" strokeWidth="2" />
      {/* Short */}
      <rect x="26" y="61" width="28" height="13" rx="3" fill="#F472B6" stroke="#0F172A" strokeWidth="2" />
      {/* Playera verde (poder verde) */}
      <rect x="24" y="42" width="32" height="21" rx="4" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
      {/* Brazos */}
      <rect x="17" y="44" width="8" height="16" rx="3" fill="#F3C6A5" stroke="#0F172A" strokeWidth="2" />
      <rect x="55" y="44" width="8" height="16" rx="3" fill="#F3C6A5" stroke="#0F172A" strokeWidth="2" />
      {/* Coleta si es niña */}
      {isGirl && (
        <path
          d="M18 16 C8 18, 6 32, 16 36 C12 28, 16 22, 24 22 Z"
          fill="#B45309"
          stroke="#0F172A"
          strokeWidth="2"
        />
      )}
      {/* Cabeza */}
      <rect x="20" y="14" width="40" height="30" rx="10" fill="#F7D0B5" stroke="#0F172A" strokeWidth="2.5" />
      {/* Cabello */}
      {isGirl ? (
        <path
          d="M20 24 C20 10, 60 10, 60 24 C53 19, 44 18, 40 22 C34 18, 25 20, 20 24 Z"
          fill="#B45309"
          stroke="#0F172A"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M18 24 C17 12, 32 7, 42 10 C49 6, 62 12, 61 24 C55 18, 48 19, 43 22 C37 16, 26 19, 18 24 Z"
          fill="#78350F"
          stroke="#0F172A"
          strokeWidth="2"
        />
      )}
      {/* Ojos y cejas */}
      <rect x="27" y="27" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="45" y="27" width="8" height="8" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
      <circle cx="31" cy="31" r="2.2" fill="#0F172A" />
      <circle cx="49" cy="31" r="2.2" fill="#0F172A" />
      {/* Boca */}
      <path d="M35 39 Q40 42 45 39" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export const ArcticTernIllustration: React.FC<{
  talking?: boolean;
  className?: string;
}> = ({ talking = false, className = 'w-56 h-72' }) => (
  <svg viewBox="0 0 220 280" className={className} role="img" aria-label="Charrán Ártico narrador">
    {/* Bloque de hielo */}
    <path
      d="M36 226 L184 226 L196 272 L24 272 Z"
      fill="#7DD3FC"
      stroke="#0369A1"
      strokeWidth="3"
    />
    <path
      d="M44 214 L176 214 L184 226 L36 226 Z"
      fill="#E0F2FE"
      stroke="#0369A1"
      strokeWidth="2.5"
    />
    {/* Patas */}
    <line x1="94" y1="196" x2="90" y2="218" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
    <line x1="126" y1="196" x2="130" y2="218" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
    <path d="M78 219 L94 218 L96 222 L78 222 Z" fill="#F97316" />
    <path d="M124 218 L142 219 L142 222 L124 222 Z" fill="#F97316" />
    {/* Alas abiertas */}
    <path
      d="M78 124 C40 105, 16 128, 12 162 C26 164, 48 156, 76 150 Z"
      fill="#CBD5E1"
      stroke="#0F172A"
      strokeWidth="3"
    />
    <path
      d="M142 124 C180 105, 204 128, 208 162 C194 164, 172 156, 144 150 Z"
      fill="#CBD5E1"
      stroke="#0F172A"
      strokeWidth="3"
    />
    {/* Cuerpo */}
    <ellipse cx="110" cy="154" rx="36" ry="48" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
    <ellipse cx="110" cy="158" rx="22" ry="34" fill="#E2E8F0" opacity="0.6" />
    {/* Cabeza */}
    <circle cx="110" cy="88" r="32" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
    {/* Capucha negra característica del charrán ártico */}
    <path
      d="M78 86 C76 54, 144 54, 142 86 C134 74, 86 74, 78 86 Z"
      fill="#0F172A"
    />
    <path d="M98 58 L106 44 L112 57 L120 46 L122 59 Z" fill="#0F172A" />
    {/* Ojos */}
    <ellipse cx="98" cy="84" rx="7" ry="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
    <ellipse cx="122" cy="84" rx="7" ry="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
    <circle cx="99" cy="85" r="3.2" fill="#0F172A" />
    <circle cx="121" cy="85" r="3.2" fill="#0F172A" />
    {/* Pico naranja */}
    <path
      d={talking ? 'M98 96 L122 96 L110 112 Z' : 'M98 96 L122 96 L110 107 Z'}
      fill="#F97316"
      stroke="#0F172A"
      strokeWidth="2.5"
    />
    {talking && <ellipse cx="110" cy="102" rx="6" ry="4" fill="#7F1D1D" />}
  </svg>
);

export const PollutedCityScene: React.FC<{ className?: string }> = ({
  className = 'w-full h-56',
}) => (
  <svg viewBox="0 0 420 220" className={className} role="img" aria-label="Ciudad afectada por contaminación">
    <rect width="420" height="220" rx="14" fill="#475569" />
    {/* Cielo contaminado */}
    <rect width="420" height="145" rx="14" fill="#64748B" />
    {/* Humo de fábricas */}
    <g fill="#94A3B8" opacity="0.65">
      <circle cx="66" cy="40" r="22" />
      <circle cx="94" cy="34" r="26" />
      <circle cx="122" cy="42" r="20" />
      <circle cx="310" cy="36" r="24" />
      <circle cx="342" cy="32" r="26" />
    </g>
    {/* Edificios y fábricas */}
    <rect x="44" y="62" width="18" height="84" fill="#334155" />
    <rect x="74" y="54" width="22" height="92" fill="#1E293B" />
    <rect x="28" y="90" width="90" height="58" fill="#475569" />
    <rect x="196" y="70" width="48" height="76" fill="#0EA5E9" opacity="0.7" />
    <rect x="252" y="58" width="54" height="88" fill="#1E293B" />
    <rect x="314" y="78" width="60" height="68" fill="#334155" />
    {/* Suelo seco y basura */}
    <path d="M0 146 Q140 128 280 144 T420 140 L420 220 L0 220 Z" fill="#78350F" />
    <rect x="0" y="138" width="420" height="20" fill="#475569" />
    {/* Autos con humo */}
    <g transform="translate(88, 124)">
      <rect x="0" y="6" width="38" height="14" rx="4" fill="#DC2626" />
      <rect x="8" y="0" width="20" height="8" rx="2" fill="#FCA5A5" />
      <circle cx="9" cy="21" r="4.5" fill="#0F172A" />
      <circle cx="29" cy="21" r="4.5" fill="#0F172A" />
      <circle cx="-8" cy="14" r="5" fill="#CBD5E1" opacity="0.8" />
    </g>
    <g transform="translate(154, 122)">
      <rect x="0" y="6" width="42" height="15" rx="4" fill="#EAB308" />
      <rect x="8" y="0" width="22" height="8" rx="2" fill="#FEF08A" />
      <circle cx="10" cy="22" r="4.5" fill="#0F172A" />
      <circle cx="32" cy="22" r="4.5" fill="#0F172A" />
      <circle cx="-9" cy="15" r="5" fill="#CBD5E1" opacity="0.8" />
    </g>
    <g transform="translate(230, 118)">
      <rect x="0" y="4" width="54" height="20" rx="3" fill="#E2E8F0" />
      <rect x="38" y="9" width="16" height="15" rx="2" fill="#94A3B8" />
      <circle cx="12" cy="26" r="5" fill="#0F172A" />
      <circle cx="42" cy="26" r="5" fill="#0F172A" />
    </g>
    {/* Río contaminado */}
    <path d="M120 162 Q190 190 160 220 L256 220 Q268 188 210 162 Z" fill="#0E7490" />
    <rect x="158" y="176" width="12" height="7" rx="2" fill="#F87171" />
    <rect x="192" y="192" width="14" height="6" rx="2" fill="#FACC15" />
  </svg>
);

export const SectorIcon: React.FC<{
  sector: SectorId;
  className?: string;
}> = ({ sector, className = 'w-14 h-14' }) => {
  switch (sector) {
    case 'transporte':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path
            d="M12 36 L18 22 H44 L52 36 V44 H12 Z"
            fill="currentColor"
            opacity="0.92"
          />
          <rect x="20" y="25" width="9" height="7" rx="1" fill="#0F172A" />
          <rect x="32" y="25" width="9" height="7" rx="1" fill="#0F172A" />
          <circle cx="20" cy="46" r="4" fill="#0F172A" />
          <circle cx="44" cy="46" r="4" fill="#0F172A" />
          <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'vehiculos':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M10 38 L16 26 H36 L44 38 V46 H10 Z" fill="currentColor" />
          <rect x="18" y="29" width="14" height="7" rx="1" fill="#0F172A" />
          <circle cx="18" cy="47" r="4.5" fill="#0F172A" />
          <circle cx="36" cy="47" r="4.5" fill="#0F172A" />
          {/* Enchufe eléctrico */}
          <path d="M44 40 H52 V32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <rect x="48" y="24" width="8" height="8" rx="2" fill="currentColor" />
          <line x1="50" y1="20" x2="50" y2="24" stroke="currentColor" strokeWidth="2.5" />
          <line x1="54" y1="20" x2="54" y2="24" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case 'energia':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <rect x="12" y="30" width="32" height="22" rx="2" fill="currentColor" />
          <rect x="16" y="16" width="8" height="16" fill="currentColor" />
          <rect x="28" y="20" width="8" height="12" fill="currentColor" />
          {/* Hoja limpia */}
          <path
            d="M42 12 C54 12, 56 26, 42 30 C36 22, 36 16, 42 12 Z"
            fill="#86EFAC"
            stroke="#065F46"
            strokeWidth="2"
          />
          <path d="M26 36 L22 43 H27 L24 49 L32 41 H27 Z" fill="#0F172A" />
        </svg>
      );
    case 'reforestacion':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          {/* Brote */}
          <line x1="32" y1="42" x2="32" y2="20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 24 C20 24, 18 12, 30 14 C32 18, 32 21, 32 24 Z" fill="currentColor" />
          <path d="M32 28 C44 28, 46 16, 34 18 C32 22, 32 25, 32 28 Z" fill="currentColor" />
          {/* Manos protectoras */}
          <path d="M14 44 Q32 54 50 44" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
};

interface IsometricVillageMapProps {
  badgesCount: number;
  highlightPins?: boolean;
  onSelectPlatformer?: () => void;
  onSelectShooter?: () => void;
}

export const IsometricVillageMap: React.FC<IsometricVillageMapProps> = ({
  badgesCount,
  highlightPins = false,
  onSelectPlatformer,
  onSelectShooter,
}) => {
  const isRestored = badgesCount >= 4;
  const progressRatio = Math.min(1, badgesCount / 4);

  // Interpolación visual de terreno seco/afectado hacia verde restaurado
  const landColor =
    badgesCount === 0
      ? '#E9C46A'
      : badgesCount === 1
      ? '#C8CE6A'
      : badgesCount === 2
      ? '#9CC963'
      : badgesCount === 3
      ? '#6EC25E'
      : '#34B858';

  const waterColor = badgesCount >= 3 ? '#0EA5E9' : '#168AAD';

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      <svg
        viewBox="0 0 560 400"
        className="w-full h-auto drop-shadow-2xl"
        role="img"
        aria-label={`Mapa de la Aldea Global (${badgesCount} de 4 mejoras completadas)`}
      >
        {/* Bloque de tierra isométrico */}
        <polygon points="100,260 320,385 520,255 300,130" fill="#78350F" />
        {/* Mar/Costa izquierda */}
        <polygon points="100,245 205,305 405,175 300,115" fill={waterColor} />
        <polygon points="100,245 205,305 205,322 100,260" fill="#0369A1" />
        {/* Playa */}
        <polygon points="180,290 218,312 418,182 380,160" fill="#FDE68A" />
        {/* Superficie principal de la Aldea */}
        <polygon points="218,312 320,370 520,240 418,182" fill={landColor} />
        <polygon points="320,370 520,240 520,256 320,386" fill="#52260A" />

        {/* Montañas del fondo */}
        <polygon points="300,145 360,72 415,155" fill={isRestored ? '#15803D' : '#9A6B2F'} />
        <polygon points="360,72 415,155 390,165" fill={isRestored ? '#166534' : '#785021'} />
        <polygon points="380,155 445,86 508,180" fill={isRestored ? '#22C55E' : '#B07D3A'} />
        <polygon points="445,86 508,180 465,192" fill={isRestored ? '#15803D' : '#855B27'} />

        {/* Río / Arroyo */}
        <path
          d="M360 198 Q335 235 302 246 Q272 256 248 286"
          fill="none"
          stroke={waterColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Bandera de México en la costa (como en el prototipo del Museo Caracol de Ensenada) */}
        <line x1="278" y1="252" x2="278" y2="178" stroke="#E2E8F0" strokeWidth="3.5" />
        <rect x="279" y="180" width="12" height="22" fill="#16A34A" />
        <rect x="291" y="180" width="12" height="22" fill="#FFFFFF" />
        <rect x="303" y="180" width="12" height="22" fill="#DC2626" />
        <circle cx="297" cy="191" r="2.5" fill="#78350F" />

        {/* Edificio principal de la aldea */}
        <g transform="translate(320, 240)">
          <polygon points="0,18 28,34 56,18 28,2" fill="#991B1B" />
          <polygon points="0,18 28,34 28,62 0,46" fill="#7F1D1D" />
          <polygon points="28,34 56,18 56,46 28,62" fill="#B91C1C" />
          <rect x="8" y="34" width="6" height="8" fill="#FEF08A" />
          <rect x="38" y="32" width="6" height="8" fill="#FEF08A" />
        </g>

        {/* Casas de la aldea */}
        <g transform="translate(310, 178)">
          <polygon points="0,10 18,20 36,10 18,0" fill="#1E293B" />
          <polygon points="0,10 18,20 18,36 0,26" fill="#0F172A" />
          <polygon points="18,20 36,10 36,26 18,36" fill="#334155" />
        </g>
        <g transform="translate(356, 174)">
          <polygon points="0,10 18,20 36,10 18,0" fill="#0284C7" />
          <polygon points="0,10 18,20 18,34 0,24" fill="#0369A1" />
          <polygon points="18,20 36,10 36,24 18,34" fill="#38BDF8" />
        </g>

        {/* Árboles (aumentan y reverdecen con las mejoras) */}
        {[
          { x: 265, y: 270, min: 0 },
          { x: 428, y: 230, min: 0 },
          { x: 295, y: 292, min: 1 },
          { x: 405, y: 262, min: 1 },
          { x: 355, y: 316, min: 2 },
          { x: 448, y: 205, min: 3 },
          { x: 332, y: 222, min: 4 },
        ].map((tree, idx) =>
          badgesCount >= tree.min ? (
            <g key={idx} transform={`translate(${tree.x}, ${tree.y})`}>
              <rect x="-2" y="4" width="4" height="10" fill="#78350F" />
              <circle
                cx="0"
                cy="0"
                r="9"
                fill={progressRatio >= 0.5 ? '#15803D' : '#65A30D'}
              />
            </g>
          ) : null
        )}

        {/* Ruta punteada roja entre los dos minijuegos */}
        <path
          d="M362 246 Q415 215 395 162 Q382 135 415 112"
          fill="none"
          stroke="#DC2626"
          strokeWidth="3.5"
          strokeDasharray="6 6"
        />

        {/* Nubes: cafés enojadas si no está restaurado, blancas felices al completar */}
        {isRestored ? (
          <g>
            {[
              { x: 392, y: 120 },
              { x: 438, y: 108 },
              { x: 422, y: 146 },
            ].map((c, i) => (
              <g key={i} transform={`translate(${c.x}, ${c.y})`}>
                <path
                  d="M-18 6 C-24 6,-26 -6,-14 -8 C-10 -18,10 -18,14 -8 C26 -6,24 6,18 6 Z"
                  fill="#FFFFFF"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                <circle cx="-6" cy="-2" r="2" fill="#0F172A" />
                <circle cx="6" cy="-2" r="2" fill="#0F172A" />
                <path d="M-5 2 Q0 6 5 2" fill="none" stroke="#0F172A" strokeWidth="1.8" />
              </g>
            ))}
          </g>
        ) : (
          <g>
            {[
              { x: 382, y: 112 },
              { x: 425, y: 98 },
              { x: 455, y: 118 },
            ].map((c, i) => (
              <g key={i} transform={`translate(${c.x}, ${c.y})`}>
                <path
                  d="M-18 6 C-24 6,-26 -6,-14 -8 C-10 -18,10 -18,14 -8 C26 -6,24 6,18 6 Z"
                  fill="#B4834D"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                <line x1="-9" y1="-5" x2="-3" y2="-2" stroke="#0F172A" strokeWidth="2" />
                <line x1="9" y1="-5" x2="3" y2="-2" stroke="#0F172A" strokeWidth="2" />
                <circle cx="-6" cy="-1" r="1.8" fill="#0F172A" />
                <circle cx="6" cy="-1" r="1.8" fill="#0F172A" />
              </g>
            ))}
            {/* Botes de basura humeantes cerca del pin del plataformas */}
            <g transform="translate(382, 232)">
              <rect x="-8" y="-8" width="14" height="16" rx="2" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
              <path d="M-5 -8 Q-1 -18 3 -8" fill="#F97316" />
            </g>
          </g>
        )}

        {/* Pines interactivos si están habilitados */}
        {highlightPins && (
          <>
            {/* Pin 1: Vence a los enemigos de la atmósfera */}
            <g
              onClick={onSelectPlatformer}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label="Jugar minijuego Vence a los enemigos de la atmósfera"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectPlatformer?.();
              }}
            >
              <circle cx="362" cy="236" r="24" fill="#DC2626" opacity="0.22" />
              <path
                d="M362 195 C348 195 340 206 340 218 C340 232 362 250 362 250 C362 250 384 232 384 218 C384 206 376 195 362 195 Z"
                fill="#EF4444"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <circle cx="362" cy="216" r="7" fill="#FFFFFF" />
              <rect x="372" y="236" width="150" height="36" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
              <text x="382" y="252" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif">
                Vence a los enemigos
              </text>
              <text x="382" y="265" fontSize="11" fontWeight="700" fill="#DC2626" fontFamily="Plus Jakarta Sans, sans-serif">
                de la atmósfera →
              </text>
            </g>

            {/* Pin 2: Acaba con los gases de efecto invernadero */}
            <g
              onClick={onSelectShooter}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label="Jugar minijuego Elimina los gases de efecto invernadero"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectShooter?.();
              }}
            >
              <circle cx="418" cy="116" r="24" fill="#DC2626" opacity="0.22" />
              <path
                d="M418 75 C404 75 396 86 396 98 C396 112 418 130 418 130 C418 130 440 112 440 98 C440 86 432 75 418 75 Z"
                fill="#EF4444"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <circle cx="418" cy="96" r="7" fill="#FFFFFF" />
              <rect x="394" y="132" width="158" height="36" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
              <text x="404" y="148" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif">
                Elimina los gases de
              </text>
              <text x="404" y="161" fontSize="11" fontWeight="700" fill="#DC2626" fontFamily="Plus Jakarta Sans, sans-serif">
                efecto invernadero →
              </text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
