class scene extends Phaser.Scene {
    function

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
        this.load.image('luminion','assets/images/Objlumi.png');
        // At last image must be loaded with its JSON
        this.load.image('player', 'assets/images/beaute.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tilesassets', 'assets/tilesets/tileasset.png');
        this.load.image('col', 'assets/images/ech.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
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
        this.plan2 = map.createLayer('Plan2', tilesetP1, 0, 200);
        this.plan1 = map.createLayer('Plan1', tilesetP1, 0, 200);
        //this.plan11 = map.createLayer('Plan1.1', tilesetP1, 0, 200);

        this.feuilles = map.createLayer('Feuilles', tilesetP1, 0, 200);

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
         * on créer les multiple groupe des layers objets
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



        /** groupe des objets déplaçable*/
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

        //this.physics.add.collider(this.moves, this.collide)
        this.player = new Player(this);

        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
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

    }

    /**
     * fonction exécuter des lors que le joueur touche un objet "save" qui enregistre les variables du player au moment T + désactive la collision de l'objet pour ne pas réexécuter a chaque collision
     * @param player
     * @param saves
     */

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
        
        console.log("pute");
    }

    update() {
        if (this.player.pousse ){
            this.player.pousse=false
        }
        else {
            this.moves.setVelocityX(0)
        }




        if (this.cursors.up.isDown && this.player.player.body.onFloor() && this.saut === false) {
            this.player.jump()
            console.log("oui")
            this.saut = true;
        }
        if (this.cursors.up.isUp ){
            this.saut = false;
        }

        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
            this.player.stop();
        }



    }


}