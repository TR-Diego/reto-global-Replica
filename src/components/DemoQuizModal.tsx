import React, { useState } from 'react';
import { DEMO_CLASSROOM_QUESTIONS } from '../data/educationalContent';

interface DemoQuizModalProps {
  onClose: () => void;
}

/**
 * Actividad opcional de demostración para aula/exposición.
 * No recopila datos personales ni sustituye el instrumento validado del estudio.
 */
export const DemoQuizModal: React.FC<DemoQuizModalProps> = ({ onClose }) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const correctCount = DEMO_CLASSROOM_QUESTIONS.filter(
    (q) => answers[q.id] === q.esVerdadera
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-quiz-title"
    >
      <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2
              id="demo-quiz-title"
              className="font-display text-xl font-bold text-white"
            >
              Preguntas educativas de demostración
            </h2>
            <p className="text-xs text-amber-300 mt-1">
              Aviso: Son preguntas de demostración inspiradas en los temas del artículo para mostrar el flujo en clase; no corresponden al cuestionario validado del estudio y no guardan datos personales.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer shrink-0"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {DEMO_CLASSROOM_QUESTIONS.map((q) => {
            const chosen = answers[q.id];
            const isAnswered = chosen !== undefined && chosen !== null;
            const isCorrect = isAnswered && chosen === q.esVerdadera;

            return (
              <div
                key={q.id}
                className="rounded-xl bg-slate-800/60 border border-slate-700 p-4"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
                  <span>Dimensión: {q.dimension}</span>
                  <span>Pregunta {q.id} de {DEMO_CLASSROOM_QUESTIONS.length}</span>
                </div>
                <p className="text-sm md:text-base text-slate-100 font-medium leading-relaxed">
                  {q.afirmacion}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: true }))}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                      chosen === true
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    Verdadero
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: false }))}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                      chosen === false
                        ? 'bg-rose-600 border-rose-400 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    Falso
                  </button>
                </div>

                {isAnswered && (
                  <p
                    className={`mt-3 text-xs leading-relaxed rounded-lg px-3 py-2 ${
                      isCorrect
                        ? 'bg-emerald-950/70 text-emerald-200 border border-emerald-700/50'
                        : 'bg-rose-950/70 text-rose-200 border border-rose-700/50'
                    }`}
                  >
                    {q.explicacion}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
          <span className="font-mono-num text-slate-300">
            Aciertos de demostración: {correctCount} / {answeredCount} respondidas
          </span>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="text-xs text-sky-300 hover:text-sky-200 underline cursor-pointer"
          >
            Limpiar respuestas
          </button>
        </div>
      </div>
    </div>
  );
};
