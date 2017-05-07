var rps = {
	wins: 0,
	losses: 0,
	ties: 0,

	chipText: document.getElementById("chips"),
	betText: document.getElementById("bet"),
	potText: document.getElementById("pot"),
	betNum: 0,
	chips: 50,
	pot: 0,

	stateText: document.getElementById("stateText"),

	pImg: document.getElementById("pHandImg"),
	compImg: document.getElementById("cHandImg"),

	splitRow: document.getElementById("splitRow"),
	onlyHandRow: document.getElementById("onlyHand"),
	onlyHandOff: document.getElementById("onlyHandOff"),
	twoHandRow: document.getElementById("twoHands"),
	pHandABut: document.getElementsByClassName("twoHandAButton"),
	pHandBBut: document.getElementsByClassName("twoHandBButton"),
	betRow: document.getElementById("betRow"),

	compHand: ["r","p","s"],

	pHand: "",
	pHandA: "",
	pHandB: "",
	compHandPick: "",
	compHandA: "",
	compHandB: "",

	pHAImg: document.getElementById("p2HandA"),
	pHBImg: document.getElementById("p2HandB"),
	cHAImg: document.getElementById("c2HandA"),
	cHBImg: document.getElementById("c2HandB"),
	pWon: false,
	tie: false,
	splitBattle: false,

	lastBet: 0,

	oneHandChoices: document.getElementsByClassName("oneHandButton"),

	hyperbole: [" was thoroughly destroyed by ", " faced bitter defeat by ", " lost to "],

	chips: 50,

	stand: function(){
		//turns off the tie bar and returns to default
		this.splitRow.style.display = "none";
		this.twoHandRow.style.display = "none";
		this.betRow.style.display = "block";

		this.stateText.textContent = "I guess you're not a risk-taker."

		//Resets bet, turns off tie, takes back share of pot, and resets it to 0.
		this.betNum = 0;
		this.tie = false;
		this.pot /= 2;
		this.getPot();
		this.potTo0(this.potText);
		this.onlyHandOff.style.display = "block";

		this.cHAImg.style.display = "none";
		this.cHBImg.style.display = "none";
		this.pHAImg.style.display = "none";
		this.pHBImg.style.display = "none";
	},

	split: function(){
		if (this.chips - (this.betNum) >= 0){
			this.chips -= this.betNum;
			this.betNum *= 2;
			this.bet();
			this.chipUpdate();

			this.stateText.textContent = "Pick two hands!";
			this.splitRow.style.display = "none";
			this.twoHandRow.style.display = "block";
			this.pImg.style.display = "none";
			this.compImg.style.display = "none";
			this.cHAImg.style.display = "none";
			this.cHBImg.style.display = "none";
			this.pHAImg.style.display = "none";
			this.pHBImg.style.display = "none";
			this.splitBattle = true;
		}

		else {
			this.stateText.textContent = "Looks like you don't have enough chips."
		}
	},

	compPick: function () {
		if (!this.splitBattle){
			this.compHandPick = this.compHand[Math.floor(Math.random() * 3)];
			this.compImg.src = "assets/images/cHand" + this.compHandPick + ".png";
		}

		else {
			this.compHandA = this.compHand[Math.floor(Math.random() * 3)];
			this.cHAImg.src = "assets/images/c2HandA" + this.compHandA + ".png";

			this.compHandB = this.compHand[Math.floor(Math.random() * 3)];
			this.cHBImg.src = "assets/images/c2HandB" + this.compHandB + ".png";
		}


	},

	handsCheck(x, y){
		if (x === "r"){
			if (y === "s"){
				this.pWon = true;
				this.tie = false;
				return "p";
			}

			else if (y === "p"){
				this.pWon = false;
				this.tie = false;
				return "c";
			}

			else {
				this.pWon = false;
				this.tie = true;
				return "t";
			}
		}

		else if (x === "s"){
			if (y === "p"){
				this.pWon = true;
				this.tie = false;
				return "p";
			}

			else if (y === "r"){
				this.pWon = false;
				this.tie = false;
				return "c";
			}

			else {
				this.pWon = false;
				this.tie = true;
				return "t";
			}
		}

		else {
			if (y === "r"){
				this.pWon = true;
				this.tie = false;
				return "p";
			}

			else if (y === "s"){
				this.pWon = false;
				this.tie = false;
				return "c";
			}

			else {
				this.pWon = false;
				this.tie = true;
				return "t";
			}
		}
	},

	gamelogic: function(){
		if(!this.splitBattle){
			var winner = this.handsCheck(this.pHand, this.compHandPick);
			this.roundEnd(winner);
		}

		else {
			var winner1 = this.handsCheck(this.pHandA, this.compHandA);
			var winner2 = this.handsCheck(this.pHandB, this.compHandB);

			console.log("winners:" + winner1 + " " + winner2);

			if (winner1 === "p" && (winner2 === "p" || winner2 === "t")){
				this.roundEnd("p");
			}

			else if (winner1 === "t" && winner2 === "p"){
				this.roundEnd("p");
			}

			else if (winner1 === "c" && (winner2 === "c" || winner2 === "t")){
				this.roundEnd("c");
			}

			else if (winner1 === "t" && winner2 === "c"){
				this.roundEnd("c");
			}

			else {
				this.roundEnd("t");
			}
		} 
	},

	roundStart: function(){
		if(!this.splitBattle){
			this.cHAImg.style.display = "none";
			this.cHBImg.style.display = "none";
			this.pHAImg.style.display = "none";
			this.pHBImg.style.display = "none";
			this.onlyHandRow.style.display = "none";
			this.bet();
			this.compPick();
			this.gamelogic();
		}

		else {
			this.compPick();
			this.gamelogic();
			this.pImg.style.display = "none";
			this.compImg.style.display = "none";
		}

	},

	roundEnd: function (x){
		if (!this.splitBattle){
			this.pImg.style.display = "inline";
			this.compImg.style.display = "inline";
		}

		else {
			this.cHAImg.style.display = "inline";
			this.cHBImg.style.display = "inline";
		}

		this.splitBattle = false;

		//player wins round
		if (x === "p") {
			this.stateText.textContent = "Computer " +  this.hyperbole[Math.floor(Math.random() * 3)] + "Player.";
			
			//Player gets pot, resets pot, and changes pot text.
			this.getPot();
			this.pot = 0;
			this.betNum = 0;
			this.potTo0(this.potText);
			this.betRow.style.display = "block";
			this.twoHandRow.style.display = "none";
			this.onlyHandRow.style.display = "none";
			this.onlyHandOff.style.display = "block";
			this.tie = false;
		}

		//comp wins round
		else if (x === "c"){
			this.stateText.textContent = "Player " + this.hyperbole[Math.floor(Math.random() * 3)] + "Computer.";
			
			//Player loses pot, resets pot, and changes pot text.
			this.pot = 0;
			this.betNum = 0;
			this.getPot();
			this.potTo0(this.potText);
			this.betRow.style.display = "block";
			this.twoHandRow.style.display = "none";
			this.onlyHandOff.style.display = "block";
			this.tie = false;
		}

		//round ends in tie
		else {
			this.stateText.textContent = "A tie!!! Care to split and double your bet?"
			this.splitRow.style.display = "block";
			this.betRow.style.display = "none";
		}

		//Bet Number either resets to 0 or stays consistent
		this.betText.textContent = this.betNum;
		this.chipUpdate();
		this.pHandA = "";
		this.pHandB = "";

	},


	buttonR: function () {
		this.pHand = "r";
		this.pImg.src = "assets/images/pHandr.png";
		this.roundStart();

	},

	buttonP: function () {
		this.pImg.src = "assets/images/pHandp.png";
		this.pHand = "p";
		this.roundStart();
	},

	buttonS: function () {
		this.pHand = "s";
		this.pImg.src = "assets/images/pHands.png";
		this.roundStart();
	},

	buttonAR: function(){
		this.pHAImg.src = "assets/images/p2HandAr.png";
		this.pHandA = "r";
		this.pHAImg.style.display = "inline";

		if (this.pHandA != "" && this.pHandB != ""){
			this.roundStart();
		}

	},

	buttonAP: function(){
		this.pHAImg.src = "assets/images/p2HandAp.png";
		this.pHAImg.style.display = "block";
		this.pHandA = "p";

		if (this.pHandA != "" && this.pHandB != ""){
			this.roundStart();
		}
	},

	buttonAS: function(){
		this.pHAImg.src = "assets/images/p2HandAs.png";
		this.pHAImg.style.display = "block";
		this.pHandA = "s";

		if (this.pHandA != "" && this.pHandB != ""){
			this.roundStart();
		}
	},

	buttonBR: function(){
		this.pHBImg.src = "assets/images/p2HandBr.png";
		this.pHBImg.style.display = "inline";
		this.pHandB = "r";

		if (this.pHandA != "" && this.pHandB != ""){
			this.roundStart();
		}


	},

	buttonBP: function(){
		this.pHBImg.src = "assets/images/p2HandBp.png";
		this.pHBImg.style.display = "block";
		this.pHandB = "p";

		if (this.pHandA != "" && this.pHandB != ""){
			this.roundStart();
		}
	},

	buttonBS: function(){
		this.pHBImg.src = "assets/images/p2HandBs.png";
		this.pHBImg.style.display = "block";
		this.pHandB = "s";

		if (this.pHandA != "" && this.pHandB != ""){
			this.roundStart();
		}
	},

	//should remove your chips as you bet
	takeOutChips: function(){
		if(this.lastBet != 0){
			this.chips -= this.lastBet;
			this.chipUpdate();
		}
		else {
			this.chips -= this.betNum;
			this.chipUpdate();
		}
	},

	cashout: function(){
		if (!this.tie && this.pWon){
			this.chips += this.pot;
			this.pot = 0;
		}

		else if (!this.tie && !this.pWon){
			this.pot = 0;
		}

	},

	//Takes your bet and matches it by the comp to generate the pot.
	bet: function(){
		this.pot = this.betNum * 2;
		this.potText.textContent = this.pot;
		this.lastBet = 0;
	},

	//updates the text content of the chips as well as running the betchecker
	chipUpdate: function(){
		this.betText.textContent = this.betNum;
		this.chipText.textContent = this.chips;
	},

	//This function ensures there is a bet before you are allowed to play.
	betCheck: function(){
		//if bet is more than 0
		if (this.betNum > 0 && !this.tie){
			this.onlyHandOff.style.display = "none";
			this.onlyHandRow.style.display = "block";
		}

		else {
			this.onlyHandRow.style.display = "none";
			this.onlyHandOff.style.display = "block";
		}

		if (this.tie){

			this.onlyHandRow.style.display = "none";
			this.onlyHandOff.style.display = "none";
		}
	},

	//these buttons add or subtract your bet
	betMinus10: function() {
		if (this.betNum - 10 >= 0){
			this.betNum -= 10;
			this.lastBet = -10;
			this.takeOutChips();
			this.betText.textContent = this.betNum;
		}

		else {
			this.betNum = 0;
			this.betText.textContent = this.betNum;
		}

		this.betCheck();
	},

	betMinus1: function() {
		if (this.betNum - 1 >= 0){
			this.betNum -= 1;
			this.lastBet = -1;
			this.takeOutChips();
			this.betText.textContent = this.betNum;
		}
		this.betCheck();

	},

	betPlus1: function() {
		if (this.chips - 1 >= 0){
			this.betNum += 1;
			this.lastBet = 1;
			this.takeOutChips();			
			this.betText.textContent = this.betNum;
		}

		this.betCheck();
	},

	betPlus10: function() {
		if (this.chips - 10 >= 0){
			this.betNum += 10;
			this.lastBet = 10;
			this.takeOutChips();			
			this.betText.textContent = this.betNum;
		}

		this.betCheck();
	},

	//puts a small buffer between win/loss/stand and pot resuming to 0
	potTo0: function(x){
		setTimeout(function () {
	        this.pot = 0;
	        x.textContent = this.pot;
	    	}, 1500);
	},

	getPot: function(){
		this.chips += this.pot;
		this.pot = 0;
		this.lastBet = 0;
		this.chipUpdate();
	},

}









