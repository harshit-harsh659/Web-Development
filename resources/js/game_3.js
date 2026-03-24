let a = Math.floor(Math.random() * 100) + 1;
let count = 0;
let gameOver = false;

const text_out = document.getElementById('guess');
const guessInput = document.querySelector('#guessInput');
const submitButton = document.querySelector('#submit');
const attemptsDiv = document.getElementById('attempts');

function checkGuess() {
    if (gameOver) return;
    
    const guess = parseInt(guessInput.value);
    count++;
    
    text_out.classList.remove('higher', 'lower', 'winner');
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        text_out.textContent = "Please enter a number between 1 and 100";
        return;
    }
    
    if (guess < a) {
        text_out.textContent = "The number is higher";
        text_out.classList.add('higher');
    } else if (guess > a) {
        text_out.textContent = "The number is lower";
        text_out.classList.add('lower');
    } else {
        text_out.textContent = `You won! It took you ${count} tries.`;
        text_out.classList.add('winner');
        gameOver = true;
        submitButton.disabled = true;
        guessInput.disabled = true;
        text_out.classList.add('game-over');
    }
    
    attemptsDiv.textContent = `Attempts: ${count}`;
    guessInput.value = '';
    guessInput.focus();
}

submitButton.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});