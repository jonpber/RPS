var wins = 0;
var losses = 0;
var ties = 0;

var winText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var stateText = document.getElementById("stateText");

var pImg = document.getElementById("pHandImg");
var compImg = document.getElementById("cHandImg");

var compHand = ["r","p","s"];

var pHand = "";
var compHandPick = "";

var pWon = false;
var tie = false;

var hyperbole = [" was thoroughly destroyed by ", " faced bitter defeat by ", " lost to "];

var chips = 50;




function buttonR () {
	CompPick();
	pHand = "r";
	pImg.src = "assets/images/pHandr.png";
	if (compHandPick === "r"){
		tie = true;
		pWon = false;
	}

	else if (compHandPick === "s"){
		wins += 1;
		pWon = true;
		tie = false;

	}

	else {
		losses += 1;
		pWon = false;
		tie = false;
	}

	updateScore();
}


function buttonP () {
	CompPick();
	pImg.src = "assets/images/pHandp.png";
	pHand = "p";
	if (compHandPick === "p"){
		tie = true;
		pWon = false;
	}

	else if (compHandPick === "r"){
		wins += 1;
		pWon = true;
		tie = false;
	}

	else {
		losses += 1;
		pWon = false;
		tie = false;
	}

	updateScore();

}

function buttonS () {
	CompPick();
	pHand = "s";
	pImg.src = "assets/images/pHands.png";
	if (compHandPick === "s"){
		tie = true;
		pWon = false;
	}

	else if (compHandPick === "p"){
		wins += 1;
		pWon = true;
		tie = false;
	}

	else {
		losses += 1;
		pWon = false;
		tie = false;
	}

	updateScore();
}


function CompPick () {
	compHandPick = compHand[Math.floor(Math.random() * 3)];
	cHandImg.src = "assets/images/cHand" + compHandPick + ".png";


	return compHandPick;
}

function updateScore(){
	winText.textContent = "Wins: " + wins;
	lossText.textContent = "Loses: " + losses;
	if (pWon && !tie) {
		stateText.textContent = "Computer's " + compHandPick + hyperbole[Math.floor(Math.random() * 3)] + "Player's " + pHand;
	}

	else if (!pWon && !tie){
		stateText.textContent = "Players's " + pHand + hyperbole[Math.floor(Math.random() * 3)] + "Computer's " + compHandPick;
	}

	else if (tie) {
		stateText.textContent = "A tie. How boring."
	}
}

