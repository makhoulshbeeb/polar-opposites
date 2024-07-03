let skin_red = localStorage.getItem('current_skin_1');
let skin_blue = localStorage.getItem('current_skin_2');
let run = false;
let idle = true;
let jump = false;
let fall = false;
let switching = false;
let touchingGround=true;
let player;
let player2;
let cursors;
let cursors2;
let gravity = -1;
let gravity2 = 1;


class UpperScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level 1' });
    }

    preload() {
        this.load.image('layer1', encodeURI('assets/City Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/City Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/City Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/City Level/Layer 4.png'));

        this.load.spritesheet('running', encodeURI(`assets/Red Player/${skin_red}/Red_Run_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('falling', encodeURI(`assets/Red Player/${skin_red}/Red_Falling_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('jumping', encodeURI(`assets/Red Player/${skin_red}/Red_Jump_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('idle', encodeURI(`assets/Red Player/${skin_red}/Red_Idle_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });

        this.load.image('player', encodeURI("assets/Red Player/Red Player.svg"))

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

        player = this.matter.add.sprite(48, 84, 'player').setOrigin(0.5, 0.5).setScale(-1, gravity).setScrollFactor(1);
        player.setFriction(0);
        player.setFrictionStatic(0);
        player.setFixedRotation();
        player.play('run_anim');
        player.setBounce(0.1);
        // this.cameras.main.X = player.body.x - ActualScreenWidth / 2;
        // this.cameras.main.Y = player.body.y - ActualScreenHeight / 2;
        this.jumpSound = this.sound.add('jump');
        this.switchSound=this.sound.add('switch')
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
            player.setScale(1, gravity);
            player.setVelocityX(-speed * 2.5);
            camera.scrollX -= speed * 1.5;
        }
        if (cursors.right.isDown) {
            if (!run) {
                player.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player.setScale(-1, gravity)
            player.setVelocityX(speed * 2.5);
            camera.scrollX += speed * 1.5;
        }
        if (cursors.up.isDown) {
            if (!jump && touchingGround) {
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
                player.setScale(-1, 1* gravity);
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
        console.log(camera.scrollY);
    }

}

class LowerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level 1' });
    }

    preload() {
        this.load.image('layer1', encodeURI('assets/Cave Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/Cave Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/Cave Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/Cave Level/Layer 4.png'));

        this.load.spritesheet('running', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Run_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('falling', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Falling_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('jumping', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Jump_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('idle', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Idle_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });

        this.load.image('player', encodeURI("assets/Blue Player/Blue Player.svg"))
        cursors2 = this.input.keyboard.createCursorKeys();
    }
    create() {
        this.cameras.main.setBounds(0, 0, 1480, 1080);
        this.cameras.main.setOrigin(0, 0.5);
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

        //Player2 config

        player2 = this.matter.add.sprite(48, 84, 'player2').setOrigin(0.5, 0.5).setScale(-1,gravity2).setScrollFactor(1);
        player2.setFriction(0);
        player2.setFrictionStatic(0);
        player2.setFixedRotation();
        player2.play('run_anim');
        player2.setBounce(0.1);
        // this.cameras.main.X = player2.body.x - ActualScreenWidth / 2;
        // this.cameras.main.Y = player2.body.y - ActualScreenHeight / 2;
    }

    update() {
        const camera = this.cameras.main;
        const speed = 2;
        player2.setVelocityX(0);
        if (cursors2.a.isDown) {
            if (!run) {
                player2.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player2.setScale(1, gravity);
            player2.setVelocityX(-speed * 2.5);
            camera.scrollX -= speed * 1.5;
        }
        if (cursors2.d.isDown) {
            if (!run) {
                player2.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player2.setScale(-1, gravity)
            player2.setVelocityX(speed * 2.5);
            camera.scrollX += speed * 1.5;
        }
        if (cursors2.w.isDown) {
            if (!jump && touchingGround) {
                player2.play('jump_anim');
                jump = true;
                idle = false;
                run = false;
            }
            player2.setVelocityY(-gravity * speed);
        }
        if (cursors2.space.isDown) {
            if (!switching) {
                gravity *= -1;
                player2.setVelocityY(0);
                player2.setScale(-1, 1* gravity);
                this.matter.world.setGravity(0, gravity);
                switching=true;
            }
        }else{
            switching=false;
        }
        if (!(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.space.isDown)) {
            if (!idle) player2.play('idle_anim');
            jump = false;
            idle = true;
            run = false;
        }
        camera.scrollY = player2.body.position.y / 8;
        console.log(camera.scrollY);
    }
}

const configUpper = {
    type: Phaser.AUTO,
    width: window.innerWidth * 0.84,
    height: window.innerHeight / 2,
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: gravity2
            },
            debug: {
                showBody: true,
                showStaticBody: true,
                showAxes: true
            }
        }
    },
    scene: UpperScene,
    parent: 'upper-scene',
};
const configLower = {
    type: Phaser.AUTO,
    width: window.innerWidth * 0.84,
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
const gameUpper = new Phaser.Game(configUpper);
const gameLower = new Phaser.Game(configLower);