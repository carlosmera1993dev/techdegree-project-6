const qwerty = document.getElementById('qwerty');
const gamePhrase = document.getElementById('phrase');

//Variable to keep track of wrong guesses
const missed = 0;

//Start game button 
const start = document.querySelector('.btn__reset');

//Event listener to start game
start.addEventListener('click', () => {

});

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
const phraseArray = getRandomPhraseAsArray(phrases);

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
        }
        //append li to the ul
        gamePhrase.appendChild(li);
    }
}

//Function to check if letter is in the phrase 
function checkLetter(button) {
    const phraseLetters = document.querySelectorAll('.letter');
    for (let i = 0; i < phraseLetters.length; i++) {
        if (button === phraseLetters[i]) {
            phraseLetters[i].className = 'show';
            let correctGuess = button;
            return correctGuess
        } else {
            return null
        }
    }
}