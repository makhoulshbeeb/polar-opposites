

let switchCounter = 3;

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if (switchCounter >= 1) {
        images[switchCounter - 1].classList.add("switchUpdate");
        switchCounter--;
      }
    }
});
const lives = document.querySelectorAll(".lives");
        document.addEventListener("keydown", (event) => {
            if (event.code === "KeyS") {
                for (let i = 0; i < lives.length; i++) {
                    if (lives[i].src.includes("full_heart.png")) {
                        lives[i].src = "assets/Icons/empty_heart.png";
                    
                        break;
                    }
                }
            }
        });





