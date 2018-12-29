var started = false;
var level = 0
var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red","blue","green","yellow"]
$(document).keypress(function(){
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = (Math.random());
  randomNumber = randomNumber*4;
  randomNumber = (Math.floor(randomNumber));

  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
    });

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function () {
          nextSequence();
        }, 500);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("h1").text("Game Over. Press Any key to Restart.");
    restartGame();
  }
}
function restartGame(){
  level = 0
  gamePattern = [];
  started = false;
}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
