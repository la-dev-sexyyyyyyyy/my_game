'use strict';

let invScroll = 0;

// État des quêtes
const quests = {
    daily: [
        { desc: "Vaincre le Boss", target: 50, current: 0 },
        { desc: "Manger des plats", target: 100, current: 0 }
    ],
    monthly: [
        { desc: "Lancer des objets", target: 5000, current: 0 },
        { desc: "Vaincre le Boss (Total)", target: 1000, current: 0 }
    ]
};

const WIN_Y = 10;
const START_Y = 80; // Espace pour le titre (10 + 70)
const ROW_H   = 48;
const ROW_PAD = 10;

function drawInventoryPanel() {
    const panelW = MAP_OX - 10;
    if (panelW < 60) return;

    const items = player.inventory;
    const time = Date.now();

    const winX = 10;
    const winY = WIN_Y;
    const winW = panelW - 10;
    const winH = canvas.height - 20;

    // --- FOND (Palette de la Map : Mur Bleu-Gris) ---
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    const bgGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
    bgGrad.addColorStop(0, '#a2b0c9'); // Bleu-Gris du mur (haut)
    bgGrad.addColorStop(1, '#818fa6'); // Bleu-Gris sombre (bas)

    ctx.fillStyle = bgGrad;
    
    if (ctx.roundRect) {
        ctx.beginPath(); ctx.roundRect(winX, winY, winW, winH, 20); ctx.fill();
    } else {
        ctx.fillRect(winX, winY, winW, winH);
    }
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Bordure façon "Bois/Cadre"
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#f4f5f7'; // Très clair pour détacher du fond noir
    if (ctx.roundRect) {
        ctx.stroke(); 
    } else {
        ctx.strokeRect(winX, winY, winW, winH);
    }

    // Reflet brillant subtil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    if (ctx.roundRect) {
        ctx.beginPath(); ctx.roundRect(winX + 2, winY + 2, winW - 4, winH * 0.12, [18, 18, 0, 0]); ctx.fill();
    } else {
        ctx.fillRect(winX + 2, winY + 2, winW - 4, winH * 0.12);
    }

    // --- TITRE ---
    ctx.font = 'bold 22px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const titleText = 'SAC À DOS';
    const titleY = winY + 35;
    
    // Contour Marron (Meubles)
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#8c5c38'; 
    ctx.strokeText(titleText, winX + winW / 2, titleY);
    
    // Intérieur Beige (Sol)
    ctx.fillStyle = '#e3cfa8'; 
    ctx.fillText(titleText, winX + winW / 2, titleY);

    // --- CONTENU ---
    const contentH = winH - 90; 
    const visibleRows = Math.floor(contentH / (ROW_H + ROW_PAD));

    for (let i = 0; i < visibleRows; i++) {
        const idx  = invScroll + i;
        if (idx >= items.length) break;
        
        const item = items[idx];
        const sel  = idx === player.selectedSlot;
        const x    = winX + 12;
        const y    = START_Y + i * (ROW_H + ROW_PAD);
        const w    = winW - 24;

        // Ombre de l'objet
        ctx.shadowColor = 'rgba(69, 81, 104, 0.5)'; // Ombre bleu foncée
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 3;

        // Couleur de la "pilule"
        if (sel) {
            // Vert de la plante pour la sélection
            const selGrad = ctx.createLinearGradient(x, y, x, y + ROW_H);
            selGrad.addColorStop(0, '#79ad79'); // Vert clair
            selGrad.addColorStop(1, '#5e915e'); // Vert sombre
            ctx.fillStyle = selGrad;
            
            const pulse = Math.sin(time / 150) * 2;
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#e3cfa8'; // Bordure beige
        } else {
            // Beige du sol pour les objets non sélectionnés
            ctx.fillStyle = '#e8d7b5'; 
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#cbae82'; // Beige plus foncé
        }

        if (ctx.roundRect) {
            ctx.beginPath(); ctx.roundRect(x, y, w, ROW_H, 16); ctx.fill(); ctx.stroke();
        } else {
            ctx.fillRect(x, y, w, ROW_H); ctx.strokeRect(x, y, w, ROW_H);
        }
        ctx.shadowColor = 'transparent';

        // Petit cercle intérieur pour l'icône
        const circleR = ROW_H / 2 - 4;
        const circleX = x + ROW_H / 2;
        const circleY = y + ROW_H / 2;
        ctx.fillStyle = sel ? 'rgba(255, 255, 255, 0.25)' : '#fdf9f1'; 
        ctx.beginPath(); ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2); ctx.fill();

        // Emoji
        ctx.font = '24px serif';
        ctx.textAlign = 'center';
        const iconOffset = sel ? Math.sin(time / 100) * 3 : 0; 
        ctx.fillText(item.emoji, circleX, circleY + iconOffset);

        // Nom de l'objet
        ctx.textAlign = 'left';
        ctx.font = 'bold 13px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif';
        const txtX = x + ROW_H + 5;
        
        let displayName = item.name.toUpperCase();
        let maxWidth = w - ROW_H - 10;
        if (item.qty > 1) {
            maxWidth -= 26; // Reserve space for the quantity badge
        }
        if (maxWidth > 10 && ctx.measureText(displayName).width > maxWidth) {
            while (displayName.length > 0 && ctx.measureText(displayName + '.').width > maxWidth) {
                displayName = displayName.substring(0, displayName.length - 1);
            }
            displayName += '.';
        }

        if (sel) {
            // Texte blanc pour contraster sur le vert
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#355235'; // Vert très sombre
            ctx.strokeText(displayName, txtX, circleY);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(displayName, txtX, circleY);
        } else {
            // Texte marron (meubles) sur fond beige
            ctx.fillStyle = '#7a4f2e'; 
            ctx.fillText(displayName, txtX, circleY);
        }

        // Quantité (Badge Jaune du tapis)
        if (item.qty > 1) {
            const qtyText = `x${item.qty}`;
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            const tw = Math.max(20, ctx.measureText(qtyText).width + 8);
            
            const badgeX = x + w - tw / 2 - 6;
            
            ctx.fillStyle = '#d9c059'; // Jaune du tapis
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(badgeX - tw/2, circleY - 10, tw, 20, 10);
            } else {
                ctx.fillRect(badgeX - tw/2, circleY - 10, tw, 20);
            }
            ctx.fill();
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.fillStyle = '#6b5413'; // Texte jaune foncé/marron
            ctx.fillText(qtyText, badgeX, circleY + 1);
        }
    }

    // --- BOUTONS DE SCROLL (Rouge du tapis) ---
    const maxScroll = Math.max(0, items.length - visibleRows);
    if (maxScroll > 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 18px sans-serif';
        
        // Bouton HAUT
        if (invScroll > 0) {
            const upY = START_Y - 15 + Math.sin(time / 150) * 2;
            ctx.fillStyle = '#b84a4a'; // Rouge du tapis
            ctx.beginPath(); ctx.arc(winX + winW / 2, upY, 14, 0, Math.PI * 2); ctx.fill();
            ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.fillText('▲', winX + winW / 2, upY + 2);
        }
        
        // Bouton BAS
        if (invScroll < maxScroll) {
            const downY = START_Y + visibleRows * (ROW_H + ROW_PAD) + 5 + Math.sin(time / 150) * 2;
            ctx.fillStyle = '#b84a4a'; // Rouge du tapis
            ctx.beginPath(); ctx.arc(winX + winW / 2, downY, 14, 0, Math.PI * 2); ctx.fill();
            ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.fillText('▼', winX + winW / 2, downY + 2);
        }
    }

    ctx.textAlign    = 'left';
    ctx.textBaseline = 'alphabetic';
}

