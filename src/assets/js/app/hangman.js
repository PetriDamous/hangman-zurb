const Hangman = function(word, tries) {
    this.word = word.toLowerCase().split('');
    this.tries = tries;    
    this.guessLetters = [];
    this.status = 'playing';
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

Hangman.prototype.gameStatus = function () {

    const finish = this.word.every( (letter) => this.guessLetters.includes(letter) );

    // Changes status    
    if (finish) {
        this.status = 'finished'
        console.log(this.status)
    } else if (this.tries <= 0) {
        this.status = 'failed'
        console.log(this.status)
    } else {
        this.status = 'playing'
        console.log(this.status)
    }
    
}

Hangman.prototype.renderPuzzle = function () {
    // Puzzle area
    const puzzleArea = document.getElementById('puzzle-area');

    puzzleArea.innerHTML = '';

    // Creates puzzle element
    const displaypuzzle = document.createElement('div');
    displaypuzzle.textContent = this.getPuzzle();
    puzzleArea.appendChild(displaypuzzle);

    // Creates guess counter
    const displayGuess = document.createElement('div');
    displayGuess.textContent = this.tries;
    puzzleArea.appendChild(displayGuess);

}

const game1 = new Hangman('Dog', 2);

game1.renderPuzzle();

window.addEventListener('keypress', function(e) {
    const guess = e.key;

    game1.getGuess(guess);

    game1.gameStatus();

    game1.renderPuzzle();

});

