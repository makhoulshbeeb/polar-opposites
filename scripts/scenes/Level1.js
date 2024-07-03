let skin_red = localStorage.getItem('current_skin_1');
let run = false;
let idle = true;
let jump = false;
let fall = false;

class LowerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level 1' });
    }

    preload() {
        this.load.image('layer1', encodeURI('assets/City Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/City Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/City Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/City Level/Layer 4.png'));

        this.load.spritesheet('running', encodeURI(`assets/Red Player/${skin_red}/Red_Run_spritesheet.png`), { frameWidth: 398, frameHeight: 416 });
        this.load.spritesheet('falling', encodeURI(`assets/Red Player/${skin_red}/Red_Falling_spritesheet.png`), { frameWidth: 398, frameHeight: 419 });
        this.load.spritesheet('jumping', encodeURI(`assets/Red Player/${skin_red}/Red_Jump_spritesheet.png`), { frameWidth: 374, frameHeight: 428 });
        this.load.spritesheet('idle', encodeURI(`assets/Red Player/${skin_red}/Red_Idle_spritesheet.png`), { frameWidth: 398, frameHeight: 419 });

        this.load.image('player', encodeURI("assets/Red Player/Red Player.svg"))
        cursors = this.input.keyboard.createCursorKeys();
    }
    create() {
        this.cameras.main.setBounds(0,0,1480,1080);
        this.cameras.main.setOrigin(0,0.5);
        this.matter.world.setBounds(0, 22, 1480, 360);
        console.warn('scene created');

        // Layers and Platforms

        this.add.image(0, 0, 'layer4').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(0, 0);
        this.add.image(0, 0, 'layer3').setOrigin(0, 0.22).setScale(0.375, 0.6).setScrollFactor(0.6, -1.5);
        this.add.image(0, 0, 'layer2').setOrigin(0, 0.12).setScale(0.375, 0.5).setScrollFactor(1.2, -0.75);
        this.add.image(0, 10, 'layer1').setOrigin(0, 0.075).setScale(0.375, 0.375).setScrollFactor(2, 0);

        // const ceiling = this.matter.add.rectangle(400, 20, 5100, 20, { isStatic: true });
        //Animations

        const config_idle = {
            key: 'idle_anim',
            frames: 'idle',
            frameRate: 12,
            repeat: -1
        };
        const config_run = {
            key: 'run_anim',
            frames: 'running',
            frameRate: 12,
            repeat: -1
        };
        const config_jump = {
            key: 'jump_anim',
            frames: 'jumping',
            frameRate: 12,
            repeat: -1
        };
        const config_fall = {
            key: 'fall_anim',
            frames: 'falling',
            frameRate: 12,
            repeat: -1
        };

        this.anims.create(config_idle);
        this.anims.create(config_run);
        this.anims.create(config_jump);
        this.anims.create(config_fall);

        //Player config

        player = this.matter.add.sprite(48, 84, 'player').setOrigin(0.5, 0.5).setScale(-0.2, 0.2 * gravity).setScrollFactor(1);
        player.setFriction(0);
        player.setFrictionStatic(0);
        player.setFixedRotation();
        player.play('run_anim');
        player.setBounce(0.1);
        // this.cameras.main.X = player.body.x - ActualScreenWidth / 2;
        // this.cameras.main.Y = player.body.y - ActualScreenHeight / 2;
    }

    update() {
        const camera = this.cameras.main;
        const speed = 2;
        player.setVelocityX(0);
        if (cursors.left.isDown) {
            if (!run) {
                player.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player.setScale(0.2, 0.2 * gravity);
            player.setVelocityX(-speed * 2.5);
            camera.scrollX -= speed*1.5;
        }
        if (cursors.right.isDown) {
            if (!run) {
                player.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player.setScale(-0.2, 0.2 * gravity)
            player.setVelocityX(speed * 2.5);
            camera.scrollX += speed*1.5;
        }
        if (cursors.up.isDown) {
            if (!jump) {
                player.play('jump_anim');
                jump = true;
                idle = false;
                run = false;
            }
            player.setVelocityY(-gravity * speed);
        }
        if (cursors.space.isDown) {
            gravity *= -1;
            player.setVelocityY(0);
            player.setScale(-0.2, 0.2 * gravity);
            this.matter.world.setGravity(0, gravity);
        }
        if (!(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown)) {
            if (!idle) player.play('idle_anim');
            jump = false;
            idle = true;
            run = false;

        }
        camera.scrollY=player.body.position.y/8;
        console.log(camera.scrollY);
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

let player;
let cursors;
let gravity = -1;


// const configUpper = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 300,
//     scene: UpperScene,
//     parent: 'upper-scene'
// };
const configLower = {
    type: Phaser.AUTO,
    width: window.innerWidth*0.84,
    height: window.innerHeight / 2,
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: gravity
            },
            debug: {
                showBody: true,
                showStaticBody: true,
                showAxes: true
            }
        }
    },
    scene: LowerScene,
    parent: 'lower-scene',
};
// const gameUpper = new Phaser.Game(configUpper);
const gameLower = new Phaser.Game(configLower);