function getInventorySlotAt(cx, cy) {
    const panelW = MAP_OX - 6;
    const winH = canvas.height - 20;
    const contentH = winH - 90;
    
    // Vérifie si le clic est dans la zone
    if (cx < 0 || cx >= panelW || cy < START_Y || cy > START_Y + contentH) return -1;
    
    const slotIndex = Math.floor((cy - START_Y) / (ROW_H + ROW_PAD));
    const visibleRows = Math.floor(contentH / (ROW_H + ROW_PAD));
    
    if (slotIndex >= visibleRows) return -1;
    return invScroll + slotIndex;
}

function scrollInventory(delta) {
    const winH = canvas.height - 20;
    const contentH = winH - 90;
    const visibleRows = Math.floor(contentH / (ROW_H + ROW_PAD));
    
    const maxScroll = Math.max(0, player.inventory.length - visibleRows);
    invScroll = Math.max(0, Math.min(maxScroll, invScroll + delta));
}

function drawBossBar() {
    if (typeof boss === 'undefined' || boss.hp <= 0) return;
    const BAR_W = 300;
    const BAR_H = 20;
    const cx    = canvas.width / 2;
    const x     = cx - BAR_W / 2;
    const y     = 8;
    const ratio = boss.hp / boss.maxHp;

    ctx.fillStyle = '#300';
    ctx.fillRect(x, y, BAR_W, BAR_H);
    ctx.fillStyle = ratio > 0.5 ? '#cc3333' : ratio > 0.25 ? '#ff6600' : '#ff2200';
    ctx.fillRect(x, y, BAR_W * ratio, BAR_H);
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, BAR_W, BAR_H);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`BOSS  ${boss.hp} / ${boss.maxHp}`, cx, y + 14);
    ctx.textAlign = 'left';
}

