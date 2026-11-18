import React from 'react';

interface HelpControlsModalProps {
  onClose: () => void;
}

export const HelpControlsModal: React.FC<HelpControlsModalProps> = ({
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-title"
    >
      <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <h2 id="help-title" className="font-display text-xl font-bold text-white">
            Controles y supuestos del prototipo
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 space-y-5 text-sm text-slate-200">
          <div>
            <h3 className="font-display font-bold text-emerald-300 mb-1.5">
              Controles de teclado, ratón y táctil
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>
                <strong>Menús, diálogos y cápsulas:</strong> Clic en el botón rojo{' '}
                <em>CONTINUAR</em> o teclas <kbd className="px-1.5 py-0.5 rounded bg-slate-800">Enter</kbd> /{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">Espacio</kbd>.
              </li>
              <li>
                <strong>Elimina los gases de efecto invernadero (Shooter):</strong>{' '}
                Mover con <kbd className="px-1.5 py-0.5 rounded bg-slate-800">←</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">→</kbd> o{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">A</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">D</kbd>; disparar arriba con{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">Espacio</kbd>,{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">↑</kbd> o haciendo clic/toque en el lienzo.
              </li>
              <li>
                <strong>Vence a los enemigos de la atmósfera (Plataformas):</strong>{' '}
                Mover con <kbd className="px-1.5 py-0.5 rounded bg-slate-800">←</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">→</kbd> /{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">A</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">D</kbd>; saltar con{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">↑</kbd> /{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">W</kbd>; disparar Poder Verde con{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800">Espacio</kbd> o clic/toque.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-amber-300 mb-1.5">
              Supuestos aplicados respecto a las fuentes
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>
                El documento adicional aparte no se recibió como archivo separado; el flujo y textos provienen del artículo científico (Barcena-Vazquez et al., 2023) y los dos videos prototipo.
              </li>
              <li>
                El costo de cada mejora ambiental se fijó en 10,000 monedas según el descuento observado en el video de alta fidelidad, añadiendo un bono de +10,000 al completar cada minijuego para garantizar progreso fluido.
              </li>
              <li>
                Los textos de recomendación de «Automóvil eléctrico» y «Fuentes de energía limpia» no se abren en el video; se redactaron siguiendo el mismo patrón educativo del juego.
              </li>
              <li>
                Las teclas exactas del kiosco arcade original no se detallan en el artículo, por lo que se mapearon controles estándar de PC y botones táctiles/ratón equivalentes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
