function l2() {
    console.log("loading");
    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-div', { enableDebug: false, preload: preload, create: create, update: update, render: render });
    //scaleRatio = window.devicePixelRatio / 1;
    localStorage.setItem("dinamica", "Identificar situación");
    function preload() {
        this.game.scale.pageAlignHorizontally = true; this.game.scale.pageAlignVertically = true; this.game.scale.refresh();
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        /*this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;*/
        //window.addEventListener('resize', resize);
        //resize();
        /* this.load.image('sky', '../www/texturas/background/bk2.png');
         /// this.load.image('star', 'texturas/sprites/star.gif');
         this.load.spritesheet('pj1', '../www/texturas/pj/betty.png',48,48);
         this.load.spritesheet('house1', '../www/texturas/sprites/houses.png',64,64);
         this.load.spritesheet('star', '../www/texturas/sprites/star.png',116,200);
         this.load.image('boton', '../www/texturas/sprites/boton.png');*/
        this.load.spritesheet('fondo', '../www/texturas/l2/fondo-con-enunciado.png');
        this.load.spritesheet('situacion1', '../www/texturas/l2/chico01.png');
        this.load.spritesheet('situacion2', '../www/texturas/l2/chico02.png');
        this.load.spritesheet('situacion3', '../www/texturas/l2/chico03.png');
        this.load.spritesheet('pausa', '../www/texturas/sprites/boton_pausa.png');
        this.load.spritesheet('play', '../www/texturas/sprites/boton_play.png');
        this.load.spritesheet('end', '../www/texturas/sprites/boton_terminar.png');
        /// this.load.image('star', 'texturas/sprites/star.gif');
        //this.load.spritesheet('tarjeta1', 'texturas/l1/tarjetas01.png', 279, 336);
        //this.load.spritesheet('tarjeta2', 'texturas/l1/tarjetas01.png', 279, 336);
        var tiempo;
    }
    var situacion1;
    var situacion2;
    var situacion3;
    function create() {
        timer = 0;
        bg = game.add.image(0, 0, 'fondo');
        bg.height = game.height;
        bg.width = game.width;
        //game.stage.backgroundColor = "#ffffff";
        //texto = game.add.sprite(game.world.centerX , game.world.centerY + 300, 'texto');
        //texto.anchor.set(0.5);
        //texto.scale.x=0.75;
        //texto.scale.y=0.75;
        situacion1 = game.add.sprite(game.world.centerX - 350, game.world.centerY + 100, 'situacion1');
        situacion1.anchor.set(0.5);
        situacion1.scale.x = 0.8;
        situacion1.scale.y = 0.8;
        situacion2 = game.add.sprite(game.world.centerX, game.world.centerY + 100, 'situacion2');
        situacion2.anchor.set(0.5);
        situacion2.scale.x = 0.8;
        situacion2.scale.y = 0.8;
        situacion3 = game.add.sprite(game.world.centerX + 350, game.world.centerY + 100, 'situacion3');
        situacion3.anchor.set(0.5);
        situacion3.scale.x = 0.8;
        situacion3.scale.y = 0.8;
        situacion1.inputEnabled = true;
        //situacion1.input.enableDrag(false);
        situacion2.inputEnabled = true;
        //situacion2.input.enableDrag(false);
        situacion3.inputEnabled = true;
        //situacion3.input.enableDrag(false);
        situacion1.events.onInputDown.add(apretar, this);
        situacion2.events.onInputDown.add(apretar, this);
        situacion3.events.onInputDown.add(apretar, this);
        //game.physics.enable([tarjeta1,tarjeta2,texto], Phaser.Physics.ARCADE);
        //  This adjusts the collision body size to be a 100x50 box.
        //  50, 25 is the X and Y offset of the newly sized box.
        // texto.body.setSize(25, 25, game.world.centerX + 360, game.world.centerY - 150);
        // texto.body.immovable = true;
        // tarjeta1.body.velocity.x = -100;
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
        //pausa = game.add.sprite(game.world.centerX +500 , game.world.centerY - 275, 'pausa');
        //pausa.anchor.set(0.5);
        pausa = game.add.button(game.world.centerX + 500, game.world.centerY - 275, 'pausa', actionOnClick, this);
        //play = game.add.button(game.world.centerX +500 , game.world.centerY - 275, 'play', actionOnClick, this);
        pausa.anchor.set(0.5);
        tiempo = this.game.time.totalElapsedSeconds();
    }
    function apretar() {
        console.log(arguments[0]);
        arguments[0].scale.set(1.2, 1.2);
        arguments[0].bringToTop();
        if (arguments[0].key == "situacion1") {
            situacion2.scale.set(0.8, 0.8);
            situacion3.scale.set(0.8, 0.8);
        } else {
            if (arguments[0].key == "situacion2") {
                situacion1.scale.set(0.8, 0.8);
                situacion3.scale.set(0.8, 0.8);
            } else {
                situacion1.scale.set(0.8, 0.8);
                situacion2.scale.set(0.8, 0.8);
            }
        }
    }
    function update() {
        //console.log(this);
        //this.scale.set(1.5, 1.5);
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
    }
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
    function actionOnClick() {
        continuar = game.add.button(game.world.centerX - 80, game.world.centerY, 'play', actionOnClick1);
        continuar.anchor.x = 0.5;
        terminar = game.add.button(game.world.centerX + 80, game.world.centerY, 'end', actionOnClick2);
        terminar.anchor.x = 0.5;
        pausa.visible = false;
        situacion1.inputEnabled = false;
        situacion2.inputEnabled = false;
        situacion3.inputEnabled = false;
        var style = { font: "35px Arial", fill: "#000000", align: "center" };
        text1 = game.add.text(game.world.centerX - 80, game.world.centerY + 120, "Continuar", style);
        text2 = game.add.text(game.world.centerX + 80, game.world.centerY + 120, "Terminar", style);
        text1.anchor.set(0.5);
        text2.anchor.set(0.5);
        text1.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
        text2.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
        //tarjeta1.tint = 0x7a7a7a;
    }
    function actionOnClick1() {
        continuar.destroy();
        terminar.destroy();
        text1.destroy();
        text2.destroy();
        pausa.visible = true;
        situacion1.inputEnabled = true;
        situacion2.inputEnabled = true;
        situacion3.inputEnabled = true;
    }
    function actionOnClick2() {
        tiempo = this.game.time.totalElapsedSeconds() - tiempo;
        localStorage.setItem("tiempo", tiempo);
        tipo_dinamica = "Lenguaje";
        app.router.navigate('/score/', {
            reloadCurrent: 'true'
        });
        game.destroy();
        game = null;
    }
    function render() {
        /* game.debug.bodyInfo(texto, 32, 32);
     
         game.debug.body(texto);
         game.debug.body(tarjeta1);
         game.debug.body(tarjeta2); */
    }
}
