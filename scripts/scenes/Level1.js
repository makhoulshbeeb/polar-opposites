let skin_red = localStorage.getItem('current_skin_1');
let svgUpper=`<svg width="5120" height="459" viewBox="0 0 5120 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M279.354 257.459L0 257.459V-3.05176e-05L5120 -3.05176e-05V325.028L4910.73 226.005L4771.06 226.005V325.028H4719.49V412.984H4622.37V325.028L4524.74 325.028V226.005L4293.95 325.028H3996.57L3650.13 226.005L3258.64 226.005V459H3076.41V226.005H2954.75V325.028L2879.16 325.028V459H2702.93V200.958L2560.25 200.958L2557.25 325.028H2402.05L2086.15 183.483H1891.9V412.983L1761.24 412.983V325.028L1630.57 325.028V183.483H1484.89V325.028H1299.65L986.753 151.447H774.483V325.028H604.267V151.447H425.04L279.354 257.459Z" fill="#121212"/>
</svg>`;
class LowerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level 1' });
    }

    preload() {
        this.load.image('layer1', encodeURI('assets/City Level/Layer 1.png'));
        this.load.image('layer2', encodeURI('assets/City Level/Layer 2.png'));
        this.load.image('layer3', encodeURI('assets/City Level/Layer 3.png'));
        this.load.image('layer4', encodeURI('assets/City Level/Layer 4.png'));

        this.load.spritesheet('running', encodeURI(`assets/Red Player/${skin_red}/Red_Run_spritesheet.png`), {  frameWidth: 398, frameHeight: 416 });
        this.load.spritesheet('falling', encodeURI(`assets/Red Player/${skin_red}/Red_Falling_spritesheet.png`), { frameWidth: 398, frameHeight: 419 });
        this.load.spritesheet('jumping', encodeURI(`assets/Red Player/${skin_red}/Red_Jump_spritesheet.png`), { frameWidth: 374, frameHeight: 428 });
        this.load.spritesheet('idle', encodeURI(`assets/Red Player/${skin_red}/Red_Idle_spritesheet.png`), { frrameWidth: 398, frameHeight: 419 });

        this.load.image('player', encodeURI("assets/Red Player/Red Player.svg"))
        cursors = this.input.keyboard.createCursorKeys();
    }
    create() {
        this.matter.world.setBounds(0, 0, gameLower.config.width, gameLower.config.height);
        console.warn('scene created');

        // this.createPlatformFromSVG(svgUpper);

        this.add.image(0, 0, 'layer4').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(0.5, 0.25);
        this.add.image(0, 0, 'layer3').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(1, 0.5);
        this.add.image(0, 0, 'layer2').setOrigin(0, 0).setScale(0.375, 0.375).setScrollFactor(1.5, 0.75);
        this.add.image(0, 0, 'layer1').setOrigin(0, 0.075).setScale(0.375, 0.375).setScrollFactor(2, 1);

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
        
        player = this.matter.add.sprite(48, 84, 'player').setOrigin(0.5, 0.5).setScale(-0.2, -0.2).setScrollFactor(-4);
        player.setFixedRotation();
        player.play('run_anim');
        player.setBounce(0.2);
        // this.cameras.main.X = player.body.x - ActualScreenWidth / 2;
        // this.cameras.main.Y = player.body.y - ActualScreenHeight / 2;
    }
    // createPlatformFromSVG(svgText) {
    //     let verticesSets = this.svgPathToVertices(svgText);
    //     verticesSets.forEach(vertices => {
    //         let body = Matter.Bodies.fromVertices(400, 300, vertices, {
    //             isStatic: true // Make the platform static
    //         });
    //         Matter.World.add(this.matter.world, body);
    //     });
    // }
    // svgPathToVertices(svgText) {
    //     // Use DOMParser to parse the SVG
    //     let parser = new DOMParser();
    //     let svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    //     let paths = svgDoc.querySelectorAll('path');
        
    //     let verticesSets = [];
    //     paths.forEach(path => {
    //         let pathData = path.getAttribute('d');
    //         let svgPath = this.Svg.pathToVertices(path, 30); // 30 is the sample length, adjust as needed
    //         let vertices = Vertices.create(svgPath);
    //         verticesSets.push(vertices);
    //     });
    //     return verticesSets;
    // }
    update() {
        const camera = this.cameras.main;
        const speed = 3;
        if (cursors.left.isDown) {
            player.play('run_anim');
            player.setScale(0.2,-0.2);
            player.setVelocityX(-speed);
        }
        if (cursors.right.isDown) {
            player.play('run_anim');
            player.setScale(-0.2,-0.2)
            player.setVelocityX(speed);
        }
        if (cursors.up.isDown) {
            player.play('jump_anim');
            player.setVelocityY(speed);
        }
        if(!(cursors.left.isDown||cursors.right.isDown||cursors.up.isDown)){
            player.play('idle_anim');
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

let player;
let cursors;


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
                y: -1
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
