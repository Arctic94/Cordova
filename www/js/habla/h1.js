function h1() {
    console.log("loading");
    var game = new Phaser.Game(768, 450, Phaser.CANVAS, 'phaser-div', { enableDebug: false, preload: preload, create: create, update: update });
    //scaleRatio = window.devicePixelRatio / 1;
    localStorage.setItem("dinamica", "Reconocimiento de animales");
    function preload() {
        this.game.scale.pageAlignHorizontally = true; this.game.scale.pageAlignVertically = true; this.game.scale.refresh();
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        /*this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;*/
        //window.addEventListener('resize', resize);
        //resize();
        this.load.image('fondo', '../www/texturas/h1/fondo.png');
        this.load.spritesheet('animales', '../www/texturas/h1/animales.png', 600, 500);
        this.load.spritesheet('pausa', '../www/texturas/sprites/boton_pausa.png');
        this.load.spritesheet('play', '../www/texturas/sprites/boton_play.png');
        this.load.spritesheet('end', '../www/texturas/sprites/boton_terminar.png');
        //this.load.spritesheet('caballo', 'texturas/h1/animales.png', 600, 1000);
        // this.load.spritesheet('pez', 'texturas/h1/animales.png', 600, 1500);
        //this.load.spritesheet('gato', 'texturas/h1/animales.png', 1200, 500);
        //this.load.spritesheet('vaca', 'texturas/h1/animales.png', 1200, 1000);
        //this.load.spritesheet('pato', 'texturas/h1/animales.png', 120, 1500);
        game.load.audio('perro', '../www/texturas/h1/perro01.mp3');
        game.load.audio('perro2', '../www/texturas/h1/perro02.mp3');
        game.load.audio('gato', '../www/texturas/h1/gato01.mp3');
        game.load.audio('gato2', '../www/texturas/h1/gato02.mp3');
        game.load.audio('caballo', '../www/texturas/h1/caballo01.mp3');
        game.load.audio('caballo2', '../www/texturas/h1/caballo02.mp3');
        game.load.audio('vaca', '../www/texturas/h1/vaca01.mp3');
        game.load.audio('vaca2', '../www/texturas/h1/vaca02.mp3');
        game.load.audio('pez', '../www/texturas/h1/pez01.mp3');
        game.load.audio('pez2', '../www/texturas/h1/pez02.mp3');
        game.load.audio('pato', '../www/texturas/h1/pato02.mp3');
        game.load.audio('pato2', '../www/texturas/h1/pato02.mp3');
    }
    var perro;
    var gato;
    var pez;
    var caballo;
    var pato;
    var vaca;
    var tiempo;
    function create() {
        timer = 0;
        bg = game.add.image(0, 0, 'fondo');
        bg.height = game.height;
        bg.width = game.width;
        Aperro = game.add.audio('perro');
        //Aperro.duration=1;
        //Aperro.allowMultiple=false;
        Aperro2 = game.add.audio('perro2');
        Agato = game.add.audio('gato');
        Agato2 = game.add.audio('gato2');
        Apez = game.add.audio('pez');
        Apez2 = game.add.audio('pez2');
        Avaca = game.add.audio('vaca');
        Avaca2 = game.add.audio('vaca2');
        Acaballo = game.add.audio('caballo');
        Acaballo2 = game.add.audio('caballo2');
        Apato = game.add.audio('pato');
        Apato2 = game.add.audio('pato2');
        perro = game.add.button(game.world.centerX - 200, game.world.centerY - 60, 'animales', actionOnClick);
        perro.onDownSound = Aperro;
        perro.frame = 0;
        perro.anchor.set(0.5);
        perro.scale.x = 0.3;
        perro.scale.y = 0.3;
        gato = game.add.button(game.world.centerX, game.world.centerY - 70, 'animales', actionOnClick);
        gato.onDownSound = Agato2;
        gato.frame = 1;
        gato.anchor.set(0.5);
        gato.scale.x = 0.3;
        gato.scale.y = 0.3;
        pez = game.add.button(game.world.centerX + 200, game.world.centerY - 40, 'animales', actionOnClick);
        pez.onDownSound = Apez;
        pez.frame = 4;
        pez.anchor.set(0.5);
        pez.scale.x = 0.3;
        pez.scale.y = 0.3;
        vaca = game.add.button(game.world.centerX - 200, game.world.centerY + 120, 'animales', actionOnClick);
        vaca.onDownSound = Avaca;
        vaca.frame = 3;
        vaca.anchor.set(0.5);
        vaca.scale.x = 0.3;
        vaca.scale.y = 0.3;
        caballo = game.add.button(game.world.centerX, game.world.centerY + 120, 'animales', actionOnClick);
        caballo.onDownSound = Acaballo2;
        caballo.frame = 2;
        caballo.anchor.set(0.5);
        caballo.scale.x = 0.3;
        caballo.scale.y = 0.3;
        pato = game.add.button(game.world.centerX + 200, game.world.centerY + 120, 'animales', actionOnClick);
        pato.onDownSound = Apato;
        pato.frame = 5;
        pato.anchor.set(0.5);
        pato.scale.x = 0.3;
        pato.scale.y = 0.3;
        //////////////////////////////// audio
        pausa = game.add.button(game.world.centerX + 250, game.world.centerY - 180, 'pausa', actionOnClick_pausa, this);
        //play = game.add.button(game.world.centerX +500 , game.world.centerY - 275, 'play', actionOnClick, this);
        pausa.anchor.set(0.5);
        pausa.scale.x = 0.8;
        pausa.scale.y = 0.8;
        tiempo = this.game.time.totalElapsedSeconds();
        // game.sound.setDecodedCallback([ Aperro,Aperro2,Agato,Agato2,Avaca,Avaca2,Acaballo,Acaballo2,Apez,Apez2,Apato,Apato2 ], update, this);
        console.log(pausa);
        /*pj1 = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'pj1');
        pj1.anchor.x = 0.5;
        pj1.anchor.y = 0.5;
        //pj1.scale.setTo(scaleRatio, scaleRatio);
        pj1.inputEnabled = true;
        pj1.input.enableDrag(false);
        pj1.events.onInputDown.add(onDown, this);
        pj1.events.onInputUp.add(onUp, this);
*/
        //text = game.add.text(16, 16, 'Drag the sprites. Overlapping: false', { fill: '#ffffff' });
    }
    function update() {
        /* perro.onStop.add(soundStopped, this);
         perro2.onStop.add(soundStopped, this);
 
         gato.onStop.add(soundStopped, this);
         gato2.onStop.add(soundStopped, this);
 
         pez.onStop.add(soundStopped, this);
         pez2.onStop.add(soundStopped, this);
 
         vaca.onStop.add(soundStopped, this);
         vaca2.onStop.add(soundStopped, this);
 
         caballo.onStop.add(soundStopped, this);
         caballo2.onStop.add(soundStopped, this);
 
         pato.onStop.add(soundStopped, this);
         pato2.onStop.add(soundStopped, this);*/
    }
    function actionOnClick_pausa() {
        continuar = game.add.button(game.world.centerX - 80, game.world.centerY, 'play', actionOnClick1);
        continuar.anchor.x = 0.5;
        terminar = game.add.button(game.world.centerX + 80, game.world.centerY, 'end', actionOnClick2);
        terminar.anchor.x = 0.5;
        pausa.visible = false;
        //tarjeta1.inputEnabled=false;
        //tarjeta2.inputEnabled=false;
        game.sound.mute = true;
        game.sound.pauseAll();
        var style = { font: "35px Arial", fill: "#000000", align: "center" };
        text1 = game.add.text(game.world.centerX - 80, game.world.centerY + 120, "Continuar", style);
        text2 = game.add.text(game.world.centerX + 80, game.world.centerY + 120, "Terminar", style);
        text1.anchor.set(0.5);
        text2.anchor.set(0.5);
        text1.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
        text2.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
        perro.inputEnabled = false;
        gato.inputEnabled = false;
        pez.inputEnabled = false;
        vaca.inputEnabled = false;
        caballo.inputEnabled = false;
        pato.inputEnabled = false;
        // game.paused = true;
        //tarjeta1.tint = 0x7a7a7a;
    }
    function actionOnClick() { };
    function actionOnClick1() {
        continuar.destroy();
        terminar.destroy();
        text1.destroy();
        text2.destroy();
        pausa.visible = true;
        game.sound.mute = false;
        game.sound.resumeAll();
        //tarjeta1.inputEnabled=true;
        //tarjeta2.inputEnabled=true;
        // game.paused = false;
        perro.inputEnabled = true;
        gato.inputEnabled = true;
        pez.inputEnabled = true;
        vaca.inputEnabled = true;
        caballo.inputEnabled = true;
        pato.inputEnabled = true;
    }
    function actionOnClick2() {
        tiempo = this.game.time.totalElapsedSeconds() - tiempo;
        localStorage.setItem("tiempo", tiempo);
        tipo_dinamica = "Habla";
        app.router.navigate('/score/', {
            reloadCurrent: 'true'
        });
        game.destroy();
        game = null;
    }
    /*
            if (checkOverlap(pj1, house1)) {
                text.text = 'Drag the sprites. Overlapping: true';
                //game.add.sprite(400,150,'star');
                //pj1.inputEnabled=false;
    
            }
            else {
                text.text = 'Drag the sprites. Overlapping: false';
            }*/
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
    //game.debug.text('Loop Count: ' + total, 32, 64);
    ///////////////////////////////////////////////////////////////
    /* function resize() {
         var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
         var wratio = width / height, ratio = canvas.width / canvas.height;
 
         if (wratio < ratio) {
             canvas.style.width = width + "px";
             canvas.style.height = (width / ratio) + "px";
         } else {
             canvas.style.width = (height * ratio) + "px";
             canvas.style.height = height + "px";
         }
     }
 
     function checkOverlap(spriteA, spriteB) {
 
         var boundsA = spriteA.getBounds();
         var boundsB = spriteB.getBounds();
 
         return Phaser.Rectangle.intersects(boundsA, boundsB);
 
     }
 
     function onDown() {
 
         pj1.scale.x = 1.5;
         pj1.scale.y = 1.5;
 
 
 
         if (timer == 0) {
             timer = 1;
             tiempo = this.game.time.totalElapsedSeconds();
             game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 96);
         }
 
 
 
     }
 
     function onUp() {
 
         pj1.scale.x = 1;
         pj1.scale.y = 1;
         if (checkOverlap(pj1, house1)) {
             //pj1.anchor.x=0;
             //pj1.anchor.y=0;
             var star = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'star');
             star.anchor.set(0.5, 0.5);
 
             button = game.add.button(game.world.centerX, game.world.centerY + 100, 'boton', actionOnClick);
             button.anchor.x = 0.5;
 
             //var boton = game.add.sprite(400,400,'boton');
             //boton.anchor.x=0.5;
             //boton.anchor.y=0.5;
             //boton.scale.x=0.5;
             //boton.scale.y=0.5;
             pj1.inputEnabled = false;
 
 
             tiempo = this.game.time.totalElapsedSeconds() - tiempo;
             localStorage.setItem("tiempo", tiempo);
             game.debug.text('tiempo total: ' + tiempo, 96, 96);
 
 
 
 
         }
 
     }
 
     function actionOnClick() {
 
         //console.log(app.router.$el);
         app.router.navigate('/score/', {
             reloadCurrent: 'true'
         });
         game.destroy();
         game = null;
 
         // window.location.replace("../index.html");
 
 
     }
     ///////
 */
}
