// maps.js — généré par l'éditeur (29/04/2026 21:09:27)
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
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["retro_walls",10,3],["retro_walls",10,3],["retro_walls",10,3],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],["retro_walls",10,2],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        floor_deco: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,["modern_furniture",7,15],["modern_furniture",8,15],["modern_furniture",9,15],["modern_furniture",10,15],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,["modern_furniture",7,16],["modern_furniture",8,16],["modern_furniture",9,16],["modern_furniture",10,16],0,0,0,0,0,0,0,0,0,["modern_furniture",5,10],["modern_furniture",6,10],["modern_furniture",9,10],["modern_furniture",9,10],["modern_furniture",9,10],["modern_furniture",7,10],["modern_furniture",8,10],0],
            [0,0,0,["modern_furniture",7,17],["modern_furniture",8,17],["modern_furniture",9,17],["modern_furniture",10,17],0,0,0,0,0,0,0,0,0,["modern_furniture",5,11],["modern_furniture",6,11],["modern_furniture",9,11],["modern_furniture",9,11],["modern_furniture",9,11],["modern_furniture",7,11],["modern_furniture",8,11],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",5,12],["modern_furniture",6,12],["modern_furniture",9,12],["modern_furniture",9,12],["modern_furniture",9,12],["modern_furniture",7,12],["modern_furniture",8,12],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        walls: [
            [["modern_room",11,1],["modern_room",0,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",13,1]],
            [["modern_room",11,2],["modern_room",0,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],["modern_room",0,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",2,17],0,0,0,["modern_room",0,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",1,17],["modern_room",2,17],["modern_room",13,2]],
            [["modern_room",11,2],["modern_room",0,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",2,18],0,0,0,["modern_room",0,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",1,18],["modern_room",2,18],["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_room",13,2]],
            [["modern_room",11,2],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",2,8],0,0,["modern_furniture",0,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_furniture",1,8],["modern_room",13,2]]
        ],
        walls_deco: [
            [0,0,["modern_furniture",8,22],["modern_furniture",9,22],["modern_furniture",0,24],["modern_furniture",1,24],0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",10,66],["modern_furniture",11,66],0,0,0],
            [0,0,["modern_furniture",8,23],["modern_furniture",9,23],["modern_furniture",0,25],["modern_furniture",1,25],0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",10,67],["modern_furniture",11,67],0,0,0],
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
        ],
        objects: [
            [0,0,0,0,0,0,["modern_furniture",7,48],["modern_furniture",8,48],["modern_furniture",11,48],["modern_furniture",12,48],0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",13,44],["modern_furniture",14,44],0,0,0,["modern_furniture",7,49],["modern_furniture",8,49],["modern_furniture",11,49],["modern_furniture",12,49],0,0,0,0,0,0,0,["modern_furniture",10,40],["modern_furniture",11,40],0,0,["modern_furniture",11,35],["modern_furniture",12,35],0],
            [0,["modern_furniture",13,45],["modern_furniture",14,45],0,0,0,["modern_furniture",7,50],["modern_furniture",8,50],["modern_furniture",11,50],["modern_furniture",12,50],0,0,0,0,0,0,0,["modern_furniture",10,41],["modern_furniture",11,41],0,0,["modern_furniture",11,36],["modern_furniture",12,36],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",11,37],["modern_furniture",12,37],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,["modern_furniture",11,48],["modern_furniture",12,48],0,0,0,0,0,0,["modern_furniture",11,48],["modern_furniture",12,48],["modern_furniture",7,48],["modern_furniture",8,48],0,["modern_furniture",0,55],["modern_furniture",1,55],["modern_furniture",2,55],0,0],
            [0,0,0,0,0,0,["modern_furniture",11,49],["modern_furniture",12,49],0,0,0,0,0,0,["modern_furniture",11,49],["modern_furniture",12,49],["modern_furniture",7,49],["modern_furniture",8,49],0,["modern_furniture",0,56],["modern_furniture",1,56],["modern_furniture",2,56],0,0],
            [0,0,0,["modern_furniture",4,72],["modern_furniture",5,72],["modern_furniture",6,72],["modern_furniture",11,50],["modern_furniture",12,50],0,0,0,0,0,0,["modern_furniture",11,50],["modern_furniture",12,50],["modern_furniture",7,50],["modern_furniture",8,50],0,["modern_furniture",1,58],["modern_furniture",1,58],["modern_furniture",1,58],["modern_furniture",15,39],0],
            [0,0,0,["modern_furniture",4,73],["modern_furniture",5,73],["modern_furniture",6,73],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",15,40],0],
            [0,["modern_furniture",5,76],["modern_furniture",6,76],["retro_furniture",5,2],["retro_furniture",6,2],0,0,["modern_furniture",7,21],0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",15,41],0],
            [0,["modern_furniture",5,77],["modern_furniture",6,77],["retro_furniture",5,3],["retro_furniture",6,3],["modern_furniture",6,13],0,["modern_furniture",7,22],0,0,0,0,0,0,0,0,0,["modern_furniture",11,13],["modern_furniture",12,13],["modern_furniture",12,14],["modern_furniture",11,12],["modern_furniture",11,14],0,0],
            [0,["modern_furniture",5,78],["modern_furniture",6,78],0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",11,13],["modern_furniture",11,14],["modern_furniture",12,13],["modern_furniture",12,14],["modern_furniture",11,12],0,0],
            [0,["modern_furniture",2,80],["modern_furniture",2,80],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        objects_top: [
            [0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",4,24],["modern_furniture",5,24],["modern_furniture",6,24],0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",4,25],["modern_furniture",5,25],["modern_furniture",6,25],0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",12,56],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",12,57],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,["modern_furniture",12,58],0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",12,56],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",12,57],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",12,58],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,["modern_furniture",11,12],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",13,44],["modern_furniture",14,44],["retro_furniture",10,0],0,["retro_furniture",10,0],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",13,45],["modern_furniture",14,45],["retro_furniture",10,1],0,["retro_furniture",10,1],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,["modern_furniture",13,46],["modern_furniture",14,46],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        ceiling: [
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
