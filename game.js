'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

let frame      = 0;
let frameTimer = 0;
const SPEED = 4.5;

const _tsImages = {};
function getTilesetImage(key) {
    if (!_tsImages[key]) {
        const img = new Image();
        img.src = TILESETS[key].src;
        _tsImages[key] = img;
    }
    return _tsImages[key];
}
Object.keys(TILESETS).forEach(key => getTilesetImage(key));

const TILE_SIZE = MAP_DATA.tileSize;
let TILE_SCALE, MAP_PX_W, MAP_PX_H, MAP_OX, MAP_OY, PLAYER_SCALE;

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    TILE_SCALE   = Math.max(1, Math.floor(Math.min(
        canvas.width  / (MAP_DATA.cols * TILE_SIZE),
        canvas.height / (MAP_DATA.rows * TILE_SIZE)
    )));
    MAP_PX_W     = MAP_DATA.cols * TILE_SIZE * TILE_SCALE;
    MAP_PX_H     = MAP_DATA.rows * TILE_SIZE * TILE_SCALE;
    MAP_OX       = Math.floor((canvas.width  - MAP_PX_W) / 2);
    MAP_OY       = Math.floor((canvas.height - MAP_PX_H) / 2);
    PLAYER_SCALE = Math.max(1, Math.round(TILE_SCALE * 0.75));
}

window.addEventListener('resize', () => { resizeCanvas(); initBoss(); });
resizeCanvas();
initBoss();

function drawTile(img, tileCol, tileRow, destX, destY, tileSize, scale) {
    if (!img.complete) return;
    ctx.drawImage(img, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                  destX, destY, tileSize * scale, tileSize * scale);
}

const LAYER_NAMES = ['floor','floor_deco','walls','walls_deco','objects','objects_top','ceiling'];
function ensureLayers(mapData) {
    LAYER_NAMES.forEach(name => {
        if (!mapData.layers[name])
            mapData.layers[name] = Array.from({ length: mapData.rows }, () => Array(mapData.cols).fill(null));
    });
}
ensureLayers(MAP_DATA);

function drawLayerRow(layerData, r) {
    if (!layerData || r < 0 || r >= layerData.length) return;
    for (let c = 0; c < layerData[r].length; c++) {
        const cell = layerData[r][c];
        if (!cell) continue;
        const [tsKey, tileCol, tileRow] = cell;
        const ts  = TILESETS[tsKey];
        const img = getTilesetImage(tsKey);
        drawTile(img, tileCol, tileRow, MAP_OX + c * ts.tileSize * TILE_SCALE,
                 MAP_OY + r * ts.tileSize * TILE_SCALE, ts.tileSize, TILE_SCALE);
    }
}

function drawLayer(layerData) {
    for (let r = 0; r < layerData.length; r++) drawLayerRow(layerData, r);
}

// =============================================
// COLLISION
// =============================================
function isSolidAt(px, py) {
    const cellPx = COLLISION_CELL * TILE_SCALE;
    const col    = Math.floor((px - MAP_OX) / cellPx);
    const row    = Math.floor((py - MAP_OY) / cellPx);
    if (row < 0 || col < 0 || row >= COLLISION_MAP.length || col >= (COLLISION_MAP[0]?.length ?? 0)) return true;
    return !!(COLLISION_MAP[row]?.[col]);
}

function playerCollidesAt(px, py) {
    const r = 8 * TILE_SCALE;
    return isSolidAt(px - r, py - r) || isSolidAt(px + r, py - r) ||
           isSolidAt(px - r, py + r) || isSolidAt(px + r, py + r);
}

// =============================================
// JOUEUR
// =============================================
const player = {
    x:            MAP_OX + MAP_PX_W / 2,
    y:            MAP_OY + MAP_PX_H / 2,
    direction:    'down',
    moving:       false,
    attacking:    false,
    hp:           80,
    maxHp:        100,
    selectedSlot: 0,
    inventory: [],
};

let playerAttackLanded = false;

const keys = {};
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let mouseX = -1000, mouseY = -1000;

