class Intro extends  Phaser.Scene{
    constructor() {
        super("introduction");
    }

    preload(){

        this.load.image('intro1', 'assets,images,intro1.png');
        this.load.image('intro2','assets,images,intro2.png');


    }

    create(){

        this.anims.create({
            key: 'intro',
            frames: [
                {key: 'intro1'},
                {key: 'intro2'},
            ],
        frameRate : 1,
        repeat: 0
        });
        this.anims = this.add.sprite(0,0,'intro1').setOrigin(0,0);
        this.anims.play('intro');

        this.story = this.sound.add('introd', {loop: true, volume3});
        if(this.temp === this.temp){
            this.story.play()
        }

    }

    this.letsgo= this.time.addEvent({

        delay : 41000,
        callback: ()=>{
            this.scene.start("playGame")
            this.story.stop()
        },
        loop: false,
    })
}