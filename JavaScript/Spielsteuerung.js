
//import { levelManager } from "./EbenenModul.js";
import { getlevelManager} from "./EbenenModul.js";
import { getRiddleManager} from "./RätselManager.js";



let start = false 

let Handy = false 

let isClicked = false 

let SchwierigkeitsGrad = { riddle: "Leicht" }

export function getSchwierigkeitsGrad() {
    return SchwierigkeitsGrad;
}

export function setSchwierigkeitsgrad (newriddle) {
    if(["Leicht", "Mittel", "Schwer"].includes(newriddle)){
        SchwierigkeitsGrad.riddle = newriddle
        document.dispatchEvent(new CustomEvent("SchwierigkeitsGradSet", { detail: newriddle }));
    } else {
        console.error("Ungültiger Schwierigkeitsgrad:", newLevel);
    }
}

class GameController {
    constructor( riddleManager) {
        //this.levelManager = levelManager;
        //this.riddleManager = riddleManager;
        this.state = "menu"; // Mögliche Zustände: 'menu', 'running', 'paused'
        this.StartbildschirmAnimationId = null; 
        this.HandyMode = false;
        this.startLevel = 'schulhof';
        this.Anleitung = false 
        
    }

    createButton(text, callback) {
        const button = document.createElement("button");
        button.textContent = text;
        Object.assign(button.style, {
            cursor: "pointer",
            width: "100%",
            height: "200%",
            maxHeight: "60px",
            border: "black, solid 0.3vw",
            backgroundColor: "lightgrey",
            textAlign: "1vw"
        });
        button.addEventListener("click", callback);
        return button;
    }

    // createImage(src) {
    //     const img = document.createElement("img");
    //     img.src = src;
    //     img.style.maxWidth = "100%";
    //     return img;
    // }

