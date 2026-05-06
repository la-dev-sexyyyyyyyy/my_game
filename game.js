'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

let frame      = 0;
let frameTimer = 0;
const FRAME_INTERVAL = 120;
const SPEED = 3;

// =============================================
// TILESETS — images préchargées
// =============================================
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

// =============================================
// RENDU — échelles dynamiques selon la fenêtre
// =============================================
const TILE_SIZE = MAP_DATA.tileSize;
let TILE_SCALE, MAP_PX_W, MAP_PX_H, MAP_OX, MAP_OY, PLAYER_SCALE;

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calcule le plus grand entier qui fait tenir toute la map
    TILE_SCALE   = Math.max(1, Math.floor(Math.min(
        canvas.width  / (MAP_DATA.cols * TILE_SIZE),
        canvas.height / (MAP_DATA.rows * TILE_SIZE)
    )));
    MAP_PX_W     = MAP_DATA.cols * TILE_SIZE * TILE_SCALE;
    MAP_PX_H     = MAP_DATA.rows * TILE_SIZE * TILE_SCALE;
    MAP_OX       = Math.floor((canvas.width  - MAP_PX_W) / 2);
    MAP_OY       = Math.floor((canvas.height - MAP_PX_H) / 2);
    // Le perso fait environ 1.5 tiles de haut
    PLAYER_SCALE = Math.max(1, Math.round(TILE_SCALE * 0.75));
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // initialisation

function drawTile(img, tileCol, tileRow, destX, destY, tileSize, scale) {
    if (!img.complete) return;
    ctx.drawImage(
        img,
        tileCol * tileSize, tileRow * tileSize,
        tileSize, tileSize,
        destX, destY,
        tileSize * scale, tileSize * scale
    );
}

// Garantit que tous les layers existent (compat avec anciennes maps)
const LAYER_NAMES = ['floor','floor_deco','walls','walls_deco','objects','objects_top','ceiling'];
function ensureLayers(mapData) {
    LAYER_NAMES.forEach(name => {
        if (!mapData.layers[name]) {
            mapData.layers[name] = Array.from(
                { length: mapData.rows },
                () => Array(mapData.cols).fill(null)
            );
        }
    });
}
ensureLayers(MAP_DATA);

function drawLayer(layerData) {
    for (let r = 0; r < layerData.length; r++) {
        for (let c = 0; c < layerData[r].length; c++) {
            const cell = layerData[r][c];
            if (!cell) continue;
            const [tsKey, tileCol, tileRow] = cell;
            const ts    = TILESETS[tsKey];
            const img   = getTilesetImage(tsKey);
            const destX = MAP_OX + c * ts.tileSize * TILE_SCALE;
            const destY = MAP_OY + r * ts.tileSize * TILE_SCALE;
            drawTile(img, tileCol, tileRow, destX, destY, ts.tileSize, TILE_SCALE);
        }
    }
}

// Layers SOUS le joueur
function drawEnvironmentBelow() {
    drawLayer(MAP_DATA.layers.floor);
    drawLayer(MAP_DATA.layers.floor_deco);
    drawLayer(MAP_DATA.layers.walls);
    drawLayer(MAP_DATA.layers.walls_deco);
    drawLayer(MAP_DATA.layers.objects);
}

// Layers AU-DESSUS du joueur
function drawEnvironmentAbove() {
    drawLayer(MAP_DATA.layers.objects_top);
    drawLayer(MAP_DATA.layers.ceiling);
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

const keys = {};
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

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
    if (e.key === 'f' && !player.attacking) { player.attacking = true; frame = 0; frameTimer = 0; }
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function handleInput() {
    if (player.attacking) return; // bloqué pendant l'attaque
    player.moving = false;
    if (keys['ArrowUp']    || keys['z']) { player.y -= SPEED; player.direction = 'up';    player.moving = true; }
    if (keys['ArrowDown']  || keys['s']) { player.y += SPEED; player.direction = 'down';  player.moving = true; }
    if (keys['ArrowLeft']  || keys['q']) { player.x -= SPEED; player.direction = 'left';  player.moving = true; }
    if (keys['ArrowRight'] || keys['d']) { player.x += SPEED; player.direction = 'right'; player.moving = true; }
}

function getFrames() {
    if (player.attacking) return sprites.slash[player.direction];
    return sprites[player.moving ? 'walk' : 'idle'][player.direction];
}

function drawPlayer() {
    const frames = getFrames();
    if (frame >= frames.length) frame = 0;
    const img = frames[frame];
    if (!img.complete) return;
    // slash_oversize est en 192×192 (3× le sprite normal 64×64)
    const spriteNative = player.attacking ? 192 : 64;
    const w = spriteNative * PLAYER_SCALE;
    const h = spriteNative * PLAYER_SCALE;
    ctx.drawImage(img, player.x - w / 2, player.y - h / 2, w, h);
}

// =============================================
// BOUCLE
// =============================================
function loop() {
    handleInput();

    frameTimer += 16;
    if (frameTimer >= FRAME_INTERVAL) {
        frameTimer = 0;
        frame++;
        if (player.attacking && frame >= sprites.slash[player.direction].length) {
            player.attacking = false;
            frame = 0;
        } else {
            frame = frame % getFrames().length;
        }
    }

    updateWorldItems();
    updateProjectiles();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnvironmentBelow();
    drawWorldItems();
    drawPlayer();
    drawWorldPrompts();
    drawProjectiles();
    drawEnvironmentAbove();
    drawHUD();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
