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

	lastBet: 0,

	oneHandChoices: document.getElementsByClassName("oneHandButton"),

	hyperbole: [" was thoroughly destroyed by ", " faced bitter defeat by ", " lost to "],

	chips: 50,

	tieScenario: function (){
		this.splitRow.style.display = "block";
		this.onlyHandRow.style.display = "none";
		this.betRow.style.display = "none";
	},

	stand: function(){
		this.betNum = 0;
		this.splitRow.style.display = "none";
		this.onlyHandRow.style.display = "block";
		this.betRow.style.display = "block";
		this.stateText.textContent = "I guess you're not a risk-taker."
		this.tie = false;
		this.pot /= 2;
		this.getPot();
	},

	split: function(){
		this.stateText.textContent = "Pick two hands!";
		this.splitRow.style.display = "none";
		this.twoHandRow.style.display = "block";
		this.pImg.style.display = "none";
		this.compImg.style.display = "none";

	},

	handsCheck(x, y){
		if (x === "r"){
			if (y === "s"){
				this.pWon = true;
				this.tie = false;
			}

			else if (y === "p"){
				this.pWon = false;
				this.tie = false;
			}

			else {
				this.pWon = false;
				this.tie = true;
			}
		}

		else if (x === "s"){
			if (y === "p"){
				this.pWon = true;
				this.tie = false;
			}

			else if (y === "r"){
				this.pWon = false;
				this.tie = false;
			}

			else {
				this.pWon = false;
				this.tie = true;
			}
		}

		else {
			if (y === "r"){
				this.pWon = true;
				this.tie = false;
			}

			else if (y === "s"){
				this.pWon = false;
				this.tie = false;
			}

			else {
				this.pWon = false;
				this.tie = true;
			}
		}

		if(!this.pWon && !this.tie){
			console.log("lose");
			this.pot = 0;
		}

		else if (this.tie){
			console.log("tie");
			this.tieScenario();
			
		}

		this.updateScore();

	},

	buttonR: function () {
		this.bet();
		this.compPick();
		this.pHand = "r";
		this.pImg.src = "assets/images/pHandr.png";
		this.handsCheck(this.pHand, this.compHandPick);
	},

	buttonP: function () {
		this.bet();
		this.compPick();
		this.pImg.src = "assets/images/pHandp.png";
		this.pHand = "p";
		this.handsCheck(this.pHand, this.compHandPick);
	},

	buttonS: function () {
		this.bet();
		this.compPick();
		this.pHand = "s";
		this.pImg.src = "assets/images/pHands.png";
		this.handsCheck(this.pHand, this.compHandPick);	
	},

	buttonAR: function(){
		this.pHAImg.src = "assets/images/p2HandAr.png";
		this.pHAImg.style.display = "block";
		this.buttonDisabled(this.pHandABut, 3, true);
		this.pHandA = "r";
	},

	buttonAP: function(){
		this.pHAImg.src = "assets/images/p2HandAp.png";
		this.pHAImg.style.display = "block";
		this.buttonDisabled(this.pHandABut, 3, true);
		this.pHandA = "p";
	},

	buttonAS: function(){
		this.pHAImg.src = "assets/images/p2HandAs.png";
		this.pHAImg.style.display = "block";
		this.buttonDisabled(this.pHandABut, 3, true);
		this.pHandA = "s";
	},

	buttonBR: function(){
		this.pHBImg.src = "assets/images/p2HandBr.png";
		this.pHBImg.style.display = "block";
		this.buttonDisabled(this.pHandBBut, 3, true);
		this.pHandB = "r";
	},

	buttonBP: function(){
		this.pHBImg.src = "assets/images/p2HandBp.png";
		this.pHBImg.style.display = "block";
		this.buttonDisabled(this.pHandBBut, 3, true);
		this.pHandB = "p";
	},

	buttonBS: function(){
		this.pHBImg.src = "assets/images/p2HandBs.png";
		this.pHBImg.style.display = "block";
		this.buttonDisabled(this.pHandBBut, 3, true);
		this.pHandB = "s";
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

	//This function ensures there is a bet before you are allowed to play.
	betCheck: function(){
		if (this.betNum > 0){
			this.buttonDisabled(this.oneHandChoices, 3, false);
			
		}
		else {
			this.buttonDisabled(this.oneHandChoices, 3, true);
		}
	},

	//Takes your bet and matches it by the comp.
	bet: function(){
		this.pot = this.betNum * 2;
		this.potText.textContent = this.pot;
		this.lastBet = 0;
	},

	//updates the text content of the chips as well as running the betchecker
	chipUpdate: function(){
		this.betText.textContent = this.betNum;
		this.chipText.textContent = this.chips;
		this.betCheck();
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


	buttonDisabled: function (arr, num, truth){
		for (var i = 0; i < num; i++){
			arr[i].disabled = truth;
		}
	},


	compPick: function () {
		this.compHandPick = this.compHand[Math.floor(Math.random() * 3)];
		this.compImg.src = "assets/images/cHand" + this.compHandPick + ".png";
		return this.compHandPick;
	},

	getPot: function(){
		this.chips += this.pot;
		this.pot = 0;
		this.lastBet = 0;
		this.chipUpdate();
	},

	updateScore: function (){
		this.pImg.style.display = "inline";
		this.compImg.style.display = "inline";

		if (this.pWon && !this.tie) {
			this.stateText.textContent = "Computer " +  this.hyperbole[Math.floor(Math.random() * 3)] + "Player";
			this.getPot();
			this.pot = 0;
			this.betNum = 0;

		}

		else if (!this.pWon && !this.tie){
			this.stateText.textContent = "Players " + this.pHand + this.hyperbole[Math.floor(Math.random() * 3)] + "Computer ";
			this.pot = 0;
			this.betNum = 0;
			this.getPot();
		}

		else {
			this.stateText.textContent = "A tie!!! Care to split and double your bet?"
			this.tieScenario();
		}
		this.betText.textContent = this.betNum;
		this.chipUpdate();
	},

	updateScore1: function (){
		this.pImg.style.display = "inline";
		this.compImg.style.display = "inline";
		if (this.pWon && !this.tie) {
			this.stateText.textContent = "Computer " +  this.hyperbole[Math.floor(Math.random() * 3)] + "Player";
			this.getPot();

		}

		else if (!this.pWon && !this.tie){
			this.stateText.textContent = "Players " + this.pHand + this.hyperbole[Math.floor(Math.random() * 3)] + "Computer ";
			this.getPot();
		}

		else {
			this.stateText.textContent = "A tie!!! Care to split and double your bet?"
			this.tieScenario();
		}

		this.chipUpdate();

	}


}









