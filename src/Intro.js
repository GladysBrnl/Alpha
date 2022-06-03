class Intro extends  Phaser.Scene{
    constructor() {
        super("introduction");
    }

    preload(){

        this.load.image('intro1', 'assets,images,intro1.png');
        this.load.image('intro2','assets,images,intro2.png');

        
    }
}