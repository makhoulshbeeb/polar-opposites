class LowerScene extends Phaser.Scene {

    constructor() { super({ key: 'Level 1' }) }

    preload() {
        this.load.image('layer1', encodeURI('assets/City Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/City Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/City Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/City Level/Layer 4.png'));

        this.load.spritesheet('running', encodeURI('assets/Red Player/Red_Run_spritesheet.png'),{frameWidth:398,frameHeight:416});
        this.load.spritesheet('falling', encodeURI('assets/Red Player/Red_Falling_spritesheet.png'),{frameWidth:398,frameHeight:419});
        this.load.spritesheet('jumping', encodeURI('assets/Red Player/Red_Jump_spritesheet.png'),{frameWidth:374,frameHeight:428});
        this.load.spritesheet('idle', encodeURI('assets/Red Player/Red_Idle_spritesheet.png'),{frameWidth:398,frameHeight:419});

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create() {
        console.warn('scene created');
        this.add.image(0, 0, 'layer4').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(0.5, 0.25);
        this.add.image(0, 0, 'layer3').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(1, 0.5);
        this.add.image(0, 0, 'layer2').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(1.5, 0.75);
        this.add.image(0, 0, 'layer1').setOrigin(0, 0.075).setScale(0.375, 0.375).setScrollFactor(2, 1);

        const config_idle = {
            key: 'idle_anim',
            frames: 'idle',
            frameRate: 9,
            repeat: -1
        };
        const config_run = {
            key: 'run_anim',
            frames: 'running',
            frameRate: 9,
            repeat: -1
        };
        const config_jump = {
            key: 'jump_anim',
            frames: 'jumping',
            frameRate: 9,
            repeat: -1
        };
        const config_fall = {
            key: 'fall_anim',
            frames: 'falling',
            frameRate: 9,
            repeat: -1
        };

        this.anims.create(config_idle);
        this.anims.create(config_run);
        this.anims.create(config_jump);
        this.anims.create(config_fall);

        player=this.physics.add.sprite(0, 0, 'idle').setOrigin(0.5, 0.5).setScale(-0.2, -0.2);
        player.play('idle_anim');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
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
// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: 'game-container',
//     physics: {
//         default: 'matter',
//         matter: {
//             gravity: { y: 1 },
//             debug: true
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// const game = new Phaser.Game(config);

// let waterGirl, keys;

// function preload() {
//     this.load.image('background', 'assets/background.png');
//     this.load.image('platform', 'assets/platform.png');
//     this.load.image('waterGirl', 'assets/waterGirl.png');
// }

// function create() {
//     this.add.tileSprite(400, 300, 800, 600, 'background');

//     // Define custom paths as platforms
//     const platforms = [
//         this.matter.add.image(100, 500, 'platform', null, { isStatic: true }),
//         this.matter.add.image(300, 400, 'platform', null, { isStatic: true }),
//         this.matter.add.image(500, 300, 'platform', null, { isStatic: true }),
//         this.matter.add.image(700, 200, 'platform', null, { isStatic: true })
//     ];

//     waterGirl = this.matter.add.sprite(100, 450, 'waterGirl');
//     waterGirl.setFixedRotation(); // Prevent rotation when colliding

//     keys = this.input.keyboard.addKeys('W,A,S,D');
// }

// function update() {
//     const speed = 2;
//     const jumpSpeed = -10;

//     // WaterGirl controls
//     if (keys.A.isDown) {
//         waterGirl.setVelocityX(-speed);
//     } else if (keys.D.isDown) {
//         waterGirl.setVelocityX(speed);
//     } else {
//         waterGirl.setVelocityX(0);
//     }

//     // Matter.js handles jumps differently, we check if she is touching the ground first
//     if (keys.W.isDown && waterGirl.body.velocity.y === 0) {
//         waterGirl.setVelocityY(jumpSpeed); // Halved the jump speed with Matter.js
//     }
// }


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
    scene: LowerScene,
    parent: 'lower-scene',
};
// const gameUpper = new Phaser.Game(configUpper);
const gameLower = new Phaser.Game(configLower);
