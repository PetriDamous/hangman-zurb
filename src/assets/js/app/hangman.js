// Challenge 1:
// 1. Create a constructor function for the hangman game
// 2. Setup two attributes. One for the word itself. Another for the number of guesses allowed.
// 3. Create two instances of it and print both to the console

// Challenge 2:
// 1. Set up the word instance property as an array of lower case letters
// 2. Set up another instance property to store guessed letters
// 3. Create a method that gives you the word puzzle back

// No guesses? -> ***
// Guessed "d", "b", and "g"? -> d*g

const Hangman = function(word, tries) {
    this.word = word.toLowerCase().split('');
    this.tries = tries;    
    this.guessLetters = [];
}

Hangman.prototype.getPuzzle = function () {
    let puzzle = '';

    this.word.forEach((letter) => {
        if (this.guessLetters.includes(letter) || letter === ' ') {
            puzzle += letter;
        } else {
            puzzle += '*';
        }
    });    

    return puzzle;
}

Hangman.prototype.getGuess = function (guess) {
    guess.toLowerCase();

    // Could also use indexOf
    const isUnique = !this.guessLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);

    if (isUnique) {
        this.guessLetters.push(guess);
    }

    if (isUnique && isBadGuess) {
        this.tries--;
    }
}

const game1 = new Hangman('Dog', 2);
// Guess d, g, f
game1.getGuess('d');
game1.getGuess('g');
game1.getGuess('f');

game1.getGuess('d');
game1.getGuess('g');
game1.getGuess('f');

console.log(game1.getPuzzle()); // d*g

// Print remaing guesses (should be 1)
console.log(game1.tries);

const game2 = new Hangman('New Jersey', 4);

const game3 = new Hangman('Donkey Kong', 4);


// console.log(game2.getPuzzle());
// console.log(game3.getPuzzle());