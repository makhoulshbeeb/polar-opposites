class LowerScene extends Phaser.Scene {

    constructor() { super({ key: 'Level 1' }) }

    preload() {
        this.load.image('layer1', encodeURI('assets/City Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/City Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/City Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/City Level/Layer 4.png'));

        this.load.spineAtlas("player-atlas", encodeURI('assets/Red Player/RedPlayer.atlas'));

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create() {
        console.warn('scene created');
        this.add.image(0, 0, 'layer4').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(0.5, 0.25);
        this.add.image(0, 0, 'layer3').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(1, 0.5);
        this.add.image(0, 0, 'layer2').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(1.5, 0.75);
        this.add.image(0, 0, 'layer1').setOrigin(0, 0.075).setScale(0.375, 0.375).setScrollFactor(2, 1);

        const spineObject = this.add.spine(400, 500, "player", "player-atlas");

    }
    update() {
        const camera = this.cameras.main;
        const speed = 2;
        if (this.cursors.left.isDown) {
            camera.scrollX -= speed;
        }
        if (this.cursors.right.isDown) {
            camera.scrollX += speed;
        }
        if (this.cursors.up.isDown) {
            camera.scrollY -= speed;
        }
        if (this.cursors.down.isDown) {
            camera.scrollY += speed;
        }
    }

}
// const configUpper = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 300,
//     scene: UpperScene,
//     parent: 'upper-scene'
// };
const configLower = {
    type: Phaser.AUTO,
    width: window.innerWidth * 0.84,
    height: window.innerHeight / 2,
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    plugins: {
        scene: [{
            key: "spine.SpinePlugin",
            plugin: spine.SpinePlugin,
            mapping: "spine"
        }]
    },
    scene: LowerScene,
    parent: 'lower-scene',
};
// const gameUpper = new Phaser.Game(configUpper);
const gameLower = new Phaser.Game(configLower);