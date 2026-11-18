import React, { useEffect, useState } from 'react';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { GREENHOUSE_STEPS } from '../data/educationalContent';
import { soundFX } from '../utils/sound';

interface GreenhouseAnimationScreenProps {
  onComplete: () => void;
}

/**
 * Escena educativa animada del Efecto Invernadero (4 etapas),
 * recreando la explicación visual del prototipo de alta fidelidad.
 */
export const GreenhouseAnimationScreen: React.FC<
  GreenhouseAnimationScreenProps
> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const current = GREENHOUSE_STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < GREENHOUSE_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.playClick();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-slate-950 px-6 py-8"
      aria-label="Explicación del efecto invernadero"
    >
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden border-2 border-slate-800 bg-gradient-to-b from-[#041C32] via-[#0B3556] to-[#082032] shadow-2xl">
        {/* Encabezado */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Efecto Invernadero
            </h2>
            <p className="text-xs text-sky-200 mt-0.5">{current.titulo}</p>
          </div>
          <div className="flex items-center gap-2">
            {GREENHOUSE_STEPS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setStepIndex(idx);
                }}
                className={`px-3 py-1 rounded-md text-xs font-mono-num font-bold transition-colors cursor-pointer ${
                  idx === stepIndex
                    ? 'bg-emerald-500 text-slate-950'
                    : idx < stepIndex
                    ? 'bg-sky-800 text-sky-100'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Diagrama animado SVG */}
        <div className="relative px-4 pt-4">
          <svg
            viewBox="0 0 800 360"
            className="w-full h-auto max-h-[400px]"
            role="img"
            aria-label={current.texto}
          >
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="45%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="atmoGlow" cx="50%" cy="100%" r="75%">
                <stop
                  offset="65%"
                  stopColor={stepIndex === 3 ? '#EF4444' : '#38BDF8'}
                  stopOpacity="0.1"
                />
                <stop
                  offset="90%"
                  stopColor={stepIndex === 3 ? '#DC2626' : '#7DD3FC'}
                  stopOpacity="0.38"
                />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Sol brillante */}
            <circle cx="110" cy="78" r="95" fill="url(#sunGlow)" />
            <circle cx="110" cy="78" r="34" fill="#FEF08A" />

            {/* Halo de atmósfera */}
            <ellipse cx="420" cy="400" rx="430" ry="265" fill="url(#atmoGlow)" />
            <text
              x="95"
              y="225"
              fill="#E2E8F0"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              fontSize="20"
            >
              Atmósfera
            </text>

            {/* Curvatura del planeta Tierra */}
            <ellipse
              cx="420"
              cy="415"
              rx="380"
              ry="225"
              fill="#0369A1"
              stroke="#0F172A"
              strokeWidth="3"
            />
            {/* Continentes */}
            <path
              d="M170 285 Q240 245 310 265 Q340 285 290 330 Q230 350 180 330 Z"
              fill={stepIndex === 3 ? '#9A3412' : '#4D7C0F'}
              className="transition-colors duration-500"
            />
            <path
              d="M360 235 Q460 198 555 245 Q590 295 520 350 Q420 365 370 310 Z"
              fill={stepIndex === 3 ? '#B45309' : '#65A30D'}
              className="transition-colors duration-500"
            />
            <path
              d="M590 280 Q655 260 705 310 Q690 350 615 355 Z"
              fill={stepIndex === 3 ? '#9A3412' : '#65A30D'}
              className="transition-colors duration-500"
            />

            {/* Paso 1: Ondas solares llegando a la Tierra */}
            {stepIndex >= 0 && (
              <g stroke="#FEF08A" strokeWidth="3" fill="none" opacity={stepIndex === 0 ? 1 : 0.45}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    d={`M ${155 + i * 24} ${105 + i * 16} Q ${195 + i * 24} ${95 + i * 16} ${210 + i * 24} ${135 + i * 16}`}
                    strokeDasharray="6 4"
                  />
                ))}
                <polygon points="315,212 302,202 316,196" fill="#FEF08A" stroke="none" />
              </g>
            )}

            {/* Paso 2: Energía reflejada de vuelta al espacio */}
            {stepIndex === 1 && (
              <g stroke="#BAE6FD" strokeWidth="3" fill="none">
                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={`M ${345 + i * 18} ${200 - i * 20} Q ${375 + i * 18} ${185 - i * 20} ${390 + i * 18} ${175 - i * 20}`}
                  />
                ))}
                <polygon points="445,112 430,116 438,128" fill="#BAE6FD" stroke="none" />
              </g>
            )}

            {/* Paso 3 y 4: Tierra irradia calor (arcos rojos) */}
            {stepIndex >= 2 && (
              <g stroke="#EF4444" strokeWidth="2.5" fill="none" opacity={stepIndex === 2 ? 0.95 : 0.6}>
                {[0, 1, 2, 3].map((i) => (
                  <ellipse
                    key={i}
                    cx="420"
                    cy="415"
                    rx={395 + i * 16}
                    ry={240 + i * 16}
                  />
                ))}
              </g>
            )}

            {/* Paso 4: Nubes enojadas de CO2 dispersando calor de vuelta */}
            {stepIndex === 3 && (
              <g>
                {[
                  { x: 185, y: 175 },
                  { x: 325, y: 145 },
                  { x: 500, y: 150 },
                  { x: 645, y: 188 },
                ].map((cloud, idx) => (
                  <g key={idx} transform={`translate(${cloud.x}, ${cloud.y})`}>
                    {/* Flechas rojas dispersando calor */}
                    <g stroke="#EF4444" strokeWidth="2.5">
                      <line x1="-26" y1="24" x2="-48" y2="44" />
                      <line x1="0" y1="30" x2="0" y2="58" />
                      <line x1="26" y1="24" x2="48" y2="44" />
                    </g>
                    <path
                      d="M-38 14 C-52 14,-54 -14,-28 -16 C-22 -38,22 -38,28 -16 C54 -14,52 14,38 14 Z"
                      fill="#B4834D"
                      stroke="#0F172A"
                      strokeWidth="3"
                    />
                    {/* Ceño fruncido y ojos */}
                    <line x1="-18" y1="-10" x2="-5" y2="-4" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                    <line x1="18" y1="-10" x2="5" y2="-4" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="-11" cy="-1" r="3" fill="#0F172A" />
                    <circle cx="11" cy="-1" r="3" fill="#0F172A" />
                    <path d="M-8 8 Q0 3 8 8" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>

        {/* Texto inferior y botón */}
        <div className="px-6 py-5 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base md:text-lg font-medium text-white max-w-2xl leading-relaxed">
            {current.texto}
          </p>
          <ArcadeButton
            label={
              stepIndex < GREENHOUSE_STEPS.length - 1
                ? 'SIGUIENTE'
                : 'IR A LA ALDEA'
            }
            onClick={handleNext}
          />
        </div>
      </div>
    </section>
  );
};
