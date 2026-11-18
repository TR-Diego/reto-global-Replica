import React, { useState } from 'react';
import {
  IsometricVillageMap,
  RetoGlobalEmblem,
  SectorIcon,
} from '../components/art/GameArtwork';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { Thermometer } from '../components/ui/Thermometer';
import { SECTORS, VICTORY_SUMMARY_TEXT } from '../data/educationalContent';
import { SectorId } from '../types/game';

interface VictoryScreenProps {
  unlockedSectors: SectorId[];
  totalCoins: number;
  minigamesPlayed: number;
  onRestart: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  unlockedSectors,
  totalCoins,
  minigamesPlayed,
  onRestart,
}) => {
  const [stage, setStage] = useState<'RESTORED_MAP' | 'FINAL_MESSAGE'>(
    'RESTORED_MAP'
  );

  if (stage === 'RESTORED_MAP') {
    return (
      <section
        className="min-h-[calc(100vh-56px)] bg-[#0E3F66] px-6 py-8 flex items-center justify-center"
        aria-label="Aldea Global restaurada"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="rounded-2xl bg-slate-950 p-6 border-2 border-emerald-400 shadow-2xl">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide">
                ¡Felicidades! Has completado el Reto Global
              </h2>
              <p className="mt-2 text-sm text-emerald-200">
                Lograste las 4 mejoras ambientales y restauraste el equilibrio de
                la Aldea Global.
              </p>
            </div>

            <div className="rounded-2xl bg-[#117A37] border-4 border-emerald-300 p-5 shadow-xl">
              <h3 className="font-display text-lg font-extrabold text-white uppercase mb-3">
                Mejoras ganadas (4 / 4)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {unlockedSectors.map((sectorId) => (
                  <div
                    key={sectorId}
                    className="flex items-center gap-2.5 rounded-xl bg-emerald-950/70 p-2.5 border border-emerald-300 text-white"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center shrink-0">
                      <SectorIcon sector={sectorId} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold leading-tight">
                      {SECTORS[sectorId].nombre}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <ArcadeButton
                label="CONTINUAR"
                onClick={() => setStage('FINAL_MESSAGE')}
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center">
            <IsometricVillageMap badgesCount={4} />
            <div className="w-full flex justify-end px-6 -mt-8">
              <Thermometer badgesCount={4} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="min-h-[calc(100vh-56px)] bg-[#0E3F66] px-6 py-10 flex items-center justify-center"
      aria-label="Resumen final de aprendizaje"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 rounded-2xl bg-slate-950/85 border-2 border-slate-700 p-6 md:p-8 shadow-2xl">
          <h2 className="font-display text-2xl font-extrabold text-emerald-300 uppercase mb-4">
            Conclusión del Reto Global
          </h2>
          <p className="text-white text-base md:text-lg leading-relaxed">
            {VICTORY_SUMMARY_TEXT}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 text-sm">
            <div>
              <span className="text-slate-400 block text-xs">Partidas jugadas</span>
              <span className="font-mono-num font-bold text-white text-lg">
                {minigamesPlayed}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Monedas restantes</span>
              <span className="font-mono-num font-bold text-amber-300 text-lg">
                {totalCoins.toLocaleString('es-MX')}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col items-center">
          <RetoGlobalEmblem className="w-52 h-44 -mb-6 z-10" />
          <IsometricVillageMap badgesCount={4} />
          <div className="mt-2 self-end">
            <ArcadeButton label="COMENZAR DE NUEVO" onClick={onRestart} />
          </div>
        </div>
      </div>
    </section>
  );
};
