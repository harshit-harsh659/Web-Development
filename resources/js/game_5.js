let moves = 0;
let matches = 0;
let flippedCards = [];
let canFlip = true;

const gameImages = [
    '🍉', '🍋', '🍐', '🥑' ,
    '🍌', '🍇', '🍊', '🍓', '🍒', '🍑', '🍍', '🥝'
];

function gameSet() {
    let cardImages = [];
    for (let i = 0; i < gameImages.length; i++) {
        cardImages.push(gameImages[i]);
        cardImages.push(gameImages[i]);
    }
    
    for (let i = cardImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
    }
    
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.dataset.image = cardImages[index];
        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back">${cardImages[index]}</div>
        `;
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    gameSet();
    setupEventListeners();
});

function setupEventListeners() {
    const cards = document.querySelectorAll('.card');
    const resetButton = document.getElementById('reset');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            flipCard(this);
        });
    });
    
    resetButton.addEventListener('click', resetGame);
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        updateMoves();
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.image === card2.dataset.image) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matches++;
            updateMatches();
            flippedCards = [];
            canFlip = true;
            
            if (matches === 12) {
                setTimeout(() => {
                document.getElementById('win_message').textContent=`Congratulation , you took ${moves} moves!`;
                }, 500);
            }
        }, 1000);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function updateMoves() {
    document.getElementById('moves').textContent = `Moves: ${moves}`;
}

function updateMatches() {
    document.getElementById('matches').textContent = `Matches: ${matches}`;
}

function resetGame() {
    moves = 0;
    matches = 0;
    flippedCards = [];
    canFlip = true;
    
    updateMoves();
    updateMatches();
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    
    gameSet();
}