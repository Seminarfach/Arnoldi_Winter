
import { riddleConfig } from "./Rätsel.js";
//import { levelManager } from "./EbenenModul.js";
import { getlevelManager } from "./EbenenModul.js"
import { PDFDocument, rgb } from 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm';



class RiddleManager {
    constructor(riddleConfig) {
        //this.levelManager = levelManager
        this.config = riddleConfig; // Konfiguration für alle Rätsel
        this.currentRiddle = null; // Aktuelles Rätsel
        this.hintsPlayed = []; // Status der Hinweise
        this.soundPlayed = [];
        this.isCompleted = false; // Status: Rätsel abgeschlossen
        this.completedRiddles = new Set();
        this.isClicked = false 
        
    }

    createConfetti() {
        const container = document.getElementById('guide');
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Zufällige Eigenschaften
            const size = Math.random() * 10 + 8;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 2 + 2;
            const delay = Math.random() * 1;
            
            // Stile anwenden
            confetti.style.left = `${left}%`;
            confetti.style.top = '-20px';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // Unterschiedliche Formen
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%'; // Kreise
            } else {
                confetti.style.borderRadius = '0'; // Quadrate
            }
            
            container.appendChild(confetti);
            
            // Entfernen nach der Animation
            confetti.addEventListener('animationend', function() {
                confetti.remove();
            });
            }, i * 100);
        }
    }

    initializeHintButtons() {
        document.querySelectorAll("[id^='Hinweis']").forEach((button, index) => {
            button.addEventListener('click', () => {
                console.log(`Hinweis-Button ${index + 1} wurde geklickt.`);
                this.hintsPlayed[index] = false;
            });
        });
    }
    


    // Initialisiere Eventlistener
    initializeEventListeners() {

        this.initializeHintButtons()
         

        // Fortfahren-Button
        document.getElementById('Fortfahren').addEventListener('click', () => {
            this.isClicked = false 
           
            this.reward = false 
            if (this.isCompleted && !this.isClicked) {
                this.isClicked = true
                console.log(this.isClicked)
                audio.ButtonKlick.play()

                
                if( this.riddleName === "ki" ) {
                   
                    this.fadeTransition(() => this.showGuide("ki2"))   
                   
                }
                
                else {


                        // document.querySelector('#Interface').style.display = 'block';
                        // document.querySelector('#Content').style.display = 'none';
                        // document.querySelector('#RewardBox').style.display = 'grid';
                      
                    
                        const guide = document.getElementById('guide'); // Der Anleitung-Ordner
                        const canvas = document.getElementById('gameCanvas'); // Das Canvas
                        // const answer = document.getElementById('Interface')
                        // const answerText = document.getElementById('RewardText')
                        // const rewardButton = document.getElementById('RewardButton')
                        guide.style.display = 'flex'; // Anleitung sichtbar machen
                        guide.style.justifyContent ='center'
                        guide.scrollTop = 0
                    

                        // Setzen Sie die Größe des Ordners passend zum Canvas
                        guide.style.width = `${canvas.width}px`;
                        guide.style.height = `${canvas.height}px`;
                        guide.style.overflowY = 'auto'
                        guide.style.backgroundColor = 'grey'
                        guide.style.zIndex = 20

                        // Bereinigen Sie den Inhalt des Ordnersf
                        guide.innerHTML = '';

                        // answer.style.zIndex = 40 
                        

                        if (this.riddleName === "ki2") {

                            const Minuten = Math.floor (insgesamteMessZeit / 60)

                            const Sekunden = insgesamteMessZeit % 60
                            
                            const pdfContainer = document.getElementById('DialogBox')
                            pdfContainer.innerHTML = ''
                            
                            pdfContainer.style.zIndex = 40
                            pdfContainer.style.gridRow = "3"
                            pdfContainer.style.justifyContent = "center"

                            const text = document.createElement("div")
                            text.innerHTML = "Urkunde Generator"
                            text.style.display = "flex"
                            text.style.justifyContent = "center"
                            text.style.alignItems = "center"
                            text.style.fontSize = "1.5vw"

                            //pdfContainer.appendChild(text)

                            
                            const form = document.createElement('form')
                            form.id = 'certificateForm'

                            const nameLabel = document.createElement('label')
                            nameLabel.htmlFor = 'playerName'
                            nameLabel.textContent = 'Dein Name'
                            form.appendChild(nameLabel)

                            const nameInput = document.createElement('input')
                            nameInput.type = 'text'
                            nameInput.id = 'playerName'
                            nameInput.required = true 
                            form.appendChild(nameInput)

                            const submitButton = document.createElement('button')
                            submitButton.type = 'submit'
                            submitButton.style.height = '60%'
                            submitButton.textContent = 'Urkunde erstellen'

                            const neustartButton = document.createElement('button')
                            neustartButton.textContent = '⟲ Neustart';
                            neustartButton.style.height = '60%';
                            neustartButton.style.width = '60%';
                            neustartButton.style.fontSize = '1.2rem';
                            neustartButton.style.cursor = 'pointer';

                            

                            pdfContainer.appendChild(form)

                            pdfContainer.appendChild(submitButton)

                            // Formular-Referenz holen

                            // Gemeinsame Funktion für die PDF-Erstellung
                            async function generateCertificate(event) {
                                event.preventDefault(); // Verhindert das Neuladen der Seite

                                const nameInput = document.getElementById('playerName');
                                const playerName = nameInput.value.trim();

                                if (!playerName) {
                                    alert("Bitte gib deinen Namen ein.");
                                    return;
                                }

                                const url = './PDF/Urkunde.pdf';
                                const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

                                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                                const pages = pdfDoc.getPages();
                                const firstPage = pages[0];

                                const { width, height } = firstPage.getSize();

                                firstPage.drawText(playerName, {
                                    x: 370, 
                                    y: height - 200, 
                                    size: 36,
                                    color: rgb(0.8627, 0.5373, 0.1216),
                                });
                                if(insgesamteMessZeit < 60) {
                                    firstPage.drawText(`${Sekunden} Sekunden`, {
                                        x: 370,
                                        y: height - 245,
                                        size: 36, 
                                        color: rgb(0.8627, 0.5373, 0.1216),
                                    });
                                } else {
                                    firstPage.drawText(`${Minuten} min`, {
                                        x: 370,
                                        y: height - 245,
                                        size: 36, 
                                        color: rgb(0.8627, 0.5373, 0.1216),
                                    });

                                    firstPage.drawText(`${Sekunden} sek`, {
                                        x: 500,
                                        y: height - 245,
                                        size: 36, 
                                        color: rgb(0.8627, 0.5373, 0.1216),
                                    });
                                    
                                }
                               

                                const currentDate = new Date();
                                const formattedDate = currentDate.toLocaleDateString('de-DE', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                });

                                firstPage.drawText(` ${formattedDate}`, {
                                    x: 230,
                                    y: height - 520,
                                    size: 20,
                                    color: rgb(0.8627, 0.5373, 0.1216),
                                });

                                firstPage.drawText(`${insgesamteMessZeit}`,{
                                            x: 500,
                                            y: height - 300,
                                            size: 36, 
                                            color: rgb (0.8627, 0.5373, 0.1216),
                                        })

                                const pdfBytes = await pdfDoc.save();

                                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = `Urkunde-${playerName}.pdf`;
                                link.click();
                            }

                            // `submit`-Event für Enter und reguläre Formulareinsendung
                            form.addEventListener('submit', generateCertificate);

                            // `click`-Event für den Button
                            submitButton.addEventListener('click', (event) => {
                                generateCertificate(event);
                                pdfContainer.innerHTML = ''
                                pdfContainer.style.display = "flex"

                                pdfContainer.appendChild(neustartButton)
                            });

                            neustartButton.addEventListener('click', function()  {
                                location.reload()

                            })

                            const imgEnde = document.createElement('img');
                            imgEnde.src = './img2/FeierEule.png';
                            imgEnde.style.maxWidth = '100%'; // Begrenzen Sie die Breite des Bildes
                            imgEnde.style.height = 'auto';
                            this.createConfetti()
                            this.fadeTransition(() => {
                                guide.appendChild(imgEnde);
                                
                                
                                
                            })
                           
                        }
                        else {
                            
                                const { explanationImage } = this.config[this.currentRiddle];
                                //document.querySelector('#DialogBox').style.display = "none";
                                this.fadeTransition(() => {
                                    //document.querySelector('#Interface').style.display = "none";
                                    this.showContentScreen('result', this.currentRiddle, [explanationImage.src]);
                                })

                            

                            

                            
                            
                        }
                    
  
                }
                
            } else {
                document.querySelector('#Content').style.display = "block"
                document.querySelector('#DialogBox').style.display = "none"
                audio.Rätsel.play()
                console.log('Rätsel nicht abgeschlossen.');
                document
                this.umsortierenButtons()
                startTimer() 
            }
        });

        

        // Zurück-Button
        document.getElementById('Zurück').addEventListener('click', () => {
            const zurückButton = document.getElementById('Zurück')
            
            if (!this.isClicked) {
                

                this.isClicked = true
                console.log("button aus ")
                levelManager.shouldAdjustBackground = true
                resetTimer()
                audio.ButtonKlick.play()
                console.log('Zurück gedrückt, Transition zurück.');
                audio.Rätsel.stop()
                const targetLevel = this.config[this.currentRiddle]?.targetLevel
                this.transition({
                    nextAnimation: () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        levelManager.startLevel(targetLevel, levelManager.player);
                        //console.log(levelManager.shouldAdjustBackground)
                        
                        
                    }, // Raum-Animation
                    onComplete: () => {
                        console.log('Spieler hat das Rätsel abgebrochen.');
                        //audio.Map.play()
                    },
                });
                 
            }
        });

        // Antwort-Buttons
        document.querySelectorAll('.AnswersButton').forEach((button, index) => {
            button.addEventListener('click', () => {
            
                this.handleAnswer(index);
            });
        });
    }

    // Starte ein Rätsel
    startRiddle(riddleName) {
            this.isClicked = false 
            resetTimer()
           

            document.querySelectorAll('.AnswersButton').forEach((button, index) => {
                button.textContent = "";  // Lösche den Text
                button.setAttribute('data-index', index);  // Setze den ursprünglichen Index zurück
            });
    

            levelManager.shouldAdjustBackground = false 

           // Deaktiviere alle Hinweis-Buttons beim Start des Rätsels
            document.querySelectorAll("[id^='Hinweis']").forEach((button) => {
                button.disabled = true;
                button.style.backgroundColor = ''; // Setzt das Styling zurück
                button.style.cursor = "not-allowed"; // Falls der Cursor geändert wurde
            });


            riddle = true 

            
        
        
            audio.Tuer.play()
            this.transition({


                nextAnimation: () => {

                    document.querySelector('#Interface').style.display = 'block'
                    document.querySelector('#movingInterface').style.display = 'none'
                    document.querySelector('#Content').style.display = 'block'
                    document.querySelector('#GuideBox').style.display = 'none'
                    // document.querySelector('#DialogButton').style.display = 'none'

                    audio.Rätsel.play();
                    startTimer();
                    
                    this.resetRiddle();
                    
                    console.log(this.hintsPlayed)
        

                    if(!this.config[riddleName]) {
                        console.error(`Rätsel "${riddleName}" exisiert nicht in der Konfirguration.`)
                    }
                    // if( riddleName === "ki2" ) {
                    //     console.log("KI")
                    //     const ZurückButton = document.getElementById("Zurück")
                    //     ZurückButton.disabled = true 
                    //     ZurückButton.innerHTML = ''

                    // } 
                    this.currentRiddle = riddleName;
                    const { answers } = this.config[riddleName];
                    const answersContainer = document.getElementById('Answers');
                    answersContainer.innerHTML = "";

                    this.soundPlayed = false 
                    // Antwort-Buttons aktualisieren
                    answers.forEach((answer, index) => {
                        const button = document.createElement("button");
                        button.classList.add("AnswersButton");
                        button.textContent = answer;  // **Richtigen Text setzen**
                        button.innerHTML = answer;  // Falls HTML verwendet wird
                        button.style.lineHeight = "1.5em";
                        button.backgroundColor = "#c55459"
                        button.setAttribute("data-index", index); // Original-Index beibehalten
                        button.addEventListener("click", () => {
                            console.log(`Geklickt: ${button.textContent} (data-index: ${button.getAttribute("data-index")})`);
                            this.handleAnswer(index);
                        });
                        answersContainer.appendChild(button);
                    });
                    

                    // Hinweise und Status zurücksetzen
                    this.hintsPlayed = new Array(this.config[riddleName].hints.length).fill(true);
                    console.log(this.hintsPlayed)
                    this.soundPlayed = new Array(this.config[riddleName].hints.length).fill(false);
                    this.isCompleted = false;

                    const interfaceElement = document.querySelector('#Interface');
                    interfaceElement.style.display = 'block';
                    interfaceElement.style.width = `${canvas.width}px`;
                    interfaceElement.style.height = `${canvas.height * 0.3}px`; // 30% der Canvas-Höhe
                    
                    document.querySelector('#IDtimer').style.display = 'flex'

                    
                
                    
                    this.umsortierenButtons()
                    this.animateRiddle(riddleName)
                },
            
            });
    }

    // Zeichne den Hintergrund
    drawBackground(ctx) {
        if (!this.currentRiddle || !this.config[this.currentRiddle]) {
            console.error('Kein aktives Rätsel oder fehlende Konfiguration.');
            return;
        }

       
        if(this.isCompleted) {
            const { solutionImage } = this.config[this.currentRiddle];
            const BackgroundWidth = canvas.width;
            const BackgroundHeight = canvas.height;
            const fixedX = canvas.width * 0.5 - BackgroundWidth / 2;
            const fixedY = canvas.height * -0.08;
            //console.log(`Zeichne Rätsel an Position (${fixedX}, ${fixedY}).`);
            ctx.drawImage(solutionImage, fixedX, fixedY, BackgroundWidth, BackgroundHeight);

            
            

        } else {
            const { backgroundImage } = this.config[this.currentRiddle];
            const BackgroundWidth = canvas.width;
            const BackgroundHeight = canvas.height;
            const fixedX = canvas.width * 0.5 - BackgroundWidth / 2;
            const fixedY = canvas.height * -0.08;
            ctx.drawImage(backgroundImage, fixedX, fixedY, BackgroundWidth, BackgroundHeight);

        }

        
        
        
    }

    // Zeichne Hinweise
    drawHint(ctx, hintIndex) {
        const { hints } = this.config[this.currentRiddle];
        const hintImage = hints[hintIndex];

        if (!hintImage) {
            console.error(`Hinweis-Bild für Index ${hintIndex} nicht gefunden.`);
            return;
        }

        if (!hintImage.complete || hintImage.naturalWidth === 0) {
            console.error(`Hinweis-Bild für Index ${hintIndex} wurde noch nicht geladen.`);
            return;
        }

        const width = canvas.width;
        const height = canvas.height;
        const fixedX = canvas.width * 0.5 - width / 2;
        const fixedY = canvas.height * -0.08;
        ctx.drawImage(hintImage, fixedX, fixedY, width, height);
    }

    umsortierenButtons() {
        const answers = document.getElementById('Answers');
        const buttons = Array.from(answers.children);
        
        buttons.sort(() => Math.random() - 0.5);
        buttons.forEach(button => answers.appendChild(button));
    
        console.log("Buttons neu gemischt.");
    }


    handleAnswer(answerIndex) {
        const { correctAnswer, explanationImage } = this.config[this.currentRiddle];
        const answerButtons = Array.from(document.querySelectorAll('.AnswersButton'));
        const selectedButton = answerButtons.find(btn => parseInt(btn.getAttribute('data-index')) === answerIndex);
        const selectedAnswerText = selectedButton?.textContent;
    
        console.log(`Antwort: ${selectedAnswerText} / Korrekt: ${correctAnswer}`);
    
        audio.Rätsel.stop();
        document.querySelector('#Content').style.display = "none";
        document.querySelector('#DialogBox').style.display = "grid";
    
        if (selectedAnswerText === correctAnswer) {
            if(this.riddleName != "ki" || !this.riddleName != "ki2") audio.richtigeAntwort.play()
            console.log(this.riddleName)
            document.querySelector('#DialogBox').style.display = "none";
            if(this.riddleName === "ki" || this.riddleName === "ki2") {
                this.fadeTransition(() => {
                    audio.ButtonKlick.play();
                    document.querySelector('#Interface').style.display = "none";
                    this.showContentScreen('result', this.currentRiddle, [explanationImage.src]);
                    this.isCompleted = true;
                    this.completedRiddles.add(this.currentRiddle);
                    document.querySelector('#DialogText').innerHTML = this.config[this.riddleName].endAnswer;
                    this.GuideKi2 = true
                    console.log(this.GuideKi2)
                })

            } else {
                console.log("Nicht KI")
                this.fadeTransition(() => {
                    audio.ButtonKlick.play();
                    this.isCompleted = true;
                    this.animateEnd()
                    this.completedRiddles.add(this.currentRiddle);
                    
                    
                    document.querySelector('#DialogBox').style.display = "grid";
                    document.querySelector('#DialogText').innerHTML = this.config[this.riddleName].endAnswer;
                })
            }
           
            
           
            
        } else {
            console.log('Falsche Antwort.');
            document.querySelector('#DialogText').textContent = 'Falsch, bitte versuche es nochmal!';
            audio.falscheAntwort.play();
        }
        stopTimer();
    }
    
    // Rätsel-Animation starten
    animateRiddle() {
       
        const animate = () => {

            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            console.log(insgesamteZeit)

            // Hintergrund und Rätselbild zeichnen
            this.drawBackground(ctx);
            
            //Hinweise zeichnene
            this.hintsPlayed.forEach((played, index) => {
                if (!played) {
                    this.drawHint(ctx, index);
                }
            });

            // Hinweise aktivieren
            if(this.isCompleted) {
            }
            const { hintTimes } = this.config[this.currentRiddle];

            
            hintTimes.forEach((time, index) => {
                
                if (insgesamteZeit === time && this.hintsPlayed[index]) {
                    
                    
                    document.querySelector(`#Hinweis${index + 1}`).disabled = false;
                    document.querySelector(`#Hinweis${index + 1}`).style.cursor = "pointer";
                    document.querySelector(`#Hinweis${index + 1}`).style.backgroundColor ='#af070f'
                    document.querySelector(`#Hinweis${index + 1}`).style.color ='lightgrey'

                    
                    if (!this.soundPlayed[index]) {
                        audio.HinweiseErscheinen.play();
                        this.soundPlayed[index] = true; // Markiere den Sound als abgespielt
                        
                    }
                    

                  
                    
                }
            });
            
           

            if ((!this.isCompleted && !levelManager.shouldAdjustBackground)) {
                 const animationID = requestAnimationFrame(animate);
                 
            }
            

            
            else{
                cancelAnimationFrame(this.animateRiddle)
            }
            

            
        };

        animate();

        
    }

    animateEnd() {
        const animateSolution = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            

            // Hintergrund und Rätselbild zeichnen
            this.drawBackground(ctx);
           

            this.animateSolutionID = requestAnimationFrame(animateSolution)

            console.log(this.animateSolutionID)

        }

        animateSolution()
    }

    
    pauseRiddle() {
        // Animation stoppen
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            console.log("Rätsel-Animation pausiert.");
        }

        if(this.animateSolutionID) {
            cancelAnimationFrame(this.animateSolutionID)
            this.animateSolutionID = null

        }
    
        // Timer stoppen
        stopTimer(); // Implementiert vermutlich die Timer-Logik

        
    }

    resumeRiddle(){
        if (!this.animationId && !this.isCompleted) {
            console.log("Rätsel wird fortgesetzt");
            this.animateRiddle(this.config[this.currentRiddle]);
            startTimer()
            
        } 

        if(this.isCompleted) {
            console.log("Ende")
            this.animateEnd()
            
        }
        
    }
   

    // Transition verwalten
    transition({ nextAnimation, onComplete }) {
        
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
                        if (typeof nextAnimation === 'function') nextAnimation();
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4,
                            onComplete: () => {
                                if (typeof onComplete === 'function') onComplete();
                            },
                        });
                    },
                });
            },
        });
    }
        
    fadeTransition(callback) {
        
        gsap.to('#overlappingDiv', {
            opacity: 1,
            duration: 0.4,
            onComplete: () => {
                callback?.();
                this.isCicked = false;
                console.log(this.isClicked)
                
                gsap.to('#overlappingDiv', { opacity: 0, duration: 0.4 });
            }
        });
         
    }
    

    // Reset des Rätsels
    resetRiddle() {
        this.currentRiddle = null;
        this.hintsPlayed = [];
        this.isCompleted = false;
        
        
    }

    getIsCompleted() {
        return this.isCompleted;
    }

    createScrollHint() {
        
        const scrollHint = document.createElement('div');
        scrollHint.innerHTML = '⬇ Nach unten scrollen ⬇';
        scrollHint.style.position = 'absolute';
        scrollHint.style.bottom = '20px';
        scrollHint.style.left = '50%';
        scrollHint.style.transform = 'translateX(-50%)';
        scrollHint.style.fontSize = '1.2em';
        scrollHint.style.color = 'white';
        scrollHint.style.padding = '10px 20px';
        scrollHint.style.borderRadius = '10px';
        scrollHint.style.backgroundColor = 'red';
        scrollHint.style.fontFamily = 'Arial, sans-serif';
        scrollHint.style.textAlign = 'center';
        scrollHint.style.opacity = '0.8';
        scrollHint.style.animation = 'bounce 2s infinite ease-in-out';
        
        return scrollHint;
    }
    


    showContentScreen(type, riddleName, images, texts = []) {
        this.isClicked = false 
        // Grundlegende UI-Anpassungen
        document.querySelector('#Content').style.display = 'none';
        document.querySelector('#DialogBox').style.display = 'none';
    
        // Falls es ein Chat ist, muss das Interface aktiv sein
        if (type === 'chat') {
            document.querySelector('#Interface').style.display = 'block';
            document.querySelector('#GuideBox').style.display = 'grid';
        } else {
            document.querySelector('#Interface').style.display = 'none';
        }
    
        this.riddleName = riddleName;
    
        // Referenzen auf UI-Elemente
        const guide = document.getElementById('guide');
        const answerText = document.getElementById('GuideText'); // Wird nur bei Chat genutzt
        const answerButton = document.getElementById('Weiter');  // "Fortfahren"-Button für Chat
        const answer = document.getElementById('Interface')

        const rewardText = document.getElementById('RewardText')
        const rewardButton = document.getElementById('RewardButton')
        const rewardBox = document.querySelector('#RewardBox')
        
        const { rewardImage } = this.config[this.riddleName];
    
        // Guide vorbereiten
        guide.style.display = 'grid';
        guide.style.gridTemplateRows = '2';
        guide.style.justifyContent = 'center';
        guide.scrollTop = 0;
        guide.style.zIndex = 20;
        guide.style.width = `${canvas.width}px`;
        guide.style.height = `${canvas.height}px`;
        guide.style.overflowY = 'auto';
        guide.style.backgroundColor = 'grey';
        guide.innerHTML = '';
    
        // Erstes Bild anzeigen
        let index = 0;
        const imgElement = document.createElement('img');
        imgElement.style.maxWidth = '100%';
        imgElement.style.height = 'auto';
        imgElement.src = images[index]; // Erstes Bild setzen
        guide.appendChild(imgElement);

        const imgReward = document.createElement('img');
        imgReward.src = rewardImage.src;
        imgReward.style.maxWidth = '75%'; // Begrenzen Sie die Breite des Bildes
        imgReward.style.height = '60%';
        imgReward.style.position = 'absolute'
        imgReward.style.bottom = '35%'
                            
        rewardBox.style.zIndex = 40
                                
        // Falls es sich um einen Chat handelt, setze den ersten Text
        if (type === 'chat' && texts.length > 0) {
            answer.style.zIndex = 40
            answerText.innerHTML = texts[index];
        }

       
        
        // Sroll-Hinweis 

        const scrollHint = this.createScrollHint()
        guide.appendChild(scrollHint);

        guide.addEventListener('scroll', () => {
        if (guide.scrollTop > 20) {
            scrollHint.style.opacity = '0';
        } else {
            scrollHint.style.opacity = '0.8';
        }
        });
    
        let isClicked = false;
    
        // "Weiter"- oder "Schließen"-Button
        const button = document.createElement('button');
        button.textContent = images.length > 1 ? 'Weiter' : 'Schließen';
        button.style.cursor = 'pointer';
        button.style.width = '100%';
        button.style.height = '200%';
        button.style.border = 'black solid 0.3vw';
        button.style.backgroundColor = 'lightgrey'
        guide.appendChild(button);
    
        // Button-Event: Bilder/Text weiter wechseln
        button.addEventListener('click', () => {
            if (!this.isClicked) {
                this.isClicked = true;
                audio.ButtonKlick.play();
                
    
                if (index < images.length - 1) {
                    console.log(index)
                    this.fadeTransition(() => { 
                    index++;
                    imgElement.src = images[index];
                    guide.scrollTop = 0 
                    this.isClicked = false;
                    
                    
                    
                    })
    
                    // Falls es sich um einen Chat handelt, Text aktualisieren
                    if (type === 'chat' && texts.length > 0) {
                        answerText.innerHTML = texts[index];
                    }

                    
                    
                } else {
                    
                    guide.style.display = 'none';
                    if (type === 'guide') {
                        
                            this.startRiddle(riddleName);

                    } else if (type === 'result') {
                        if(this.riddleName === "ki" || this.riddleName === "ki2") {
                            audio.richtigeAntwort.play()
                            this.fadeTransition(() => { 
                                guide.style.display ="none"
                                document.querySelector('#Interface').style.display = 'block'
                                document.querySelector('#DialogBox').style.display = 'grid';
                            })   


                        }
                        else{

                        
                            guide.innerHTML = ''
                            guide.style.display = 'flex'; // Anleitung sichtbar machen
                            guide.style.justifyContent ='center'
                        
                            this.fadeTransition(() => { 
                                this.reward = true
                                answer.style.zIndex = 40
                                answer.style.display = 'block';
                                document.querySelector('#Content').style.display = 'none';
                                document.querySelector('#RewardBox').style.display = 'grid';
                                rewardText.innerHTML = this.config[this.riddleName].rewardAnswer
                                guide.appendChild(imgReward)

                            })   

                            this.targetLevel = this.config[this.currentRiddle]?.targetLevel
                            this.isClicked = false 
                     
                            rewardButton.addEventListener('click', () => {

                                if(!this.isClicked) {
                                    this.isClicked = true
                                    audio.ButtonKlick.play()
                                    guide.style.display = 'none'
                                    levelManager.shouldAdjustBackground = true
                                    console.log(this.config[this.currentRiddle].targetLevel)
                                   
                                    
                                    this.transition({
                                        nextAnimation: () => {
                                            levelManager.startLevel(this.targetLevel, levelManager.player);
                                        }, // Raum-Animation
                                        onComplete: () => {
                                            
                                            this.isClicked = false 
                                            console.log('Spieler zurück im Raum.');
                                        },
                                    });
                                }

                            })

                        }
                        

                       
                    }
        
                        
                }
            }
        });
    
        // Falls es sich um einen Chat handelt, steuere den "Fortfahren"-Button
        if (type === 'chat') {
            
           
            // imgElement.style.position = 'absolute'
            // imgElement.style.bottom = '7%'
          
            guide.removeChild(button)
            guide.removeChild(scrollHint)
           
            answerButton.addEventListener('click', () => {
                if(!this.isClicked){
                    this.isClicked = true
                    audio.ButtonKlick.play()
                   
                    this.fadeTransition(() => { 
                        if (index < images.length - 1) {
                            index++;
                            imgElement.src = images[index];
                            answerText.innerHTML = texts[index];
                            this.isClicked = false 
                            
                        } else if (index = images.length - 1) {
                            guide.style.display = 'none';
                            this.showGuide(riddleName); // Wechsle nach dem Chat zur Anleitung
                            index = 0
                        }
                        
                    })   

                }
                

            });
        }
    }

    showGuide(riddleName) {
       
        if(riddleName === "roboter") { 
            const { InformatikerinImage, guideImage,  } = this.config[riddleName];
            this.showContentScreen('guide', riddleName, [ InformatikerinImage.src, guideImage.src  ])

        }
        else {
            const { guideImage } = this.config[riddleName];
            this.showContentScreen('guide', riddleName, [guideImage.src]);
        }

        
    }

    showChat(riddleName) {
        const { Chat1Image, Chat2Image, Chat3Image, Chat4Image } = this.config[riddleName];
    
        this.showContentScreen('chat', riddleName, 
            [Chat1Image.src, Chat2Image.src, Chat3Image.src, Chat4Image.src], 
            [
                'Endlich habe ich es geschafft.<br> Aber wo ist denn jetzt meine Urkunde?',
                'Das könnte ich doch machen.<br> Aber wie soll das funktionieren?',
                'Und dieser jemand bin ich?<br> Ich weiß doch gar nicht, wie das funktioniert.',
                'Na gut, dann versuche ich es mal'
            ]
        );
    }
    

}

let levelManager = null 

export let riddleManager = null; // Noch nicht initialisiert

export function getRiddleManager () {
    return riddleManager
}

document.addEventListener("RiddleConfigReady", () => {
   
    riddleManager = new RiddleManager(riddleConfig);
    riddleManager.initializeEventListeners();
    
    console.log("RiddleManager wurde erfolgreich gestartet!");
});

document.addEventListener("LevelManagerReady", () => {
    levelManager = getlevelManager()
    console.log(levelManager)
   
    
});


// // Initialisiere den RiddleManager
// export const riddleManager = new RiddleManager(riddleConfig);

// // Initialisiere Eventlistener
// riddleManager.initializeEventListeners();


