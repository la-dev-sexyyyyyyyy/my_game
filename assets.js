'use strict';

function loadFrames(path, count) {
    const frames = [];
    for (let i = 0; i < count; i++) {
        const img = new Image();
        img.src = `${path}/${i + 1}.png`;
        frames.push(img);
    }
    return frames;
}

const sprites = {
    idle: {
        down:  loadFrames('asset/standard/idle/down',  2),
        up:    loadFrames('asset/standard/idle/up',    2),
        left:  loadFrames('asset/standard/idle/left',  2),
        right: loadFrames('asset/standard/idle/right', 2),
    },
    walk: {
        down:  loadFrames('asset/standard/walk/down',  9),
        up:    loadFrames('asset/standard/walk/up',    9),
        left:  loadFrames('asset/standard/walk/left',  9),
        right: loadFrames('asset/standard/walk/right', 9),
    },
    run: {
        down:  loadFrames('asset/standard/run/down',  8),
        up:    loadFrames('asset/standard/run/up',    8),
        left:  loadFrames('asset/standard/run/left',  8),
        right: loadFrames('asset/standard/run/right', 8),
    },
    shoot: {
        down:  loadFrames('asset/standard/shoot/down',  13),
        up:    loadFrames('asset/standard/shoot/up',    13),
        left:  loadFrames('asset/standard/shoot/left',  13),
        right: loadFrames('asset/standard/shoot/right', 13),
    },
    slash: {
        down:  loadFrames('asset/custom/slash_oversize/down',  6),
        up:    loadFrames('asset/custom/slash_oversize/up',    6),
        left:  loadFrames('asset/custom/slash_oversize/left',  6),
        right: loadFrames('asset/custom/slash_oversize/right', 6),
    },
};
