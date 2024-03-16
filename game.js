var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).keypress(function() {
  if (gamePattern.length == 0) {
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver()
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
}
