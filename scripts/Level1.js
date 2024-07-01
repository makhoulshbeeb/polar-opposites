// class UpperScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'UpperScene' });
//     }

//     preload() {
//         this.load.image("bg", "/assets/theme1.jpeg");
//     }

//     create() {
//         this.add.image(400, 150, "bg").setOrigin(0.5, 0.5);
//         const button = this.add.text(350, 250, 'Press Me', { fill: '#0f0' })
//             .setInteractive()
//             .on('pointerdown', () => this.handleButtonClick());
//     }

//     handleButtonClick() {
//         globalState.upperButtonPressed = true;
//         this.checkBothButtonsPressed();
//     }

//     checkBothButtonsPressed() {
//         if (globalState.upperButtonPressed && globalState.lowerButtonPressed) {
//             alert('Both buttons pressed!');
//         }
//     }
// }

// class LowerScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'LowerScene' });
//     }

//     preload() {
//         this.load.image("bg1", "/assets/theme2.jpeg");
//     }

//     create() {
//         this.add.image(400, 150, "bg1").setOrigin(0.5, 0.5);
//         const button = this.add.text(350, 250, 'Press Me', { fill: '#0f0' })
//             .setInteractive()
//             .on('pointerdown', () => this.handleButtonClick());
//     }

//     handleButtonClick() {
//         globalState.lowerButtonPressed = true;
//         this.checkBothButtonsPressed();
//     }

//     checkBothButtonsPressed() {
//         if (globalState.upperButtonPressed && globalState.lowerButtonPressed) {
//             alert('Both buttons pressed!');
//         }
//     }
// }

// const configUpper = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 300,
//     scene: UpperScene,
//     parent: 'upper-scene'
// };

// const configLower = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 300,
//     scene: LowerScene,
//     parent: 'lower-scene'
// };

// const gameUpper = new Phaser.Game(configUpper);
// const gameLower = new Phaser.Game(configLower);
