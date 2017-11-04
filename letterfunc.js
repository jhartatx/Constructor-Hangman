//Letter constructor
var Letter = function(theLetter, guessedCorrectly){
	this.theLetter = theLetter;
	this.guessedCorrectly = guessedCorrectly;
	this.display = function(){
		if(this.guessedCorrectly === true){
			return " " + this.theLetter;
		} else {
			return " _";
		};
	};
};

module.exports = Letter;
