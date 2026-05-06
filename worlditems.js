'use strict';

const RESPAWN_MS = 10_000; // 10 secondes

const foodZones = [
    { col: 17, row: 10, name: 'Ramen',  emoji: '🍜', color: '#e17055' },
    { col: 18, row: 10, name: 'Salade', emoji: '🥗', color: '#27ae60' },
    { col: 19, row: 10, name: 'Gâteau', emoji: '🎂', color: '#f39c12' },
    { col: 20, row: 10, name: 'Tarte',  emoji: '🥧', color: '#e67e22' },
    { col: 21, row: 10, name: 'Pizza',  emoji: '🍕', color: '#e74c3c' },
    { col: 17, row: 11, name: 'Sushi',  emoji: '🍣', color: '#dfe6e9' },
    { col: 18, row: 11, name: 'Burger', emoji: '🍔', color: '#d35400' },
    { col: 19, row: 11, name: 'Tacos',  emoji: '🌮', color: '#f9ca24' },
    { col: 20, row: 11, name: 'Curry',  emoji: '🍛', color: '#e17055' },
    { col: 21, row: 11, name: 'Donut',  emoji: '🍩', color: '#fd79a8' },
];

const projectiles = [];

function tileToScreen(col, row) {
    const ts = MAP_DATA.tileSize;
    return {
        x: MAP_OX + col * ts * TILE_SCALE + (ts * TILE_SCALE) / 2,
        y: MAP_OY + row * ts * TILE_SCALE + (ts * TILE_SCALE) / 2,
    };
}

const PICK_RANGE = () => MAP_DATA.tileSize * TILE_SCALE * 2;

// Passe 1 : halos (avant le personnage)
function drawWorldItems() {
    for (const zone of foodZones) {
        if (zone.pickedAt) continue;

        const { x, y } = tileToScreen(zone.col, zone.row);
        if (Math.hypot(player.x - x, player.y - y) >= PICK_RANGE()) continue;

        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.arc(x, y, MAP_DATA.tileSize * TILE_SCALE * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Passe 2 : texte du prompt (après le personnage)
function drawWorldPrompts() {
    const now = Date.now();
    for (const zone of foodZones) {
        if (zone.pickedAt) {
            // Compte à rebours de respawn
            const remaining = Math.ceil((zone.pickedAt + RESPAWN_MS - now) / 1000);
            if (remaining <= 0) continue;
            const { x, y } = tileToScreen(zone.col, zone.row);
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(`${remaining}s`, x, y);
            ctx.fillStyle = '#ffd700';
            ctx.fillText(`${remaining}s`, x, y);
            ctx.textAlign = 'left';
            continue;
        }

        const { x, y } = tileToScreen(zone.col, zone.row);
        if (Math.hypot(player.x - x, player.y - y) >= PICK_RANGE()) continue;

        const ty = y - MAP_DATA.tileSize * TILE_SCALE * 0.9;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText('[E] Ramasser', x, ty);
        ctx.fillStyle = '#fff';
        ctx.fillText('[E] Ramasser', x, ty);
        ctx.textAlign = 'left';
    }
}

function updateWorldItems() {
    const now = Date.now();

    // Respawn individuel
    for (const zone of foodZones) {
        if (!zone.pickedAt) continue;
        if (now >= zone.pickedAt + RESPAWN_MS) {
            MAP_DATA.layers.objects[zone.row][zone.col] = zone.savedTile;
            zone.pickedAt  = null;
            zone.savedTile = null;
        }
    }

    // Ramassage
    if (!keys['e']) return;
    keys['e'] = false;

    const range = MAP_DATA.tileSize * TILE_SCALE * 2;
    for (const zone of foodZones) {
        if (zone.pickedAt) continue;

        const { x, y } = tileToScreen(zone.col, zone.row);
        if (Math.hypot(player.x - x, player.y - y) >= range) continue;

        // Sauvegarde le tile avant de l'effacer
        zone.savedTile = MAP_DATA.layers.objects[zone.row][zone.col];
        zone.pickedAt  = now;
        MAP_DATA.layers.objects[zone.row][zone.col] = 0;

        const existing = player.inventory.find(i => i.name === zone.name);
        if (existing) {
            existing.qty++;
        } else {
            player.inventory.push({ name: zone.name, emoji: zone.emoji, color: zone.color, qty: 1, isFood: true });
        }
        break;
    }
}

// Manger : +HP, une assiette (stackée)
function eatSelectedItem() {
    const item = player.inventory[player.selectedSlot];
    if (!item || !item.isFood) return;

    player.hp = Math.min(player.maxHp, player.hp + 20);

    player.inventory.splice(player.selectedSlot, 1);
    if (player.selectedSlot >= player.inventory.length)
        player.selectedSlot = Math.max(0, player.inventory.length - 1);

    const plate = player.inventory.find(i => i.name === 'Assiette');
    if (plate) plate.qty++;
    else player.inventory.push({ name: 'Assiette', emoji: '🍽️', color: '#bdc3c7', qty: 1, isFood: false });
}

// Lancer : un à la fois, décrémente qty
function throwSelectedItem() {
    const item = player.inventory[player.selectedSlot];
    if (!item) return;

    const DIRS = {
        up:    { vx:  0, vy: -7 },
        down:  { vx:  0, vy:  7 },
        left:  { vx: -7, vy:  0 },
        right: { vx:  7, vy:  0 },
    };
    const { vx, vy } = DIRS[player.direction];

    projectiles.push({ x: player.x, y: player.y, vx, vy, emoji: item.emoji, life: 1.0, burst: false });

    item.qty--;
    if (item.qty <= 0) {
        player.inventory.splice(player.selectedSlot, 1);
        if (player.selectedSlot >= player.inventory.length)
            player.selectedSlot = Math.max(0, player.inventory.length - 1);
    }
}

function updateProjectiles() {
    for (const p of projectiles) {
        if (p.burst) { p.life -= 0.05; continue; }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < MAP_OX || p.x > MAP_OX + MAP_PX_W ||
            p.y < MAP_OY || p.y > MAP_OY + MAP_PX_H) {
            p.burst = true;
        }
    }
    projectiles.splice(0, projectiles.length, ...projectiles.filter(p => p.life > 0));
}

function drawProjectiles() {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const p of projectiles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y);
        if (!p.burst) {
            ctx.rotate(performance.now() * 0.012);
            ctx.font = `${MAP_DATA.tileSize * TILE_SCALE * 0.9}px serif`;
        } else {
            ctx.font = `${MAP_DATA.tileSize * TILE_SCALE * (1 + (1 - p.life) * 3)}px serif`;
        }
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
    }
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
}
