import React, { useEffect, useState } from 'react';
import {
  CharacterSprite,
  IsometricVillageMap,
  SectorIcon,
} from '../components/art/GameArtwork';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { Thermometer } from '../components/ui/Thermometer';
import {
  SECTOR_COST,
  SECTORS,
  VILLAGE_INTRO_STEPS,
} from '../data/educationalContent';
import { CharacterId, SectorId } from '../types/game';
import { soundFX } from '../utils/sound';

interface VillageMapScreenProps {
  character: CharacterId;
  coins: number;
  unlockedSectors: SectorId[];
  hasSeenTutorial: boolean;
  onFinishTutorial: () => void;
  onStartMinigame: (id: 'platformer' | 'shooter') => void;
  onGoToInvest: () => void;
}

const ALL_SECTOR_IDS: SectorId[] = [
  'transporte',
  'energia',
  'reforestacion',
  'vehiculos',
];

export const VillageMapScreen: React.FC<VillageMapScreenProps> = ({
  character,
  coins,
  unlockedSectors,
  hasSeenTutorial,
  onFinishTutorial,
  onStartMinigame,
  onGoToInvest,
}) => {
  const [tutorialStep, setTutorialStep] = useState(hasSeenTutorial ? -1 : 0);

  const inTutorial = tutorialStep >= 0 && tutorialStep < VILLAGE_INTRO_STEPS.length;
  const currentStep = inTutorial ? VILLAGE_INTRO_STEPS[tutorialStep] : null;

  const advanceTutorial = () => {
    if (tutorialStep < VILLAGE_INTRO_STEPS.length - 1) {
      setTutorialStep((s) => s + 1);
    } else {
      setTutorialStep(-1);
      onFinishTutorial();
    }
  };

  useEffect(() => {
    if (!inTutorial) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.playClick();
        advanceTutorial();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const canInvestNow =
    coins >= SECTOR_COST && unlockedSectors.length < ALL_SECTOR_IDS.length;

  return (
    <section
      className="relative min-h-[calc(100vh-56px)] bg-[#0E3F66] px-4 md:px-8 py-6 flex flex-col justify-center"
      aria-label="Mapa de la Aldea Global"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Panel izquierdo: Instrucción o Panel de Mejoras Ganadas */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {inTutorial && currentStep?.id === 'aldea' ? (
            <div className="rounded-2xl bg-slate-950/90 border-2 border-slate-700 p-6 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {currentStep.titulo}
              </p>
              <p className="text-white text-base md:text-lg leading-relaxed">
                {currentStep.texto}
              </p>
              <div className="mt-6 flex justify-end">
                <ArcadeButton label="CONTINUAR" onClick={advanceTutorial} />
              </div>
            </div>
          ) : (
            <>
              {/* Encabezado de selección de aventura */}
              <div className="rounded-xl bg-slate-950 px-5 py-4 border border-slate-800 shadow-lg">
                <h2 className="font-display text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">
                  {inTutorial ? currentStep?.titulo : '¡Elige tu aventura!'}
                </h2>
                <p className="text-sm text-sky-200 mt-1">
                  {inTutorial
                    ? currentStep?.texto
                    : 'Selecciona uno de los minijuegos en el mapa o usando los botones inferiores.'}
                </p>
              </div>

              {/* Panel verde "MEJORAS GANADAS" igual al del prototipo de alta fidelidad */}
              <div
                className={`rounded-2xl bg-[#117A37] border-4 p-5 shadow-xl transition-all ${
                  currentStep?.id === 'insignias'
                    ? 'border-amber-300 ring-4 ring-amber-400/50'
                    : 'border-emerald-300/70'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wide">
                    Mejoras ganadas
                  </h3>
                  <span className="font-mono-num text-sm font-bold text-emerald-100">
                    {unlockedSectors.length} / 4
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {ALL_SECTOR_IDS.map((sectorId) => {
                    const unlocked = unlockedSectors.includes(sectorId);
                    const sector = SECTORS[sectorId];
                    return (
                      <div
                        key={sectorId}
                        className={`flex items-center gap-3 rounded-xl p-2.5 border transition-all ${
                          unlocked
                            ? 'bg-emerald-950/70 border-emerald-300 text-white'
                            : 'bg-emerald-900/40 border-emerald-500/40 text-emerald-200/50'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 ${
                            unlocked
                              ? 'bg-white text-emerald-700 border-emerald-300'
                              : 'bg-emerald-950/60 text-emerald-400/40 border-emerald-500/30'
                          }`}
                        >
                          <SectorIcon sector={sectorId} className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-semibold leading-tight">
                          {sector.nombre}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botones accesibles para iniciar minijuegos o invertir */}
              {!inTutorial ? (
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onStartMinigame('platformer');
                      }}
                      className="rounded-xl bg-rose-700 hover:bg-rose-600 border-b-4 border-rose-950 px-4 py-3 text-left text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
                    >
                      <span className="block text-[11px] uppercase tracking-wider text-rose-200 font-semibold">
                        Minijuego · Plataformas 2D
                      </span>
                      <span className="block font-display font-bold text-sm mt-0.5">
                        Vence a los enemigos de la atmósfera
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onStartMinigame('shooter');
                      }}
                      className="rounded-xl bg-amber-600 hover:bg-amber-500 border-b-4 border-amber-900 px-4 py-3 text-left text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
                    >
                      <span className="block text-[11px] uppercase tracking-wider text-amber-100 font-semibold">
                        Minijuego · Shooter 2D
                      </span>
                      <span className="block font-display font-bold text-sm mt-0.5">
                        Elimina los gases de efecto invernadero
                      </span>
                    </button>
                  </div>

                  {canInvestNow && (
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onGoToInvest();
                      }}
                      className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 border-b-4 border-emerald-900 px-4 py-3 text-center font-display font-bold text-white text-sm uppercase tracking-wide transition-colors cursor-pointer"
                    >
                      Tienes {coins.toLocaleString('es-MX')} monedas · Invertir en un sector ahora →
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex justify-end">
                  <ArcadeButton label="CONTINUAR" onClick={advanceTutorial} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Columna derecha: Mapa Isométrico + Termómetro + Avatar */}
        <div className="lg:col-span-7 relative flex flex-col items-center">
          <IsometricVillageMap
            badgesCount={unlockedSectors.length}
            highlightPins={!inTutorial}
            onSelectPlatformer={() => {
              soundFX.playClick();
              onStartMinigame('platformer');
            }}
            onSelectShooter={() => {
              soundFX.playClick();
              onStartMinigame('shooter');
            }}
          />

          {/* Termómetro global en esquina inferior derecha + personaje elegido */}
          <div className="w-full flex items-end justify-between px-4 -mt-6 pointer-events-none">
            <div className="flex items-center gap-3 bg-slate-950/75 border border-slate-700 rounded-xl px-3 py-2">
              <CharacterSprite character={character} className="w-10 h-12" />
              <div className="text-xs">
                <p className="text-slate-300">Monedas disponibles</p>
                <p className="font-mono-num font-bold text-amber-300 text-base">
                  {coins.toLocaleString('es-MX')}
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl p-2 transition-all ${
                currentStep?.id === 'termometro'
                  ? 'bg-slate-900/90 ring-4 ring-amber-400'
                  : ''
              }`}
            >
              <Thermometer badgesCount={unlockedSectors.length} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
