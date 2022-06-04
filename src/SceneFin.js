class SceneFin extends Phaser.Scene{

    constructor() {
        super("fin");
    }

    preload(){

        this.load.image('Illu2', 'assets/images/IlluV4.png');
    }

    create(){

        this.add.image(610,400,'Illu2').setScale(0.7);
    }
}