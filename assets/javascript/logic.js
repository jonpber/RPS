var rps = {
	wins: 0,
	losses: 0,
	ties: 0,

	chipText: document.getElementById("chips"),
	betText: document.getElementById("bet"),
	betNum: 0,
	chips: 50,

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
	pWon: false,
	tie: false,

	hyperbole: [" was thoroughly destroyed by ", " faced bitter defeat by ", " lost to "],

	chips: 50,

	tieScenario: function (){
		this.splitRow.style.display = "block";
		this.onlyHandRow.style.display = "none";
	},

	stand: function(){
		this.splitRow.style.display = "none";
		//this.onlyHandRow.style.display = "block";
		this.betRow.style.display = "block";
		this.stateText.textContent = "I guess you're not a risk-taker."
	},

	split: function(){
		this.splitRow.style.display = "none";
		this.twoHandRow.style.display = "block";
	},

	handsCheck(x, y){
		if (x === "r"){
			if (y === "s"){
				this.pWon = true;
				this.tie = false;
			}

			else {
				this.pWon = false;
				this.tie = false;
			}
		}

		else if (x === "s"){
			if (y === "p"){
				this.pWon = true;
				this.tie = false;
			}

			else {
				this.pWon = false;
				this.tie = false;
			}
		}

		else {
			if (y === "r"){
				this.pWon = true;
				this.tie = false;
			}

			else {
				this.pWon = false;
				this.tie = false;
			}
		}

		console.log(this.betNum);

		if(!this.pWon && x != y){
			this.betNum = 0;
		}

		console.log(this.betNum);

		if (x === y){
			this.tie = true;
			this.pWon = false;
		}

		console.log(this.betNum);

		this.updateScore();

	},

	buttonR: function () {
		this.compPick();
		this.pHand = "r";
		this.pImg.src = "assets/images/pHandr.png";
		this.handsCheck(this.pHand, this.compHandPick);

	},


	buttonP: function () {
		this.compPick();
		this.pImg.src = "assets/images/pHandp.png";
		this.pHand = "p";
		this.handsCheck(this.pHand, this.compHandPick);

	},

	buttonS: function () {
		this.compPick();
		this.pHand = "s";
		this.pImg.src = "assets/images/pHands.png";
		this.handsCheck(this.pHand, this.compHandPick);
		
	},

	reset: function(){
		this.chips += this.betNum;
		this.betNum = 0;
		this.betText.textContent = this.betNum;
		this.chipText.textContent = this.chips;
		this.onlyHandRow.style.display = "none";
		if(!this.tie){
			this.betRow.style.display = "block";
		}

	},

	bet: function (){
		if (this.betNum > 0){
			this.chips -= this.betNum;
			this.chipText.textContent = this.chips;
			this.onlyHandRow.style.display = "block";
			this.betRow.style.display = "none";
		}

		else {
			this.stateText.textContent = "You have to make a bet!";
		}


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
	},

	betMinus1: function() {
		if (this.betNum - 1 >= 0){
			this.betNum -= 1;
			this.betText.textContent = this.betNum;
		}
	},

	betPlus1: function() {
		if (this.betNum + 1 <= this.chips){
			this.betNum += 1;
			this.betText.textContent = this.betNum;
		}
	},

	betPlus10: function() {
		if (this.betNum + 10 <= this.chips){
			this.betNum += 10;
			this.betText.textContent = this.betNum;
		}
	},

	compPick: function () {
		this.compHandPick = this.compHand[Math.floor(Math.random() * 3)];
		this.compImg.src = "assets/images/cHand" + this.compHandPick + ".png";
		return this.compHandPick;
	},

	updateScore: function (){
		if (this.pWon && !this.tie) {
			this.betNum *= 2;
			this.stateText.textContent = "Computer's " + this.compHandPick + this.hyperbole[Math.floor(Math.random() * 3)] + "Player's " + this.pHand;
			
		}

		else if (!this.pWon && !this.tie){
			this.stateText.textContent = "Players's " + this.pHand + this.hyperbole[Math.floor(Math.random() * 3)] + "Computer's " + this.compHandPick;
		}

		else if (this.tie) {
			this.stateText.textContent = "A tie!!! Care to split and double your bet?"
			this.tieScenario();
		}

		this.pImg.style.display = "inline";
		this.compImg.style.display = "inline";
		this.reset();



	}


}









