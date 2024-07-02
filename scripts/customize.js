let left_button_1 = document.querySelectorAll("button");

let player_1_skin = document.getElementsByClassName('player_1_skin');
let player_2_skin = document.getElementsByClassName('player_2_skin');

let player1_skins = ['default', 'cube', 'scribble'];
let player2_skins = ['default', 'cube', 'scribble'];
let current_player_skin1 = 0;
let current_player_skin2 = 0;

let current_skins = {
  current_skin_1: "",
  current_skin_2: ""
};

window.onload = () => {
  initializePlayerSkins();
};

function initializePlayerSkins() {
  // Check if the current_skins object has values
  if (current_skins.current_skin_1 !== "" && current_skins.current_skin_2 !== "") {
    // If the current_skins object has values, use them to update the player skins
    updatePlayerSkins();
  } else {
    // If the current_skins object is empty, check localStorage for stored values
    const storedSkin1 = localStorage.getItem('current_skin_1');
    const storedSkin2 = localStorage.getItem('current_skin_2');

    if (storedSkin1 && storedSkin2) {
      // If skins are stored in localStorage, update the current_skins object
      current_skins.current_skin_1 = storedSkin1;
      current_skins.current_skin_2 = storedSkin2;
      updatePlayerSkins(); // Call the updatePlayerSkins function to update the displayed skins
    } else {
      // If no skins are stored in localStorage, set the default skins
      current_skins.current_skin_1 = 'default';
      current_skins.current_skin_2 = 'default';
      updatePlayerSkins();
    }
  }
}

function updatePlayerSkins() {
  player_1_skin[0].src = `./assets/Red Player/${current_skins.current_skin_1}/Red_Idle.gif`;
  player_2_skin[0].src = `./assets/Blue Player/${current_skins.current_skin_2}/Blue_Idle.gif`;

  // Update the current_skins object
  current_skins.current_skin_1 = current_skins.current_skin_1;
  current_skins.current_skin_2 = current_skins.current_skin_2;

  // Save the current skins to localStorage
  localStorage.setItem('current_skin_1', current_skins.current_skin_1);
  localStorage.setItem('current_skin_2', current_skins.current_skin_2);
}

for (let i = 0; i < left_button_1.length; i++) {
  left_button_1[i].addEventListener('click', (e) => {
    if (e.currentTarget.id === "change-player-1-left") {
      current_player_skin1 = (current_player_skin1 - 1 + player1_skins.length) % player1_skins.length;
      current_skins.current_skin_1 = player1_skins[current_player_skin1];
      updatePlayerSkins();
    } else if (e.currentTarget.id === "change-player-1-right") {
      current_player_skin1 = (current_player_skin1 + 1) % player1_skins.length;
      current_skins.current_skin_1 = player1_skins[current_player_skin1];
      updatePlayerSkins();
    } else if (e.currentTarget.id === "change-player-2-left") {
      current_player_skin2 = (current_player_skin2 - 1 + player2_skins.length) % player2_skins.length;
      current_skins.current_skin_2 = player2_skins[current_player_skin2];
      updatePlayerSkins();
    } else if (e.currentTarget.id === "change-player-2-right") {
      current_player_skin2 = (current_player_skin2 + 1) % player2_skins.length;
      current_skins.current_skin_2 = player2_skins[current_player_skin2];
      updatePlayerSkins();
    }
  });

}



// functioning the back button

let back_btn = document.getElementsByClassName("back_btn")

back_btn[0].addEventListener('click',()=>{
  console.log("back to main page");
  window.location.href = 'index.html';
});
