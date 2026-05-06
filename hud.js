'use strict';

let invScroll = 0;

const ROW_H   = 28;
const ROW_PAD = 3;
const START_Y = 80;

function drawInventoryPanel() {
    const panelW = MAP_OX - 6;
    if (panelW < 40) return;

    const items = player.inventory;

    // Fond
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, panelW, canvas.height);
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    ctx.strokeRect(panelW, 0, 1, canvas.height);

    // Titre
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SAC', panelW / 2, 18);

    // HP texte compact
    ctx.fillStyle = '#555';
    ctx.font = '9px monospace';
    ctx.fillText(`HP ${player.hp}/${player.maxHp}`, panelW / 2, 32);

    // Séparateur
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(8, 38, panelW - 16, 1);

    // Hints
    ctx.fillStyle = '#3a3a3a';
    ctx.font = '8px monospace';
    ctx.fillText('[E] ramasser', panelW / 2, 50);
    ctx.fillText('[R] manger', panelW / 2, 61);
    ctx.fillText('[Espace] lancer', panelW / 2, 72);

    // Liste d'items
    const visibleRows = Math.floor((canvas.height - START_Y) / (ROW_H + ROW_PAD));

    for (let i = 0; i < visibleRows; i++) {
        const idx  = invScroll + i;
        const item = items[idx];
        const sel  = idx === player.selectedSlot;
        const x    = 4;
        const y    = START_Y + i * (ROW_H + ROW_PAD);

        // Fond de la ligne
        ctx.fillStyle = sel ? '#2a2a1a' : '#181818';
        ctx.fillRect(x, y, panelW - 8, ROW_H);

        // Bordure gauche colorée si sélectionné
        ctx.fillStyle = sel ? '#ffd700' : '#2a2a2a';
        ctx.fillRect(x, y, sel ? 3 : 1, ROW_H);

        if (!item) continue;

        // Emoji
        ctx.font = '16px serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, x + 6, y + ROW_H / 2);

        // Nom
        ctx.fillStyle = sel ? '#ffd700' : '#ccc';
        ctx.font = (sel ? 'bold ' : '') + '10px monospace';
        ctx.fillText(item.name, x + 28, y + ROW_H / 2 - 3);

        // Quantité
        if (item.qty > 1) {
            ctx.fillStyle = '#888';
            ctx.font = '9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`x${item.qty}`, panelW - 8, y + ROW_H / 2 + 3);
        }
    }

    // Indicateurs de scroll
    const maxScroll = Math.max(0, items.length - visibleRows);
    if (invScroll > 0) {
        ctx.fillStyle = '#555';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('▲', panelW / 2, START_Y - 4);
    }
    if (invScroll < maxScroll) {
        ctx.fillStyle = '#555';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText('▼', panelW / 2, canvas.height - 4);
    }

    ctx.textAlign    = 'left';
    ctx.textBaseline = 'alphabetic';
}

function getInventorySlotAt(cx, cy) {
    const panelW = MAP_OX - 6;
    if (cx < 0 || cx >= panelW || cy < START_Y) return -1;
    return invScroll + Math.floor((cy - START_Y) / (ROW_H + ROW_PAD));
}

function scrollInventory(delta) {
    const visibleRows = Math.floor((canvas.height - START_Y) / (ROW_H + ROW_PAD));
    const maxScroll   = Math.max(0, player.inventory.length - visibleRows);
    invScroll = Math.max(0, Math.min(maxScroll, invScroll + delta));
}

function drawHealthBar() {
    const BAR_W = 220;
    const BAR_H = 18;
    const x     = canvas.width / 2 - BAR_W / 2;
    const y     = Math.floor(MAP_OY / 2) - BAR_H / 2;
    const ratio = player.hp / player.maxHp;

    ctx.fillStyle = '#333';
    ctx.fillRect(x, y, BAR_W, BAR_H);

    ctx.fillStyle = ratio > 0.5 ? '#4caf50' : ratio > 0.25 ? '#ff9800' : '#f44336';
    ctx.fillRect(x, y, BAR_W * ratio, BAR_H);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, BAR_W, BAR_H);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`HP  ${player.hp} / ${player.maxHp}`, canvas.width / 2, y + 13);
    ctx.textAlign = 'left';
}

function drawHUD() {
    drawInventoryPanel();
    drawHealthBar();
}
