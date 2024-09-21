const guessedLettersElement = document.querySelector(".guessed-letters"); //ul list of user guessed letters
const guessButton = document.querySelector(".guess"); //guess button 
const guessInput = document.querySelector(".letter"); //text input for letters
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph for W-I-P
const remaining = document.querySelector(".remaining"); //paragraph of remaining guesses
const span = document.querySelector(".remaining span"); //span inside paragraph 
const message = document.querySelector(".message"); //empty paragraph when user guesses a letter
const playAgainButton = document.querySelector(".play-again"); //play again button 

const word = "magnolia";
const guessedLetters = [];


//Write a function to add placeholders for each letter ---> THIS FUNCTION is like setting up THE TABLE with empty card slots; you need placeholders (facedown cards) for each one 
const createPlaceholder = function (word) { //aka bascially laying out a set of blank spots to show each letter 
    const placeholderSymbol = [];

    for (const letter of word) {
        console.log(letter);
        placeholderSymbol.push("●");
    }
    wordInProgress.innerText = placeholderSymbol.join("");
};

createPlaceholder(word);

//Add an Event Listener for the Button
guessButton.addEventListener("click", function (e) { //THIS FUNCTION is the PLAYER"S move; the player is saying "im ready" and clicks the button to submit their guess
    e.preventDefault();
    message.innerText = ""; //empties message paragraph

    const captureInput = guessInput.value; // aka PLAYER hands over their guess to be inspected

    const validationResult = validateUserInput(captureInput); //aka <validateUserInput>CARD INSPECTOR checks it to ensure its valid

    if (validationResult) { //CRUCIAL PART OF GAME--<makeGuess> THE DEALER if the guess is valid, steps in and decides whether to reveal the card or not
        makeGuess(validationResult);
    }
    guessInput.value = "";
});


//Create a function to check player's input--->THIS FUNCTION is like the CARD INSPECTOR at the start of the game; checks whether the users guess is valid before the <makeGuess>THE DEALER even looks at it
const validateUserInput = function (guessInput) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guessInput.length === 0) {
        message.innerText = "Please input a character."; //aka "Hey, you needs to play a card!"
    } else if (guessInput.length > 1) {
        message.innerText = "Please enter only one letter at a time."; //aka "You can only play one card at a time!"
    } else if (!guessInput.match(acceptedLetter)) {
        message.innerText = "Please enter alphabetical letters only."; //aka "You can only play valid cards!"
    } else {
        return guessInput; //aka ---the cards are valid, you can show <makeGuess>THE DEALER
    }
};

//Create a function to capture input ---> THIS FUNCTION is a like the DEALER who manages the entire card game; takes your guess, checks if its valid, and then decided if it should be shown to the <updatePageWithUserGuesses>the DISPLAY BOARD
const makeGuess = function (validationResult) {
    validationResult = validationResult.toUpperCase();
    if (guessedLetters.includes(validationResult)) { //check if the letter has aleady been guessed
        message.innerText = "You've already guessed that letter. Try again."; //inform player they already guessed
    } else {
        guessedLetters.push(validationResult); //add the new guessed letter to the guessedLetters array
        console.log(guessedLetters);
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

//create a function to update the word in progress ---> THIS FUNCTION is the deck of cards; 
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
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfUserWon();
}

//create a function to check if the player won
const checkIfUserWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        //(wordInProgress === validateUserInput) { //THIS IS WORNG B/C ---its comparing references not values aka 
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};