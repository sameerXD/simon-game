 var level = 0;
 var started = false;
//stores the pattern by the user
var userClickedPattern = [];
console.log(userClickedPattern);

// array of colours
var buttonColours = ["red", "blue", "green", "yellow"];

// empty aray
var gamePattern = [];
console.log("ingame"+gamePattern);


//start the game when a key is pressed





$(document).on("dblclick",function(){

if (!started){
  gamePattern = [];
  $("#level-title").text("Level " + level);
  nextSequence();

  started = true;
}

}
);

//function stores the id of the button clicked
$(".btn").on("click",function(){



  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);


  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  console.log("userClickedPattern "+userClickedPattern);


});


// random number between 0-3
function nextSequence(){
  userClickedPattern = [];

  level++;
   $("#level-title").text("Level " + level);

 var randomNumber = Math.floor(Math.random() * 4);

 // use random number(0-3) to choose random color from array
 var randomChosenColor = buttonColours[randomNumber];
console.log("randomChosenColor "+randomChosenColor);
 // push random clor to empty array
 gamePattern.push(randomChosenColor);
console.log("gamePattern "+gamePattern);
 //animate the random button
 playSound(randomChosenColor);
 $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


}


//concatinate to create an id
function playSound(name){

  var idAudio = new Audio("sounds/" + name   +".mp3");

  idAudio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColor).removeClass("pressed");
   }, 100);
}




function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
   } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, double click to Restart");

     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     startOver();
    }
}
function startOver() {
  level = 0;
  gamePattern = [];

  started = false;
}
