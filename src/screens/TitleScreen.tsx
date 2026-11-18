import React from 'react';
import { RetoGlobalEmblem } from '../components/art/GameArtwork';
import { ArcadeButton } from '../components/ui/ArcadeButton';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-[#0E3F66] px-6 py-10 text-center overflow-hidden"
      aria-label="Pantalla de inicio"
    >
      <div className="max-w-3xl w-full flex flex-col items-center">
        <div className="animate-float-slow">
          <RetoGlobalEmblem className="w-72 h-64 md:w-96 md:h-80" />
        </div>

        <h1 className="sr-only">Reto Global</h1>

        <p className="mt-2 max-w-xl text-base md:text-lg text-sky-100 leading-relaxed">
          Explora las causas del calentamiento global, reduce las emisiones de
          efecto invernadero y restaura la Aldea Global.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-right">
            <p className="font-display text-lg md:text-xl font-bold tracking-wide text-white uppercase">
              Tu aventura empieza aquí
            </p>
            <p className="text-xs text-sky-200 mt-1">
              Selecciona «Iniciar juego» para comenzar
            </p>
          </div>
          <ArcadeButton label="INICIAR JUEGO" onClick={onStart} />
        </div>
      </div>
    </section>
  );
};
