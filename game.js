var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
//nextSequence();
var level=0;
var isButtonPressed=true;
var userClickedPattern=[];

function nextSequence(){
	var randomNumber=Math.floor(Math.random()*4);
	
	var randomChosenColour=buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("."+randomChosenColour).fadeOut(100).fadeIn(100);
	
	$("h1").html("Level "+level);
	level++;
	var playAudio = new Audio("./sounds/"+randomChosenColour+".mp3");
	playAudio.play();
}

function playSound(name){
	
	$("#"+name).click(function(){
		var playAudio = new Audio("./sounds/"+name+".mp3");
		playAudio.play();
	});
}
function animatePress(currentColour){
	$("."+currentColour).addClass("pressed");
	setTimeout(function() { 
        $("."+currentColour).removeClass("pressed");
    }, 100);
	
}
function checkAnswer(currentLevel){
	
	if(userClickedPattern[currentLevel]!==gamePattern[currentLevel]){
		var playAudio = new Audio("./sounds/wrong.mp3");
		playAudio.play();
		$("h1").html("Game Over, Press Any Key to Restart");
		
		$("body").addClass("game-over");
		
		setTimeout(function() { 
			$("body").removeClass("game-over");
		}, 2000);
		
		$(document).keypress(function(event){
			isButtonPressed=true;
			if(isButtonPressed){
				location.reload();
				isButtonPressed=false;
			}
		});
		
	}else{
		//$("h1").html("success");
		
		if(userClickedPattern.length===gamePattern.length){
			setTimeout(function() { 
				nextSequence();
			}, 1000);
		}
		
	}
	
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  //console.log(lastAnswerIndex);
  //console.log(gamePattern.length);
});

/*$("#green").click(function(){
	userClickedPattern.push("green");
	playSound("green");
	animatePress("green");
	lastAnswerIndex++;    
});
$("#red").click(function(){
	userClickedPattern.push("red");
	playSound("red");
	animatePress("red");
	lastAnswerIndex++;
});
$("#yellow").click(function(){
	userClickedPattern.push("yellow");
	playSound("yellow");  
	animatePress("yellow");
	lastAnswerIndex++;
});
$("#blue").click(function(){
	userClickedPattern.push("blue");
	playSound("blue");
	animatePress("blue");
	lastAnswerIndex++;
});*/
document.addEventListener("keypress",function(){
	if(isButtonPressed){
		nextSequence();
		isButtonPressed=false;
	}
});

/*document.querySelector(".yellow").addEventListener("click",function(){
	var playAudio=new Audio("./sounds/yellow.mp3");
	playAudio.play();
});*/