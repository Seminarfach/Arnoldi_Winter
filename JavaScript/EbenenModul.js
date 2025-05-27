
import { riddleManager } from './RätselManager.js';

import { schulhofConfig, InformatikRaumConfig, EnglischRaumConfig, GeschichtsRaumConfig, MatheRaumConfig,getAulaConfig} from './Räume.js'
import { Flur000Config, Flur000DanachConfig,  Flur100Config, Flur100DanachConfig, Flur200Config, Flur200DanachConfig,
        Flur300Config, Flur300DanachConfig, Flur400Config } from './Flure.js'

    
let snowflakes = [];

        const flakeChars = ["❄"]
        function createSnowflakes(count) {
            for (let i = 0; i < count; i++) {
              snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedY: Math.random() * 1 + 0.5,
                speedX: Math.random() * 0.5 - 0.25,
                offset: Math.random() * 100,
                char: flakeChars[Math.floor(Math.random() * flakeChars.length)]
              });
            }
          }



        function updateSnowflakes() {
          for (let flake of snowflakes) {
            flake.y += flake.speedY;
            flake.x += Math.sin((flake.y + flake.offset) / 50) * 0.5;
            if (flake.y > canvas.height) {
                flake.y = 0;
                flake.x = Math.random() * canvas.width;
              }
          }

        }

        function drawSnowflakes() {
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          for (let flake of snowflakes) {
            ctx.font = `${flake.size}px serif`;
            ctx.fillText(flake.char, flake.x, flake.y);
          }
        }

let Interface = false
class LevelManager {
    constructor(levelConfig, zoneDefaults) {
        this.config = levelConfig; // Konfiguration für alle Ebenen
        this.zoneDefaults = zoneDefaults; // Standardwerte für Zonen
        this.currentLevel = null; // Aktive Ebene
        this.player = null; // Spieler-Referenz
        this.movables = []; // Bewegliche Objekte der aktuellen Ebene
        this.globalOffset = { x: 0, y: 0};
        this.shouldAdjustBackground = false;
        this.lastPlayerPosition = null 
        this.initializeZones(); // Automatische Zonen-Erstellung
        this.initialBackgroundAnchor = null
        this.initialBackgroundPosition = null
        this.allowVerticalMovement = false;
        this.allowHorizontalMovement = false;
        this.drawbackgroundAfter = false 

        
    }

    calculateGlobalOffset() {

        const canvas = document.querySelector('#gameCanvas');
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const level = this.config[this.currentLevel];
        if (!level || !level.backgroundAnchor) {
            console.error("Fehler: Hintergrundanker fehlt in der Konfiguration.");
            return;
        }

        
        //console.log(this.lastPlayerPosition)
        const levelanchor = level.backgroundAnchor

        const newlevelanchor = this.lastPlayerPosition

        console.log(this.globalOffset)


        if(this.shouldAdjustBackground && this.NewPlayerPosition) {

            this.globalOffset.x = canvasCenterX - newlevelanchor.x - player.position.x;
            this.globalOffset.y = canvasCenterY - newlevelanchor.y - player.position.y;
            
            
        } else if(!this.shouldAdjustBackground && !this.NewPlayerPosition) {
    
            this.globalOffset.x = canvasCenterX - levelanchor.x - player.position.x;
            this.globalOffset.y = canvasCenterY - levelanchor.y - player.position.y;
            
        } else if(this.NewPlayerPosition) {
           
            this.globalOffset.x = canvasCenterX - roomAnchor.x - player.position.x;
            this.globalOffset.y = canvasCenterY - roomAnchor.y - player.position.y;
    
        } 

    

         

   

    }
    
    

