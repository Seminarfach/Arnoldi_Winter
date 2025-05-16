// Lädt die Spielerbilder für alle vier Richtungen und speichert sie in einem Objekt
const playerImages = ['down', 'up', 'left', 'right'].reduce((images, direction) => {
    images[direction] = new Image();
    images[direction].src = `./img2/Spieler/Eule/player2${direction}.png`;
    return images;
}, {});

// Erstellt das Spielerobjekt mit Startposition, Bild und Animationseinstellungen
const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2, 
        y: canvas.height / 2 - 68 / 2 
    },
    image: playerImages.down,
    frames: { max: 4 },
    sprites: playerImages
});

// Speichert den Zustand der Tasten (gedrückt/nicht gedrückt)
const keys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'z'].reduce((obj, key) => {
    obj[key] = { pressed: false };
    return obj;
}, {});

// Ermöglicht alternative Steuerung mit WASD statt Pfeiltasten
const keyMap = {
    ArrowUp: 'ArrowUp', w: 'ArrowUp',
    ArrowLeft: 'ArrowLeft', a: 'ArrowLeft',
    ArrowDown: 'ArrowDown', s: 'ArrowDown',
    ArrowRight: 'ArrowRight', d: 'ArrowRight'
};

// Setzt den Tastenstatus beim Drücken oder Loslassen
window.addEventListener('keydown', (e) => {
    if (keyMap[e.key]) keys[keyMap[e.key]].pressed = true;
});

window.addEventListener('keyup', (e) => {
    if (keyMap[e.key]) keys[keyMap[e.key]].pressed = false;
});

// Speichert den Zustand der Touch-Steuerung
const movingtouch = { Up: false, Right: false, Left: false, Down: false };

// Fügt Touch-Event-Listener für jede Richtung hinzu
['Up', 'Right', 'Left', 'Down'].forEach(direction => {
    document.getElementById(direction).addEventListener('touchstart', () => {
        movingtouch[direction] = true;
    });

    document.getElementById(direction).addEventListener('touchend', () => {
        movingtouch[direction] = false;
    });
});
