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
const particles = [];

function createShatterEffect(x, y, color, emoji) {
    const isGlass = (emoji === '🍽️');
    // Plus d'éclats pour le verre
    const numShards = isGlass ? 15 + Math.floor(Math.random() * 10) : 6 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numShards; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (isGlass ? 4 : 2) + Math.random() * 5;
        
        particles.push({
            x: x,
            y: y,
            z: 5 + Math.random() * 10,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            vz: 3 + Math.random() * 6,
            life: 1.0,
            spin: (Math.random() - 0.5) * 0.8,
            rotation: Math.random() * Math.PI * 2,
            size: (isGlass ? 2 : 4) + Math.random() * 5,
            isGlass: isGlass,
            color: color || '#fff'
        });
    }
}

function updateParticles() {
    for (const p of particles) {
        p.life -= 0.02; // Fade progressif
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.z > 0 || p.vz > 0) {
            p.vz -= 0.6; // Gravité
            p.z += p.vz;
        }
        if (p.z <= 0) {
            p.z = 0;
            p.vx *= 0.5; // Friction au sol
            p.vy *= 0.5;
        }
        p.rotation += p.spin;
    }
    particles.splice(0, particles.length, ...particles.filter(p => p.life > 0));
}

function drawParticles() {
    for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y - p.z);
        ctx.rotate(p.rotation);
        
        if (p.isGlass) {
            // Éclat de verre : petit triangle affûté cyan clair / blanc
            ctx.fillStyle = 'rgba(210, 245, 255, 0.8)';
            ctx.beginPath();
            ctx.moveTo(-p.size, -p.size);
            ctx.lineTo(p.size, -p.size * 0.5);
            ctx.lineTo(0, p.size);
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
        } else {
            // Miettes de nourriture
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

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
    
    if (typeof quests !== 'undefined') {
        quests.daily[1].current = Math.min(quests.daily[1].target, quests.daily[1].current + 1);
    }

    item.qty--;
    if (item.qty <= 0) {
        player.inventory.splice(player.selectedSlot, 1);
        if (player.selectedSlot >= player.inventory.length) {
            player.selectedSlot = Math.max(0, player.inventory.length - 1);
        }
    }

    const plate = player.inventory.find(i => i.name === 'Assiette');
    if (plate) plate.qty++;
    else player.inventory.push({ name: 'Assiette', emoji: '🍽️', color: '#bdc3c7', qty: 1, isFood: false });
}

// Lancer : un à la fois, décrémente qty
function throwSelectedItem() {
    const item = player.inventory[player.selectedSlot];
    if (!item) return;

    const speed = 11;
    const DIRS = {
        up:    { vx:  0, vy: -speed },
        down:  { vx:  0, vy:  speed },
        left:  { vx: -speed, vy:  0 },
        right: { vx:  speed, vy:  0 },
    };
    let { vx, vy } = DIRS[player.direction];

    // Auto-aim : si le boss est proche et qu'on regarde dans sa direction globale
    if (typeof boss !== 'undefined' && boss.hp > 0) {
        const dx = boss.x - player.x;
        const dy = boss.y - player.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < MAP_DATA.tileSize * TILE_SCALE * 7) { // Rayon de détection large
            let facingBoss = false;
            if (player.direction === 'right' && dx > 0 && Math.abs(dy) < dx * 1.5) facingBoss = true;
            if (player.direction === 'left'  && dx < 0 && Math.abs(dy) < -dx * 1.5) facingBoss = true;
            if (player.direction === 'down'  && dy > 0 && Math.abs(dx) < dy * 1.5) facingBoss = true;
            if (player.direction === 'up'    && dy < 0 && Math.abs(dx) < -dy * 1.5) facingBoss = true;
            
            if (facingBoss) {
                // Corrige la trajectoire pour viser le boss parfaitement !
                vx = (dx / dist) * speed;
                vy = (dy / dist) * speed;
            }
        }
    }

    // Ajout d'une physique d'arc (Z-axis) et de rotation
    projectiles.push({ 
        x: player.x, 
        y: player.y, 
        z: 40,          // Hauteur de départ (les mains du joueur)
        vx: vx, 
        vy: vy, 
        vz: 6,          // Impulsion vers le haut
        spin: (Math.random() - 0.5) * 0.4, // Vitesse de rotation aléatoire
        emoji: item.emoji, 
        color: item.color,
        life: 1.0, 
        burst: false 
    });

    item.qty--;
    if (typeof quests !== 'undefined') {
        quests.monthly[0].current = Math.min(quests.monthly[0].target, quests.monthly[0].current + 1);
    }
    if (item.qty <= 0) {
        player.inventory.splice(player.selectedSlot, 1);
        if (player.selectedSlot >= player.inventory.length)
            player.selectedSlot = Math.max(0, player.inventory.length - 1);
    }
}

function updateProjectiles() {
    updateParticles(); // Met à jour les éclats

    for (const p of projectiles) {
        if (p.burst) { 
            p.life = 0; // Disparaît complètement, seules les particules restent
            continue; 
        }
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Gravité
        p.vz -= 0.4;
        p.z += p.vz;
        
        // Atteint le sol
        if (p.z <= 0) {
            p.z = 0;
            p.burst = true;
            createShatterEffect(p.x, p.y, p.color, p.emoji);
        }

        // Collision avec le boss
        if (typeof boss !== 'undefined' && boss.hp > 0) {
            // Hitbox un peu plus généreuse
            if (Math.hypot(boss.x - p.x, boss.y - p.y) < MAP_DATA.tileSize * TILE_SCALE * 1.5) {
                if (p.z < 80) { // Tolérance de hauteur augmentée
                    p.burst = true;
                    p.z = 0;
                    createShatterEffect(p.x, p.y, p.color, p.emoji);
                    boss.hp = Math.max(0, boss.hp - 10);
                    continue;
                }
            }
        }
        
        // Sortie d'écran
        if (p.x < MAP_OX || p.x > MAP_OX + MAP_PX_W ||
            p.y < MAP_OY || p.y > MAP_OY + MAP_PX_H) {
            p.burst = true;
            createShatterEffect(p.x, p.y, p.color, p.emoji);
        }
    }
    projectiles.splice(0, projectiles.length, ...projectiles.filter(p => p.life > 0));
}

function drawProjectiles() {
    drawParticles(); // Dessine les éclats sous/autour des projectiles

    for (const p of projectiles) {
        if (p.burst) continue; // L'objet disparaît instantanément, seules les particules restent

        ctx.save();
        ctx.globalAlpha = p.life;
        
        // 1. Dessiner l'ombre au sol
        if (p.z > 0) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.beginPath();
            // L'ombre rétrécit quand l'objet monte
            const shadowSize = Math.max(4, 25 - p.z * 0.15);
            ctx.ellipse(p.x, p.y, shadowSize, shadowSize * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // 2. Dessiner l'objet générique à sa hauteur
        ctx.translate(p.x, p.y - p.z);
        ctx.rotate(performance.now() * 0.005 + p.spin * 100);
        
        // Forme d'objet générique (comme un petit caillou ou débris)
        ctx.fillStyle = p.color || '#bdc3c7';
        ctx.beginPath();
        ctx.moveTo(-6, -6);
        ctx.lineTo(8, -4);
        ctx.lineTo(6, 6);
        ctx.lineTo(-4, 8);
        ctx.closePath();
        ctx.fill();
        
        // Petit contour brillant pour le relief
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }
}
