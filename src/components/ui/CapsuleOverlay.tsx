import React, { useEffect } from 'react';
import { InformativeCapsule } from '../../types/game';
import { ArcadeButton } from './ArcadeButton';

interface CapsuleOverlayProps {
  capsule: InformativeCapsule;
  onContinue: () => void;
  buttonLabel?: string;
}

/**
 * Cápsula informativa educativa con el patrón descrito en el artículo:
 * 1) Información -> 2) Consecuencia -> 3) Llamado a la acción.
 */
export const CapsuleOverlay: React.FC<CapsuleOverlayProps> = ({
  capsule,
  onContinue,
  buttonLabel = 'CONTINUAR',
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onContinue]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="capsule-title"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border-2 border-slate-700 p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-3">
          <h2
            id="capsule-title"
            className="font-display text-xl md:text-2xl font-bold text-white"
          >
            {capsule.titulo}
          </h2>
          <span className="text-xs font-medium text-emerald-400">
            Cápsula informativa
          </span>
        </div>

        <div className="space-y-4 text-left">
          <div className="rounded-xl bg-slate-800/70 p-4 border border-slate-700/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300 mb-1">
              Información
            </p>
            <p className="text-slate-100 text-base leading-relaxed">
              {capsule.informacion}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/70 p-4 border border-slate-700/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
              Consecuencia
            </p>
            <p className="text-slate-100 text-base leading-relaxed">
              {capsule.consecuencia}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-950/60 p-4 border border-emerald-700/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
              Acción posible
            </p>
            <p className="text-emerald-50 text-base font-medium leading-relaxed">
              {capsule.accion}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Presiona Enter, Espacio o pulsa Continuar
          </p>
          <ArcadeButton label={buttonLabel} onClick={onContinue} />
        </div>
      </div>
    </div>
  );
};
