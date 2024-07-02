const sidebar = document.getElementById("images");
const images = sidebar.getElementsByTagName("img");

let switchCounter = 3;

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      if (switchCounter >= 1) {
        images[switchCounter-1].style.display = "none";
        switchCounter--;
      }
    }
});






