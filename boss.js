'use strict';

// ---- Sprites du boss ----
const bossSprites = {
    idle: {
        left:  loadFrames('asset/boss/standard/idle/left',  2),
        right: loadFrames('asset/boss/standard/idle/right', 2),
    },
    walk: {
        left:  loadFrames('asset/boss/standard/walk/left',  9),
        right: loadFrames('asset/boss/standard/walk/right', 9),
    },
    slash: {
        left:  loadFrames('asset/boss/custom/slash_128/left',  6),
        right: loadFrames('asset/boss/custom/slash_128/right', 6),
        down:  loadFrames('asset/boss/custom/slash_128/down',  6),
        up:    loadFrames('asset/boss/custom/slash_128/up',    6),
    },
    hurt: {
        up:    loadFrames('asset/boss/standard/hurt/up', 6), // L'animation de défaite
    }
};

const boss = {
    x: 0, y: 0,
    direction:     'left',
    state:         'patrol',   // patrol | chase | attack
    frame:         0,
    frameTimer:    0,
    frameInterval: 120,
    defeatedTimer: 0,
    hp: 500, maxHp: 500,
    speed:          1.8,
    attackCooldown: 0,
    patrolMinX: 0,
    patrolMaxX: 0,
    hallwayMaxY: 0,   // y limite basse du couloir
};

function bossHits(bx, by) {
    if (typeof isSolidAt !== 'function') return false;
    const r = 6 * TILE_SCALE;
    return isSolidAt(bx - r, by - r) || isSolidAt(bx + r, by - r) ||
           isSolidAt(bx - r, by + r) || isSolidAt(bx + r, by + r);
}

// Appelé après resizeCanvas() pour placer le boss
function initBoss() {
    const ts = MAP_DATA.tileSize * TILE_SCALE;
    boss.patrolMinX  = MAP_OX + ts * 1;
    boss.patrolMaxX  = MAP_OX + ts * 22;
    boss.hallwayMaxY = MAP_OY + ts * 4;   // rows 0-3 = couloir du haut
    boss.x = MAP_OX + ts * 11;
    boss.y = MAP_OY + ts * 2.5; // centre de la ligne 2 (bord = ts*2 trop près du mur solide)
}

function getBossFrames() {
    if (boss.state === 'defeated') return bossSprites.hurt.up;
    
    const dir = boss.direction;
    if (boss.state === 'attack') return bossSprites.slash[dir] || bossSprites.slash.left;
    if (boss.state === 'chase' || boss.state === 'patrol') return bossSprites.walk[dir] || bossSprites.walk.left;
    return bossSprites.idle[dir] || bossSprites.idle.left;
}

function updateBoss() {
    if (boss.hp <= 0) {
        if (boss.state !== 'defeated') {
            boss.state = 'defeated';
            boss.frame = 0;
            boss.frameTimer = 0;
            boss.defeatedTimer = 0;
            if (typeof quests !== 'undefined') {
                quests.daily[0].current = Math.min(quests.daily[0].target, quests.daily[0].current + 1);
                quests.monthly[1].current = Math.min(quests.monthly[1].target, quests.monthly[1].current + 1);
            }
        }

        const frames = getBossFrames();
        // Joue l'animation jusqu'à la dernière frame puis s'arrête
        if (boss.frame < frames.length - 1) {
            boss.frameTimer += 16;
            if (boss.frameTimer >= boss.frameInterval) {
                boss.frameTimer = 0;
                boss.frame++;
            }
        }

        // Compteur de résurrection
        boss.defeatedTimer += 16;
        if (boss.defeatedTimer >= 20000) { // 20 secondes
            boss.hp = boss.maxHp;
            boss.state = 'patrol';
            boss.frame = 0;
            boss.frameTimer = 0;
        }
        
        return; // Ne fait plus rien d'autre tant qu'il est vaincu
    }

    const playerInHallway = player.y < boss.hallwayMaxY;

    // --- Machine d'état ---
    if (boss.state === 'attack') {
        // Avance les frames, revient à chase quand terminé
        boss.frameTimer += 16;
        if (boss.frameTimer >= boss.frameInterval) {
            boss.frameTimer = 0;
            boss.frame++;
            const frames = getBossFrames();
            if (boss.frame >= frames.length) {
                boss.frame = 0;
                boss.attackCooldown = 90; // ~1.5s avant prochaine attaque
                boss.state = playerInHallway ? 'chase' : 'patrol';
            }
        }
        return;
    }

    // Cooldown attaque
    if (boss.attackCooldown > 0) boss.attackCooldown--;

    if (playerInHallway) {
        // --- Mode poursuite ---
        const dx = player.x - boss.x;
        const dy = player.y - boss.y;
        const dist = Math.hypot(dx, dy);

        // Orientation vers le joueur
        if      (Math.abs(dx) > Math.abs(dy)) boss.direction = dx > 0 ? 'right' : 'left';
        else if (dy > 0)                       boss.direction = 'down';
        else                                   boss.direction = 'up';

        const ATTACK_RANGE = MAP_DATA.tileSize * TILE_SCALE * 1.5;

        if (dist < ATTACK_RANGE && boss.attackCooldown === 0) {
            // Déclenche l'attaque
            boss.state = 'attack';
            boss.frame = 0;
            boss.frameTimer = 0;

            // Dégâts au frame 3 (impact)
            setTimeout(() => {
                if (boss.state === 'attack') {
                    const d = Math.hypot(player.x - boss.x, player.y - boss.y);
                    if (d < MAP_DATA.tileSize * TILE_SCALE * 2) {
                        player.hp = Math.max(0, player.hp - 15);
                    }
                }
            }, boss.frameInterval * 3);
        } else if (dist >= ATTACK_RANGE) {
            // Se déplace vers le joueur avec collision
            boss.state = 'chase';
            const nx = boss.x + (dx / dist) * boss.speed;
            const ny = boss.y + (dy / dist) * boss.speed;
            if (!bossHits(nx, ny))          { boss.x = nx; boss.y = ny; }
            else if (!bossHits(nx, boss.y)) { boss.x = nx; }
            else if (!bossHits(boss.x, ny)) { boss.y = ny; }
        } else {
            // À portée mais en cooldown d'attaque : reste sur place sans marcher
            boss.state = 'idle';
        }

    } else {
        // --- Patrouille ---
        boss.state = 'patrol';

        if (boss.direction === 'left') {
            const nx = boss.x - boss.speed;
            if (nx <= boss.patrolMinX || bossHits(nx, boss.y)) boss.direction = 'right';
            else boss.x = nx;
        } else {
            const nx = boss.x + boss.speed;
            if (nx >= boss.patrolMaxX || bossHits(nx, boss.y)) boss.direction = 'left';
            else boss.x = nx;
        }
    }

    // Avance les frames (patrol/chase sont des boucles)
    boss.frameTimer += 16;
    if (boss.frameTimer >= boss.frameInterval) {
        boss.frameTimer = 0;
        const frames = getBossFrames();
        boss.frame = (boss.frame + 1) % frames.length;
    }
}

function drawBoss() {
    const frames = getBossFrames();
    if (boss.frame >= frames.length) boss.frame = 0;
    const img = frames[boss.frame];
    if (!img?.complete) return;

    // Slash 128×128, reste 64×64
    const native = boss.state === 'attack' ? 128 : 64;
    const w = native * TILE_SCALE;
    const h = native * TILE_SCALE;
    ctx.drawImage(img, boss.x - w / 2, boss.y - h / 2, w, h);

}
