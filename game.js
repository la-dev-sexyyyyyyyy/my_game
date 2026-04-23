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

    drawPlayer();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
