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
const placeholder = function (word) {
    const placeholderSymbol = [];
    for (const letter of word) {
        placeholderSymbol.push("●");
        console.log(letter);
    }
    wordInProgress.innerText = placeholderSymbol.join("");
};

placeholder(word);

//Add an Event Listener for the Button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const captureInput = guessInput.value;
    console.log(captureInput);
    guessInput.value = "";
})