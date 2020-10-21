const gameKeyboard = document.getElementById('qwerty');
const gamePhrase = document.getElementById('phrase');
let scoreboard = document.getElementById('scoreboard').firstElementChild;

//Variable for reseting the game 
let gameStatus = false;

//Variable to keep track of wrong guesses
let missed = 0;

//Start game button 
const startButton = document.querySelector('.btn__reset');
const overlay = startButton.parentNode;

//Event listener to start game
startButton.addEventListener('click', () => {  
    overlay.style.display = 'none';
});

//Function to check if game is won or lost
function checkWin() {
    let classLetter = document.querySelectorAll('.letter');
    let classShow = document.querySelectorAll('.show');
    let title = overlay.firstElementChild;
    if (classLetter.length === classShow.length) {        
        window.setTimeout(() => {
            overlay.className = 'win';
            overlay.style.display = '';
            title.textContent = 'You win!'
            startButton.textContent = 'Play again';
            gameStatus = true;
            resetGame();
        }, 1000);
    } else if (missed === 5) {
        window.setTimeout(() => {
            overlay.className = 'lose';
            overlay.style.display = '';
            title.textContent = "You lost!";
            startButton.textContent = 'Play again';
            gameStatus = true;
            resetGame();
        }, 1000);
    }
}

//Game phrases array
const phrases = ['Dormammu Ive come to bargain', 'I am Groot', 'Hulk smash', 'I am Iron Man', 'I can do this all day'];

//Function to generate a random number for indexing the phrases array
function generateRandomNumber(arr) {
    const numberOfPhrases = arr.length;
    const number = Math.floor(Math.random() * numberOfPhrases);
    return number;
}

//Function to get random phrase split into characters in a new array
function getRandomPhraseAsArray(arr) {
    //index a random phrase and store it in variable
    const currentPhrase = arr[generateRandomNumber(arr)];
    //Split the phrase into individual characters
    const newArray = currentPhrase.split('');
    //return the new array 
    return newArray
}

//create a random phrase
let phraseArray = getRandomPhraseAsArray(phrases);

//Function to loop through the current phrase and store each character 
//in a 'li', and then append it to the 'gamePhrase' ul
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        //Select the current character
        let currentChar = arr[i];
        //create a list item
        let li = document.createElement('li');
        //add character to the li
        li.textContent = currentChar;
        //Add conditional to check if character is letter or space
        if (currentChar !== ' ') {
            li.className = 'letter'
        } else {
            li.className = 'space';
        }
        //append li to the ul        
        gamePhrase.firstElementChild.appendChild(li);
    }
}

addPhraseToDisplay(phraseArray);

//Function to check if letter is in the phrase 
function checkLetter(button) {
    const phraseLetters = document.querySelectorAll('.letter');
    let rightOrWrong = false;
    let correctGuess = button;
    for (let i = 0; i < phraseLetters.length; i++) {
        let currentLetter = phraseLetters[i];
        if (button == currentLetter.textContent.toLowerCase()) {
            currentLetter.className += ' show';
            rightOrWrong = true;
        }
    }
    if (rightOrWrong === true) {
        return correctGuess
    }  else {
        return null
    }
}

//function for removing tries
function removeTries() {
    let heart = scoreboard.children;
    heart[missed].firstElementChild.src = 'images/lostHeart.png';
}

//Listening for clicks and handling letters
gameKeyboard.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const key = event.target;
        key.className = 'chosen';
        key.disabled = true;
        let letterFound = checkLetter(key.textContent);
        if (letterFound === null) {
            removeTries();
            missed += 1;
        }
        checkWin();
    }
})

//Function for displaying heart icons
function createHearts() { 
    for (let i = 0; i < scoreboard.children.length; i++) {
        let heart = scoreboard.children;
        heart[i].firstElementChild.src = 'images/liveHeart.png';
    }
}  

//Function for reseting the game 
function resetGame() {
    //reset game 
    gameStatus = false;
    //reset keyboard
    let usedKeys = document.querySelectorAll('.chosen');
    for (let i = 0; i < usedKeys.length; i++) {
        usedKeys[i].className = '';
        usedKeys[i].disabled = false;
    }
    //Reset tries
    missed = 0;
    //Display all hearts again 
    createHearts();
    //clear old phrase 
    gamePhrase.firstElementChild.innerHTML = '';
    //generate new random phrase
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

