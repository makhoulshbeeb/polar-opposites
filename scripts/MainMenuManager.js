document.getElementById("play").addEventListener('click', function(){
    $("#levels").toggle();
    $("#left").toggle();
});
let bg_audio=new Audio("./assets/Music/back-ground.mp3" )
window.addEventListener("click",()=>{
    bg_audio.play()

})
document.getElementById("back-button").addEventListener('click', function(){
    $("#levels").toggle();
    $("#left").toggle();
});