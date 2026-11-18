import React, { useEffect, useRef, useState } from 'react';
import { CapsuleOverlay } from '../components/ui/CapsuleOverlay';
import { CAPSULES } from '../data/educationalContent';
import { CharacterId, MinigameResult } from '../types/game';
import { soundFX } from '../utils/sound';

interface PlatformerMinigameProps {
  character: CharacterId;
  existingCoins: number;
  onComplete: (result: MinigameResult) => void;
  onExitToMap: () => void;
}

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface CoinItem {
  x: number;
  y: number;
  collected: boolean;
}

interface HeartItem {
  x: number;
  y: number;
  collected: boolean;
}

interface TrashEnemy {
  id: number;
  x: number;
  y: number;
  minX: number;
  maxX: number;
  vx: number;
  hp: number;
  extinguished: boolean;
}

interface Bolt {
  x: number;
  y: number;
  vx: number;
}

interface SmogCloud {
  x: number;
  y: number;
  vx: number;
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

interface Popup {
  x: number;
  y: number;
  text: string;
  life: number;
}

const COMPLETION_BONUS = 10000;
const BOSS_MAX_HP = 10;

export const PlatformerMinigame: React.FC<PlatformerMinigameProps> = ({
  character,
  existingCoins,
  onComplete,
  onExitToMap,
}) => {
  const [phase, setPhase] = useState<
    'INTRO' | 'PLAYING' | 'MID_CAPSULE' | 'BOSS_CAPSULE' | 'VICTORY'
  >('INTRO');
  const [hearts, setHearts] = useState(3);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [trashDefeated, setTrashDefeated] = useState(0);
  const [bossActive, setBossActive] = useState(false);
  const [bossHp, setBossHp] = useState(BOSS_MAX_HP);
  const [hitNotice, setHitNotice] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keysRef = useRef({
    left: false,
    right: false,
    jump: false,
    shoot: false,
  });

  // Estado persistente del nivel entre pausas de cápsulas
  const worldRef = useRef<{
    initialized: boolean;
    px: number;
    py: number;
    vx: number;
    vy: number;
    facing: 1 | -1;
    onGround: boolean;
    invuln: number;
    shootCooldown: number;
    hearts: number;
    coins: number;
    trashCount: number;
    midShown: boolean;
    bossShown: boolean;
    bossDefeated: boolean;
    bossHp: number;
    bossSprayTimer: number;
    platforms: Platform[];
    coinItems: CoinItem[];
    heartItems: HeartItem[];
    enemies: TrashEnemy[];
    bolts: Bolt[];
    smogClouds: SmogCloud[];
    particles: Particle[];
    popups: Popup[];
  }>({
    initialized: false,
    px: 90,
    py: 360,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: false,
    invuln: 0,
    shootCooldown: 0,
    hearts: 3,
    coins: 0,
    trashCount: 0,
    midShown: false,
    bossShown: false,
    bossDefeated: false,
    bossHp: BOSS_MAX_HP,
    bossSprayTimer: 1.5,
    platforms: [],
    coinItems: [],
    heartItems: [],
    enemies: [],
    bolts: [],
    smogClouds: [],
    particles: [],
    popups: [],
  });

  // Inicializar escenario una sola vez al montar
  if (!worldRef.current.initialized) {
    worldRef.current.initialized = true;
    worldRef.current.platforms = [
      // Suelo principal por secciones
      { x: 0, y: 440, w: 680, h: 100 },
      { x: 750, y: 440, w: 460, h: 100 },
      { x: 1290, y: 440, w: 580, h: 100 },
      { x: 1960, y: 440, w: 520, h: 100 },
      // Arena final del jefe Smogger
      { x: 2560, y: 440, w: 880, h: 100 },
      // Plataformas elevadas
      { x: 320, y: 335, w: 220, h: 30 },
      { x: 610, y: 270, w: 190, h: 30 },
      { x: 890, y: 320, w: 230, h: 30 },
      { x: 1180, y: 250, w: 210, h: 30 },
      { x: 1480, y: 315, w: 240, h: 30 },
      { x: 1790, y: 250, w: 210, h: 30 },
      { x: 2080, y: 320, w: 250, h: 30 },
      { x: 2720, y: 335, w: 180, h: 28 },
    ];

    worldRef.current.coinItems = [
      { x: 220, y: 400, collected: false },
      { x: 270, y: 400, collected: false },
      { x: 390, y: 295, collected: false },
      { x: 450, y: 295, collected: false },
      { x: 690, y: 230, collected: false },
      { x: 960, y: 280, collected: false },
      { x: 1020, y: 280, collected: false },
      { x: 1270, y: 210, collected: false },
      { x: 1580, y: 275, collected: false },
      { x: 1870, y: 210, collected: false },
      { x: 2180, y: 280, collected: false },
      { x: 2240, y: 280, collected: false },
      { x: 2780, y: 295, collected: false },
      { x: 2840, y: 295, collected: false },
    ];

    worldRef.current.heartItems = [
      { x: 1320, y: 210, collected: false },
      { x: 2430, y: 400, collected: false },
    ];

    // 5 botes de basura en llamas distribuidos en el recorrido
    worldRef.current.enemies = [
      { id: 1, x: 430, y: 335, minX: 345, maxX: 505, vx: 55, hp: 2, extinguished: false },
      { id: 2, x: 980, y: 440, minX: 800, maxX: 1140, vx: -65, hp: 2, extinguished: false },
      { id: 3, x: 1590, y: 315, minX: 1505, maxX: 1690, vx: 60, hp: 2, extinguished: false },
      { id: 4, x: 2190, y: 440, minX: 2010, maxX: 2390, vx: -75, hp: 2, extinguished: false },
      { id: 5, x: 2200, y: 320, minX: 2105, maxX: 2295, vx: 65, hp: 2, extinguished: false },
    ];
  }

  useEffect(() => {
    if (phase !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const LEVEL_W = 3440;
    const BOSS_X = 3230;
    const BOSS_Y = 440;

    let lastTime = performance.now();
    let animId = 0;

    const spawnParticles = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count;
        const s = 70 + Math.random() * 140;
        worldRef.current.particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 0.45,
          color,
        });
      }
    };

