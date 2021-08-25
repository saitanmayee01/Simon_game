gamePattern = [];
userClickedPattern = [];
buttoncolors = ["red", "blue", "green", "yellow"];

var started = false;    //to check if game has started
var level = 0;          //to keep track of levels

//to detect start if the game, and to display h1 as level 0
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      started = true;
      nextSequence();
    }
});

$(".btn").click(function() {
    var userColorChosen = $(this).attr("id");
    userClickedPattern.push(userColorChosen);
    //console.log(userClickedPattern);
    playSound(userColorChosen);
    animatePress(userColorChosen);
    checkanswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];    //for every nextsequence, userclicked is updated to null
    level++;                    //and levelled up

    $("#level-title").text("Level " + level);   //update level in h1
    var randomNumber = Math.floor(Math.random()*4);  
    var randomColorChosen = buttoncolors[randomNumber];
    gamePattern.push(randomColorChosen);

    $('#'+randomColorChosen).fadeOut(120).fadeIn(120);

    var audio = new Audio("sounds/" + randomColorChosen + ".mp3");
    audio.play();
        
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function checkanswer(currentlevel){
    if (gamePattern[currentlevel]==userClickedPattern[currentlevel]){
        // console.log("success");
        if(gamePattern.length==userClickedPattern.length)
            setTimeout(() => {                  //()=> is nothing but an anonymous arrow function
                nextSequence();
            }, 1000);
    }
    else{
        // console.log("fail");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over! Press any key to restart");
        startOver();
    }
    // console.log("game:"+gamePattern);
    // console.log("user:"+userClickedPattern);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

