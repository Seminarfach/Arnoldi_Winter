
const defaultZoneConfig = {
    tileWidth: 72,
    tileHeight: 72,
    offsetX: -2800,
    offsetY: -1100,
    matchSymbol: 584,
    ZoneClass: ZoneFlur,
    blockMovement: true,
    transitionCondition: null,
};

const createZone = (overrides) => ({ ...defaultZoneConfig, ...overrides });

const createSprite = (src) => new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = src;
        return image;
    })(),
});

const createFlurConfig = ({ name, zones, dialogText, backgroundSrc, foregroundSrc, backgroundAnchor }) => ({
    zones,
    dialog: { text: dialogText, show: name === "Flur0" || name === "Flur0Danach" ||  name === "Flur1" || name === "Flur2" || name === "Flur3" || name === "Flur4" },
    flur: true,
    blockMovementUntilContinue: true,
    backgroundAnchor,
    background: createSprite(backgroundSrc),
    foreground: createSprite(foregroundSrc),
    ui: { title: false, interface: false , moving: false },
});

// //-------------------------------------------------------------------------------------------------------------------------

export const Flur000Config = createFlurConfig({
    name: "Flur0",
    zones: [
        createZone({ dataArray: Flur1ZonenData }),
        createZone({
            dataArray: EingangRaum1Data,
            blockMovement: false,
            transitionCondition: () => keys.ArrowUp.pressed || movingtouch.Up,
            targetLevel: 'InformatikRaum'
        })
    ],
    dialogText: "Willkommen auf dem 000er Flur! <br> Gehe nun zum Raum 002.",
    backgroundSrc: './img2/Flure/Flur000/Flur1.png',
    foregroundSrc: './img2/Flure/Flur000/FlurVG.png',
    backgroundAnchor: { x: 3000, y: 1300 }
});

export const Flur000DanachConfig = createFlurConfig({
    zones: [
        createZone({ dataArray: Flur1ZonenData }),
        createZone({
            dataArray: TreppeZonenData,
            blockMovement: false,
            transitionCondition: () => keys.ArrowDown.pressed || movingtouch.Down,
            targetLevel: 'flur1'
        })
    ],
    dialogText: "Bitte gehe zur Treppe!",
    backgroundSrc: './img2/Flure/Flur000/Flur2.png',
    foregroundSrc: './img2/Flure/Flur000/FlurVG.png',
    backgroundAnchor: { x: 3080, y: 850 }
});

// //-------------------------------------------------------------------------------------------------------------------------

export const Flur100Config = createFlurConfig({
    name: "Flur1",
    zones: [
        createZone({ dataArray: Flur100ZonenData }),
        createZone({
            dataArray: Flur100TürZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowUp.pressed || movingtouch.Up,
            targetLevel: 'EnglischRaum'
        })
    ],
    dialogText: "Willkommen auf dem 100er Flur! <br> Gehe nun zum Raum 102.",
    backgroundSrc: './img2/Flure/Flur100/Flur1.png',
    foregroundSrc: './img2/Flure/Flur100/FlurVG.png',
    backgroundAnchor: { x: 3450, y: 1350 }
});

export const Flur100DanachConfig = createFlurConfig({
    zones: [
        createZone({ dataArray: Flur100ZonenData }),
        createZone({
            dataArray: Flur100TreppeZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowRight.pressed || movingtouch.Right,
            targetLevel: 'flur2'
        })
    ],
    dialogText: "Begib dich nun zur Treppe.",
    backgroundSrc: './img2/Flure/Flur100/Flur2.png',
    foregroundSrc: './img2/Flure/Flur100/FlurVG.png',
    backgroundAnchor: { x: 3062, y: 850 }
});

// //-------------------------------------------------------------------------------------------------------------------------

export const Flur200Config = createFlurConfig({
    name: "Flur2",
    zones: [
        createZone({ dataArray: Flur200ZonenData }),
        createZone({
            dataArray: Flur200TürZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowUp.pressed || movingtouch.Up,
            targetLevel: 'GeschichtsRaum'
        })
    ],
    dialogText: "Willkommen auf dem 200er Flur! <br> Gehe nun zum Raum 206.",
    backgroundSrc: './img2/Flure/Flur200/Flur1.png',
    foregroundSrc: './img2/Flure/Flur200/FlurVG.png',
    backgroundAnchor: { x: 3450, y: 1350 }
});

export const Flur200DanachConfig = createFlurConfig({
    zones: [
        createZone({ dataArray: Flur200ZonenData }),
        createZone({
            dataArray: Flur200TreppeZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowRight.pressed || movingtouch.Right,
            targetLevel: 'flur3'
        })
    ],
    dialogText: "Begib dich nun zur Treppe.",
    backgroundSrc: './img2/Flure/Flur200/Flur2.png',
    foregroundSrc: './img2/Flure/Flur200/FlurVG.png',
    backgroundAnchor: { x: 1620, y: 850 }
});

// //-------------------------------------------------------------------------------------------------------------------------

export const Flur300Config = createFlurConfig({
    name: "Flur3",
    zones: [
        createZone({ dataArray: Flur300ZonenData }),
        createZone({
            dataArray: Flur300TürZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowUp.pressed || movingtouch.Up,
            targetLevel: 'MatheRaum'
        })
    ],
    dialogText: "Willkommen auf dem 300er Flur! <br> Gehe nun zum Raum 305.",
    backgroundSrc: './img2/Flure/Flur300/Flur1.png',
    foregroundSrc: './img2/Flure/Flur300/FlurVG.png',
    backgroundAnchor: { x: 3450, y: 1350 }
});

export const Flur300DanachConfig = createFlurConfig({
    zones: [
        createZone({ dataArray: Flur300ZonenData }),
        createZone({
            dataArray: Flur300TreppeZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowRight.pressed || movingtouch.Right,
            targetLevel: 'flur4'
        })
    ],
    dialogText: "Begib dich nun zur Treppe.",
    backgroundSrc: './img2/Flure/Flur300/Flur2.png',
    foregroundSrc: './img2/Flure/Flur300/FlurVG.png',
    backgroundAnchor: { x: 1910, y: 850 }
});

// //-------------------------------------------------------------------------------------------------------------------------

export const Flur400Config = createFlurConfig({
    name: "Flur4",
    zones: [
        createZone({ dataArray: Flur400ZonenData }),
        createZone({
            dataArray: Flur400TürZonen,
            blockMovement: false,
            transitionCondition: () => keys.ArrowDown.pressed || movingtouch.Down,
            targetLevel: 'Aula'
        })
    ],
    dialogText: "Willkommen auf dem 400er Flur! <br> Gehe nun zur Aula.",
    backgroundSrc: './img2/Flure/Flur400/Flur1.png',
    foregroundSrc: './img2/Flure/Flur400/FlurVG.png',
    backgroundAnchor: { x: 3350, y: 1400 }
});


