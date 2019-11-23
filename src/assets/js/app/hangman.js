class Hangman {
    constructor(word, tries) {
        this.word = word.toLowerCase().split('');
        this.tries = tries;    
        this.guessLetters = [];
        this.status = 'playing';
    }

    getPuzzle() {
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

    getGuess(guess) {
        if (this.status === 'playing') {
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
    
        this.gameStatus();

    }

    gameStatus() {
        // Checks for finish status
        const chkChar = [];

        this.guessLetters.forEach((letter) => {
            if (this.word.includes(letter)) {
                chkChar.push(letter);
            }

        });

        const chkCorrect = () => this.word.join('') === chkChar.join('');     

        // Changes status    
        if (chkCorrect()) {
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

    chkStatus() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.tries}`;
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`;
        } else {
            return 'Great work! You guessed the word';
        }
    }

    renderPuzzle() {
        // Puzzle area
        const puzzleArea = document.getElementById('puzzle-area');

        puzzleArea.innerHTML = '';

        // Renders puzzle element
        const displaypuzzle = document.createElement('div');
        displaypuzzle.textContent = this.getPuzzle();
        puzzleArea.appendChild(displaypuzzle);

        // Renders guess counter
        const displayGuess = document.createElement('div');
        displayGuess.textContent = this.tries;
        puzzleArea.appendChild(displayGuess);

        // Renders status
        const displayStat = document.createElement('div');
        displayStat.textContent = this.chkStatus();
        puzzleArea.appendChild(displayStat);
    }
}

const game1 = new Hangman('Dog', 2);

game1.renderPuzzle();

window.addEventListener('keypress', function(e) {
    const guess = e.key;
    game1.getGuess(guess);
    game1.gameStatus();
    game1.renderPuzzle();
});

