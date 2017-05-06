var wins = 0;
var losses = 0;
var ties = 0;

var winText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var choiceText = document.getElementById("compPlayerChoice");

var compHand = ["r","p","s"];

var pHand = "";
var CompHandPick = "";

function buttonR () {
	pHand = "r";
	if (CompPick() === "r"){
		ties += 1;
	}

	else if (CompPick() === "s"){
		wins += 1;
	}

	else {
		losses += 1;
	}

	updateScore();
}


function buttonP () {
	pHand = "p";
	if (CompPick() === "p"){
		ties += 1;
	}

	else if (CompPick() === "r"){
		wins += 1;
	}

	else {
		losses += 1;
	}

	updateScore();

}

function buttonS () {
	pHand = "s";
	if (CompPick() === "s"){
		ties += 1;
	}

	else if (CompPick() === "p"){
		wins += 1;
	}

	else {
		losses += 1;
	}

	updateScore();
}


function CompPick () {
	compHandPick = compHand[Math.floor(Math.random() * 3)];
	return compHandPick;
}

function updateScore(){
	winText.textContent = "Wins: " + wins;
	lossText.textContent = "Loses: " + losses;
	choiceText.textContent = "Player Chose: " + pHand + " -- Comp chose: " + compHandPick;
}