    const damagePlayer = () => {
      const w = worldRef.current;
      if (w.invuln > 0) return;
      w.hearts -= 1;
      w.invuln = 1.4;
      soundFX.playHit();
      setHitNotice(true);
      setTimeout(() => setHitNotice(false), 300);

      if (w.hearts <= 0) {
        // Reaparece con 3 corazones en el último punto seguro sin frustración
        w.hearts = 3;
        w.px = w.bossShown ? 2640 : Math.max(90, w.px - 200);
        w.py = 320;
        w.vx = 0;
        w.vy = 0;
        w.smogClouds = [];
      }
      setHearts(w.hearts);
    };

    const drawBackground = (camX: number) => {
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#FDBA74');
      sky.addColorStop(0.65, '#FDE68A');
      sky.addColorStop(1, '#F59E0B');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Montañas paralaje
      ctx.fillStyle = '#D99B72';
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = -200; x <= W + 250; x += 220) {
        const worldOff = x - (camX * 0.25) % 220;
        ctx.lineTo(worldOff, 360);
        ctx.lineTo(worldOff + 110, 210);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // Colinas medias y árboles secos/otoñales
      ctx.fillStyle = '#EAB308';
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = -200; x <= W + 300; x += 260) {
        const off = x - (camX * 0.45) % 260;
        ctx.quadraticCurveTo(off + 130, 290, off + 260, 410);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // Árboles decorativos
      for (let tx = 140; tx < LEVEL_W; tx += 360) {
        const sx = tx - camX * 0.6;
        if (sx < -60 || sx > W + 60) continue;
        ctx.fillStyle = '#92400E';
        ctx.fillRect(sx - 5, 360, 10, 90);
        ctx.fillStyle = '#EA580C';
        ctx.beginPath();
        ctx.ellipse(sx, 345, 22, 34, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawPlatform = (p: Platform, camX: number) => {
      const sx = p.x - camX;
      if (sx + p.w < -20 || sx > W + 20) return;

      ctx.fillStyle = '#DC2626';
      ctx.fillRect(sx, p.y, p.w, p.h);
      ctx.fillStyle = '#F87171';
      ctx.fillRect(sx, p.y, p.w, 8);
      ctx.strokeStyle = '#7F1D1D';
      ctx.lineWidth = 2;
      ctx.strokeRect(sx, p.y, p.w, p.h);

      // Textura de grietas/bloques
      ctx.strokeStyle = '#991B1B';
      for (let bx = sx + 32; bx < sx + p.w - 12; bx += 42) {
        ctx.beginPath();
        ctx.moveTo(bx, p.y + 8);
        ctx.lineTo(bx - 6, p.y + Math.min(26, p.h));
        ctx.stroke();
      }
    };

    const drawTrashEnemy = (e: TrashEnemy, camX: number, timeSec: number) => {
      const sx = e.x - camX;
      if (sx < -60 || sx > W + 60) return;
      ctx.save();
      ctx.translate(sx, e.y);

      // Fuego encima si aún no está apagado
      if (!e.extinguished) {
        const flicker = Math.sin(timeSec * 18 + e.id) * 4;
        ctx.fillStyle = '#EA580C';
        ctx.beginPath();
        ctx.moveTo(-16, -40);
        ctx.quadraticCurveTo(-8, -72 + flicker, 0, -56);
        ctx.quadraticCurveTo(8, -76 - flicker, 16, -40);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#FACC15';
        ctx.beginPath();
        ctx.moveTo(-9, -40);
        ctx.quadraticCurveTo(0, -60 - flicker, 9, -40);
        ctx.closePath();
        ctx.fill();
      }

      // Cuerpo del bote de basura
      ctx.fillStyle = e.extinguished ? '#64748B' : '#CBD5E1';
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2.5;
      ctx.fillRect(-17, -42, 34, 42);
      ctx.strokeRect(-17, -42, 34, 42);

      // Líneas verticales del bote
      ctx.beginPath();
      ctx.moveTo(-7, -36);
      ctx.lineTo(-7, -6);
      ctx.moveTo(7, -36);
      ctx.lineTo(7, -6);
      ctx.stroke();

      // Tapa caída al lado
      ctx.fillStyle = '#94A3B8';
      ctx.fillRect(-26, -6, 22, 6);
      ctx.strokeRect(-26, -6, 22, 6);

      // Ojitos si está activo
      if (!e.extinguished) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-10, -30, 8, 8);
        ctx.fillRect(2, -30, 8, 8);
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(-7, -27, 4, 4);
        ctx.fillRect(5, -27, 4, 4);
      }

      ctx.restore();
    };

    const drawSmogger = (camX: number, timeSec: number) => {
      const w = worldRef.current;
      if (w.bossDefeated) return;
      const sx = BOSS_X - camX;
      if (sx > W + 160) return;

      ctx.save();
      ctx.translate(sx, BOSS_Y + Math.sin(timeSec * 3) * 4);

      // Bote de aerosol gigante rojo "Smogger"
      ctx.fillStyle = '#DC2626';
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(-55, -155, 110, 155, 14);
      ctx.fill();
      ctx.stroke();

      // Base y cuello metálico
      ctx.fillStyle = '#94A3B8';
      ctx.fillRect(-52, -16, 104, 16);
      ctx.strokeRect(-52, -16, 104, 16);
      ctx.beginPath();
      ctx.moveTo(-50, -155);
      ctx.lineTo(-22, -182);
      ctx.lineTo(22, -182);
      ctx.lineTo(50, -155);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Boquilla superior
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(-13, -206, 26, 24);
      ctx.strokeRect(-13, -206, 26, 24);
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(-14, -198, 6, 8);

      // Brazos amenazantes
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-68, -75, 16, 0, Math.PI * 2);
      ctx.arc(68, -75, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ojos enojados y boca con dientes
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(-20, -108, 16, 18, 0, 0, Math.PI * 2);
      ctx.ellipse(20, -108, 16, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(-22, -106, 6, 0, Math.PI * 2);
      ctx.arc(18, -106, 6, 0, Math.PI * 2);
      ctx.fill();

      // Cejas
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-38, -128);
      ctx.lineTo(-6, -118);
      ctx.moveTo(38, -128);
      ctx.lineTo(6, -118);
      ctx.stroke();

      // Boca
      ctx.fillStyle = '#7F1D1D';
      ctx.beginPath();
      ctx.roundRect(-30, -76, 60, 32, 10);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-20, -75, 10, 10);
      ctx.fillRect(-4, -75, 10, 10);
      ctx.fillRect(12, -75, 10, 10);

      // Barra de vida arriba del jefe
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(-60, -236, 120, 14);
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(-58, -234, (116 * w.bossHp) / BOSS_MAX_HP, 10);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(-60, -236, 120, 14);

      ctx.restore();
    };

