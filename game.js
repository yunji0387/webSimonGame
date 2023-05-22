let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let isStarted = false;
let isFailed = false;

function updateH1(){
    $("#level-title").text("Level : " + level);
}

function resetLevel(){
    isFailed = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document.body).removeClass("fail");
    updateH1();
    setTimeout(function () {
        newSequence();
    }, 500);
}

function levelFail(){
    $("#level-title").text("Fail at level " + level + "... Pressed A key to restart");
    playSound("wrong");
    $(document.body).addClass("fail");
}

function checkAnswer(){
    let result = true;
    for(let i=0 ; i<userClickedPattern.length ; i++){
        if(userClickedPattern[i] != gamePattern[i]){
            result = false;
            isFailed = true;
            return result;
        }
    }
    return result;
}

function nextLevelLoading(){
    $(document.body).addClass("loading");
    setTimeout(function () {
        $(document.body).removeClass("loading");
    }, 250);
    setTimeout(function () {
        newSequence();
    }, 500);
}

function newSequence(){
    level++;
    updateH1();
    let randomColour = buttonColours[Math.floor(Math.random() * 4)]; 
    gamePattern.push(randomColour);
    $("#" + randomColour).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}

function playSound(soundName){
    let audio = new Audio( "sounds/" + soundName + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function(){
    if(isStarted && !isFailed){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        if(!checkAnswer()){
            levelFail();
        }else{
            nextLevelLoading();
        } 
    }
});

$(document).on("keypress", function(){
    if(!isStarted){
        updateH1();
        newSequence();
        isStarted = true;
    }else if(isFailed){
        resetLevel();
    }
});