function drawHealthBar() {
    const BAR_W = 220;
    const BAR_H = 16;
    const cx    = canvas.width / 2;
    const x     = cx - BAR_W / 2;
    const y     = 36;
    const ratio = player.hp / player.maxHp;

    ctx.fillStyle = '#333';
    ctx.fillRect(x, y, BAR_W, BAR_H);
    ctx.fillStyle = ratio > 0.5 ? '#4caf50' : ratio > 0.25 ? '#ff9800' : '#f44336';
    ctx.fillRect(x, y, BAR_W * ratio, BAR_H);
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, BAR_W, BAR_H);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`HP  ${player.hp} / ${player.maxHp}`, cx, y + 11);
    ctx.textAlign = 'left';
}

function drawHUD() {
    drawInventoryPanel();
    drawQuestPanel();
    drawBossBar();
    drawHealthBar();
}

function drawQuestPanel() {
    // La zone à droite de la map
    const startX = MAP_OX + MAP_PX_W;
    const panelW = canvas.width - startX - 10;
    if (panelW < 60) return;

    const winX = startX + 5;
    const winY = WIN_Y;
    const winW = panelW - 5;
    const winH = canvas.height - 20;

    // --- FOND (Palette de la Map : Mur Bleu-Gris) ---
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    const bgGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
    bgGrad.addColorStop(0, '#a2b0c9');
    bgGrad.addColorStop(1, '#818fa6');
    ctx.fillStyle = bgGrad;
    
    if (ctx.roundRect) {
        ctx.beginPath(); ctx.roundRect(winX, winY, winW, winH, 20); ctx.fill();
    } else {
        ctx.fillRect(winX, winY, winW, winH);
    }
    
    ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;

    // Bordure façon "Bois/Cadre"
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#f4f5f7'; 
    if (ctx.roundRect) { ctx.stroke(); } 
    else { ctx.strokeRect(winX, winY, winW, winH); }

    // Reflet brillant subtil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    if (ctx.roundRect) {
        ctx.beginPath(); ctx.roundRect(winX + 2, winY + 2, winW - 4, winH * 0.12, [18, 18, 0, 0]); ctx.fill();
    } else {
        ctx.fillRect(winX + 2, winY + 2, winW - 4, winH * 0.12);
    }

    // --- TITRE ---
    ctx.font = 'bold 22px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const titleText = 'QUÊTES';
    const titleY = winY + 35;
    
    // Contour Marron
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#8c5c38'; 
    ctx.strokeText(titleText, winX + winW / 2, titleY);
    
    // Intérieur Beige
    ctx.fillStyle = '#e3cfa8'; 
    ctx.fillText(titleText, winX + winW / 2, titleY);

    // Fonction d'aide pour dessiner une section de quêtes
    let currentY = titleY + 40;
    
    const drawQuestSection = (title, questList, badgeColor, badgeTextCol) => {
        // Sous-titre
        ctx.font = 'bold 15px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.strokeText(title, winX + winW / 2, currentY);
        ctx.fillText(title, winX + winW / 2, currentY);
        
        currentY += 25;

        // Quêtes
        for (const q of questList) {
            const qX = winX + 10;
            const qW = winW - 20;
            let qH = 55; // Hauteur par défaut

            ctx.font = 'bold 13px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif';
            
            // Progression (Badge dessiné virtuellement d'abord pour calculer la place)
            const progText = `${q.current}/${q.target}`;
            ctx.font = 'bold 13px sans-serif';
            const tw = Math.max(35, ctx.measureText(progText).width + 12);
            const badgeX = qX + qW - tw / 2 - 8;
            
            ctx.font = 'bold 13px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif';
            let maxDescW = qW - tw - 35; // Plus de marge pour éviter le chevauchement (était - 20)
            let lines = [q.desc];
            
            // Si le texte est trop long, on regarde si la souris survole
            if (ctx.measureText(q.desc).width > maxDescW) {
                // Zone de survol approximative (on l'agrandit un peu pour éviter le flickering quand on descend)
                const isHovered = (typeof mouseX !== 'undefined' && mouseX >= qX && mouseX <= qX + qW && mouseY >= currentY && mouseY <= currentY + 100);
                
                if (isHovered) {
                    // Mode expansé : on coupe les mots
                    const words = q.desc.split(' ');
                    lines = [];
                    let currentLine = words[0];
                    for (let i = 1; i < words.length; i++) {
                        const word = words[i];
                        const allowedWidth = (lines.length === 0) ? maxDescW : (qW - 20);
                        if (ctx.measureText(currentLine + " " + word).width < allowedWidth) {
                            currentLine += " " + word;
                        } else {
                            lines.push(currentLine);
                            currentLine = word;
                        }
                    }
                    lines.push(currentLine);
                    qH = 30 + lines.length * 18;
                    if (qH < 55) qH = 55;
                } else {
                    // Mode tronqué
                    let desc = q.desc;
                    while (desc.length > 0 && ctx.measureText(desc + '..').width > maxDescW) {
                        desc = desc.substring(0, desc.length - 1);
                    }
                    lines = [desc + '..'];
                }
            }

            // Ombre
            ctx.shadowColor = 'rgba(69, 81, 104, 0.5)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 3;

            const isDone = q.current >= q.target;

            if (isDone) {
                const selGrad = ctx.createLinearGradient(qX, currentY, qX, currentY + qH);
                selGrad.addColorStop(0, '#79ad79');
                selGrad.addColorStop(1, '#5e915e');
                ctx.fillStyle = selGrad;
                ctx.strokeStyle = '#e3cfa8';
                ctx.lineWidth = 3;
            } else {
                ctx.fillStyle = '#e8d7b5'; 
                ctx.strokeStyle = '#cbae82';
                ctx.lineWidth = 2;
            }

            if (ctx.roundRect) {
                ctx.beginPath(); ctx.roundRect(qX, currentY, qW, qH, 14); ctx.fill(); ctx.stroke();
            } else {
                ctx.fillRect(qX, currentY, qW, qH); ctx.strokeRect(qX, currentY, qW, qH);
            }
            ctx.shadowColor = 'transparent';

            // Dessin du badge (toujours aligné en haut à droite)
            ctx.fillStyle = isDone ? '#d9c059' : badgeColor;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(badgeX - tw/2, currentY + 55 / 2 - 12, tw, 24, 12);
            } else {
                ctx.fillRect(badgeX - tw/2, currentY + 55 / 2 - 12, tw, 24);
            }
            ctx.fill();
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.font = 'bold 13px sans-serif';
            ctx.fillStyle = isDone ? '#6b5413' : badgeTextCol;
            ctx.fillText(isDone ? 'OK!' : progText, badgeX, currentY + 55 / 2 + 1);

            // Texte de la quête
            ctx.textAlign = 'left';
            ctx.font = 'bold 13px "Comic Sans MS", "Arial Rounded MT Bold", sans-serif'; 
            ctx.fillStyle = isDone ? '#ffffff' : '#7a4f2e';
            
            // Centrage vertical par rapport à la case si 1 ligne, sinon on commence plus haut
            let textY = currentY + 55 / 2 + 1; 
            if (lines.length > 1) {
                textY = currentY + 22;
            }

            for (let j = 0; j < lines.length; j++) {
                if (isDone) {
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#355235';
                    ctx.strokeText(lines[j], qX + 10, textY + j * 18);
                    ctx.fillStyle = '#ffffff';
                }
                ctx.fillText(lines[j], qX + 10, textY + j * 18);
            }

            currentY += qH + 8;
        }
    };

    drawQuestSection("QUOTIDIENNES", quests.daily, '#b84a4a', '#ffffff'); // Rouge tapis
    currentY += 10;
    drawQuestSection("MENSUELLES", quests.monthly, '#339af0', '#ffffff'); // Bleu (pour contraster)

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
}
