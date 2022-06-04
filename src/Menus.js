class Menus extends  Phaser.Scene{

    constructor() {
        super("menuGame");
    }

    preload(){
        this.load.image('Illu', 'assets/images/IlluV3.png');
        this.load.image('bouton', 'assets/images/bouton.png');
        this.load.image('bouton2', 'assets/images/bouton2.png');

        this.load.audio('background', 'assets/sons/background.mp3');
    }
    create(){
        this.add.image(600,350,'Illu').setScale(0.8);

        this.story = this.sound.add('background', {loop: true, volume:0.05});
        if(this.temp === this.temp){
            this.story.play()
        }

        let playbutton = this.add.image(600, 90, 'bouton').setScale(0.4);
        playbutton.setInteractive();

        playbutton.on("pointerup", () => {
            this.scene.start("introduction")
        })
        playbutton.on("pointerover",()=>{
            playbutton.setTexture('bouton2')
        })
        playbutton.on("pointerout",()=>{
            playbutton.setTexture('bouton')
        })


    }

}