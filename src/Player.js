class Player {

    constructor(scene) {
        this.scene = scene
        this.pousse=false
        this.player = this.scene.physics.add.sprite(14600, 920, 'player');
        this.player.key=0
        this.player.body.setSize(70, 200);

        this.player.setBounce(0.1).setVelocityX(0);
        this.scene.physics.add.collider(this.player, this.scene.collide);

        this.scene.anims.create({
            key: 'course',
            frames: [
                {key: 'course1'},
                {key: 'course2'},
                {key: 'course3'},
                {key: 'course4'},
                {key: 'course5'},
                //{key: 'course6'},
            ],
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'saut',
            frames:[
                {key: 'saut1'},
                {key: 'saut2'},
                {key: 'saut3'},
                {key: 'saut4'},
                {key: 'saut5'},
                {key: 'saut6'},
                {key: 'saut7'},
                {key: 'saut8'},
                {key: 'saut9'},
            ],
            frameRate: 5,
            repeat: 0
        })
        /*
        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
            repeat:-1,



        });*/
        this.scene.physics.add.collider(this.player, this.scene.moves,this.force,null,this)
        this.scene.physics.add.collider(this.player, this.scene.doors,this.isKey,null,this)
        this.scene.physics.add.overlap(this.player, this.scene.key,this.getKey,null,this)

    }

    /**
     *
     * @private
     * @param player
     * @param moves
     */
    force(player,moves){
        if(player.body.touching.left || player.body.touching.right) {
            //moves.setImmovable(false)
            this.pousse = true
        }
        if(player.body.touching.down){
            //moves.setImmovable()
            this.player.body.blocked.down=true //ici on fais croire a phaser que le sprite est static pour pouvoir sauter dessus (uniquement valable pour utiliser la fonction onFloor())
        }
    }
    /**
     * des que  le player récupère une clef, la désactive et ajours +1 a la variable key du joueurs
     * @param player
     * @param key
     */
    getKey(player,key){
        this.player.key+=key.key
        key.body.enable=false
        key.visible=false
    }

    /**
     * vérifie que le joueur possède bien une clef et desactive la porte sinon ne fais rien
     * @param player
     * @param door
     */
    isKey(player, door){
        if(player.key>=door.key) {
            player.key-=door.key
            door.body.enable = false
            door.visible=false
            console.log('porte',door.key)
        }
    }
    jump(){
        this.player.setVelocityY(-500);
        this.player.play('saut', true);
        console.log(this.player.key)
    }
    moveRight(){
        this.player.setVelocityX(300);
        if (this.player.body.onFloor()) {

            this.player.play('course', true);
        }
        this.player.setFlipX(false);
    }
    moveLeft(){
        this.player.setVelocityX(-300);
       // this.player.play('run', true);
        if (this.player.body.onFloor()) {
            this.player.play('course', true);
             }
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            //this.player.add.sprite('beaute')

            }
    }



}