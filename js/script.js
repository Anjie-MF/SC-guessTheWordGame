const userGuessedLetters = document.querySelector(".guessed-letters");//ul list where the players guessed letters will appear
const guestButton = document.querySelector(".guess");//button w/ the text "guess" in it 
const userTextInput = document.querySelector(".letter"); //text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");//empty paragraph where the WIP will appear
const userRemainingGuess = document.querySelector(".remaining");//paragraph where the remaining guess will display
const spanRemaining = document.querySelector(".remaining span");//span inside the paragraph 
const userMessages = document.querySelector(".message")//empty paragraph where messages will appear
const hiddenButton = document.querySelector(".play-again hide");//hidden button that prompts player to paly again 
const word = "magnolia";//starting word for test until I fetch hosted files


//write a function to add placeholders for each letter 
const placeholders = function (word) { //this function contains the logic to create & update placeholder symbol
    const placeholders = [];//this line creates an empty array that stores circe symbol 
    for (const letter of word) { //this line iterates over each character in the word guess variable 
        console.log(letter);
        placeholders.push("●");//this line pushes a symbol into the array for each letter 
    }
    wordInProgress.innerText = placeholders.join("");//this line update the innerText property of the WIP element 
}
placeholders(word);


//Add an Event Listener for the button 
guestButton.addEventListener("click", function (e) { //this line captures the value of the input
    e.preventDefault(); //this prevent the page from reloading 
    const captureInputValue = userTextInput.value;
    console.log(captureInputValue);
    userTextInput.value = ""; //this line accesses the element and clears the input field 
});


//Create a function to check player's input
const acceptParameter = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        userMessages.innerText = "You gotta try, silly!";
    } else if (input.length > 1) {
        userMessages.innerText = "One letter at time, please & thank you!";
    } else if (!input.match(acceptedLetter)) {
        userMessages.innerText = "Nice try, but letters only";
    } else {
        return input;
    }
};