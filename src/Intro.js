class Intro extends  Phaser.Scene{
    constructor() {
        super("introduction");
    }

    preload(){

        this.load.image('intro1', 'assets/images/intro1.png');
        this.load.image('intro2','assets/images/intro2.png');

        this.load.audio('background', 'assets/sons/background.mp3');
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

        this.story = this.sound.add('background', {loop: true, volume:1});
        if(this.temp === this.temp){
            this.story.play()
        }

        this.letsgo= this.time.addEvent({

            delay : 11000,
            callback: ()=>{
                this.scene.start("scene")
            },
            loop: false,
        })
    }


}