    const drawPlayer = (camX: number) => {
      const w = worldRef.current;
      if (w.invuln > 0 && Math.floor(w.invuln * 14) % 2 === 0) return;

      const sx = w.px - camX;
      const sy = w.py;
      ctx.save();
      ctx.translate(sx, sy);

      // Piernas
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(-10, -8, 8, 8);
      ctx.fillRect(2, -8, 8, 8);
      // Short
      ctx.fillStyle = '#F472B6';
      ctx.fillRect(-12, -18, 24, 10);
      // Playera verde
      ctx.fillStyle = '#A3E635';
      ctx.fillRect(-14, -36, 28, 19);
      // Brillo poder verde en mano
      ctx.fillStyle = '#22C55E';
      ctx.beginPath();
      ctx.arc(w.facing * 16, -26, 6, 0, Math.PI * 2);
      ctx.fill();

      // Cabeza
      ctx.fillStyle = '#F7D0B5';
      ctx.fillRect(-14, -62, 28, 25);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2;
      ctx.strokeRect(-14, -62, 28, 25);

      // Cabello
      ctx.fillStyle = character === 'girl' ? '#B45309' : '#78350F';
      ctx.fillRect(-15, -66, 30, 10);
      if (character === 'girl') {
        ctx.fillRect(-20 * w.facing, -60, 7, 15);
      }

      // Ojos
      ctx.fillStyle = '#0F172A';
      const eyeOff = w.facing * 3;
      ctx.fillRect(-7 + eyeOff, -52, 4, 5);
      ctx.fillRect(3 + eyeOff, -52, 4, 5);

      ctx.restore();
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const w = worldRef.current;
      const timeSec = now / 1000;

      if (w.invuln > 0) w.invuln -= dt;
      if (w.shootCooldown > 0) w.shootCooldown -= dt;

      // Movimiento jugador
      const moveSpeed = 290;
      if (keysRef.current.left) {
        w.vx = -moveSpeed;
        w.facing = -1;
      } else if (keysRef.current.right) {
        w.vx = moveSpeed;
        w.facing = 1;
      } else {
        w.vx = 0;
      }

      if (keysRef.current.jump && w.onGround) {
        w.vy = -590;
        w.onGround = false;
        soundFX.playJump();
      }

      if (keysRef.current.shoot && w.shootCooldown <= 0) {
        w.bolts.push({
          x: w.px + w.facing * 20,
          y: w.py - 26,
          vx: w.facing * 560,
        });
        w.shootCooldown = 0.24;
        soundFX.playShoot();
      }

      // Gravedad y colisiones con plataformas
      w.vy += 1350 * dt;
      w.px += w.vx * dt;
      w.px = Math.max(24, Math.min(LEVEL_W - 40, w.px));
      if (w.bossShown) {
        // Mantener dentro de la arena del jefe
        w.px = Math.max(2580, Math.min(BOSS_X - 72, w.px));
      }

      const prevY = w.py;
      w.py += w.vy * dt;
      w.onGround = false;

      for (const p of w.platforms) {
        const withinX = w.px + 13 > p.x && w.px - 13 < p.x + p.w;
        if (withinX && w.vy >= 0 && prevY <= p.y + 8 && w.py >= p.y) {
          w.py = p.y;
          w.vy = 0;
          w.onGround = true;
        }
      }

      // Caída al vacío
      if (w.py > H + 70) {
        damagePlayer();
        w.py = 300;
        w.vy = 0;
        w.px = Math.max(90, w.px - 120);
      }

      // Recolección de monedas
      for (const c of w.coinItems) {
        if (!c.collected) {
          const dx = w.px - c.x;
          const dy = w.py - 28 - c.y;
          if (dx * dx + dy * dy < 34 * 34) {
            c.collected = true;
            w.coins += 100;
            soundFX.playCoin();
            w.popups.push({ x: c.x, y: c.y - 10, text: '+100', life: 0.65 });
            setEarnedCoins(w.coins);
          }
        }
      }

      // Recolección de corazones
      for (const h of w.heartItems) {
        if (!h.collected) {
          const dx = w.px - h.x;
          const dy = w.py - 28 - h.y;
          if (dx * dx + dy * dy < 34 * 34) {
            h.collected = true;
            w.hearts = Math.min(3, w.hearts + 1);
            soundFX.playCoin();
            setHearts(w.hearts);
          }
        }
      }

      // Actualizar proyectiles Poder Verde
      for (let i = w.bolts.length - 1; i >= 0; i--) {
        const b = w.bolts[i];
        b.x += b.vx * dt;
        if (Math.abs(b.x - w.px) > W) {
          w.bolts.splice(i, 1);
          continue;
        }

        let boltUsed = false;

        // Impacto contra botes en llamas
        for (const e of w.enemies) {
          if (e.extinguished) continue;
          if (Math.abs(b.x - e.x) < 26 && Math.abs(b.y - (e.y - 24)) < 32) {
            e.hp -= 1;
            boltUsed = true;
            spawnParticles(e.x, e.y - 25, '#4ADE80', 8);
            if (e.hp <= 0) {
              e.extinguished = true;
              w.trashCount += 1;
              w.coins += 500;
              soundFX.playEnemyDefeat();
              w.popups.push({ x: e.x, y: e.y - 48, text: '+500', life: 0.75 });
              setTrashDefeated(w.trashCount);
              setEarnedCoins(w.coins);

              if (w.trashCount === 3 && !w.midShown) {
                w.midShown = true;
                setPhase('MID_CAPSULE');
                return;
              }
            }
            break;
          }
        }

        // Impacto contra nubes de smog del jefe
        if (!boltUsed) {
          for (let k = w.smogClouds.length - 1; k >= 0; k--) {
            const sc = w.smogClouds[k];
            const dx = b.x - sc.x;
            const dy = b.y - sc.y;
            if (dx * dx + dy * dy < 30 * 30) {
              w.smogClouds.splice(k, 1);
              w.coins += 100;
              setEarnedCoins(w.coins);
              soundFX.playEnemyDefeat();
              spawnParticles(sc.x, sc.y, '#4ADE80', 10);
              boltUsed = true;
              break;
            }
          }
        }

        // Impacto contra Smogger
        if (!boltUsed && w.bossShown && !w.bossDefeated) {
          if (Math.abs(b.x - BOSS_X) < 64 && b.y > BOSS_Y - 190 && b.y < BOSS_Y) {
            boltUsed = true;
            w.bossHp -= 1;
            setBossHp(w.bossHp);
            soundFX.playEnemyDefeat();
            spawnParticles(b.x, b.y, '#4ADE80', 10);
            if (w.bossHp <= 0) {
              w.bossDefeated = true;
              w.coins += 2000;
              setEarnedCoins(w.coins);
              soundFX.playUnlock();
              spawnParticles(BOSS_X, BOSS_Y - 90, '#22C55E', 28);
              setPhase('VICTORY');
              return;
            }
          }
        }

        if (boltUsed) {
          w.bolts.splice(i, 1);
        }
      }

      // Actualizar enemigos botes en llamas
      for (const e of w.enemies) {
        if (e.extinguished) continue;
        e.x += e.vx * dt;
        if (e.x < e.minX) {
          e.x = e.minX;
          e.vx = Math.abs(e.vx);
        } else if (e.x > e.maxX) {
          e.x = e.maxX;
          e.vx = -Math.abs(e.vx);
        }

        if (Math.abs(w.px - e.x) < 26 && Math.abs(w.py - e.y) < 38) {
          damagePlayer();
        }
      }

      // Activar cápsula del jefe al llegar a la arena final (x >= 2560)
      if (w.px >= 2560 && !w.bossShown) {
        w.bossShown = true;
        setBossActive(true);
        setPhase('BOSS_CAPSULE');
        return;
      }

      // Ataques de Smogger
      if (w.bossShown && !w.bossDefeated) {
        w.bossSprayTimer -= dt;
        if (w.bossSprayTimer <= 0) {
          w.bossSprayTimer = 1.6;
          w.smogClouds.push({
            x: BOSS_X - 40,
            y: BOSS_Y - 180,
            vx: -(130 + Math.random() * 80),
            vy: 25 + Math.random() * 55,
          });
        }

        for (let i = w.smogClouds.length - 1; i >= 0; i--) {
          const sc = w.smogClouds[i];
          sc.x += sc.vx * dt;
          sc.y += Math.sin(timeSec * 4 + i) * 35 * dt + sc.vy * 0.25 * dt;
          if (sc.x < 2520) {
            w.smogClouds.splice(i, 1);
            continue;
          }
          const dx = w.px - sc.x;
          const dy = w.py - 28 - sc.y;
          if (dx * dx + dy * dy < 32 * 32) {
            w.smogClouds.splice(i, 1);
            damagePlayer();
          }
        }
      }

      // Partículas y popups
      for (let i = w.particles.length - 1; i >= 0; i--) {
        w.particles[i].x += w.particles[i].vx * dt;
        w.particles[i].y += w.particles[i].vy * dt;
        w.particles[i].life -= dt;
        if (w.particles[i].life <= 0) w.particles.splice(i, 1);
      }
      for (let i = w.popups.length - 1; i >= 0; i--) {
        w.popups[i].y -= 36 * dt;
        w.popups[i].life -= dt;
        if (w.popups[i].life <= 0) w.popups.splice(i, 1);
      }

      // Cámara
      const camX = w.bossShown
        ? 2500
        : Math.max(0, Math.min(LEVEL_W - W, w.px - W * 0.35));

      // Dibujo
      drawBackground(camX);
      w.platforms.forEach((p) => drawPlatform(p, camX));

      // Monedas giratorias
      w.coinItems.forEach((c) => {
        if (c.collected) return;
        const sx = c.x - camX;
        if (sx < -30 || sx > W + 30) return;
        const scaleX = Math.max(0.35, Math.abs(Math.cos(timeSec * 4 + c.x * 0.01)));
        ctx.save();
        ctx.translate(sx, c.y);
        ctx.scale(scaleX, 1);
        ctx.fillStyle = '#FACC15';
        ctx.strokeStyle = '#92400E';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Corazones
      w.heartItems.forEach((h) => {
        if (h.collected) return;
        const sx = h.x - camX;
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(sx - 5, h.y - 3, 6, 0, Math.PI * 2);
        ctx.arc(sx + 5, h.y - 3, 6, 0, Math.PI * 2);
        ctx.moveTo(sx - 11, h.y - 1);
        ctx.lineTo(sx, h.y + 11);
        ctx.lineTo(sx + 11, h.y - 1);
        ctx.fill();
      });

      w.enemies.forEach((e) => drawTrashEnemy(e, camX, timeSec));
      drawSmogger(camX, timeSec);

      // Nubes de smog del jefe
      w.smogClouds.forEach((sc) => {
        const sx = sc.x - camX;
        ctx.save();
        ctx.translate(sx, sc.y);
        ctx.fillStyle = '#B4834D';
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(-10, 2, 12, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(0, -8, 14, Math.PI * 0.9, Math.PI * 0.1);
        ctx.arc(12, 2, 12, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(-7, -2, 4, 4);
        ctx.fillRect(3, -2, 4, 4);
        ctx.restore();
      });

      // Proyectiles verdes
      w.bolts.forEach((b) => {
        const sx = b.x - camX;
        ctx.fillStyle = '#22C55E';
        ctx.strokeStyle = '#DCFCE7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(sx - 11, b.y - 5, 22, 10, 5);
        ctx.fill();
        ctx.stroke();
      });

      drawPlayer(camX);

      w.particles.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.life * 2);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x - camX, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      w.popups.forEach((pop) => {
        ctx.globalAlpha = Math.max(0, pop.life * 1.4);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x - camX, pop.y);
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        keysRef.current.jump = true;
      }
      if (e.key === ' ' || e.key === 'z' || e.key === 'Z' || e.key === 'f' || e.key === 'F') {
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
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        keysRef.current.jump = false;
      }
      if (e.key === ' ' || e.key === 'z' || e.key === 'Z' || e.key === 'f' || e.key === 'F') {
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

  const totalEarnedWithBonus = earnedCoins + COMPLETION_BONUS;

  return (
    <section
      className="min-h-[calc(100vh-56px)] bg-slate-950 px-4 py-5 flex flex-col items-center justify-center"
      aria-label="Minijuego Vence a los enemigos de la atmósfera"
    >
      {phase === 'INTRO' && (
        <CapsuleOverlay
          capsule={CAPSULES.platformer_intro}
          onContinue={() => setPhase('PLAYING')}
        />
      )}

      {phase === 'MID_CAPSULE' && (
        <CapsuleOverlay
          capsule={CAPSULES.platformer_mid}
          onContinue={() => setPhase('PLAYING')}
        />
      )}

      {phase === 'BOSS_CAPSULE' && (
        <CapsuleOverlay
          capsule={CAPSULES.platformer_boss}
          onContinue={() => setPhase('PLAYING')}
        />
      )}

      {phase === 'VICTORY' && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border-2 border-emerald-500 p-7 text-center shadow-2xl">
            <h3 className="font-display text-2xl font-extrabold text-white">
              ¡Derrotaste al villano Smogger!
            </h3>
            <p className="mt-2 text-slate-200 text-base">
              Neutralizaste {trashDefeated}/5 focos contaminantes y venciste a
              Smogger usando tu Poder Verde.
            </p>
            <button
              type="button"
              onClick={() =>
                onComplete({
                  minigameId: 'platformer',
                  monedasGanadas: totalEarnedWithBonus,
                  enemigosDerrotados: trashDefeated + 1,
                })
              }
              className="mt-6 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-display font-bold text-white cursor-pointer"
            >
              Recoger recompensas →
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="font-display text-lg md:text-xl font-bold text-white">
              Vence a los enemigos de la atmósfera
            </h2>
            <p className="text-xs text-slate-400">
              Avanza hacia la derecha, salta con ↑ / W y dispara Poder Verde con Espacio o clic.
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

        {/* Lienzo del juego + HUD */}
        <div
          className={`relative rounded-2xl overflow-hidden border-4 shadow-2xl bg-slate-900 transition-colors ${
            hitNotice ? 'border-rose-500' : 'border-slate-800'
          }`}
        >
          {/* Corazones arriba a la izquierda */}
          <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-700">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`text-lg leading-none ${
                  i < hearts ? 'text-rose-500' : 'text-slate-600'
                }`}
                aria-hidden="true"
              >
                ♥
              </span>
            ))}
            <span className="sr-only">Vidas: {hearts} de 3</span>
          </div>

          {/* Monedas arriba al centro */}
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-slate-950/90 px-4 py-1 border-2 border-amber-400/70">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-mono-num font-extrabold text-xs">
              P
            </span>
            <span className="font-mono-num text-base font-bold text-white">
              {String(existingCoins + earnedCoins).padStart(6, '0')}
            </span>
          </div>

          {/* Contador de botes / Jefe arriba a la derecha */}
          <div className="pointer-events-none absolute top-3 right-3 z-10 rounded-full bg-slate-950/85 px-3.5 py-1.5 border border-slate-700 text-xs font-mono-num font-bold text-white">
            {bossActive ? (
              <span className="text-rose-300">
                Smogger HP: {bossHp}/{BOSS_MAX_HP}
              </span>
            ) : (
              <span className="text-amber-300">
                Enemigos: {trashDefeated}/5
              </span>
            )}
          </div>

          <canvas
            ref={canvasRef}
            width={960}
            height={540}
            onPointerDown={() => {
              keysRef.current.shoot = true;
            }}
            onPointerUp={() => {
              keysRef.current.shoot = false;
            }}
            onPointerLeave={() => {
              keysRef.current.shoot = false;
            }}
            className="w-full h-auto block cursor-crosshair touch-none"
          />
        </div>

        {/* Controles táctiles / ratón */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
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
              className="w-14 h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-600 cursor-pointer select-none"
              aria-label="Mover izquierda"
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
              className="w-14 h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-600 cursor-pointer select-none"
              aria-label="Mover derecha"
            >
              ▶
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onPointerDown={() => {
                keysRef.current.jump = true;
              }}
              onPointerUp={() => {
                keysRef.current.jump = false;
              }}
              onPointerLeave={() => {
                keysRef.current.jump = false;
              }}
              className="px-5 h-11 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-display font-bold text-sm uppercase border-b-4 border-sky-900 cursor-pointer select-none"
            >
              Saltar (↑)
            </button>
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
              className="px-5 h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-sm uppercase border-b-4 border-emerald-900 cursor-pointer select-none"
            >
              Poder Verde (Espacio)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
