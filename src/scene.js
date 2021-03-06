class scene extends Phaser.Scene {
    function
    constructor() {
        super("scene");
    }
    preload() {
        /**
         * on load nos images objets + la tilemap et le fichier json
         */
        this.load.image('background', 'assets/images/background.png');
        this.load.image('door', 'assets/images/Door.png');
        this.load.image('key', 'assets/images/Key.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('move', 'assets/images/mouvable.png');
        this.load.image('save', 'assets/images/Save.png');
        //this.load.image('objfin','assets/images/objetfin');
        this.load.image('particule', 'assets/images/blue.png');
        this.load.image('luciole2', 'assets/images/yellow.png');
        this.load.image('torche','assets/images/yellow2.png');

        this.load.image('objfin','assets/images/objetfin.png');
        this.load.image('flamme1', 'assets/images/yellow3.png');
        this.load.atlas('flares','assets/images/flares.png','assets/images/flares.json');
        // At last image must be loaded with its JSON
        this.load.image('pic1', "assets/images/pic1.png");
        this.load.image('player', 'assets/images/beaute.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tilesassets', 'assets/tilesets/tileasset.png');
        //this.load.image('col', 'assets/images/ech.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');



        //Load anims

        for (let r=1; r<=6; r++){
            this.load.image('course'+r,'assets/images/course'+r+'.png')
        }
        for (let s=1; s<=9; s++){
            this.load.image('saut'+s,'assets/images/saut'+s+'.png')
        }
        for (let i=1; i <= 4; i++){
            this.load.image('idle'+i,'assets/images/idle'+i+'.png')
        }
    }


    create() {

        this.currentSaveX = 0;
        this.currentSaveY = 0;
        this.currentPoints = 0;

        this.saut = false;

        /**
         * on initialise les valeurs de la sauvegarde
         * @type {number}
         */

        /**
         * creation de la map et du  layer plateforme
         * @type {Phaser.GameObjects.Image}
         */

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('kenny_simple_platformer', 'tiles');
        const tilesetP1 = map.addTilesetImage('AssetTile', 'tilesassets');
        //this.platforms = map.createLayer('Platformes', tileset, 0, 200);
        this.machu = map.createLayer('machu', tilesetP1,0, 200);
        this.fond2 = map.createLayer('Fondforet', tilesetP1, 0, 200);
        this.fond = map.createLayer('Fond', tilesetP1, 0, 200);

        this.fenetre = map.createLayer('Fenetre', tilesetP1, 0 , 200);
        this.plan5 = map.createLayer('Plan5', tilesetP1,0,200);
        this.plan4 = map.createLayer('Plan4', tilesetP1,0,200);
        this.plan3 = map.createLayer('Plan3', tilesetP1, 0, 200);
        this.plan2 = map.createLayer('Plan2', tilesetP1, 0, 200);
        this.plan1 = map.createLayer('Plan1', tilesetP1, 0, 200);
        this.lumierefond = map.createLayer('Lumi??reFond',tilesetP1, 0,200);
        this.lumieretemple = map.createLayer('Lumi??reTemple',tilesetP1, 0,200);


        this.feuilles = map.createLayer('Feuilles', tilesetP1, 0, 200);
        this.inti = map.createLayer('Inti', tilesetP1,0,200);
        this.plan = map.createLayer('Plan1bis', tilesetP1, 0, 200);

        //Parallax

        //this.fond.scrollFactorX=1.035;
        this.fond2.scrollFactorX=1.035;
        this.plan3.scrollFactorX=1.03;
        this.plan2.scrollFactorX=1.02;
        this.plan1.scrollFactorX=1.00;
        this.plan.scrollFactorX=1.00;
        this.feuilles.scrollFactorX=1.00;


        //Collide

        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('blocage').objects.forEach((col) => {
            this.collideSprite = this.collide.create(col.x, col.y+200, col.height).setOrigin(0).setDisplaySize(col.width,col.height).visible=false;
            this.physics.add.collider(this.collide, this.collideSprite)
        });



        /**
         * on cr??er les multiple groupe des layers objets
         * @type {Phaser.Physics.Arcade.Group}
         */
        /** groupe porte */
        this.doors=this.physics.add.group({
            allowGravity: false,
            immovable: true
        })
        map.getObjectLayer('Door').objects.forEach((doors)=>{
            const DoorSprite = this.doors.create(doors.x, doors.y +9+ doors.height, 'door').setOrigin(0).key=1;
        });


        /** groupe des clefs */
        this.key=this.physics.add.group({
            allowGravity: false,
            immovable: true
        })
        map.getObjectLayer('key').objects.forEach((key)=>{
            const keySprite = this.key.create(key.x, key.y +200- key.height, 'key').setOrigin(0).key=1;
        });




        /** groupe des objets d??pla??able*/
        this.moves = this.physics.add.group({
            allowGravity: true,
            immovable: false
        });
        map.getObjectLayer('Mouvable').objects.forEach((move) => {
            this.moveSprite = this.moves.create(move.x, move.y + 200 - move.height-50, 'move').setOrigin(0);
            this.physics.add.collider(this.moveSprite, this.collide)
            //this.physics.add.collider(this.moves, this.moveSprite)
            //this.moveSprite.body.immovable=true
        });

        // Cr??ation de tout les emmiters
        // //Luciole1
        // this.configFX1 = {
        //     //rotate: {min:0,max:280},
        //     lifespan : 300,
        //     scale: {start: 0.45, end: 0.5},
        //     alpha: { start: 0.5, end: 0 },
        //     blendMode: Phaser.BlendModes.ADD,
        //     speed:150,
        //     tint: 0xFFFFE0,
        // };
        // this.luciole1 = this.physics.add.group({
        //     allowGravity: false,
        //     immovable: true
        // });
        //
        // map.getObjectLayer('Luciole').objects.forEach((luciole1) => {
        //     this.luciole1Sprite = this.luciole1.create(luciole1.x, luciole1.y + 200 - luciole1.height, 'luciole1');
        //     this.luciole1SpriteFX = this.add.particles('luciole1')//On charge les particules ?? appliquer au layer
        //     this.luciole1SpriteFX.createEmitter(this.configFX1)
        //     this.luciole1SpriteFX.x = this.luciole1Sprite.x
        //     this.luciole1SpriteFX.y = this.luciole1Sprite.y
        //
        // });

        //Luciole2

        this.configFX2 = {
            lifespan: 250,
            angle: { start: 360, end: 0, steps: 10 },
            speed: 10,
            scale: { start: 0.1, end: 0.5 },
            frequency: 35,
            alpha: {start: 0.2,end: 0.3},
            blendMode: 'ADD'
        };
        this.luciole2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


        map.getObjectLayer('Luciole2').objects.forEach((luciole2) => {
            this.luciole2Sprite = this.luciole2.create(luciole2.x, luciole2.y + 200 - luciole2.height, 'luciole2');
            this.luciole2SpriteFX = this.add.particles('luciole2')//On charge les particules ?? appliquer au layer
            this.luciole2SpriteFX.createEmitter(this.configFX2)
            this.luciole2SpriteFX.x = this.luciole2Sprite.x
            this.luciole2SpriteFX.y = this.luciole2Sprite.y
        });


        //Atmo1

        this.configFX3 = {
            lifespan: 4500,
            rotate: {min:90,max:360},
            angle: {min:90 , max: 360},
            scale: {start: 7, end: 6},
            gravityX: -300,
            gravityY:0,

            alpha: { start: 0.01, end: 0.1 },
            blendMode: Phaser.BlendModes.ADD,
            speed:50,
            tint: 0x808080,
        };
        this.tmo1 = this.physics.add.group({
            allowGravity: false,
            immovable: true,

        });


        map.getObjectLayer('atmo1').objects.forEach((tmo1) => {
            this.atmo1Sprite = this.tmo1.create(tmo1.x, tmo1.y + 200 - tmo1.height, 'particule');
            this.atmo1SpriteFX = this.add.particles('particule')//On charge les particules ?? appliquer au layer
            this.atmo1SpriteFX.createEmitter(this.configFX3)
            this.atmo1SpriteFX.x = this.atmo1Sprite.x
            this.atmo1SpriteFX.y = this.atmo1Sprite.y
        });

        //Torche
        this.configFX4 = {
            //rotate: {min:0,max:280},
            angle: {min:0 , max: 360},
            scale: {start: 0.5, end: 1},
            gravityX:0,
            gravityY: -300,
            alpha: { start: 0.5, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            speed:25,
            tint: 0xFFFFE0,
        };
        this.torches = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Torches').objects.forEach((torches) => {
            this.torcheSprite = this.torches.create(torches.x, torches.y + 200 - torches.height, 'torche');
            this.torcheSpriteFX = this.add.particles('torche')//On charge les particules ?? appliquer au layer
            this.torcheSpriteFX.createEmitter(this.configFX4)
            this.torcheSpriteFX.x = this.torcheSprite.x
            this.torcheSpriteFX.y = this.torcheSprite.y
        });


        //Flammes1
        this.configFX5 = {
            //rotate: {min:0,max:280},
            angle: {min:0 , max: 360},
            scale: {start: 0.08, end: 0.1},
            gravityX:100,
            gravityY: -300,
            alpha: { start: 5, end: 1 },
            blendMode: Phaser.BlendModes.ADD,
            speed:25,
            tint: 0xFFFFE0,
        };
        this.flammes1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Flammes1').objects.forEach((flammes) => {
            this.flammes1Sprite = this.flammes1.create(flammes.x, flammes.y + 200 - flammes.height, 'flamme1');
            this.flammes1SpriteFX = this.add.particles('flamme1')//On charge les particules ?? appliquer au layer
            this.flammes1SpriteFX.createEmitter(this.configFX5)
            this.flammes1SpriteFX.x = this.flammes1Sprite.x
            this.flammes1SpriteFX.y = this.flammes1Sprite.y
        });



        this.player = new Player(this);

        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'pic1').setOrigin(0);
            spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
            this.spikes.add(spikeSprite)
        });

        this.physics.add.collider(this.player.player, this.spikes, this.death, null, this);






        /** groupe des saves*/
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y + 200 - save.height, 'save').setOrigin(0);
            this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)
        });




        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setRoundPixels(true);
       // this.main.stopFollow();

        this.objetFin = this.physics.add.sprite(19236,2240, 'objfin').setScale(0.4);
        //this.objetFin.body.setImmovable(true)
        this.physics.add.collider(this.collide, this.objetFin);
            this.objetFin.setGravity(false)
        this.physics.add.collider(this.player.player, this.objetFin, () =>{
            {
                this.scene.start("fin")

            }
        })


        this.initKeyboard();
    }

    /**
     * fonction ex??cuter des lors que le joueur touche un objet "save" qui enregistre les variables du player au moment T + d??sactive la collision de l'objet pour ne pas r??ex??cuter a chaque collision
     * @param player
     * @param saves
     */

    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.F:
                    me.player.player.x = 18294;
                    me.player.player.y = 1117;
                    break;

            }
        })
    }

    sauvegarde(player, saves) {
        this.currentSaveX = player.x
        this.currentSaveY = player.y
        console.log("coucou");
    }

    death(player, spikes)
    {
        player.setVelocity(0);
        player.x = this.currentSaveX
        player.y = this.currentSaveY;

        console.log("hibou");
    }

    update() {
        if (this.player.pousse ){
            this.player.pousse=false
        }
        else {
            this.moves.setVelocityX(0)
        }


        switch (true) {

            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                break;
            case this.cursors.left.isDown:
                this.player.moveLeft();
                this.player.player.setOffset(10,0);
                break;

            case this.cursors.right.isDown:
                this.player.moveRight();
                this.player.player.setOffset(25,0);
                break;

            // case this.cursors.down.isDown:
            // this.bosslife=0;
            // break;
            default:
                this.player.stop();
            //this.marche.stop();


        }


    }






}