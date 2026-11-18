import React, { useEffect } from 'react';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { Thermometer } from '../components/ui/Thermometer';
import { MinigameResult } from '../types/game';
import { soundFX } from '../utils/sound';

interface RewardSummaryScreenProps {
  result: MinigameResult;
  totalCoins: number;
  badgesCount: number;
  onContinue: () => void;
}

export const RewardSummaryScreen: React.FC<RewardSummaryScreenProps> = ({
  result,
  totalCoins,
  badgesCount,
  onContinue,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.playClick();
        onContinue();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onContinue]);

  return (
    <section
      className="min-h-[calc(100vh-56px)] bg-[#3F4248] px-6 py-10 flex items-center justify-center"
      aria-label="Recompensas obtenidas"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-3 flex justify-center">
          <Thermometer badgesCount={badgesCount} />
        </div>

        <div className="md:col-span-9 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
            ¡Muy bien! Has ganado:
          </h2>

          <div className="mt-5 inline-flex items-center gap-4 rounded-full bg-slate-950 px-6 py-3 border-2 border-amber-400/70 shadow-xl">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-mono-num font-extrabold text-lg">
              P
            </span>
            <span className="font-mono-num text-3xl md:text-4xl font-extrabold text-white">
              {String(totalCoins).padStart(6, '0')}
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-300 font-mono-num">
            Recompensa del minijuego: +{result.monedasGanadas.toLocaleString('es-MX')} monedas · Enemigos neutralizados: {result.enemigosDerrotados}
          </p>

          <p className="mt-5 text-lg md:text-xl font-bold text-slate-100 uppercase tracking-wide">
            Aprovecha esos recursos para mejorar algún sector.
          </p>

          <div className="mt-8 w-full flex justify-center md:justify-end">
            <ArcadeButton label="CONTINUAR" onClick={onContinue} />
          </div>
        </div>
      </div>
    </section>
  );
};
