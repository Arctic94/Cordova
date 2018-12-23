function juego1() {
    console.log("loading");
    var game = new Phaser.Game(768, 450, Phaser.CANVAS, 'phaser-div', { enableDebug: false, preload: preload, create: create, update: update });
    //scaleRatio = window.devicePixelRatio / 1;
    localStorage.setItem("dinamica", "ordenar_demo");
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
        this.load.image('sky', 'texturas/background/bk2.png');
        /// this.load.image('star', 'texturas/sprites/star.gif');
        this.load.spritesheet('pj1', 'texturas/pj/betty.png', 48, 48);
        this.load.spritesheet('house1', 'texturas/sprites/houses.png', 64, 64);
        this.load.spritesheet('star', '/texturas/sprites/star.png', 116, 200);
        this.load.image('boton', 'texturas/sprites/boton.png');
        var pj1;
        var house1;
        var text;
        var timer;
        var tiempo;
    }
    function create() {
        timer = 0;
        bg = game.add.image(0, 0, 'sky');
        bg.height = game.height;
        bg.width = game.width;
        house1 = game.add.sprite(game.world.centerX + 100, game.world.centerY, 'house1');
        house1.anchor.set(0.5);
        pj1 = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'pj1');
        pj1.anchor.x = 0.5;
        pj1.anchor.y = 0.5;
        //pj1.scale.setTo(scaleRatio, scaleRatio);
        pj1.inputEnabled = true;
        pj1.input.enableDrag(false);
        pj1.events.onInputDown.add(onDown, this);
        pj1.events.onInputUp.add(onUp, this);
        text = game.add.text(16, 16, 'Drag the sprites. Overlapping: false', { fill: '#ffffff' });
    }
    function update() {
        if (checkOverlap(pj1, house1)) {
            text.text = 'Drag the sprites. Overlapping: true';
            //game.add.sprite(400,150,'star');
            //pj1.inputEnabled=false;
        }
        else {
            text.text = 'Drag the sprites. Overlapping: false';
        }
        //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
        //game.debug.text('Loop Count: ' + total, 32, 64);
    }
    ///////////////////////////////////////////////////////////////
    function resize() {
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
}
