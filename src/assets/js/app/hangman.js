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


console.log(game1.getPuzzle());

console.log(game1.tries);

window.addEventListener('keypress', function(e) {
    const guess = e.key;

    game1.getGuess(guess);

    console.log(game1.getPuzzle());
    console.log(game1.tries);

});

