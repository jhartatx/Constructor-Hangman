//Game
var inquirer = require("inquirer");
var Word = require("./wordfunc.js");
var Letter = require("./letterfunc.js");

var chosenWord;
var newRoundWord;
var newRoundLetter = [];
var chosenLetter = "";
var wrongLettersTried = "";
var correctGuessThisTime = false;
var triesLeft = 10;
var slotsRemaining = 0;
var toDisplay = "";


function startGame(){
	console.log("---------------------------");
	console.log("NEW GAME");
	console.log("Guess the Country Hangman!");
  console.log("----------------------------");
	newCountry();
	generateLetters();
	lettersRemaining();
	displayOnScreenSetup();
	runInquirer();
}
startGame();


function newCountry(){

	var wordBank = ["United States", "Africa", "Russia", "Japan", "Sweden", "Canada", "Mexico", "France", "Italy"];

	chosenWord = wordBank[Math.floor(Math.random()*wordBank.length)].toUpperCase();

	newRoundWord = new Word(chosenWord);
	newRoundWord.stringSplit();
};

function generateLetters(){
	for (i=0; i<newRoundWord.arrayToUse.length; i++){
		var isBlank = false;
		if (newRoundWord.arrayToUse[i] === " "){
			isBlank = true;
		};
		newRoundLetter[i] = new Letter(newRoundWord.arrayToUse[i], isBlank)
	};
};

function lettersRemaining(){
	for (i=0; i<newRoundLetter.length; i++){
		if (newRoundLetter[i].guessedCorrectly === false){
			slotsRemaining++;
		};
	};
}

function displayOnScreenSetup(){
	toDisplay = "";
	for (i=0; i<newRoundLetter.length; i++){
		toDisplay = toDisplay.concat(newRoundLetter[i].display());
	};

	if (triesLeft !== 0 && slotsRemaining !== 0){
		console.log("Letters remaining: " + slotsRemaining)
		console.log("---------------------------------");
		console.log("Guess the country: " + toDisplay);
	};
}
//User picks a letter
function runInquirer(){
	inquirer.prompt([
	  {
	    type: "input",
	    name: "letter",
	    message: "Guess a letter: "
	  }
	]).then(function(selection){
		correctGuessThisTime = false
		chosenLetter = selection.letter.toUpperCase();
		console.log("-------------------------------");

		var correctLettersGuessed = 0;

		for (i=0; i<newRoundLetter.length; i++){
			if (chosenLetter === newRoundLetter[i].theLetter && newRoundLetter[i].guessedCorrectly === false){
				newRoundLetter[i].guessedCorrectly = true;
				correctGuessThisTime = true;
				correctLettersGuessed++;
			};
		}


		if (correctGuessThisTime === true){
			slotsRemaining = slotsRemaining - correctLettersGuessed;
			console.log("CORRECT");
			console.log("-------------------------");
			console.log("Tries left: " + triesLeft);
			console.log("Wrong Letters: " + wrongLettersTried);
			didYouWin();
		} else {
			console.log("WRONG!");
			console.log("--------------------------");
			console.log("Tries left: " + triesLeft);
      console.log("--------------------------");
			wrongLettersTried = wrongLettersTried.concat(" " + chosenLetter);
			console.log("Wrong Letters: " + wrongLettersTried);
      triesLeft--
			didYouWin();
		}
	});
}

function didYouWin(){

	if (slotsRemaining === 0){
		console.log("------------------------------");
		console.log("YOU WON!");
		console.log("------------------------------");
		console.log("The correct country was:");
		console.log(" " + newRoundWord.arrayToUse.join(" "));
		startGame();
		return;
	};

	if (triesLeft === 0){
		console.log("-------------------------------");
		console.log("GAME OVER!");
		console.log("-------------------------------");
		console.log("The correct country was:");
		console.log(" " + newRoundWord.arrayToUse.join(" "));
		startGame();
		return;
	};

	displayOnScreenSetup();
	runInquirer();
};
