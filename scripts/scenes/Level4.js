let skin_red = localStorage.getItem('current_skin_1');
let skin_blue = localStorage.getItem('current_skin_2');

let run = false;
let idle = true;
let jump = false;
let fall = false;
let switching = false;

let run2 = false;
let idle2 = true;
let jump2 = false;
let fall2 = false;
let switching2 = false;



class LowerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level 1' });
    }

    preload() {
        this.load.image('layer1', encodeURI('assets/Mountain Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/Mountain Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/Mountain Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/Mountain Level/Layer 4.png'));

        this.load.spritesheet('running', encodeURI(`assets/Red Player/${skin_red}/Red_Run_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('falling', encodeURI(`assets/Red Player/${skin_red}/Red_Falling_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('jumping', encodeURI(`assets/Red Player/${skin_red}/Red_Jump_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('idle', encodeURI(`assets/Red Player/${skin_red}/Red_Idle_spritesheet.png`), { frameWidth: 80, frameHeight: 80});
        
        this.load.spritesheet('running2', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Run_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('falling2', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Falling_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('jumping2', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Jump_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('idle2', encodeURI(`assets/Blue Player/${skin_blue}/Blue_Idle_spritesheet.png`), { frameWidth: 80, frameHeight: 80 });


        this.load.image('player', encodeURI("assets/Red Player/Red Player.svg"))
        this.load.image('player2', encodeURI("assets/Blue Player/Blue Player.svg"))


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

        this.add.image(0, 0, 'layer4').setOrigin(0, 0).setScale(0.75, 0.75).setScrollFactor(0, 0);
        this.add.image(0, 0, 'layer3').setOrigin(0, 0.22).setScale(0.75, 0.6*2).setScrollFactor(0.6, -1.5);
        this.add.image(0, 0, 'layer2').setOrigin(0, 0.12).setScale(0.75, 0.5*2).setScrollFactor(1.2, -0.75);
        this.add.image(0, 10, 'layer1').setOrigin(0, 0.075).setScale(0.75, 0.75).setScrollFactor(2, 0);

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
//   config player 2
        const config_idle2 = {
            key: 'idle_anim2',
            frames: 'idle2',
            frameRate: 12,
            repeat: -1
        };
        const config_run2 = {
            key: 'run_anim2',
            frames: 'running2',
            frameRate: 12,
            repeat: -1
        };
        const config_jump2 = {
            key: 'jump_anim2',
            frames: 'jumping2',
            frameRate: 12,
            repeat: -1
        };
        const config_fall2 = {
            key: 'fall_anim2',
            frames: 'falling2',
            frameRate: 12,
            repeat: -1
        };


        this.anims.create(config_idle);
        this.anims.create(config_run);
        this.anims.create(config_jump);
        this.anims.create(config_fall);

        this.anims.create(config_idle2);
        this.anims.create(config_run2);
        this.anims.create(config_jump2);
        this.anims.create(config_fall2);

        //Player config

        player = this.matter.add.sprite(100, 84, 'player').setOrigin(0.5, 0.5).setScale(-1.5, 0.75 * gravity).setScrollFactor(1);
        player.setFriction(0);
        player.setFrictionStatic(0);
        player.setFixedRotation();
        player.play('run_anim');
        player.setBounce(0.1);


        // add player 2

        player2 = this.matter.add.sprite(100, 84, 'player2').setOrigin(0.5, 0.5).setScale(-1.5, 0.75 * gravity).setScrollFactor(1);
        player2.setFriction(0);
        player2.setFrictionStatic(0);
        player2.setFixedRotation();
        player2.play('run_anim2');
        player2.setBounce(0.1);


        // this.cameras.main.X = player.body.x - ActualScreenWidth / 2;
        // this.cameras.main.Y = player.body.y - ActualScreenHeight / 2;
        this.jumpSound = this.sound.add('jump');
        this.switchSound=this.sound.add('switch')

        // create triangle:

        let i = 0
        let rectX=130;
        let rectY=30;
        let rectHeight=200

// create upper part
        for (let i = 0; i < 30; i++) {
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
        rectHeight=200

        // my_Y = my_Y*2
        for (let i = 0; i < 30; i++) {
            // Create the Matter.js rectangle (for physics)
            const matterRect = this.matter.add.rectangle(rectX, rectY,120, rectHeight, { isStatic: true ,inertia: Infinity });
            // Create the Phaser 3 rectangle (for visual rendering)
            const phaserRect = this.add.rectangle(rectX, rectY, 120, rectHeight, 0x000000); // Red fill color
            rectX += 120;
            rectHeight = Math.floor(Math.random() * (550 - 200 + 1)) + 200; // exchanged by default hardcoded []

            

}

  // Destructure for easy access

//   player.setDensity(1.5);
//   player2.setDensity(1.5);
//   player.setFriction(0.1);
//   player2.setFriction(0.1);
//   this.matter.world.on('collisionstart', (event) => {
//     // Check for collisions between player and world
//                 // Check for collisions between player and world
//                 if (event.pairs[0].bodyA === player.body || event.pairs[0].bodyB === player.body) {
//                     // ... Your collision logic here ...
//                     console.log("Player collision");
    
//                     // Manually adjust position if stuck
//                     if (event.pairs[0].bodyA === player.body && event.pairs[0].bodyB === player2.body) {
//                         // Get the collision points
//                         const collisionPoints = event.pairs[0].collision.points;
    
//                         // Adjust player positions based on collision points
//                         if (collisionPoints && collisionPoints.length > 0) {
                         
//                             const point = collisionPoints[0];
//                             const direction = new Phaser.Math.Vector2(point.x - player.x, point.y - player.y);
//                             const separationDistance = 5; // Adjust this value as needed
    
//                             player.x += direction.normalize().x * separationDistance;
//                             player.y += direction.normalize().y * separationDistance;
    
//                             player2.x -= direction.normalize().x * separationDistance;
//                             player2.y -= direction.normalize().y * separationDistance;
//                         }
//                     }
//                 }
//             });


            // if (this.matter.Collision.collides(player, player2) != null) {
                
            // }


           
}


    
    
    

    update() {



        var keys = this.input.keyboard.addKeys("W,A,S,D");
        var keys = this.input.keyboard.addKeys({ upw: 'W', lefta: 'A', downs: 'S', righdt: 'D' });


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
            player.setScale(1.5, 0.75 * gravity);
            player.setVelocityX(-speed * 2.5);
            
        }
        if (cursors.right.isDown) {
            if (!run) {
                player.play('run_anim');
                jump = false;
                idle = false;
                run = true;
            }
            player.setScale(-1.5, 0.75 * gravity)
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
                this.matter.world.setGravity(0, gravity); // Update Matter.js gravity
                player.setVelocityY(0); // Reset vertical velocity
                player.setScale(-1.5, 0.75 * gravity); 
                player2.setScale(-1.5, 0.75 * gravity);
                switching = true;
                this.switchSound.play();
            }
        } else {
            switching = false;
        }
        if (!(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.space.isDown)) {
            if (!idle) {
                player.play('idle_anim'); 
            }
            jump = false;
            idle = true;
            run = false;
        }
        camera.scrollY = player.body.position.y / 8;
        camera.scrollX = player.body.position.x;

        // player 2 updates 
        player2.setVelocityX(0);
    
        if (keys.lefta.isDown) {

            if (!run) {
                player2.play('run_anim2');
                jump2 = false;
                idle2 = false;
                run2 = true;
            }
            player2.setScale(1.5, 0.75 * gravity);
            player2.setVelocityX(-speed * 2.5);

            console.log("w")
        }

        if(keys.upw.isDown){
            if(!jump){
                player2.play('jump_anim2');
                jump2 = true;
                idle2= false;
                run2 = false;
            }

         this.jumpSound.play();
         player2.setVelocityY(-gravity * speed);
        }

        if (keys.righdt.isDown) {
            if (!run) {
                player2.play('run_anim2');
                jump2 = false;
                idle2 = false;
                run2 = true;
            }
            player2.setScale(-1.5, 0.75 * gravity)
            player2.setVelocityX(speed * 2.5);
        }

        if (!(keys.lefta.isDown || keys.downs.isDown || keys.upwisDown || keys.righdt.isDown)) {
            if (!idle2) {
                player2.play('idle_anim2'); 
            }
            jump2 = false;
            idle2 = true;
            run2 = false;
        }

        camera.scrollY = player2.body.position.y / 8;
        camera.scrollX = player2.body.position.x;



        
    }

    // player 2 update




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
let player2;
let cursors;
let gravity = -2;


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
                showBody: false,
                showStaticBody: false,
                showAxes: false,
                
            }
        }
    },
    scene: LowerScene,
    parent: 'lower-scene',
};
// const gameUpper = new Phaser.Game(configUpper);
const gameLower = new Phaser.Game(configLower);