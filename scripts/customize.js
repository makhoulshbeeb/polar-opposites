let left_button_1 = document.querySelectorAll("button");


for (let i = 0; i < left_button_1.length; i++) {
  left_button_1[i].addEventListener('click', (e) => {
    if(e.currentTarget.id === "change-player-1-left"){
        console.log("left 1 clicked");
    }
    else if(e.currentTarget.id === "change-player-1-right"){
        console.log("right 1 clicked");
    }
    else if(e.currentTarget.id === "change-player-2-left"){
        console.log("left 2 clicked");
    }
    else if(e.currentTarget.id === "change-player-2-right"){
        console.log("right 2 clicked");
    }
  });
}