    // Automatische Zonen-Erstellung basierend auf dem dataArray
    initializeZones() {
        Object.keys(this.config).forEach(levelName => {
            //console.log(`Initialisiere Zonen für Ebene: ${levelName}`);
            const level = this.config[levelName];

            // Prüfen, ob ein dataArray vorhanden ist
            if (level.zones && Array.isArray(level.zones)) {
                level.zones.forEach(zoneConfig => {


                    const zones = this.createZones(
                        zoneConfig.dataArray,
                        zoneConfig.tileWidth || this.zoneDefaults.tileWidth,
                        zoneConfig.tileHeight || this.zoneDefaults.tileHeight,
                        zoneConfig.matchSymbol || this.zoneDefaults.matchSymbol,
                        zoneConfig.ZoneClass || this.zoneDefaults.ZoneClass,
                        zoneConfig.blockMovement,
                        zoneConfig.transitionCondition,
                        zoneConfig.targetLevel,
                        zoneConfig.anchor
                    );

                    if (!level.allZones) level.allZones = [];
                    level.allZones.push(...zones);
                });
            } else {
                console.error(`Fehler: Keine gültigen Zonen für Ebene "${levelName}" definiert.`);
            }
        });
    }

    // Zonen-Erstellungsfunktion
    createZones(dataArray, tileWidth, tileHeight, matchSymbol,ZoneClass, blockMovement, transitionCondition, targetLevel, anchor) {
        
        if (!dataArray || !Array.isArray(dataArray)) {
            console.error('Fehler: Ungültiges oder fehlendes dataArray in createZones:', dataArray);
            return [];
        }
        
        
        
        const zonesMap = [];

        // Aufteilen der Daten in Reihen
        for (let i = 0; i < dataArray.length; i += 70) {
            zonesMap.push(dataArray.slice(i, i + 70));
        }

        const zones = [];
        
        

        //Erstellen der Zonen basierend auf den Symbolen
        zonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === matchSymbol) {
                    zones.push(new ZoneClass({
                        position: {
                            x: j * tileWidth,
                            y: i * tileHeight  
                        },
                        blockMovement,
                        transitionCondition,
                        targetLevel,
                        anchor,
                        
                    }));
                    
                }
            });
        });

       
        return zones;
    }

    // Spieler in Bezug auf den Hintergrund positionieren
    


    // Ebene starten
    startLevel(levelName, player) {
        //console.log(riddleManager.config)
        document.getElementById("HilfeContainer").style.display = "block"
        console.log(levelName)
        if(levelName === "schulhof") {
            createSnowflakes(100);
        } else {
            snowflakes = []
        }
        if(riddleManager.isCompleted) {
            this.drawbackgroundAfter = true
            riddleManager.isCompleted = false 
        }
        else {
            this.drawbackgroundAfter = false 
        }

        document.querySelector('#DialogBox').style.display = "none"
        document.querySelector('#RewardBox').style.display = "none"
        const HandyContainer = document.getElementById('moving')
        const HandyValue = window.getComputedStyle(HandyContainer).display
        
        if(HandyValue == 'grid') Handy = true     
        //console.log(this.shouldAdjustBackground)

        this.resizeCanvas()
        audio.Map.play()
        if (!this.config[levelName]) {
            console.error(`Fehler: Ebene "${levelName}" existiert nicht in der Konfiguration.`);
            return;
        }

        const newConfig = this.config[levelName];

        this.currentLevel = levelName;

        if(this.config[this.currentLevel].flur) {

            
            this.shouldAdjustBackground = false 
            this.NewPlayerPosition = false 

        }
        
        
        this.player = player;
        this.player.position.x = canvas.width / 2 - (192 / 4) / 2
        this.player.position.y = canvas.height /2 - 68  / 2
        console.log(this.player)



        const level = this.config[levelName];
        //this.calculateZoneOffset()
        this.calculateGlobalOffset()
        if (level.background) {
            this.adjustBackgroundPosition(level.background, level.foreground, level.backgroundAfter);
        }

        //this.initializeZones()

        //console.log(`Starte Ebene: ${levelName}`);

        this.checkLevelConfig(level);
        this.initializeUI(level.ui);
        this.updateMovables();

            //Dialogbox anzeigen, falls in der Konfiguration definiert
        if (level.dialog?.show) {
            
            
            this.player.image = player.sprites.down; 
           
                const canvas = document.querySelector('#gameCanvas');
                this.interfaceElement = document.querySelector('#Interface');
                this.interfaceElement.style.display = 'block';
                this.interfaceElement.style.width = `${canvas.width}px`;
                this.interfaceElement.style.height = `${canvas.height * 0.3}px`; // 30% der Canvas-Höhe
                document.querySelector('#Content').style.display = 'none'
                Interface = true
                

            
            const dialogBox = document.querySelector('#GuideBox');
            const dialogText = document.querySelector('#GuideText');
            const fortfahrenButton = document.querySelector('#Weiter');
            fortfahrenButton.style.height = "100%"
            fortfahrenButton.style.width = "75%"

            if (dialogBox && dialogText && fortfahrenButton && !this.shouldAdjustBackground) {
                dialogBox.style.display = 'grid';
                dialogText.innerHTML = level.dialog.text || '';
                fortfahrenButton.style.display = 'inline-block';
           
                

                // Bewegung blockieren, bis auf Fortfahren geklickt wird
                if (level.blockMovementUntilContinue) {
                    console.log("Bewegung blockiert.");
                    this.player.movementBlocked = true;
                    console.log("Erklärung")

                    
                    fortfahrenButton.addEventListener('click', () => {
                        
                        
                        console.log("Fortfahren gedrückt.");
                        dialogBox.style.display = 'none';
                        this.interfaceElement.style.display = 'none';
                        this.player.movementBlocked = false; // Bewegung erlauben
                        console.log(Handy)
                        if(Handy) {
                            document.querySelector('#movingInterface').style.display = 'block';
                        }
                    }, { once: true });
                }
            } else {
                dialogBox.style.display = 'none';
                this.interfaceElement.style.display = 'none'
                console.log(Handy)
                if(Handy) {
                    document.querySelector('#movingInterface').style.display = 'block';

                }
            
                console.error("Dialog-Elemente nicht gefunden!");
            }
        }

        this.initialBackgroundPosition = {
            x: level.background.position.x,
            y: level.background.position.y
        };
    
        this.initialBackgroundAnchor = { 
            x: level.backgroundAnchor.x, 
            y: level.backgroundAnchor.y 
        };

    
        

        
        // Starte Animation
        this.animateLevel(newConfig);
    }

    // Konfigurationsprüfung
    checkLevelConfig(level) {
        if (!level.background) {
            console.error(`Fehler: Hintergrund für Ebene "${this.currentLevel}" fehlt.`);
        }

        if (!Array.isArray(level.zones) && !level.dataArray) {
            console.error(`Fehler: Weder Zonen noch ein dataArray für Ebene "${this.currentLevel}" definiert.`);
        }

        

        if (!level.ui || typeof level.ui !== 'object') {
            console.error(`Fehler: UI-Konfiguration für Ebene "${this.currentLevel}" fehlt oder ist ungültig.`);
        }
    }

    // UI initialisieren
    initializeUI(uiConfig) {
        if (!uiConfig) {
            console.error('UI-Konfiguration fehlt.');
            return;
        }
        
        
        document.querySelector('#Titel').style.display = uiConfig.title ? 'block' : 'none';
        document.querySelector('#Interface').style.display = uiConfig.interface ? 'block' : 'none';
        if(Handy) {
            document.querySelector('#movingInterface').style.display = uiConfig.interface = 'block' ;
        }

        document.querySelector('#IDtimer').style.display = 'none';

       

        
    }
    // Anpassung der Hintergrundposition mit dem globalen Offset
    adjustBackgroundPosition(background, foreground, backgroundAfter) {

        const canvas = document.querySelector('#gameCanvas');
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const level = this.config[this.currentLevel];
        if (!level?.backgroundAnchor) {
            console.error("Kein Hintergrund-Fixpunkt (`backgroundAnchor`) definiert.");
            return;
    }

    //const anchor = level.backgroundAnchor; // Fixpunkt im Hintergrund
    
    const anchor = level.backgroundAnchor
    const newanchor = this.lastPlayerPosition
    
    const roomAnchor = this.lastRoomPosition

    function setPosition(element, point) {
        if (element) {
            element.position.x = canvasCenterX - point.x;
            element.position.y = canvasCenterY - point.y;
        }
    }
   
    
    if(this.shouldAdjustBackground && this.NewPlayerPosition) {
        // Berechne die neue Position des Hintergrunds so, dass der Fixpunkt relativ zur Canvas-Mitte bleibt
        setPosition(background,newanchor)
        if(level.foreground) setPosition(foreground,newanchor)
        if(level.backgroundAfter) setPosition(backgroundAfter,newanchor)
       
    } else if(!this.shouldAdjustBackground && !this.NewPlayerPosition) {

        setPosition(background,anchor)
        if(level.foreground) setPosition(foreground,anchor)
        if(level.backgroundAfter) setPosition(backgroundAfter,anchor)
          
    } else if(this.NewPlayerPosition) {

        setPosition(background, roomAnchor)
        if(level.foreground) setPosition(foreground, roomAnchor) 
        if(level.backgroundAfter) setPosition(backgroundAfter, roomAnchor)

    }


    }
        
    

    // Größe des Canvas und Offset bei Größenänderung anpassen
    // resizeCanvas() {
    //     const canvas = document.querySelector('#gameCanvas');
    //     canvas.width = document.documentElement.clientWidth * 0.7;
    //     canvas.height = document.documentElement.clientHeight * 0.8;
        
    //     this.calculateGlobalOffset(); // Offset nach der Größenänderung neu berechnen
    //     this.updateMovables()

        
    // }

     resizeCanvas() {
        const canvas = document.querySelector('#gameCanvas');
        canvas.width = document.documentElement.clientWidth * 0.90;
        canvas.height = document.documentElement.clientHeight * 0.95;
        
        this.calculateGlobalOffset(); // Offset nach der Größenänderung neu berechnen
        this.updateMovables()

        
    }

    
    
    // Animation der Ebene
    animateLevel(level) {
         
        
        const animate = () => {
            if (!level.background || !this.player) {
                console.error('Animation abgebrochen: Hintergrund oder Spieler fehlt.');
                cancelAnimationFrame(this.currentAnimationId);
                return;
            }
            

            this.currentAnimationId = requestAnimationFrame(animate);

            

            // Canvas reinigen
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Hintergrund zeichnen
            if(this.drawbackgroundAfter && level.backgroundAfter) {
                console.log("neuer Hintergrund")
                
                level.backgroundAfter.draw()
                
                
            } else {
                level.background.draw()
                
            }
            
            
            //console.log(level.background.position)
            this.player.draw();

            if(level.foreground) {
                level.foreground.draw()

            }
                
            (level.allZones || []).forEach(zone => {
                        if (zone.draw) {
                            zone.draw(level.backgroundAnchor, canvas);
                        } else {
                            console.error('Zone fehlt eine gültige Draw-Methode:', zone);
                        }
                        
            });
       
            updateSnowflakes();
            drawSnowflakes();
            
            // Spielerbewegung prüfen
            this.handleMovement();
        };

        animate();
    }
    

    // Ebene pausieren
    pauseLevel() {
       
        if (this.currentAnimationId) {
            cancelAnimationFrame(this.currentAnimationId);
            this.currentAnimationId = null;
            console.log("Ebene pausiert");
        }
    }

    // Ebene fortsetzen
    resumeLevel() {
       
        
        if (!this.currentAnimationId) {
            console.log("Ebene wird fortgesetzt");
            
            this.animateLevel(this.config[this.currentLevel]);
        }
    }

    rectangularCollision({ rectangle1, rectangle2, direction }) {
        const tolerance = 5;
    
        const horizontalOverlap = 
            rectangle1.position.x + rectangle1.width - tolerance > rectangle2.position.x &&
            rectangle1.position.x + tolerance < rectangle2.position.x + rectangle2.width;
    
        const verticalOverlap = 
            rectangle1.position.y + rectangle1.height - tolerance > rectangle2.position.y &&
            rectangle1.position.y + tolerance < rectangle2.position.y + rectangle2.height;
    
        switch (direction) {
            case 'up':
                return horizontalOverlap && 
                    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
                    rectangle1.position.y >= rectangle2.position.y;
            case 'down':
                return horizontalOverlap && 
                    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
                    rectangle1.position.y + rectangle1.height <= rectangle2.position.y + rectangle2.height;
            case 'left':
                return verticalOverlap && 
                    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                    rectangle1.position.x >= rectangle2.position.x;
            case 'right':
                return verticalOverlap && 
                    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                    rectangle1.position.x + rectangle1.width <= rectangle2.position.x + rectangle2.width;
            default:
                return false;
        }
    }
    
    

    BewegungSpieler({ player, zones, direction, step, background, backgroundAfter }) {
        const level = this.config[this.currentLevel];
    
        // Bewegungs-Offsets und Spieler-Sprite setzen
        const offsets = {
            up: { x: 0, y: step, sprite: player.sprites.up },
            down: { x: 0, y: -step, sprite: player.sprites.down },
            left: { x: step, y: 0, sprite: player.sprites.left },
            right: { x: -step, y: 0, sprite: player.sprites.right },
        };
    
        const { x: offsetX, y: offsetY, sprite } = offsets[direction] || { x: 0, y: 0, sprite: player.image };
        player.image = sprite;
    
        const nextPosition = {
            x: player.position.x + offsetX,
            y: player.position.y + offsetY,
        };
    
        let canMove = true;
        let transitionTriggered = false;
        let allowHorizontalMovement = false;
        let allowVerticalMovement = false;
    
        // Kollisionsprüfung
        for (const zone of zones) {
            const zonePosition = {
                x: canvas.width / 2 - level.backgroundAnchor.x + zone.position.x,
                y: canvas.height / 2 - level.backgroundAnchor.y + zone.position.y,
            };
    
            if (this.rectangularCollision({
                rectangle1: { ...player, position: nextPosition },
                rectangle2: { ...zone, position: zonePosition },
                direction,
            })) {
                if (zone.blockMovement) {
                    canMove = false;
                    if (direction === 'left' || direction === 'right') allowVerticalMovement = true;
                    if (direction === 'up' || direction === 'down') allowHorizontalMovement = true;
                }
    
                if (zone.transitionCondition && zone.transitionCondition()) {
                    transitionTriggered = true;
                    this.handleTransition({
                        player,
                        zones: levelManager.movables,
                        audio: { Map: audio.Map, Tuer: audio.Tuer },
                        nextAnimation: () => zone.targetLevel && levelManager.startLevel(zone.targetLevel, levelManager.player),
                        currentAnimationId: levelManager.currentAnimationId,
                        transitionAudio: { stop: ['Map'], play: ['Tuer'] },
                    });
                    break;
                }
            }
        }
    
        if (canMove) {
            // Aktualisiere alle beweglichen Objekte
            levelManager.updateMovables().forEach(movable => {
                movable.position.x += offsetX;
                movable.position.y += offsetY;
            });
    
            const bg = this.drawbackgroundAfter && level.backgroundAfter ? backgroundAfter : background;
            bg.position.x += offsetX;
            bg.position.y += offsetY;
    
            // Animations-Frame aktualisieren
            if (!player.frameTimer) player.frameTimer = 0;
            if (++player.frameTimer >= 15) {
                player.frames.val = (player.frames.val + 1) % player.frames.max;
                player.frameTimer = 0;
            }
        } else {
            if (allowVerticalMovement) {
                levelManager.updateMovables().forEach(movable => movable.position.y += offsetY);
                background.position.y += offsetY;
            }
            if (allowHorizontalMovement) {
                levelManager.updateMovables().forEach(movable => movable.position.x += offsetX);
                background.position.x += offsetX;
            }
        }
    }
    

    // Spielerbewegung
    handleMovement() {
        if (!this.player || !this.movables || this.player.movementBlocked) return;
        //this.resetMovementDirections()
        if (keys.ArrowUp.pressed || movingtouch.Up) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'up', step: 3, background: this.config[this.currentLevel].background, backgroundAfter: this.config[this.currentLevel].backgroundAfter});
            
        } else if (keys.ArrowLeft.pressed || movingtouch.Left) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'left', step: 3, background: this.config[this.currentLevel].background, backgroundAfter: this.config[this.currentLevel].backgroundAfter});
            
        } else if (keys.ArrowDown.pressed || movingtouch.Down) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'down', step: 3, background: this.config[this.currentLevel].background, backgroundAfter: this.config[this.currentLevel].backgroundAfter});
            
        } else if (keys.ArrowRight.pressed || movingtouch.Right) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'right', step: 3, background: this.config[this.currentLevel].background, backgroundAfter: this.config[this.currentLevel].backgroundAfter });
            
        }

        
    }

    calculateNewBackgroundAnchor() {
        const level = this.config[this.currentLevel];
    
        // Aktuelle Hintergrundposition
        const aktuelleHintergrundPosition = {
            x: level.background.position.x,
            y: level.background.position.y
        };
        
        // Berechnung des neuen `backgroundAnchor`
        const neuerBackgroundAnchor = {
            x: this.initialBackgroundAnchor.x + (this.initialBackgroundPosition.x - aktuelleHintergrundPosition.x),
            y: this.initialBackgroundAnchor.y + (this.initialBackgroundPosition.y - aktuelleHintergrundPosition.y)
        };
    
        return neuerBackgroundAnchor;
    }
    

    
    

    handleTransition({
        player,
        zones,
        audio,
        nextAnimation,
        currentAnimationId,
        transitionAudio = { stop: [], play: []},
        
    }) {

        if (currentAnimationId) {
            console.log(`Animation mit ID ${currentAnimationId} beendet.`);
            cancelAnimationFrame(currentAnimationId);
        }

        

        // Audio-Handling für die Transition
        const { stop = [], play = [] } = transitionAudio;

            // Standard Audio-Handling
            stop.forEach((audioKey) => {
                if (audio[audioKey]) {
                    console.log(`Stoppe Audio: ${audioKey}`);
                    audio[audioKey].stop();
                }
            });
    
            play.forEach((audioKey) => {
                if (audio[audioKey]) {
                    console.log(`Spiele Audio: ${audioKey}`);
                    audio[audioKey].play();
                }
            });
        
    
       


        if (typeof nextAnimation === 'function') {
          
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 3,
                yoyo: true,
                duration: 0.4,
                onComplete: () => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete: () => {
                            nextAnimation();
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.4,
                            });

                           

                            if (this.config[this.currentLevel].riddle){
                                console.log("Position merken")


                                if(!this.shouldAdjustBackground && this.config[this.currentLevel].riddle ){

                                    this.lastPlayerPosition = this.calculateNewBackgroundAnchor()
                                    this.NewPlayerPosition = true 

                                } else if(this.NewPlayerPosition && this.config[this.currentLevel].riddle) {

                                    this.lastRoomPosition = this.calculateNewBackgroundAnchor()
                                    this.NewPlayerPosition = false 
                                }

                            

                            }; 

                            
                        },
                    });
                },
            });
        } else {
            console.error("nextAnimation ist keine gültige Funktion.");
        }

        
    }

    // Aktualisiere movables
    updateMovables() {
        const level = this.config[this.currentLevel];

        if (!level) {
            console.error(`Fehler: Keine Daten für aktive Ebene "${this.currentLevel}" gefunden!`);
            return [];
        }

        const movables = [
            
            level.foreground,  // Vordergrund der aktuellen Ebene (falls vorhanden)
            ...(level.allZones || []), // Zonen der aktuellen Ebene
        ].filter(item => !!item); // Entferne undefined- oder null-Werte

        
        this.movables = movables;
        return movables;
    }

    // Event-Listener für Fenstergrößenänderung
    onResize() {

        // window.addEventListener('resize', () => {
        //     const canvas = document.querySelector('#gameCanvas');
        //     canvas.width = document.documentElement.clientWidth * 0.7;
        //     canvas.height = document.documentElement.clientHeight * 0.8;
    
        //     console.log("Canvas-Größe aktualisiert:", { width: canvas.width, height: canvas.height });
        // });

        window.addEventListener('resize', () => {
                const canvas = document.querySelector('#gameCanvas');
                canvas.width = document.documentElement.clientWidth * 0.90;
                canvas.height = document.documentElement.clientHeight * 0.95;
        
                console.log("Canvas-Größe aktualisiert:", { width: canvas.width, height: canvas.height });
        });
        
    }
    
}
let levelManager = null;
export function getlevelManager() {
    return levelManager
}

