import React from 'react';
import { soundFX } from '../../utils/sound';

interface ArcadeButtonProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'arcade' | 'emerald' | 'slate';
  className?: string;
}

/**
 * Botón rojo tipo arcade inspirado en el botón físico del kiosco
 * visto en el prototipo de alta fidelidad de Reto Global.
 */
export const ArcadeButton: React.FC<ArcadeButtonProps> = ({
  label = 'CONTINUAR',
  onClick,
  disabled = false,
  variant = 'arcade',
  className = '',
}) => {
  const handlePress = () => {
    if (disabled) return;
    soundFX.playClick();
    onClick();
  };

  if (variant === 'arcade') {
    return (
      <button
        type="button"
        onClick={handlePress}
        disabled={disabled}
        className={`group inline-flex flex-col items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-slate-900 shadow-lg border-2 border-slate-300 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      >
        <span className="relative flex items-center justify-center w-14 h-7 mb-1.5">
          <span className="absolute bottom-0 w-14 h-3 rounded-full bg-slate-400 border border-slate-500" />
          <span className="relative -translate-y-1 w-11 h-5 rounded-full bg-gradient-to-b from-rose-400 via-red-600 to-red-700 border border-red-900 shadow-inner transition-transform duration-100 group-active:translate-y-0" />
        </span>
        <span className="font-display text-xs font-extrabold tracking-wider uppercase whitespace-nowrap">
          {label}
        </span>
      </button>
    );
  }

  const colors =
    variant === 'emerald'
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-800'
      : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-950';

  return (
    <button
      type="button"
      onClick={handlePress}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-display font-bold text-sm tracking-wide border-b-4 transition-all duration-150 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${colors} ${className}`}
    >
      {label}
    </button>
  );
};
