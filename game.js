'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width  = 1920;
canvas.height = 1080;


let frame      = 0;
let frameTimer = 0;
const FRAME_INTERVAL = 120;
const SCALE = 3;
const SPEED = 3;

// --- ENVIRONNEMENT ---
const TILE_SIZE = 16;
const TILE_SCALE = 5; // Agrandissement du décor

const environmentImage = new Image();
environmentImage.src = 'Top-Down_Retro_Interior/TopDownHouse_FloorsAndWalls.png';

// Mapping du bloc 4x3 complet de (9,5) à (12,7)
const TILES = {
    0: null,
    1: {x: 9,  y: 5}, // Coin Haut-Gauche
    2: {x: 10, y: 5}, // Mur Haut (partie 1)
    3: {x: 11, y: 5}, // Mur Haut (partie 2)
    4: {x: 12, y: 5}, // Coin Haut-Droit
    5: {x: 9,  y: 6}, // Mur Gauche
    6: {x: 10, y: 6}, // Sol (partie 1)
    7: {x: 11, y: 6}, // Sol (partie 2)
    8: {x: 12, y: 6}, // Mur Droit
    9: {x: 9,  y: 7}, // Coin Bas-Gauche
    10:{x: 10, y: 7}, // Mur Bas (partie 1)
    11:{x: 11, y: 7}, // Mur Bas (partie 2)
    12:{x: 12, y: 7}  // Coin Bas-Droit
};

// On construit la pièce dynamiquement pour remplir TOUT l'écran !
function generateRoomMap() {
    // Calcule combien de tuiles il faut pour remplir la largeur et la hauteur
    const cols = Math.ceil(canvas.width / (TILE_SIZE * TILE_SCALE));
    const rows = Math.ceil(canvas.height / (TILE_SIZE * TILE_SCALE));
    
    const map = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            if (r === 0 && c === 0) row.push(1); // Coin Haut-Gauche
            else if (r === 0 && c === cols - 1) row.push(4); // Coin Haut-Droit
            else if (r === rows - 1 && c === 0) row.push(9); // Coin Bas-Gauche
            else if (r === rows - 1 && c === cols - 1) row.push(12); // Coin Bas-Droit
            else if (r === 0) row.push(c % 2 === 0 ? 2 : 3); // Mur Haut
            else if (r === rows - 1) row.push(c % 2 === 0 ? 10 : 11); // Mur Bas
            else if (c === 0) row.push(5); // Mur Gauche
            else if (c === cols - 1) row.push(8); // Mur Droit
            else row.push(c % 2 === 0 ? 6 : 7); // Sol
        }
        map.push(row);
    }
    return map;
}

const roomMap = generateRoomMap();

function drawTile(ctx, img, tileCol, tileRow, destX, destY, scale) {
    if (!img.complete) return;
    ctx.drawImage(
        img,
        tileCol * TILE_SIZE, tileRow * TILE_SIZE,
        TILE_SIZE, TILE_SIZE,
        destX, destY,
        TILE_SIZE * scale, TILE_SIZE * scale
    );
}

function drawEnvironment() {
    // On centre la pièce au milieu de l'écran
    const startX = (canvas.width - (roomMap[0].length * TILE_SIZE * TILE_SCALE)) / 2;
    const startY = (canvas.height - (roomMap.length * TILE_SIZE * TILE_SCALE)) / 2;

    for (let row = 0; row < roomMap.length; row++) {
        for (let col = 0; col < roomMap[row].length; col++) {
            const tileId = roomMap[row][col];
            if (tileId === 0) continue; // Vide
            
            const destX = startX + (col * TILE_SIZE * TILE_SCALE);
            const destY = startY + (row * TILE_SIZE * TILE_SCALE);
            
            const tileCoords = TILES[tileId];
            
            drawTile(ctx, environmentImage, tileCoords.x, tileCoords.y, destX, destY, TILE_SCALE);
        }
    }
}
// -----------------------------

// Position et direction du personnage
const player = {
    x:         canvas.width / 2,
    y:         canvas.height / 2,
    direction: 'down',   // 'up' | 'down' | 'left' | 'right'
    moving:    false
};

// Touches actuellement enfoncées
const keys = {};

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

window.addEventListener('keydown', (e) => {
    if (ARROW_KEYS.includes(e.key)) e.preventDefault();
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function handleInput() {
    player.moving = false;

    if (keys['ArrowUp']    || keys['z']) { player.y -= SPEED; player.direction = 'up';    player.moving = true; }
    if (keys['ArrowDown']  || keys['s']) { player.y += SPEED; player.direction = 'down';  player.moving = true; }
    if (keys['ArrowLeft']  || keys['q']) { player.x -= SPEED; player.direction = 'left';  player.moving = true; }
    if (keys['ArrowRight'] || keys['d']) { player.x += SPEED; player.direction = 'right'; player.moving = true; }
}

function getFrames() {
    const anim = player.moving ? 'walk' : 'idle';
    return sprites[anim][player.direction];
}

function drawPlayer() {
    const frames = getFrames();

    // Reset frame index si on change d'animation
    if (frame >= frames.length) frame = 0;

    const img = frames[frame];
    if (!img.complete) return;

    const w = 64 * SCALE;
    const h = 64 * SCALE;
    ctx.drawImage(img, player.x - w / 2, player.y - h / 2, w, h);
}

function loop() {
    handleInput();

    // Advance animation
    frameTimer += 16;
    if (frameTimer >= FRAME_INTERVAL) {
        frameTimer = 0;
        frame = (frame + 1) % getFrames().length;
    }

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawEnvironment(); // <-- Dessiner le décor avant le joueur

    drawPlayer();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
