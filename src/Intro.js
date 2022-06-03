class Intro extends  Phaser.Scene{
    constructor() {
        super("introduction");
    }

    preload(){

        this.load.image('intro1', 'assets/images/intro1.png');
        this.load.image('intro2','assets/images/intro2.png');


    }

    create(){

        this.anims.create({
            key: 'intro',
            frames: [
                {key: 'intro1'},
                {key: 'intro1'},
                {key: 'intro1'},
                {key: 'intro1'},
                {key: 'intro1'},
                {key: 'intro1'},
                {key: 'intro2'},
                {key: 'intro2'},
                {key: 'intro2'},
                {key: 'intro2'},
                {key: 'intro2'},
                {key: 'intro2'},
                {key: 'intro2'},
            ],
        frameRate : 1,
        repeat: 0
        });
        this.anims = this.add.sprite(0,0,'intro1').setOrigin(0,0);
        this.anims.play('intro');



        this.letsgo= this.time.addEvent({

            delay : 11000,
            callback: ()=>{
                this.scene.start("scene")
            },
            loop: false,
        })
    }


}