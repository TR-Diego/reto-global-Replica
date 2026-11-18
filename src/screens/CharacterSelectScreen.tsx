import React, { useEffect, useState } from 'react';
import { CharacterSprite } from '../components/art/GameArtwork';
import { ArcadeButton } from '../components/ui/ArcadeButton';
import { CharacterId } from '../types/game';
import { soundFX } from '../utils/sound';

interface CharacterSelectScreenProps {
  initialCharacter: CharacterId;
  onSelect: (character: CharacterId) => void;
}

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  initialCharacter,
  onSelect,
}) => {
  const [selected, setSelected] = useState<CharacterId>(initialCharacter);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setSelected('girl');
        soundFX.playClick();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setSelected('boy');
        soundFX.playClick();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.playClick();
        onSelect(selected);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected, onSelect]);

  const choose = (char: CharacterId) => {
    setSelected(char);
    soundFX.playClick();
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-[#9E3D35] px-6 py-10 overflow-hidden"
      aria-label="Selección de personaje"
    >
      {/* Siluetas decorativas de fábricas en el fondo, como en el prototipo de alta fidelidad */}
      <svg
        viewBox="0 0 1200 320"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-64 opacity-25"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 320 V170 H70 L95 90 H135 L160 170 H210 L235 90 H275 L300 170 H420 V130 H520 V190 H780 V120 H880 V200 H960 V95 H1080 V320 Z"
          fill="#450A0A"
        />
      </svg>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        <div className="w-full rounded-2xl bg-[#E8C7BE]/95 border-4 border-white shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 gap-6 items-center">
            {(
              [
                { id: 'girl', label: 'Exploradora' },
                { id: 'boy', label: 'Explorador' },
              ] as const
            ).map((option) => {
              const active = selected === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => choose(option.id)}
                  className={`flex flex-col items-center justify-center rounded-xl p-4 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                    active
                      ? 'bg-white/90 ring-4 ring-sky-500 scale-105 shadow-md'
                      : 'bg-white/40 hover:bg-white/70 opacity-80'
                  }`}
                  aria-pressed={active}
                >
                  <CharacterSprite character={option.id} className="w-28 h-32 md:w-32 md:h-36" />
                  <span className="mt-2 font-display font-bold text-slate-900 text-base">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Indicador triangular inferior como en la referencia */}
          <div className="grid grid-cols-2 mt-4">
            <div className="flex justify-center">
              <div
                className={`w-0 h-0 border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent transition-opacity ${
                  selected === 'girl' ? 'border-b-cyan-500 opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            <div className="flex justify-center">
              <div
                className={`w-0 h-0 border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent transition-opacity ${
                  selected === 'boy' ? 'border-b-cyan-500 opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="rounded-xl bg-slate-950 px-6 py-3 text-white font-display font-bold tracking-wider uppercase text-base md:text-lg shadow-lg">
            Selecciona tu personaje
          </div>
          <ArcadeButton label="CONTINUAR" onClick={() => onSelect(selected)} />
        </div>
        <p className="mt-3 text-xs text-rose-100/90">
          Usa las flechas ← / → o haz clic en un personaje y pulsa Continuar.
        </p>
      </div>
    </section>
  );
};
