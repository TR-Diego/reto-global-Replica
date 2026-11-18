import React from 'react';

interface ThermometerProps {
  /** Cantidad de mejoras ganadas (0 a 4). A mayor cantidad, menor temperatura. */
  badgesCount: number;
  compact?: boolean;
}

/**
 * Termómetro Global: comienza en rojo crítico (0 mejoras) y desciende
 * progresivamente hasta nivel seguro verde/azul al completar las 4 mejoras.
 */
export const Thermometer: React.FC<ThermometerProps> = ({
  badgesCount,
  compact = false,
}) => {
  const clamped = Math.max(0, Math.min(4, badgesCount));
  // Nivel del mercurio: 0 insignias -> 94% (crítico), 4 insignias -> 24% (equilibrio)
  const levelPercent = 94 - clamped * 17.5;
  const tempLabel =
    clamped === 0
      ? '+1.5 °C · Crítico'
      : clamped === 1
      ? '+1.2 °C · Alto'
      : clamped === 2
      ? '+0.9 °C · Moderado'
      : clamped === 3
      ? '+0.5 °C · En mejora'
      : 'Equilibrio restaurado';

  const barColor =
    clamped <= 1
      ? '#DC2626'
      : clamped === 2
      ? '#D97706'
      : clamped === 3
      ? '#65A30D'
      : '#10B981';

  return (
    <div
      className={`flex flex-col items-center select-none ${
        compact ? 'gap-1' : 'gap-2'
      }`}
      aria-label={`Termómetro global: ${tempLabel}`}
    >
      <svg
        viewBox="0 0 80 170"
        className={compact ? 'w-12 h-24' : 'w-16 h-32'}
        role="img"
        aria-hidden="true"
      >
        {/* Tubo exterior */}
        <rect
          x="26"
          y="8"
          width="28"
          height="112"
          rx="14"
          fill="#E2E8F0"
          stroke="#0F172A"
          strokeWidth="4"
        />
        {/* Interior vacío */}
        <rect x="33" y="15" width="14" height="98" rx="7" fill="#94A3B8" />
        {/* Marcas de escala */}
        {[28, 48, 68, 88].map((y) => (
          <line
            key={y}
            x1="28"
            y1={y}
            x2="35"
            y2={y}
            stroke="#334155"
            strokeWidth="2"
          />
        ))}
        {/* Columna de mercurio animada */}
        <rect
          x="33"
          y={15 + (98 * (100 - levelPercent)) / 100}
          width="14"
          height={(98 * levelPercent) / 100 + 8}
          rx="7"
          fill={barColor}
          className="transition-all duration-500"
        />
        {/* Bulbo en forma de planeta Tierra */}
        <circle
          cx="40"
          cy="134"
          r="26"
          fill="#0284C7"
          stroke="#0F172A"
          strokeWidth="4"
        />
        <path
          d="M24 128c5-6 14-5 17 1 2 5-3 9 2 13 4 4 12 2 15-4 4 8 1 21-10 25-11 4-23-3-26-14-2-7 0-15 2-21z"
          fill="#16A34A"
        />
        <circle
          cx="40"
          cy="134"
          r="26"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.25"
          strokeWidth="3"
        />
      </svg>
      {!compact && (
        <span className="font-mono-num text-xs font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-slate-100 border border-slate-700 whitespace-nowrap">
          {tempLabel}
        </span>
      )}
    </div>
  );
};
