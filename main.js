//ES5 version
// txtElement is html element containing the words
// words is the data-words property collection
// wait is the amount of time to pause before deleting
const TypeWriter = function(txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10); //10 is the base for the decimal
	this.type();
	this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function() {
	//get current index of the word
	const current = this.wordIndex % this.words.length;

	//get the full text of the current word
	const fullTxt = this.words[current];

	//check if the app is in the deleting state
	if(this.isDeleting) {
		//remove a character
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		//add a character
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	//output whatevr is in this.text
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

	// Initial Type Speed, this varies
	let typeSpeed = 300;

	if(this.isDeleting) {
		typeSpeed /= 2; //double the speed
	}

	// check whether or not the word is complete
	if(!this.isDeleting && this.txt === fullTxt) {
		typeSpeed = this.wait; //this will pause the app
		this.isDeleting = true;
	} else if(this.isDeleting && this.txt === '') {
		//when the end is reached, move to the next work
		this.isDeleting = false;
		this.wordIndex++;

		//pause before typing begins
		typeSpeed = 500;
	}

	setTimeout(() => this.type(), typeSpeed);
}

 //Initalize app
document.addEventListener('DOMContentLoaded', init);
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words')); //JSON parse allows this to be treated as an array instead of just a string
	const wait = txtElement.getAttribute('data-wait');
	new TypeWriter(txtElement, words, wait)
}
