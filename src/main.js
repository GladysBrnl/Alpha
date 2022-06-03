const gameconfig = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    heigth: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            //debug: true,
        },
    },
    scene: [Menus,Intro,scene,SceneFin]
};

const game = new Phaser.Game(gameconfig);