canvas.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouseX = (e.clientX - r.left) * (canvas.width / r.width);
    mouseY = (e.clientY - r.top)  * (canvas.height / r.height);
});
canvas.addEventListener('click', (e) => {
    const r   = canvas.getBoundingClientRect();
    const cx  = (e.clientX - r.left) * (canvas.width  / r.width);
    const cy  = (e.clientY - r.top)  * (canvas.height / r.height);
    const idx = getInventorySlotAt(cx, cy);
    if (idx >= 0 && idx < player.inventory.length) player.selectedSlot = idx;
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollInventory(e.deltaY > 0 ? 1 : -1);
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (ARROW_KEYS.includes(e.key)) e.preventDefault();
    if (e.key === ' ')  { e.preventDefault(); throwSelectedItem(); }
    if (e.key === 'r')  eatSelectedItem();
    if (e.key === 'f' && !player.attacking) {
        player.attacking     = true;
        frame                = 0;
        frameTimer           = 0;
        playerAttackLanded   = false;
    }
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function handleInput() {
    if (player.attacking) return;
    player.moving = false;
    let nx = player.x, ny = player.y;
    if (keys['ArrowUp']    || keys['z']) { ny -= SPEED; player.direction = 'up';    player.moving = true; }
    if (keys['ArrowDown']  || keys['s']) { ny += SPEED; player.direction = 'down';  player.moving = true; }
    if (keys['ArrowLeft']  || keys['q']) { nx -= SPEED; player.direction = 'left';  player.moving = true; }
    if (keys['ArrowRight'] || keys['d']) { nx += SPEED; player.direction = 'right'; player.moving = true; }

    if      (!playerCollidesAt(nx, ny))            { player.x = nx; player.y = ny; }
    else if (!playerCollidesAt(nx, player.y))       { player.x = nx; }
    else if (!playerCollidesAt(player.x, ny))       { player.y = ny; }
    else                                             { player.moving = false; }
}

function getFrames() {
    if (player.attacking) return sprites.slash[player.direction];
    return sprites[player.moving ? 'walk' : 'idle'][player.direction];
}

function getFrameInterval() {
    if (player.attacking) return 70;
    if (player.moving)    return 90;
    return 180;
}

// Position du body dans le sprite 192×192 pour chaque direction
// [offsetX, offsetY] → draw_pos = player.pos + offset * PLAYER_SCALE
const SLASH_OFFSETS = {
    right: [-96, -96],
    left:  [-96, -96],
    down:  [-96, -96],
    up:    [-96, -96],
};

function drawPlayer() {
    const frames = getFrames();
    if (frame >= frames.length) frame = 0;
    const img = frames[frame];
    if (!img.complete) return;

    let drawX, drawY, w, h;
    if (player.attacking) {
        const [ox, oy] = SLASH_OFFSETS[player.direction];
        w     = 192 * PLAYER_SCALE;
        h     = 192 * PLAYER_SCALE;
        drawX = Math.floor(player.x + ox * PLAYER_SCALE);
        drawY = Math.floor(player.y + oy * PLAYER_SCALE);
    } else {
        w     = 64 * PLAYER_SCALE;
        h     = 64 * PLAYER_SCALE;
        drawX = Math.floor(player.x - 32 * PLAYER_SCALE);
        drawY = Math.floor(player.y - 32 * PLAYER_SCALE);
    }
    ctx.drawImage(img, drawX, drawY, w, h);
}

// =============================================
// BOUCLE
// =============================================
function loop() {
    handleInput();

    frameTimer += 16;
    if (frameTimer >= getFrameInterval()) {
        frameTimer = 0;
        frame++;
        if (player.attacking && frame >= sprites.slash[player.direction].length) {
            player.attacking = false;
            frame = 0;
        } else {
            frame = frame % getFrames().length;
        }
    }

    // Dégâts au boss au frame d'impact (frame 3)
    if (player.attacking && frame === 3 && !playerAttackLanded) {
        playerAttackLanded = true;
        const reach = MAP_DATA.tileSize * TILE_SCALE * 2.5;
        if (Math.hypot(boss.x - player.x, boss.y - player.y) < reach) {
            boss.hp = Math.max(0, boss.hp - 20);
        }
    }

    updateWorldItems();
    updateProjectiles();
    updateBoss();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sol (toujours derrière tout)
    drawLayer(MAP_DATA.layers.floor);
    drawLayer(MAP_DATA.layers.floor_deco);
    drawWorldItems(); // halos sous les entités

    // Y-sort original
    const _ts       = MAP_DATA.tileSize * TILE_SCALE;
    const playerRow = Math.min(MAP_DATA.rows - 1,
        Math.ceil((player.y + 32 * PLAYER_SCALE - MAP_OY) / _ts));
    const bossRow   = Math.min(MAP_DATA.rows - 1,
        Math.ceil((boss.y   + 32 * TILE_SCALE - MAP_OY) / _ts));
    const L = MAP_DATA.layers;
    let bossDrawn = false, playerDrawn = false;

    for (let r = 0; r < MAP_DATA.rows; r++) {
        drawLayerRow(L.walls,      r);
        drawLayerRow(L.walls_deco, r);
        drawLayerRow(L.objects,    r);
        if (!bossDrawn   && r >= bossRow)   { drawBoss();   bossDrawn   = true; }
        if (!playerDrawn && r >= playerRow) { drawPlayer(); playerDrawn = true; }
        drawLayerRow(L.objects_top, r);
    }
    if (!bossDrawn)   drawBoss();
    if (!playerDrawn) drawPlayer();

    drawWorldPrompts();
    drawProjectiles();
    drawLayer(L.ceiling);
    drawHUD();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
