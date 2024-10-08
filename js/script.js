const guessedLettersElement = document.querySelector(".guessed-letters");//ul list of user guessed letters
const guessButton = document.querySelector(".guess"); //guess button 
const guessInput = document.querySelector(".letter"); //text input for letters
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph for W-I-P
const remaining = document.querySelector(".remaining"); //paragraph of remaining guesses
const span = document.querySelector(".remaining span"); //span inside paragraph 
const message = document.querySelector(".message"); //empty paragraph when user guesses a letter
const playAgainButton = document.querySelector(".play-again"); //play again button 

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 10;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();    //this line converts the response to text
    const wordArray = words.split("\n");    //this line is delimiter to use to create the array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    createPlaceholder(word);
};

getWord();

//Write a function to add placeholders for each letter ---> THIS FUNCTION is like setting up THE TABLE with empty card slots; you need placeholders (facedown cards) for each one 
const createPlaceholder = function (word) {
    const placeholderSymbol = [];
    for (const letter of word) {
        console.log(letter);
        placeholderSymbol.push("●");
    }
    wordInProgress.innerText = placeholderSymbol.join("");
};

//Add an Event Listener for the Button --->THIS FUNCTION is the PLAYER"S move; the player is saying "im ready" and clicks the button to submit their guess
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ""; //empties message paragraph
    const captureInput = guessInput.value; // aka PLAYER hands over their guess to be inspected
    const validationResult = validateUserInput(captureInput); //aka <validateUserInput>CARD INSPECTOR checks it to ensure its valid
    if (validationResult) { //aka <makeGuess> THE DEALER decides if the guess is valid, steps in and decides whether to reveal the card or not
        makeGuess(validationResult);
    }
    guessInput.value = "";
});


//Create a function to check player's input--->THIS FUNCTION is like the CARD INSPECTOR at the start of the game; checks whether the users guess is valid before the <makeGuess>THE DEALER even looks at it
const validateUserInput = function (guessInput) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guessInput.length === 0) {
        message.innerText = "Please input a character.";
    } else if (guessInput.length > 1) {
        message.innerText = "Please enter only one letter at a time.";
    } else if (!guessInput.match(acceptedLetter)) {
        message.innerText = "Please enter alphabetical letters only.";
    } else {
        return guessInput;
    }
};


//Create a function to capture input ---> THIS FUNCTION is a like the DEALER who manages the entire card game; takes your guess, checks if its valid, and then decided if it should be shown to the <updatePageWithUserGuesses>the DISPLAY BOARD
const makeGuess = function (captureInput) {
    captureInput = captureInput.toUpperCase();
    if (guessedLetters.includes(captureInput)) { //check if the letter has aleady been guessed
        message.innerText = "You've already guessed that letter. Try again.";
    } else {
        guessedLetters.push(captureInput); //add the new guessed letter to the guessedLetters array
        console.log(guessedLetters);
        countRemainingGuesses(captureInput);
        updatePageWithUserGuesses(); //THIS IS WHY ITS CALLED HERE; the dealer decides the guess is valid, the game updates the display with letters guess so far;
        replaceCircleSymbols(guessedLetters);
    }
};


//create a function to show the guessed letters ---> THIS FUNCTION is like the DISPLAY BOARD; it just shows the current state of the game
const updatePageWithUserGuesses = function () { //update the list of guessed letters on the page 
    guessedLettersElement.innerHTML = "";//empties out the current content of <guessedLetterElement>
    for (const letter of guessedLetters) { // goes through every letter in the guessed letter array
        const li = document.createElement("li"); //creates a new list in memory but doesnt appear on the page
        li.innerText = letter; // assigns the current letter insdie the list item
        guessedLettersElement.append(li); //adds the new li element to the ul element which displays all the guessed letters 
    }
};


//create a function to update the word in progress ---> THIS FUNCTION is the deck of cards being revealed over time; 
const replaceCircleSymbols = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfUserWon();
};


//create a function to count guesses remaining
const countRemainingGuesses = function (captureInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(captureInput)) {
        message.innerText = `Oooh! This word has no ${captureInput} in it, sorry!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `You got one! The word has the letter ${captureInput}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        span.innerText = ` ${remainingGuesses} guess`;
    } else {
        span.innerText = `${remainingGuesses} guesses`;
    }
};


//create a function to check if the player won ---> THIS FUNCTION is the endgame check to see if the player has won
const checkIfUserWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};


//create a function to hide and show elements 
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//add a click event to the play again button---AKA the reset functon
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 10;
    span.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord();

    //UI elements that are hidden/revealed correctly before the next UI
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});
