
import { riddleManager } from './RätselManager.js';


const defaultZoneConfig = {
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 3909,
    ZoneClass: ZoneRaum,
    blockMovement: true,
    transitionCondition: null,
    targetLevel: null,
};

const createZone = (overrides) => ({ ...defaultZoneConfig, ...overrides });

const createRiddleZone = (riddleName, dataArray) => ({
    dataArray,
    ...defaultZoneConfig,
    blockMovement: () => riddleManager.completedRiddles.has(riddleName),
    transitionCondition: () => {
        if (!riddleManager) return false;
        if (riddleManager.completedRiddles.has(riddleName) && !riddleManager.GuideKi2) return false;
        if (keys.ArrowUp.pressed || movingtouch.Up) {
            if(riddleName == "ki" && !riddleManager.GuideKi2) {
                riddleManager.showChat(riddleName)
            }
            else{
                if(riddleManager.GuideKi2)  riddleManager.showGuide("ki2");
                else{
                    riddleManager.showGuide(riddleName);
                }
                

            }
            
            return true;
        }
        return false;
    }
});

const createSprite = (src) => new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = src;
        return image;
    })(),
});


const createRoomConfig = ({ name, zones, riddleName, dialogText, backgroundSrc, backgroundAfterSrc, foregroundSrc, targetLevel }) => {
    const isSchulhof = name === "Schulhof";
    const isInformatikRaum = name === "InformatikRaum";
    const isAula2 = name === "AulaSpäter"

    return {
        zones: [
            createZone({ dataArray: zones.main, ZoneClass: isSchulhof ? ZoneSchulhof : ZoneRaum }),
            ...(riddleName ? [createRiddleZone(riddleName, zones.riddle)] : []),
            createZone({
                dataArray: zones.door,
                targetLevel,
                transitionCondition: isSchulhof 
                    ? () => keys.ArrowLeft.pressed || movingtouch.Left 
                    : () => riddleManager.completedRiddles.has(riddleName) && (keys.ArrowRight.pressed || movingtouch.Right)
            })
        ],
        riddle: Boolean(riddleName),
        blockMovementUntilContinue: true,

        // Setzt die Hintergrundanker für Sonderfälle
        backgroundAnchor: isSchulhof 
            ? { x: 1550, y: 700 } 
            : isInformatikRaum 
                ? { x: 1700, y: 1000 } 
                : { x: 1300, y: 1100 },
            

        background: createSprite(backgroundSrc),
        backgroundAfter: backgroundAfterSrc ? createSprite(backgroundAfterSrc) : null,
        foreground: createSprite(foregroundSrc),
        dialog: { text: dialogText, show: true },
        ui: { title: false, interface: true, moving: false },
    };
};

// //-------------------------------------------------------------------------------------------------------------------------


export const schulhofConfig = createRoomConfig({
    name: "Schulhof",
    zones: {
        main: SchulhofZonenData,
        door: EingangSchulhofData,
    },
    riddleName: null, // Falls kein Rätsel vorhanden ist
    dialogText: "Willkommen auf dem Schulhof!<br>Begib dich nun zum Haupteingang.",
    backgroundSrc: './img2/Schulhof/Schulhof.png',
    foregroundSrc: './img2/Schulhof/VordergrundSchulhof.png',
    targetLevel: 'flur0'
});


// //-------------------------------------------------------------------------------------------------------------------------

export const InformatikRaumConfig = createRoomConfig({
    name: "InformatikRaum",
    zones: {
        main: InformatikRaumZonenData,
        riddle: InformatikZonenTafel,
        door: TürZonenData
    },
    riddleName: "roboter",
    dialogText: "Willkommen im Informatik Raum 002! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    backgroundSrc: './img2/Räume/Informatik/Inforaum1.png',
    backgroundAfterSrc: './img2/Räume/Informatik/Inforaum2.png',
    foregroundSrc: './img2/Räume/Informatik/VGInfoRaum.png',
    targetLevel: 'flur0Danach'
});


// //-------------------------------------------------------------------------------------------------------------------------


export const EnglischRaumConfig = createRoomConfig({
    name: "EnglischRaum",
    zones: {
        main: EnglischRaumZonenData,
        riddle: RätselZonenData,
        door: TürZonenData
    },
    riddleName: "scratch",
    dialogText: "Willkommen im Englischraum 102! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    backgroundSrc: './img2/Räume/Englisch/Englischraum1.png',
    backgroundAfterSrc: './img2/Räume/Englisch/Englischraum2.png',
    foregroundSrc: './img2/Räume/Englisch/VGEnglischraum.png',
    targetLevel: 'flur1Danach'
});

// //-------------------------------------------------------------------------------------------------------------------------


export const GeschichtsRaumConfig = createRoomConfig({
    name: "GeschichtsRaum",
    zones: {
        main: GeschichtsRaumZonenData,
        riddle: RätselZonenData,
        door: TürZonenData
    },
    riddleName: "krypto",
    dialogText: "Willkommen im Geschichtsraum 206! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    backgroundSrc: './img2/Räume/Geschichte/Geschichtsraum1.png',
    backgroundAfterSrc: './img2/Räume/Geschichte/Geschichtsraum2.png',
    foregroundSrc: './img2/Räume/Geschichte/VGGeschichtsraum.png',
    targetLevel: 'flur2Danach'
});

// //-------------------------------------------------------------------------------------------------------------------------

export const MatheRaumConfig = createRoomConfig({
    name: "MatheRaum",
    zones: {
        main: MatheRaumZonenData,
        riddle: RätselZonenData,
        door: TürZonenData
    },
    riddleName: "sudoku",
    dialogText: "Willkommen im Matheraum 305! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    backgroundSrc: './img2/Räume/Mathe/Matheraum1.png',
    backgroundAfterSrc: './img2/Räume/Mathe/Matheraum2.png',
    foregroundSrc: './img2/Räume/Mathe/VGMatheraum.png',
    targetLevel: 'flur3Danach'
});

// //-------------------------------------------------------------------------------------------------------------------------


let AulaConfig = null
export function getAulaConfig () {
    return AulaConfig 
}
document.addEventListener("RiddleConfigReady", () => {
    AulaConfig = createRoomConfig({
        name: "Aula",
        zones: {
            main: AulaZonenData,
            riddle: AulaRätselZonen,
        },
        riddleName: riddleManager.GuideKi2 ? "ki2" : "ki",
        dialogText: "Du hast es in die Aula geschafft. Gehe zur Tafel, um dir deine Urkunde abzuholen!",
        backgroundSrc: './img2/Räume/Aula/Aula.png',
        foregroundSrc: './img2/Räume/Aula/AulaVordergrund.png',
    });
});









   