    async createImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
            img.style.maxWidth = "100%";
        });
    }

    // transitionGuide(elements) {
    //     gsap.to("#overlappingDiv", {
    //         opacity: 1,
    //         onComplete: () => {
    //             const guide = document.getElementById("guide");
    //             guide.innerHTML = "";
    //             guide.scrollTop = 0;
    //             elements.forEach(el => guide.appendChild(el));
    //             gsap.to("#overlappingDiv", { opacity: 0 });
    //             isClicked = false 
    //         }
    //     });
    // }

    async transitionGuide(imageSrc, scrollHint, Button) {
        document.getElementById("WartenID").style.display = "flex"
        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: async () => {
                const img = await this.createImage(imageSrc); // Warten bis Bild geladen
                document.getElementById("WartenID").style.display = "none"
                const guide = document.getElementById("guide");
                guide.style.display = "grid";
                guide.innerHTML = "";
                guide.scrollTop = 0;
                guide.appendChild(img);
                guide.appendChild(Button);
                guide.appendChild(scrollHint);
    
                gsap.to('#overlappingDiv', { opacity: 0 });
                isClicked = false;
            }
        });
        }

   

    setupStartScreenButtons() {

        
        

        const guide = document.getElementById("guide");
        const ErklärText = document.getElementById("ErklärBox");
        const Geräte = document.getElementById("Geräte");
        const SchwierigkeitsGrad = document.getElementById("SchwierigkeitsGrad")
        guide.innerHTML = "";
       
      
            Object.assign(guide.style, {
                width: `${ctx.canvas.width}px`,
                height: `${ctx.canvas.height}px`,
                overflowY: "auto",
                backgroundColor: "grey"
            });
        
    

        
       
        this.images = {
            pc: "./img2/Anleitung/SteuerungPC.png",
            handy: "./img2/Anleitung/SteuerungHandy.png",
            raetsel: "./img2/Anleitung/AnleitungRätsel.png",
            urkunde: "./img2/Anleitung/Einleitung Urkunde.png"
        };

        const scrollHint = document.createElement("div");
        scrollHint.innerHTML = "⬇ Nach unten scrollen ⬇";
        Object.assign(scrollHint.style, {
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translate(-50%)",
            fontSize: "1.2em",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "red",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            opacity: "0.8",
            animation: 'bounce 2s infinite ease-in-out',

        });

        const weiterButton = this.createButton("Weiter", () => {
            if(!isClicked){
            isClicked = true 
            audio.ButtonKlick.play();
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    guide.style.display = "none"
                    ErklärText.innerHTML = "Bitte wähle deinen Schwierigkeitsgrad aus!"
                    Geräte.style.display = "none"
                    SchwierigkeitsGrad.style.display = "grid"
                    guide.innerHTML = ""
                    gsap.to('#overlappingDiv', { opacity: 0 });
                    isClicked = false 
                }
            });
            
           
            }
        });

        const schließenButton = this.createButton("Weiter", () => {
            if(!isClicked){
                isClicked = true
                audio.ButtonKlick.play();
                //this.transitionGuide([this.createImage(this.images.urkunde), scrollHint, endButton]);
                this.transitionGuide(this.images.urkunde, scrollHint, endButton);
            }
           
        });

        const endButton = this.createButton("Schließen", () => {
            if(!isClicked){
                isClicked = true 
                audio.ButtonKlick.play();
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
                
                        this.startGame(this.startLevel); // Spiel starten
                        guide.style.display = "none"               
                        document.querySelector('#ErklärBox').style.display = 'none';
                        if(!this.HandyMode) document.querySelector('#moving').style.display = 'none';;
                         
                        gsap.to('#overlappingDiv', { opacity: 0 });
                    }
                });

            }
           
            
    
        });

        guide.addEventListener('scroll', () => {
            if (guide.scrollTop > 20) {
                scrollHint.style.opacity = '0';
                } else {
                scrollHint.style.opacity = '0.8';
                }
        });

        this.setupDeviceSelection(guide, this.images, weiterButton, scrollHint,schließenButton);

    }

    setupDeviceSelection(guide, images, weiterButton, scrollHint,schließenButton) {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const mode = e.currentTarget.innerHTML;

                if (mode === "Handy/Tablet" && !isClicked) {
                    isClicked = true
                    this.activateMode(guide, this.images.handy, weiterButton, scrollHint, true);
                } else if (mode === "PC" && !isClicked) {
                    isClicked = true
                    this.activateMode(guide, this.images.pc, weiterButton, scrollHint, false);
                } else if ((mode === "Leicht" || mode === "Mittel" || mode ==="Schwer") && !isClicked) {

                    document.getElementById("guide").style.display = "grid"
                    setSchwierigkeitsgrad(mode)
                    console.log(SchwierigkeitsGrad)
                    audio.ButtonKlick.play()
                    isClicked = true
                    const levelManager = getlevelManager()
                    this.levelManager = levelManager
                    this.riddleManager = getRiddleManager()
                    console.log(this.levelManager)
                    //this.transitionGuide([this.createImage(this.images.raetsel), scrollHint, schließenButton]);
                    this.transitionGuide(this.images.raetsel, scrollHint, schließenButton);
                } 
            });
        });
    }

    // activateMode(guide, imageSrc, weiterButton, scrollHint, isHandy) {
    //     audio.ButtonKlick.play();
    //     this.HandyMode = isHandy;
    //     console.log(`${isHandy ? "Handy" : "PC"}-Modus aktiviert.`);

    //     gsap.to('#overlappingDiv', {
    //         opacity: 1,
    //         onComplete: () => {
    //             guide.style.display = "grid";
    //             guide.appendChild(this.createImage(imageSrc));
    //             guide.appendChild(weiterButton);
    //             guide.appendChild(scrollHint);
    //             gsap.to('#overlappingDiv', { opacity: 0 });
    //             isClicked = false 
    //         }
    //     });
    // }

    async activateMode(guide, imageSrc, weiterButton, scrollHint, isHandy) {
        audio.ButtonKlick.play();
        this.HandyMode = isHandy;
    
        document.getElementById("WartenID").style.display = "flex"
        gsap.to('#overlappingDiv', {
            
            opacity: 1,
            onComplete: async () => {
                
                const img = await this.createImage(imageSrc); // Warten bis Bild geladen
                document.getElementById("WartenID").style.display = "none"
    
                guide.style.display = "grid";
                guide.innerHTML = "";
                guide.appendChild(img);
                guide.appendChild(weiterButton);
                guide.appendChild(scrollHint);
    
                gsap.to('#overlappingDiv', { opacity: 0 });
                isClicked = false;
            }
        });
    }
    

    
    
    async animateStartbildschirm(){
        
        
        document.querySelector('#Anleitung').style.display = 'none'
        document.querySelector('#IDtimer').style.display = 'none'
        document.querySelector('#movingInterface').style.display ='none'
        document.querySelector('#Interface').style.display ='none'
       
        
        //this.drawBackground()

        await this.drawBackground();

        document.querySelector('#AuswahlID').style.display = 'block';
        
        this.StartbildschirmAnimationId = window.requestAnimationFrame(() => this.animateStartbildschirm())

        
        
    }

    
    // drawBackground() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     const startImage = new Image();
    //     startImage.src = './img2/Startbildschirm/ArnoldiCode.jpg';
    //     ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    // }

    async drawBackground() {
        return new Promise((resolve, reject) => {
            const startImage = new Image();
            startImage.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
                resolve(true); // gibt true zurück, wenn alles fertig ist
            };
            startImage.onerror = (err) => {
                reject(new Error("Fehler beim Laden des Startbildes."));
            };
            startImage.src = './img2/Startbildschirm/ArnoldiCode.jpg';
        });
    }


    
    // Startbildschirm initialisieren
    initializeMenu() {
        console.log("Startbildschirm wird initialisiert.");
         // Initiale Orientierung prüfen
        this.checkAndAnimateStartScreen();

        // Buttons einrichten
        
        window.addEventListener("orientationchange", () => {
            this.checkAndAnimateStartScreen();
        });
        
    }


    // Neue Methode: Startbildschirm-Animation prüfen und starten/stoppen
    checkAndAnimateStartScreen() {
        
        const orientation = screen.msOrientation || screen.orientation || screen.mozOrientation;
        const isLandscape = orientation ? orientation.type.startsWith("landscape") : (window.innerWidth > window.innerHeight);

        if (isLandscape && !start) {
            console.log("Landscape-Modus erkannt. Animation wird gestartet.");
            if (!this.StartbildschirmAnimationId) {
                this.setupStartScreenButtons();
              
                this.animateStartbildschirm();
                
                
                
                start = false 

                
                 // Animation nur starten, wenn sie nicht bereits läuft
                
            }
        } else {
            console.log("Portrait-Modus erkannt. Animation wird gestoppt.");
            
            
        }
    }

    

    startGame(startLevel, startRiddle) {
        window.removeEventListener("resize", resizeCanvas);
        
        start = true
        console.log(Handy)
        this.state = "running";
        console.log(`Spiel startet mit Ebene: ${startLevel}`);
        
        // Animation des Startbildschirms beenden
        cancelAnimationFrame(this.StartbildschirmAnimationId);

        // Verstecke Startbildschirm-Elemente
        document.querySelector('#Geräte').style.display = 'none';
        document.querySelector('#SchwierigkeitsGrad').style.display = 'none';
        document.querySelector('#Titel').style.display = 'none';
        document.querySelector('#Interface').style.display = 'block'
        this.levelManager.startLevel(startLevel, player); // Ebene starten
        //this.levelManager.startLevel('GeschichtsRaum' ,player)
        console.log(`Spiel ist jetzt im Zustand: ${this.state}`);
    }

    togglePause() {
        console.log(this.state)
        if (this.state === "running") {
            console.log("pausieren")
            this.pauseGame();
        } else if (this.state === "paused") {
            console.log("weiter")
            this.resumeGame();
        }
    }

    pauseGame() {
        
        if(riddle) {
            this.riddleManager.pauseRiddle();
        }
        else {
            this.levelManager.pauseLevel();
            
        }
        this.state = "paused";
        
        
        console.log("Spiel pausiert");
    }

    resumeGame() {
        
        if(riddle) {
            this.riddleManager.resumeRiddle();
        } else {
          
            this.levelManager.resumeLevel();


        }
        this.state = "running";
        
       
        console.log("Spiel fortgesetzt");
    }
}



function checkOrientation() {
    const orientation = screen.msOrientation || screen.orientation || screen.mozOrientation;

    if (orientation && orientation.type.startsWith("portrait")) {
        console.log("Portrait-Modus erkannt. Spiel pausieren.");
        console.log(start)
        if(start) {
            gameController.pauseGame(); // Spiel pausieren
        }
        PleaseRotate.start()
        
    } else if (orientation && orientation.type.startsWith("landscape")) {
        console.log("Landscape-Modus erkannt. Spiel fortsetzen.");
        console.log(start)
        if(start) {
            gameController.resumeGame(); // Spiel fortsetzen
        }
        
        PleaseRotate.stop()

       
    }
}

window.addEventListener("orientationchange", checkOrientation);



// Beispiel für Initialisierung des GameControllers
export const gameController = new GameController();
console.log("GameController initialisiert:", gameController);
gameController.initializeMenu();

