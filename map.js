// maps.js — généré par l'éditeur (27/04/2026 23:57:36)
// Remplace map.js dans ton projet et mets à jour index.html

const TILESETS = {
    "retro_walls": {
        "src": "Top-Down_Retro_Interior/TopDownHouse_FloorsAndWalls.png",
        "tileSize": 16,
        "label": "Retro — Murs & Sols"
    },
    "retro_furniture": {
        "src": "Top-Down_Retro_Interior/TopDownHouse_FurnitureState1.png",
        "tileSize": 16,
        "label": "Retro — Mobilier"
    },
    "modern_room": {
        "src": "Modern tiles_Free/Interiors_free/16x16/Room_Builder_free_16x16.png",
        "tileSize": 16,
        "label": "Modern — Bâtisseur"
    },
    "modern_furniture": {
        "src": "Modern tiles_Free/Interiors_free/16x16/Interiors_free_16x16.png",
        "tileSize": 16,
        "label": "Modern — Mobilier"
    }
};

const MAPS = {
    "Niveau 1": {
        cols:24, rows:14, tileSize:16, scale:5,
        layers:{
        floor: [
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]],
            [["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6],["retro_walls",10,6],["retro_walls",11,6]]
        ],
        walls: [
            [["modern_room",11,1],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",1,11],["modern_room",13,1]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],["modern_furniture",5,76],["modern_furniture",6,76],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],["modern_furniture",5,77],["modern_furniture",6,77],["retro_furniture",5,2],["retro_furniture",6,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],["modern_furniture",5,78],["modern_furniture",6,78],["retro_furniture",5,3],["retro_furniture",6,3],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",15,2],["retro_walls",10,7],["retro_walls",11,7],["modern_room",15,2],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",12,3],["modern_room",13,3]]
        ],
        objects: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
        }
    }
};

// Carte chargée par le jeu (modifiable depuis game.js)
let CURRENT_LEVEL = "Niveau 1";
const MAP_DATA = MAPS[CURRENT_LEVEL];
