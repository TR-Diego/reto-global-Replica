import React, { useEffect, useRef, useState } from 'react';
import { CapsuleOverlay } from '../components/ui/CapsuleOverlay';
import { CAPSULES } from '../data/educationalContent';
import { CharacterId, MinigameResult } from '../types/game';
import { soundFX } from '../utils/sound';

interface ShooterMinigameProps {
  character: CharacterId;
  existingCoins: number;
  onComplete: (result: MinigameResult) => void;
  onExitToMap: () => void;
}

interface CloudEnemy {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  bobOffset: number;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  life: number;
}

const ROUND_SECONDS = 35;
const COMPLETION_BONUS = 10000;

export const ShooterMinigame: React.FC<ShooterMinigameProps> = ({
  character,
  existingCoins,
  onComplete,
  onExitToMap,
}) => {
  const [phase, setPhase] = useState<'INTRO' | 'PLAYING' | 'OUTRO'>('INTRO');
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [defeatedCount, setDefeatedCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keysRef = useRef<{ left: boolean; right: boolean; shoot: boolean }>({
    left: false,
    right: false,
    shoot: false,
  });
  const pointerTargetXRef = useRef<number | null>(null);

  const statsRef = useRef({ coins: 0, defeated: 0 });

  useEffect(() => {
    if (phase !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    let playerX = W / 2;
    const playerY = H - 64;
    let facing: 1 | -1 = 1;
    let shootCooldown = 0;
    let spawnTimer = 0.2;
    let nextCloudId = 1;
    let remainingTime = ROUND_SECONDS;
    let lastTimestamp = performance.now();
    let animId = 0;
    let ended = false;

    const clouds: CloudEnemy[] = [];
    const bullets: Bullet[] = [];
    const particles: Particle[] = [];
    const popups: FloatingText[] = [];

    const spawnCloud = () => {
      const fromTop = Math.random() < 0.7;
      const x = fromTop ? 80 + Math.random() * (W - 160) : Math.random() < 0.5 ? 40 : W - 40;
      const y = fromTop ? -30 : 70 + Math.random() * 190;
      const vx = (Math.random() < 0.5 ? -1 : 1) * (55 + Math.random() * 75);
      const vy = fromTop ? 26 + Math.random() * 34 : 12 + Math.random() * 20;
      clouds.push({
        id: nextCloudId++,
        x,
        y,
        vx,
        vy,
        radius: 30,
        bobOffset: Math.random() * Math.PI * 2,
      });
    };

    // Oleada inicial
    for (let i = 0; i < 4; i++) spawnCloud();

    const fireBolt = () => {
      if (shootCooldown > 0) return;
      bullets.push({ x: playerX, y: playerY - 30, vy: -520 });
      shootCooldown = 0.22;
      soundFX.playShoot();
    };

    const drawBackground = () => {
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#5B4B49');
      sky.addColorStop(0.55, '#E7C8A9');
      sky.addColorStop(1, '#9A5B32');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Siluetas de montañas y edificios contaminados
      ctx.fillStyle = '#334155';
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(0, H - 50);
      ctx.lineTo(140, 170);
      ctx.lineTo(290, 290);
      ctx.lineTo(480, 135);
      ctx.lineTo(660, 270);
      ctx.lineTo(830, 150);
      ctx.lineTo(W, 250);
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // Torres urbanas
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(210, 260, 58, 230);
      ctx.fillRect(280, 310, 44, 180);
      ctx.fillRect(670, 250, 62, 240);
      ctx.fillRect(745, 295, 48, 195);
      ctx.globalAlpha = 1;

      // Acantilado izquierdo
      ctx.fillStyle = '#C27D49';
      ctx.beginPath();
      ctx.moveTo(0, 330);
      ctx.lineTo(155, 365);
      ctx.lineTo(125, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();

      // Suelo
      ctx.fillStyle = '#92400E';
      ctx.fillRect(0, H - 46, W, 46);
      ctx.fillStyle = '#D97706';
      ctx.fillRect(0, H - 46, W, 8);
    };

    const drawPlayer = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      // Sombra
      ctx.fillStyle = 'rgba(15,23,42,0.35)';
      ctx.beginPath();
      ctx.ellipse(0, 20, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Piernas
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(-10, 10, 8, 8);
      ctx.fillRect(2, 10, 8, 8);
      // Short
      ctx.fillStyle = '#F472B6';
      ctx.fillRect(-12, 1, 24, 10);
      // Playera verde
      ctx.fillStyle = '#A3E635';
      ctx.fillRect(-14, -18, 28, 20);
      // Emisor poder verde apuntando arriba
      ctx.fillStyle = '#16A34A';
      ctx.fillRect(-5, -34, 10, 18);
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.arc(0, -35, 6, 0, Math.PI * 2);
      ctx.fill();

      // Cabeza
      ctx.fillStyle = '#F7D0B5';
      ctx.fillRect(-14, -44, 28, 24);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2;
      ctx.strokeRect(-14, -44, 28, 24);

      // Cabello según personaje
      ctx.fillStyle = character === 'girl' ? '#B45309' : '#78350F';
      ctx.fillRect(-15, -48, 30, 10);
      if (character === 'girl') {
        ctx.fillRect(-20 * facing, -44, 7, 15);
      }

      // Ojos
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(-7, -34, 4, 5);
      ctx.fillRect(3, -34, 4, 5);
      ctx.restore();
    };

    const drawCloud = (c: CloudEnemy, timeSec: number) => {
      const bobY = Math.sin(timeSec * 4 + c.bobOffset) * 5;
      ctx.save();
      ctx.translate(c.x, c.y + bobY);

      ctx.fillStyle = '#B4834D';
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.arc(-16, 4, 16, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(-6, -10, 18, Math.PI * 0.9, Math.PI * 1.9);
      ctx.arc(14, -8, 17, Math.PI * 1.1, Math.PI * 0.1);
      ctx.arc(18, 6, 14, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Ceño enojado CO2
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-14, -4);
      ctx.lineTo(-4, 0);
      ctx.moveTo(14, -4);
      ctx.lineTo(4, 0);
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(-8, 3, 2.5, 0, Math.PI * 2);
      ctx.arc(8, 3, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 12, 6, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Etiqueta sutil CO2
      ctx.fillStyle = '#451A03';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CO2', 0, -14);
      ctx.restore();
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTimestamp) / 1000);
      lastTimestamp = now;

      remainingTime = Math.max(0, remainingTime - dt);
      setTimeLeft(Math.ceil(remainingTime));

      // Movimiento horizontal
      const speed = 380;
      if (keysRef.current.left) {
        playerX -= speed * dt;
        facing = -1;
      }
      if (keysRef.current.right) {
        playerX += speed * dt;
        facing = 1;
      }
      if (pointerTargetXRef.current !== null) {
        const diff = pointerTargetXRef.current - playerX;
        if (Math.abs(diff) > 6) {
          playerX += Math.sign(diff) * Math.min(Math.abs(diff), speed * dt);
          facing = diff > 0 ? 1 : -1;
        }
      }
      playerX = Math.max(48, Math.min(W - 48, playerX));

      if (shootCooldown > 0) shootCooldown -= dt;
      if (keysRef.current.shoot) fireBolt();

      // Spawning
      spawnTimer -= dt;
      if (spawnTimer <= 0 && clouds.length < 8) {
        spawnCloud();
        spawnTimer = 0.72;
      }

      // Actualizar balas
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y += bullets[i].vy * dt;
        if (bullets[i].y < -20) {
          bullets.splice(i, 1);
        }
      }

      // Actualizar nubes y colisiones
      for (let i = clouds.length - 1; i >= 0; i--) {
        const c = clouds[i];
        c.x += c.vx * dt;
        c.y += c.vy * dt;

        if (c.x < 45 || c.x > W - 45) {
          c.vx *= -1;
          c.x = Math.max(45, Math.min(W - 45, c.x));
        }
        if (c.y > H - 140) {
          c.vy = -Math.abs(c.vy);
        } else if (c.y < 55 && c.vy < 0) {
          c.vy = Math.abs(c.vy);
        }

        // Verificar impacto con proyectiles
        let hit = false;
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          const dx = b.x - c.x;
          const dy = b.y - c.y;
          if (dx * dx + dy * dy < (c.radius + 10) * (c.radius + 10)) {
            bullets.splice(j, 1);
            hit = true;
            break;
          }
        }

        if (hit) {
          soundFX.playEnemyDefeat();
          for (let p = 0; p < 14; p++) {
            const angle = (Math.PI * 2 * p) / 14;
            const spd = 80 + Math.random() * 140;
            particles.push({
              x: c.x,
              y: c.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              life: 0.45,
              color: p % 2 === 0 ? '#4ADE80' : '#BEF264',
            });
          }
          popups.push({ x: c.x, y: c.y, text: '+100', life: 0.7 });
          clouds.splice(i, 1);
          statsRef.current.coins += 100;
          statsRef.current.defeated += 1;
          setEarnedCoins(statsRef.current.coins);
          setDefeatedCount(statsRef.current.defeated);
        }
      }

      // Partículas y popups
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx * dt;
        particles[i].y += particles[i].vy * dt;
        particles[i].life -= dt;
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
      for (let i = popups.length - 1; i >= 0; i--) {
        popups[i].y -= 36 * dt;
        popups[i].life -= dt;
        if (popups[i].life <= 0) popups.splice(i, 1);
      }

      // Dibujo
      drawBackground();

      const timeSec = now / 1000;
      clouds.forEach((c) => drawCloud(c, timeSec));

      // Balas verdes
      bullets.forEach((b) => {
        ctx.save();
        ctx.fillStyle = '#22C55E';
        ctx.strokeStyle = '#DCFCE7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(b.x - 5, b.y - 12, 10, 22, 5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      drawPlayer(playerX, playerY);

      particles.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.life * 2);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      popups.forEach((pop) => {
        ctx.globalAlpha = Math.max(0, pop.life * 1.4);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
      });
      ctx.globalAlpha = 1;

      if (remainingTime <= 0 && !ended) {
        ended = true;
        soundFX.playUnlock();
        setPhase('OUTRO');
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
        pointerTargetXRef.current = null;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
        pointerTargetXRef.current = null;
      }
      if (
        e.key === ' ' ||
        e.key === 'ArrowUp' ||
        e.key === 'w' ||
        e.key === 'W' ||
        e.key === 'z' ||
        e.key === 'Z'
      ) {
        e.preventDefault();
        keysRef.current.shoot = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (
        e.key === ' ' ||
        e.key === 'ArrowUp' ||
        e.key === 'w' ||
        e.key === 'W' ||
        e.key === 'z' ||
        e.key === 'Z'
      ) {
        keysRef.current.shoot = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [phase, character]);

  const handleCanvasPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    pointerTargetXRef.current = x;
    keysRef.current.shoot = true;
  };

  const stopPointerShoot = () => {
    keysRef.current.shoot = false;
  };

  const totalEarnedWithBonus = earnedCoins + COMPLETION_BONUS;

  return (
    <section
      className="min-h-[calc(100vh-56px)] bg-slate-950 px-4 py-5 flex flex-col items-center justify-center"
      aria-label="Minijuego Elimina los gases de efecto invernadero"
    >
      {phase === 'INTRO' && (
        <CapsuleOverlay
          capsule={CAPSULES.shooter_intro}
          onContinue={() => setPhase('PLAYING')}
        />
      )}

      {phase === 'OUTRO' && (
        <CapsuleOverlay
          capsule={CAPSULES.shooter_outro}
          onContinue={() =>
            onComplete({
              minigameId: 'shooter',
              monedasGanadas: totalEarnedWithBonus,
              enemigosDerrotados: defeatedCount,
            })
          }
        />
      )}

      <div className="w-full max-w-5xl">
        {/* Barra superior del minijuego */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="font-display text-lg md:text-xl font-bold text-white">
              Elimina los gases de efecto invernadero
            </h2>
            <p className="text-xs text-slate-400">
              Mueve con ← / → (o A / D) y dispara Poder Verde con Espacio, ↑ o clic.
            </p>
          </div>
          <button
            type="button"
            onClick={onExitToMap}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
          >
            Volver al mapa
          </button>
        </div>

        {/* Contenedor del lienzo + HUD integrado */}
        <div className="relative rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900">
          {/* Cronómetro amarillo arriba al centro */}
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-amber-400 border-4 border-white shadow-lg">
            <span className="font-mono-num text-2xl font-extrabold text-slate-900">
              {timeLeft}
            </span>
          </div>

          {/* Contador de nubes eliminadas arriba a la izquierda */}
          <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-xl bg-slate-950/80 px-3 py-1.5 border border-slate-700 text-xs font-mono-num text-emerald-300 font-bold">
            CO2 eliminados: {defeatedCount}
          </div>

          {/* Monedas abajo a la derecha */}
          <div className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full bg-slate-950/90 px-4 py-1.5 border-2 border-amber-400/70">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-mono-num font-extrabold text-xs">
              P
            </span>
            <span className="font-mono-num text-lg font-bold text-white">
              {String(existingCoins + earnedCoins).padStart(6, '0')}
            </span>
          </div>

          <canvas
            ref={canvasRef}
            width={960}
            height={540}
            onPointerDown={handleCanvasPointer}
            onPointerMove={(e) => {
              if (e.buttons > 0) handleCanvasPointer(e);
            }}
            onPointerUp={stopPointerShoot}
            onPointerLeave={stopPointerShoot}
            className="w-full h-auto block cursor-crosshair touch-none"
          />
        </div>

        {/* Controles táctiles / ratón opcionales debajo del canvas */}
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onPointerDown={() => {
                keysRef.current.left = true;
              }}
              onPointerUp={() => {
                keysRef.current.left = false;
              }}
              onPointerLeave={() => {
                keysRef.current.left = false;
              }}
              className="w-14 h-11 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-bold border border-slate-600 cursor-pointer select-none"
              aria-label="Mover a la izquierda"
            >
              ◀
            </button>
            <button
              type="button"
              onPointerDown={() => {
                keysRef.current.right = true;
              }}
              onPointerUp={() => {
                keysRef.current.right = false;
              }}
              onPointerLeave={() => {
                keysRef.current.right = false;
              }}
              className="w-14 h-11 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-bold border border-slate-600 cursor-pointer select-none"
              aria-label="Mover a la derecha"
            >
              ▶
            </button>
          </div>

          <button
            type="button"
            onPointerDown={() => {
              keysRef.current.shoot = true;
            }}
            onPointerUp={() => {
              keysRef.current.shoot = false;
            }}
            onPointerLeave={() => {
              keysRef.current.shoot = false;
            }}
            className="px-6 h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-display font-bold text-sm uppercase tracking-wide border-b-4 border-emerald-900 cursor-pointer select-none"
          >
            Disparar Poder Verde
          </button>
        </div>
      </div>
    </section>
  );
};
