const guessedLetters = document.querySelector(".guessed-letters"); //ul list of user guessed letters
const guessButton = document.querySelector(".guess"); //guess button 
const guessInput = document.querySelector(".letter"); //text input for letters
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph for WIP
const remaining = document.querySelector(".remaining"); //paragraph of remaining guesses
const span = document.querySelector(".remaining span"); //span inside paragraph 
const message = document.querySelector(".message"); //empty paragraph when user guesses a letter
const playAgainButton = document.querySelector(".play-again"); //play again button 
const word = "magnolia";


//Write a function to add placeholders for each letter
const createPlaceholder = function (word) {
    const placeholderSymbol = [];

    for (const letter of word) {
        console.log(letter);
        placeholderSymbol.push("●");
    }
    wordInProgress.innerText = placeholderSymbol.join("");
};

createPlaceholder(word);

//Add an Event Listener for the Button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ""; //empties message paragraph

    const captureInput = guessInput.value; //grabs what was entered in the input
    console.log(captureInput);

    //Validate input in the button event handler
    const validationResult = validateUserInput(captureInput);
    console.log(validationResult);

    if (validationResult) {
        makeGuess(validationResult);
    }
    guessInput.value = "";
});


//Create a function to check player's input
const validateUserInput = function (guessInput) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guessInput === "") {
        message.innerText = "Please input a character.";
    } else if (guessInput.length > 1) {
        message.innerText = "Please enter only one letter at a time.";
    } else if (!guessInput.match(acceptedLetter)) {
        message.innerText = "Please enter alphabetical letters only.";
    } else {
        return guessInput;
    }
};