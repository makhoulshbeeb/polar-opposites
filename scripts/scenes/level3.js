let skin_red = localStorage.getItem('current_skin_1');
let skin_blue = localStorage.getItem('current_skin_2');
let run = false;
let idle = true;
let jump = false;
let fall = false;
let switching = false;


class LowerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level 1' });
    }

    preload() {
        this.load.image('layer1', encodeURI('assets/Asian egybt level/firstlayer.png'));
        this.load.image('layer2', encodeURI('assets/Asian egybt level/secondlayer.png'));
        this.load.image('layer3', encodeURI('assets/Asian egybt level/thirdlayer.png'));
        this.load.image('layer4', encodeURI('assets/Asian egybt level/fourthlayer.png'));

        this.load.spritesheet('running', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Run_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('falling', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Falling_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('jumping', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Jump_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('idle', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Idle_spritesheet.png`), { frameWidth: 80, frameHeight: 80});

        this.load.image('player', encodeURI("assets/Blue Player/Blue Player.svg"))

        // laoding audio 
        // jump audio 
        this.load.audio('jump','assets/Music/jump.mp3')
        this.load.audio('switch','assets/Music/switch.mp3')

        // fall audio

        cursors = this.input.keyboard.createCursorKeys();
    }
    create() {
        this.cameras.main.setBounds(0, 0, 1480, 1080);
        this.cameras.main.setOrigin(0, 0.5);
        this.matter.world.setBounds(0, 22, 1480, 360*2);
        console.warn('scene created');

        // Layers and Platforms

        this.add.image(0, 0, 'layer4').setOrigin(0.5, 0).setScale(0.75, 0.75).setScrollFactor(0, 0);
        this.add.image(0, 0, 'layer3').setOrigin(0, 0.22).setScale(0.75, 0.6*2).setScrollFactor(0.6, -1.5);
        this.add.image(0, 0, 'layer2').setOrigin(0, 0.12).setScale(0.75, 0.5*2).setScrollFactor(1.2, -0.75);
        this.add.image(0, 10, 'layer1').setOrigin(0, 0.075).setScale(0.75, 1.2).setScrollFactor(2, 0);
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

        player = this.matter.add.sprite(400, 84, 'player').setOrigin(0.5, 0.5).setScale(-1.5, gravity).setScrollFactor(1);
        player.setFriction(0);
        player.setFrictionStatic(0);
        player.setFixedRotation();
        player.play('run_anim');
        player.setBounce(0.1);
        // this.cameras.main.X = player.body.x - ActualScreenWidth / 2;
        // this.cameras.main.Y = player.body.y - ActualScreenHeight / 2;
        this.jumpSound = this.sound.add('jump');
        this.switchSound=this.sound.add('switch')

        // create triangle:

        let i = 0
        let rectX=700;
        let rectY=0;
        let rectHeight=100

// create upper part
        for (let i = 0; i < 19; i++) {
            // Create the Matter.js rectangle (for physics)
            let matterRect = this.matter.add.rectangle(rectX, rectY, 120, rectHeight, { isStatic: true ,inertia: Infinity });
            
            // Create the Phaser 3 rectangle (for visual rendering)
            let phaserRect = this.add.rectangle(rectX, rectY, 120, rectHeight, "#121212"); // Red fill color
            rectX += 120;
            rectHeight = Math.floor(Math.random() * (550 - 200 + 1)) + 200; // exchanged by default hardcoded []
          }

// create the lower 
i = 0
rectX=130;
rectY=window.innerHeight+20;
rectHeight=100

// my_Y = my_Y*2
for (let i = 0; i < 19; i++) {
    // Create the Matter.js rectangle (for physics)
    const matterRect = this.matter.add.rectangle(rectX, rectY,120, rectHeight, { isStatic: true ,inertia: Infinity });
    // Create the Phaser 3 rectangle (for visual rendering)
    const phaserRect = this.add.rectangle(rectX, rectY, 120, rectHeight, 0x000000); // Red fill color
    rectX += 120;
    rectHeight = Math.floor(Math.random() * (550 - 200 + 1)) + 200; // exchanged by default hardcoded []

}





    
    
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
            player.setScale(1.5, gravity);
            player.setVelocityX(-speed * 2.5);
        }
        if (cursors.right.isDown) {
            if (!run) {
                player.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player.setScale(-1.5, gravity)
            player.setVelocityX(speed * 2.5);
        }
        if (cursors.up.isDown) {
            if (!jump) {
                player.play('jump_anim');
                jump = true;
                idle = false;
                run = false;
             this.jumpSound.play();

            }
            player.setVelocityY(-gravity * speed);
        }

        if (cursors.space.isDown) {
            if (!switching) {
                gravity *= -1;
                player.setVelocityY(0);
                player.setScale(-1.5,  gravity);
                this.matter.world.setGravity(0, gravity);
                switching=true;
             this.switchSound.play();

            }
        }else{
            switching=false;
        }
        if (!(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.space.isDown)) {
            if (!idle) player.play('idle_anim');
            jump = false;
            idle = true;
            run = false;
        }
        camera.scrollY = player.body.position.y / 8;
        camera.scrollX = player.body.position.x;
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
let gravity = -1.5;


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
    height: window.innerHeight ,
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
                showAxes: true,
                
            }
        }
    },
    scene: LowerScene,
    parent: 'lower-scene',
};
// const gameUpper = new Phaser.Game(configUpper);
const gameLower = new Phaser.Game(configLower);
