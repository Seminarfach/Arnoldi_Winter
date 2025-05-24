const audio = {
    
    ButtonKlick:  new Howl ({
        src: './audio/ButtonKlick.mp3',
        html5: true,
        volume: 0.4,
        
    }),
    
    
    
    Map:  new Howl ({
        src: './audio/Hintergrund.mp3',
        html5: true,
        volume: 0.1,
        loop: true
    }),

    Tuer: new Howl ({
        src: './audio/Transition.mp3',
        html5: true,
        volume: 0.2,
    }),


    Rätsel: new Howl ({
        src: './audio/Rätsel.mp3',
        html5: true,
        volume: 0.1,
        loop: true
    }),

    falscheAntwort: new Howl ({
        src: './audio/falscheAntwort.mp3',
        html5: true,
        volume: 0.1
    }),

    richtigeAntwort: new Howl ({
        src: './audio/LevelGewonnen.mp3',
        html5: true,
        volume: 0.1 

    }),

    HinweiseErscheinen: new Howl({

        src: './audio/HinweisErscheinen.mp3',
        html5: true,
        volume: 0.5

    }),

    
   
}