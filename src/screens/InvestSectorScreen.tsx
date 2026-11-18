import React, { useState } from 'react';
import { SectorIcon } from '../components/art/GameArtwork';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { SECTOR_COST, SECTORS } from '../data/educationalContent';
import { SectorId } from '../types/game';
import { soundFX } from '../utils/sound';

interface InvestSectorScreenProps {
  coins: number;
  unlockedSectors: SectorId[];
  onUnlockSector: (sectorId: SectorId) => void;
  onContinueToMap: () => void;
}

const SECTOR_ORDER: SectorId[] = [
  'transporte',
  'vehiculos',
  'energia',
  'reforestacion',
];

export const InvestSectorScreen: React.FC<InvestSectorScreenProps> = ({
  coins,
  unlockedSectors,
  onUnlockSector,
  onContinueToMap,
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorId | null>(null);
  const [confirmedSector, setConfirmedSector] = useState<SectorId | null>(null);

  const handleChooseSector = (sectorId: SectorId) => {
    if (unlockedSectors.includes(sectorId)) return;
    if (coins < SECTOR_COST) return;
    soundFX.playUnlock();
    setSelectedSector(sectorId);
    setConfirmedSector(sectorId);
    onUnlockSector(sectorId);
  };

  const activeInfo = confirmedSector ? SECTORS[confirmedSector] : null;

  return (
    <section
      className="min-h-[calc(100vh-56px)] bg-[#149622] px-5 py-8 flex items-center justify-center"
      aria-label="Zona de inversión en mejoras ambientales"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Panel izquierdo: Pregunta + Monedas + Botón */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight tracking-wide">
            ¿En qué sector deseas invertir tus recompensas?
          </h2>

          <div className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-2.5 border-2 border-white/80 shadow-xl">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-mono-num font-extrabold text-base">
              P
            </span>
            <span className="font-mono-num text-2xl md:text-3xl font-extrabold text-white">
              {String(coins).padStart(6, '0')}
            </span>
          </div>

          <p className="text-sm text-emerald-50 font-medium">
            Costo de cada mejora ambiental:{' '}
            <span className="font-mono-num font-bold">
              {SECTOR_COST.toLocaleString('es-MX')} monedas
            </span>
            .
          </p>

          {activeInfo ? (
            <ArcadeButton label="CONTINUAR" onClick={onContinueToMap} />
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              {coins < SECTOR_COST && (
                <p className="text-sm text-amber-100 bg-emerald-950/60 px-4 py-2 rounded-lg">
                  Necesitas al menos {SECTOR_COST.toLocaleString('es-MX')} monedas para desbloquear un sector. Juega otro minijuego para reunir más.
                </p>
              )}
              <button
                type="button"
                onClick={onContinueToMap}
                className="px-4 py-2.5 rounded-lg bg-emerald-950/75 hover:bg-emerald-950 text-white text-sm font-semibold border border-emerald-300/40 cursor-pointer"
              >
                Volver al mapa
              </button>
            </div>
          )}
        </div>

        {/* Panel derecho: Selección de los 4 sectores o tarjeta de recomendación */}
        <div className="lg:col-span-7">
          {activeInfo ? (
            <div className="rounded-3xl bg-slate-900/95 border-4 border-white/90 p-7 md:p-8 text-center shadow-2xl">
              <div className="mx-auto w-24 h-24 rounded-full bg-white text-emerald-700 flex items-center justify-center border-4 border-emerald-400 shadow-lg">
                <SectorIcon sector={activeInfo.id} className="w-14 h-14" />
              </div>

              <h3 className="mt-5 font-display text-2xl font-extrabold text-white uppercase">
                {activeInfo.nombre}
              </h3>

              <p className="mt-4 text-base md:text-lg text-slate-100 leading-relaxed">
                {activeInfo.recomendacion}
              </p>

              <p className="mt-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Insignia desbloqueada · Mejoras obtenidas: {unlockedSectors.length} / 4
              </p>
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-900/80 border-2 border-white/25 p-6 md:p-8 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SECTOR_ORDER.map((id) => {
                  const sector = SECTORS[id];
                  const unlocked = unlockedSectors.includes(id);
                  const affordable = coins >= SECTOR_COST && !unlocked;
                  const isSelected = selectedSector === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      disabled={!affordable}
                      onClick={() => handleChooseSector(id)}
                      onMouseEnter={() => setSelectedSector(id)}
                      className={`group flex flex-col items-center text-center rounded-2xl p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${
                        unlocked
                          ? 'bg-emerald-950/60 opacity-60 cursor-not-allowed'
                          : affordable
                          ? 'bg-slate-800/75 hover:bg-slate-800 cursor-pointer hover:-translate-y-0.5'
                          : 'bg-slate-900/40 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-colors ${
                          unlocked
                            ? 'bg-emerald-200 text-emerald-800 border-emerald-400'
                            : isSelected && affordable
                            ? 'bg-white text-emerald-700 border-red-600 ring-4 ring-red-500/40'
                            : 'bg-white text-emerald-700 border-slate-300 group-hover:border-red-500'
                        }`}
                      >
                        <SectorIcon sector={id} className="w-14 h-14" />
                      </div>

                      <span className="mt-3 font-display font-bold text-white text-base leading-snug">
                        {sector.nombre}
                      </span>
                      <span className="mt-1 text-xs text-slate-300">
                        {unlocked
                          ? 'Insignia ya obtenida'
                          : `${SECTOR_COST.toLocaleString('es-MX')} monedas`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
