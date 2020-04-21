// Variables, document referencess and arrays
var wins = 0;
var losses = 0;
var guessesRemaining = 10;

var isFirstGame = true;
var gameStarted = false;

var winsDiv = document.getElementsByClassName("wins")[0];
var lossesDiv = document.getElementsByClassName("losses")[0];
var guessesRemainingDiv = document.getElementsByClassName("guesses-remaining")[0];
var currentWordP = document.getElementsByClassName("current-word")[0];
var messageDiv = document.getElementsByClassName("message")[0];
var userGuessesDiv = document.getElementsByClassName("user-guesses")[0];
var userInterface = document.getElementsByClassName("user-interface")[0];

var animals = ["dog", "cat", "mouse", "deer", "elephant", "alligator", "buffalo","lion", "tiger", "squirrel"];
var alphabet = [];
var currentWord = [];
var wrongGuesses = [];
var randomAnimal = [];
var upperCaseWord = [];

// Alphabet array
for (var i = 65; i <= 90; i++) {
    alphabet[alphabet.length] = String.fromCharCode(i);
};

// New game startup
function newGame() {
    // Resets game settings
    isFirstGame = false;
    gameStarted = true;
    guessesRemaining = 10;
    currentWord = [];
    wrongGuesses = [];

    userGuessesDiv.innerHTML = "";
    currentWordP.innerHTML = "";
    guessesRemainingDiv.innerHTML = guessesRemaining;

    messageDiv.style.display = "none";
    userInterface.style.display = "block";
    // Chooses a random from the array
    randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    
    upperCaseWord = randomAnimal.toUpperCase();

    // Creates placeholder with underscores for current word
    for (var i = 0; i < upperCaseWord.length; i++) {
        //creates a span with class of letters
        var span = document.createElement("span");
        span.setAttribute("class","letter");
        // If letter is a space it adds space to span otherwise it puts an underscore for each letter
        if (upperCaseWord[i] === " ") {
            span.textContent = " "; 
            span.setAttribute("class","letter space"); 
            currentWord[i] = " "; 
        } else {
            span.textContent = "_"; 
            currentWord[i] = "_"; 
        }

        currentWordP.appendChild(span); 
    };
    // Logs the animal into the console
    console.log(upperCaseWord);

};
    
document.onkeyup = function(event) {

    if (gameStarted) {
        //Determines whether key is apart of the alphabet or not
        var userGuess = event.key.toUpperCase();

        var letterSpan = document.getElementsByClassName("letter");
        var isGuessCorrect = false;
         // Determines if key that is pressed is part of the alphabet
        if(alphabet.includes(userGuess)) {
            // Checks for a match and assigns correctly guessed letters to the appropriate place in the current word
            for (var j = 0; j < upperCaseWord.length; j++) {
        
                if (upperCaseWord[j] === userGuess) {
                    letterSpan[j].innerHTML = userGuess;
                    currentWord[j] = userGuess;
                    isGuessCorrect =true; 

                }
            }
            
        }
        // If the wrong guesses array doesn't already include the user guess
        // AND the user guess is a letter
        // AND the current word doesn't have the user guess
        // Then subtract 1 from guesses remaining
        // And add letter to Letters Already Guessed
        
        if (!wrongGuesses.includes(userGuess) && alphabet.includes(userGuess) && !upperCaseWord.includes(userGuess)) {
            guessesRemaining--;
            wrongGuesses.push(userGuess);
        }
        //Creates variable that joins correctly guessed words
        var winningWord = currentWord.join("");

        // Adds +1 to wins once winningWord equals upperCaseWord
        // Animal name displays at top
        if (winningWord === upperCaseWord) {
            // Displays when player wins
            messageDiv.innerHTML =
            "<h2 class='game-end'>You win!<br><span>" +
            randomAnimal + "</span></h2>" +
            "<h3 class='get-started pulse'>Press space to play again!</h3>";

            wins++;
            gameStarted = false;
            
            messageDiv.style.display = "block";
            userInterface.style.display = "none";
        }

        if (guessesRemaining === 0) {
            // Displays when player loses
            messageDiv.innerHTML =
            "<h2 class='game-end'>Sorry! You Lose.<br><span>" +
            randomAnimal +
            " was the correct animal.</span></h2>" +
            "<h3 class='get-started pulse'>Press space to play again!</h3>";

            losses++;

            gameStarted = false;
            // Sets game object display
            messageDiv.style.display = "block";
            userInterface.style.display = "none";
        }
        // Updates scoreboard
        userGuessesDiv.innerHTML = wrongGuesses.join(" ");
        winsDiv.innerHTML = wins;
        lossesDiv.innerHTML = losses;
        guessesRemainingDiv.innerHTML = guessesRemaining;
        
        console.log(winningWord);
        console.log(upperCaseWord);
    } else {
        
        var keyPress = event.key;

        // Game starts when player hits any key after the first game, games are started with space bar
        if (keyPress === " " || isFirstGame) {
            newGame();
        }
    }
};