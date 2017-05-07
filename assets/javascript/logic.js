var rps = {
	wins: 0,
	losses: 0,
	ties: 0,

	chipText: document.getElementById("chips"),
	betText: document.getElementById("bet"),
	betNum: 0,
	chips: 50,
	pot: 0,

	stateText: document.getElementById("stateText"),

	pImg: document.getElementById("pHandImg"),
	compImg: document.getElementById("cHandImg"),

	splitRow: document.getElementById("splitRow"),
	onlyHandRow: document.getElementById("onlyHand"),
	twoHandRow: document.getElementById("twoHands"),
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

	oneHandChoices: document.getElementsByClassName("oneHandButton"),

	hyperbole: [" was thoroughly destroyed by ", " faced bitter defeat by ", " lost to "],

	chips: 50,

	tieScenario: function (){
		this.splitRow.style.display = "block";
		this.onlyHandRow.style.display = "none";
	},

	betCheck: function(){
		if (this.betNum > 0){
			for (var i = 0; i < 3; i++){
				this.oneHandChoices[i].disabled = false;
			}
			
		}
		else {
			for (var i = 0; i < 3; i++){
				this.oneHandChoices[i].disabled = true;
			}
		}
	},

	bet: function(){
		this.pot = this.betNum * 2;
	},


	stand: function(){
		this.splitRow.style.display = "none";
		this.onlyHandRow.style.display = "block";
		this.betRow.style.display = "block";
		this.stateText.textContent = "I guess you're not a risk-taker."
		this.tie = false;
		this.chips += this.betNum;
		this.cashout();
		this.reset();
	},

	split: function(){
		this.stateText.textContent = "Pick two hands!";
		this.splitRow.style.display = "none";
		this.twoHandRow.style.display = "block";
		this.pImg.style.display = "none";
		this.compImg.style.display = "none";
		this.pHAImg.style.display = "block";
		this.pHBImg.style.display = "block";

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
			this.pot = 0;
		}

		else if (this.tie){
			this.tieScenario();
			
		}

		this.updateScore();

	},

	takeOutChips: function(){
		console.log("Pre bet: " + this.chips);
		this.chips -= this.betNum;
		this.bet();
		console.log("Post bet: " + this.chips);
	},

	buttonR: function () {
		this.takeOutChips();
		this.compPick();
		this.pHand = "r";
		this.pImg.src = "assets/images/pHandr.png";
		this.handsCheck(this.pHand, this.compHandPick);

	},


	buttonP: function () {
		this.takeOutChips();
		this.compPick();
		this.pImg.src = "assets/images/pHandp.png";
		this.pHand = "p";
		this.handsCheck(this.pHand, this.compHandPick);

	},

	buttonS: function () {
		this.takeOutChips();
		this.compPick();
		this.pHand = "s";
		this.pImg.src = "assets/images/pHands.png";
		this.handsCheck(this.pHand, this.compHandPick);
		
	},

	buttonAR: function(){
		this.pHAImg.src = "assets/images/p2HandAr.png";
	},

	buttonAP: function(){
		this.pHAImg.src = "assets/images/p2HandAp.png";
	},

	buttonAS: function(){
		this.pHAImg.src = "assets/images/p2HandAs.png";
	},

	buttonBR: function(){
		this.pHBImg.src = "assets/images/p2HandBr.png";
	},

	buttonBP: function(){
		this.pHBImg.src = "assets/images/p2HandBp.png";
	},

	buttonBS: function(){
		this.pHBImg.src = "assets/images/p2HandBs.png";
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

	reset: function(){
		this.betText.textContent = this.betNum;
		this.chipText.textContent = this.chips;
		this.betCheck();

	},

	betMinus10: function() {
		if (this.betNum - 10 >= 0){
			this.betNum -= 10;
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
			this.betText.textContent = this.betNum;
		}
		this.betCheck();

	},

	betPlus1: function() {
		if (this.betNum + 1 <= this.chips){
			this.betNum += 1;
			this.betText.textContent = this.betNum;
		}

		this.betCheck();
	},

	betPlus10: function() {
		if (this.betNum + 10 <= this.chips){
			this.betNum += 10;
			this.betText.textContent = this.betNum;
		}

		this.betCheck();
	},

	compPick: function () {
		this.compHandPick = this.compHand[Math.floor(Math.random() * 3)];
		this.compImg.src = "assets/images/cHand" + this.compHandPick + ".png";
		return this.compHandPick;
	},

	updateScore: function (){
		if (this.pWon && !this.tie) {
			this.stateText.textContent = "Computer's " + this.compHandPick + this.hyperbole[Math.floor(Math.random() * 3)] + "Player's " + this.pHand;
			this.cashout();
			this.reset();
			this.pImg.style.display = "inline";
			this.compImg.style.display = "inline";

		}

		else if (!this.pWon && !this.tie){
			this.stateText.textContent = "Players's " + this.pHand + this.hyperbole[Math.floor(Math.random() * 3)] + "Computer's " + this.compHandPick;
			this.cashout();
			this.reset();
			this.pImg.style.display = "inline";
			this.compImg.style.display = "inline";

		}

		else {
			this.stateText.textContent = "A tie!!! Care to split and double your bet?"
			this.pImg.style.display = "inline";
			this.compImg.style.display = "inline";
			this.reset();
			this.tieScenario();
		}

	}


}









