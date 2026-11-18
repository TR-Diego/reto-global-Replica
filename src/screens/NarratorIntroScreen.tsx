import React, { useEffect, useState } from 'react';
import {
  ArcticTernIllustration,
  PollutedCityScene,
} from '../components/art/GameArtwork';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { NARRATOR_DIALOGUES } from '../data/educationalContent';
import { soundFX } from '../utils/sound';

interface NarratorIntroScreenProps {
  onNext: () => void;
}

export const NarratorIntroScreen: React.FC<NarratorIntroScreenProps> = ({
  onNext,
}) => {
  const [step, setStep] = useState(0);
  const current = NARRATOR_DIALOGUES[step];

  const handleAdvance = () => {
    if (step < NARRATOR_DIALOGUES.length - 1) {
      setStep((s) => s + 1);
    } else {
      onNext();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.playClick();
        handleAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-[#7F1D1D] px-6 py-8 overflow-hidden"
      aria-label="Introducción del Charrán Ártico"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Columna izquierda: Charrán Ártico */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <ArcticTernIllustration talking className="w-52 h-64 md:w-60 md:h-72" />
          <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-200">
            Guía · Charrán Ártico
          </span>
        </div>

        {/* Columna derecha: Globo de diálogo + escena de ciudad afectada */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Globo de diálogo */}
          <div className="relative rounded-2xl bg-white text-slate-900 p-6 shadow-2xl border-4 border-slate-900">
            <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500 font-mono-num">
              <span>Introducción científica</span>
              <span>
                {step + 1} / {NARRATOR_DIALOGUES.length}
              </span>
            </div>
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-900">
              {current.texto}
            </p>
          </div>

          {/* Tarjeta visual inferior con la ciudad contaminada */}
          <div className="rounded-2xl overflow-hidden border-4 border-white/90 bg-slate-900 shadow-2xl">
            <PollutedCityScene className="w-full h-48 md:h-56 object-cover" />
            <div className="bg-slate-950 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-display font-bold text-white tracking-wide uppercase text-sm md:text-base">
                ¡Bienvenido! El planeta te necesita
              </p>
              <ArcadeButton
                label={step < NARRATOR_DIALOGUES.length - 1 ? 'SIGUIENTE' : 'VER ANIMACIÓN'}
                onClick={handleAdvance}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