document.addEventListener("RiddleConfigReady", () => {
    console.log("Initialisiere LevelManger")
    const AulaConfig = getAulaConfig()
    levelManager = new LevelManager({ schulhof: schulhofConfig, flur0: Flur000Config, flur0Danach: Flur000DanachConfig, InformatikRaum: InformatikRaumConfig, 
                                                    flur1: Flur100Config, flur1Danach: Flur100DanachConfig, EnglischRaum: EnglischRaumConfig,
                                                    flur2: Flur200Config, flur2Danach: Flur200DanachConfig, GeschichtsRaum: GeschichtsRaumConfig,
                                                    flur3: Flur300Config, flur3Danach: Flur300DanachConfig, MatheRaum: MatheRaumConfig,
                                                    flur4: Flur400Config, Aula: AulaConfig,
    })
    document.dispatchEvent(new Event("LevelManagerReady"))
    
});

// export let levelManager = null; // Noch nicht initialisiert

// document.addEventListener("RiddleConfigReady", () => {
//     const levelManager = new LevelManager({ schulhof: schulhofConfig, flur0: Flur000Config, flur0Danach: Flur000DanachConfig, InformatikRaum: InformatikRaumConfig, 
//                                                     flur1: Flur100Config, flur1Danach: Flur100DanachConfig, EnglischRaum: EnglischRaumConfig,
//                                                     flur2: Flur200Config, flur2Danach: Flur200DanachConfig, GeschichtsRaum: GeschichtsRaumConfig,
//                                                     flur3: Flur300Config, flur3Danach: Flur300DanachConfig, MatheRaum: MatheRaumConfig,
//                                                     flur4: Flur400Config, Aula: AulaConfig,
//     })
    
// });

//Initialisierung des LevelManagers
// export const levelManager = new LevelManager({ schulhof: schulhofConfig, flur0: Flur000Config, flur0Danach: Flur000DanachConfig, InformatikRaum: InformatikRaumConfig, 
//                                             flur1: Flur100Config, flur1Danach: Flur100DanachConfig, EnglischRaum: EnglischRaumConfig,
//                                             flur2: Flur200Config, flur2Danach: Flur200DanachConfig, GeschichtsRaum: GeschichtsRaumConfig,
//                                             flur3: Flur300Config, flur3Danach: Flur300DanachConfig, MatheRaum: MatheRaumConfig,
//                                             flur4: Flur400Config, Aula: AulaConfig, Aula2: AulaConfig2
// });



