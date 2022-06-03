class Menus extends  Phaser.Scene{

    constructor() {
        super("menuGame");
    }

    preload(){
        this.load.image('Illu', 'assets/images/IlluV3.png');
        this.load.image('bouton', 'assets/images/bouton.png');
        this.load.image('bouton2', 'assets/images/bouton2.png');
    }
    create(){
        this.add.image(600,500,'Illu');

        let playbutton = this.add.image(600, 150, 'bouton');
        playbutton.setInteractive();

        playbutton.on("pointerup", () => {
            this.scene.start("intro")
        })
        playbutton.on("pointerover",()=>{
            playbutton.setTexture('bouton2')
        })
        playbutton.on("pointerout",()=>{
            playbutton.setTexture('bouton')
        })


    }

}