

// Zugriff auf das Canvas-Element und
// es der Konstane "canvas" zuweisen.
const canvas = document.getElementById('gameCanvas');

// Der Konstante "ctx" über die Methode,
// denn entsprechenden Kontext zuweisen.
const ctx = canvas.getContext('2d');



const guide = document.getElementById("guide");


// Setzt die Canvas-Größe an die aktuelle Fenstergröße an
ctx.canvas.width = document.documentElement.clientWidth;
ctx.canvas.height = document.documentElement.clientHeight;

// Funktion zur dynamischen Größenanpassung des Canvas, wenn sich die Fenstergröße ändert
// function resizeCanvas() {
//     ctx.canvas.width = window.innerWidth * 0.7;
//     ctx.canvas.height = window.innerHeight * 0.8;
    
//     guide.style.width = ctx.canvas.width
//     guide.style.height = ctx.canvas.height
    
//}

function resizeCanvas() {
    ctx.canvas.width = window.innerWidth * 0.90;
    ctx.canvas.height = window.innerHeight * 0.95;
    
    guide.style.width = ctx.canvas.width
    guide.style.height = ctx.canvas.height
    
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initiale Anpassung der Canvas-Größe




let riddle = false 

let Handy = false 




class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = [], scrollSpeed = 1 }) {
        this.position = position; // Position der Spielfigur
        this.image = image; // Bild der Spielfigur
        this.frames = { ...frames, val: 0, elapsed: 0 }; // Animationssteuerung
        this.moving = false; // Gibt an, ob die Figur sich bewegt
        this.sprites = sprites; // Alternative Sprites für verschiedene Animationen
        this.scrollSpeed = scrollSpeed; // Steuerung der Bildlaufgeschwindigkeit
        this.frameSpeed = 10; // Geschwindigkeit der Animation

        // Setzt Breite und Höhe der Figur basierend auf der Bildgröße und der Anzahl der Frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
    }

    draw() { // 
        ctx.drawImage(
            this.image, // aktuelles Bild 
            this.frames.val * this.width, 0, // Zuschneiden des Bildes auf den aktuellen Frame
            this.width, this.height, // Breite und Höhe des ausgeschnittenen Bereichs
            this.position.x, this.position.y, // Position auf dem Canvas
            this.width, this.height // Tatsächliche Größe der gezeichneten Figur
        );

        // Animations-Update: Falls die Figur sich bewegt und mehrere Frames hat, wechsle zwischen ihnen
        if (this.moving && this.frames.max > 1) {
            this.frames.elapsed++;
            if (this.frames.elapsed % this.frameSpeed === 0) {
                this.frames.val = (this.frames.val + 1) % this.frames.max;
            }
        }
    }
}

// Allgemeine Zone-Klasse für verschiedene Bereichsarten
class Zone {
    constructor({ position, blockMovement, transitionCondition, targetLevel, anchor, width, height }) {
        this.anchor = anchor || { x: 0, y: 0 }; // Referenzpunkt zur relativen Positionierung
        this.position = { x: position.x, y: position.y }; // Position der Zone
        this.blockMovement = blockMovement; // Gibt an, ob Bewegung blockiert wird
        this.transitionCondition = transitionCondition; // Bedingung für Levelwechsel
        this.targetLevel = targetLevel; // Ziel-Level für den Übergang
        this.width = width; // Breite der Zone
        this.height = height; // Höhe der Zone
    }

    // Zeichnet die Zone als halbtransparentes rotes Rechteck
    draw(backgroundAnchor, canvas) {
        const drawX = (canvas.width / 2) - backgroundAnchor.x + this.position.x;
        const drawY = (canvas.height / 2) - backgroundAnchor.y + this.position.y;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }
}

// Spezifische Zonenarten mit vordefinierten Größen
class ZoneSchulhof extends Zone {
    constructor(props) {
        super({ ...props, width: 36, height: 36 });
    }
}

class ZoneFlur extends Zone {
    constructor(props) {
        super({ ...props, width: 72, height: 72 });
    }
}

class ZoneRaum extends Zone {
    constructor(props) {
        super({ ...props, width: 36, height: 36 });
    }
}
