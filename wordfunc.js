//Word constructor
var Word = function(wordToUse){
	this.wordToUse = wordToUse;
	this.arrayToUse;
	this.stringSplit = function(){
		this.arrayToUse = this.wordToUse.split(""); 
	};
};

module.exports = Word;
