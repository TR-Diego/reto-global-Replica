/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { DemoQuizModal } from './components/DemoQuizModal';
import { HelpControlsModal } from './components/HelpControlsModal';
import { SECTOR_COST } from './data/educationalContent';
import { CharacterSelectScreen } from './screens/CharacterSelectScreen';
import { GreenhouseAnimationScreen } from './screens/GreenhouseAnimationScreen';
import { InvestSectorScreen } from './screens/InvestSectorScreen';
import { NarratorIntroScreen } from './screens/NarratorIntroScreen';
import { PlatformerMinigame } from './screens/PlatformerMinigame';
import { RewardSummaryScreen } from './screens/RewardSummaryScreen';
import { ShooterMinigame } from './screens/ShooterMinigame';
import { TitleScreen } from './screens/TitleScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { VillageMapScreen } from './screens/VillageMapScreen';
import {
  CharacterId,
  GameScreen,
  MinigameResult,
  SectorId,
} from './types/game';
import { soundFX } from './utils/sound';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('TITLE');
  const [character, setCharacter] = useState<CharacterId>('girl');
  const [coins, setCoins] = useState<number>(0);
  const [unlockedSectors, setUnlockedSectors] = useState<SectorId[]>([]);
  const [hasSeenTutorial, setHasSeenTutorial] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<MinigameResult | null>(null);
  const [minigamesPlayed, setMinigamesPlayed] = useState<number>(0);

  const [muted, setMuted] = useState<boolean>(false);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showDemoQuiz, setShowDemoQuiz] = useState<boolean>(false);

  // Desbloquea AudioContext en la primera interacción del usuario (política de navegadores)
  useEffect(() => {
    const unlockAudio = () => {
      soundFX.unlockAndStartMusic();
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      soundFX.stopMusic();
    };
  }, []);

  // Cambia el tema musical retro según la escena activa
  useEffect(() => {
    const theme =
      screen === 'MINIGAME_PLATFORMER' || screen === 'MINIGAME_SHOOTER'
        ? 'action'
        : screen === 'VICTORY_SUMMARY'
        ? 'victory'
        : 'menu';
    soundFX.setMusicTheme(theme);
  }, [screen]);

  const handleToggleMute = () => {
    const next = !muted;
    soundFX.muted = next;
    setMuted(next);
    soundFX.syncMusicLoop();
    if (!next) soundFX.playClick();
  };

  const handleToggleMusic = () => {
    const next = !musicEnabled;
    soundFX.musicEnabled = next;
    setMusicEnabled(next);
    soundFX.unlockAndStartMusic();
    soundFX.playClick();
  };

  const handleRestart = () => {
    soundFX.playClick();
    setScreen('TITLE');
    setCharacter('girl');
    setCoins(0);
    setUnlockedSectors([]);
    setHasSeenTutorial(false);
    setLastResult(null);
    setMinigamesPlayed(0);
  };

  const handleMinigameComplete = (result: MinigameResult) => {
    setCoins((prev) => prev + result.monedasGanadas);
    setLastResult(result);
    setMinigamesPlayed((n) => n + 1);
    setScreen('REWARD_SUMMARY');
  };

  const handleUnlockSector = (sectorId: SectorId) => {
    setCoins((prev) => Math.max(0, prev - SECTOR_COST));
    setUnlockedSectors((prev) =>
      prev.includes(sectorId) ? prev : [...prev, sectorId]
    );
  };

  const handleContinueFromInvest = () => {
    if (unlockedSectors.length >= 4) {
      setScreen('VICTORY_SUMMARY');
    } else {
      setScreen('VILLAGE_MAP');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08263E] text-slate-100">
      {/* Barra superior limpia y fija (1 fila, 3 zonas) */}
      <header className="h-14 px-4 md:px-6 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 z-30">
        {/* Zona 1: Marca */}
        <button
          type="button"
          onClick={() => setScreen('TITLE')}
          className="font-display text-lg font-extrabold tracking-tight text-white hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Reto Global
        </button>

        {/* Zona 2: Enlaces utilitarios y progreso en texto plano */}
        <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-slate-300 overflow-x-auto">
          <span className="hidden sm:inline font-mono-num text-slate-400 whitespace-nowrap shrink-0">
            Insignias {unlockedSectors.length}/4 · {coins.toLocaleString('es-MX')} monedas
          </span>
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Controles
          </button>
          <button
            type="button"
            onClick={() => setShowDemoQuiz(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Preguntas demo
          </button>
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              musicEnabled && !muted
                ? 'text-emerald-300 hover:text-emerald-200'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label={musicEnabled ? 'Pausar música' : 'Activar música'}
          >
            <Music className="w-4 h-4" />
            <span className="hidden md:inline">
              {musicEnabled ? 'Música' : 'Sin música'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleToggleMute}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline">{muted ? 'Silencio' : 'Sonido'}</span>
          </button>
        </nav>

        {/* Zona 3: Acción primaria visible para reiniciar partida */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={handleRestart}
            className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-xs font-display font-bold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Reiniciar partida
          </button>
        </div>
      </header>

      {/* Escena activa */}
      <main className="flex-1 flex flex-col">
        {screen === 'TITLE' && (
          <TitleScreen onStart={() => setScreen('CHARACTER_SELECT')} />
        )}

        {screen === 'CHARACTER_SELECT' && (
          <CharacterSelectScreen
            initialCharacter={character}
            onSelect={(chosen) => {
              setCharacter(chosen);
              setScreen('NARRATOR_INTRO');
            }}
          />
        )}

        {screen === 'NARRATOR_INTRO' && (
          <NarratorIntroScreen
            onNext={() => setScreen('GREENHOUSE_ANIMATION')}
          />
        )}

        {screen === 'GREENHOUSE_ANIMATION' && (
          <GreenhouseAnimationScreen
            onComplete={() => setScreen('VILLAGE_MAP')}
          />
        )}

        {screen === 'VILLAGE_MAP' && (
          <VillageMapScreen
            character={character}
            coins={coins}
            unlockedSectors={unlockedSectors}
            hasSeenTutorial={hasSeenTutorial}
            onFinishTutorial={() => setHasSeenTutorial(true)}
            onStartMinigame={(id) =>
              setScreen(
                id === 'platformer' ? 'MINIGAME_PLATFORMER' : 'MINIGAME_SHOOTER'
              )
            }
            onGoToInvest={() => setScreen('INVEST_SECTOR')}
          />
        )}

        {screen === 'MINIGAME_SHOOTER' && (
          <ShooterMinigame
            character={character}
            existingCoins={coins}
            onComplete={handleMinigameComplete}
            onExitToMap={() => setScreen('VILLAGE_MAP')}
          />
        )}

        {screen === 'MINIGAME_PLATFORMER' && (
          <PlatformerMinigame
            character={character}
            existingCoins={coins}
            onComplete={handleMinigameComplete}
            onExitToMap={() => setScreen('VILLAGE_MAP')}
          />
        )}

        {screen === 'REWARD_SUMMARY' && lastResult && (
          <RewardSummaryScreen
            result={lastResult}
            totalCoins={coins}
            badgesCount={unlockedSectors.length}
            onContinue={() => setScreen('INVEST_SECTOR')}
          />
        )}

        {screen === 'INVEST_SECTOR' && (
          <InvestSectorScreen
            coins={coins}
            unlockedSectors={unlockedSectors}
            onUnlockSector={handleUnlockSector}
            onContinueToMap={handleContinueFromInvest}
          />
        )}

        {screen === 'VICTORY_SUMMARY' && (
          <VictoryScreen
            unlockedSectors={unlockedSectors}
            totalCoins={coins}
            minigamesPlayed={minigamesPlayed}
            onRestart={handleRestart}
          />
        )}
      </main>

      {showHelp && <HelpControlsModal onClose={() => setShowHelp(false)} />}
      {showDemoQuiz && (
        <DemoQuizModal onClose={() => setShowDemoQuiz(false)} />
      )}
    </div>
  );
}
