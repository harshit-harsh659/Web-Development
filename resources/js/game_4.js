const dice = document.getElementById("dice");
const face = document.getElementById("face");
const text = document.getElementById("turn");
const statusMessage = document.getElementById("status-message");

let score_1=0;
let score_2=0;

let roll_1 = true;
let roll_2 = true;

let isRolling = false;
let turn=1;

document.addEventListener('DOMContentLoaded', function() {
    updateDiceFace(1);
});

function rollDice() {
  if (isRolling) return;
  
  if (turn === 1 && !roll_1) return;
  if (turn === 2 && !roll_2) return;
  
  isRolling = true;

  dice.classList.add("rolling");

  setTimeout(() => {
    dice.classList.remove("rolling");

    const result = Math.floor(Math.random() * 6) + 1;
    updateDiceFace(result);
    
    if(turn === 1) {
      score_1 = parseInt(score_1) + parseInt(result);
    } else {
      score_2 = parseInt(score_2) + parseInt(result);
    }

    dice.style.transform = "rotateX(0deg) rotateY(0deg)";

    isRolling = false;
    change();
    displayScore();
    checkGameEnd(turn);
  }, 900);
}

function createDiceFace(value) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dice-dots';
    dotsContainer.setAttribute('data-face', value);
    
    for (let i = 0; i < value; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
    }
    
    return dotsContainer;
}

function updateDiceFace(value) {
    const face = document.getElementById('face');
    face.innerHTML = '';
    face.appendChild(createDiceFace(value));
}

function resetGame() {
  score_1 = 0;
  score_2 = 0;
  turn = 1;
  roll_1 = true;
  roll_2 = true;
  document.getElementById("score_1").textContent = score_1;
  document.getElementById("score_2").textContent = score_2;
  document.getElementById("turn").textContent = turn;
  updateDiceFace(1);
  dice.style.transform = "rotateX(0deg) rotateY(0deg)";
  isRolling = false;
  statusMessage.textContent = "";
  statusMessage.classList.remove("stop-turn");
  
  const rollButton = document.getElementById("roll");
  rollButton.disabled = false;
  rollButton.textContent = "Roll Dice";
  
  document.getElementById("roll").style.display = "inline-block";
  document.getElementById("stop").style.display = "inline-block";
  
  const turnElement = document.getElementById("turn");
  turnElement.style.color = "";
  turnElement.style.fontSize = "";
}

function displayScore(){
  document.getElementById("score_1").textContent = score_1;
  document.getElementById("score_2").textContent = score_2;
}

function change() {
  if (turn === 1 && !roll_1) {
    turn = 2;
    text.textContent = turn;
  } else if (turn === 2 && !roll_2) {
    turn = 1;
    text.textContent = turn;
  } else if (roll_1 && roll_2) {
    turn = turn === 1 ? 2 : 1;
    text.textContent = turn;
  }
  updateRollButton();
}

function checkGameEnd(turn) {
  let gameEnded = false;
  let winner = "";
  
  if (turn==1){
    if (score_1 ==21){
      winner = "Player 1";
      gameEnded = true;
    }
  } else {
    if (score_2 ==21){
      winner = "Player 2";
      gameEnded = true;
    }
  }
  if (score_1 >= 21 && score_2<21){
    winner = "Player 1";
    gameEnded = true;
  }
  if (score_2 >= 21 && score_1<21){
    winner = "Player 2";
    gameEnded = true;
  }
  
  if (gameEnded) {
    disableRollButton();
    hideGameButtons();
    showWinnerInTurnDisplay(winner);
  }
}

function stop_game(turn){
  if (turn==1){
    if (roll_1){
      roll_1=false;
      statusMessage.textContent = "Player 1 has stopped rolling";
      statusMessage.classList.add("stop-turn");
    }
  } else {
    if (roll_2){
      roll_2=false;
      statusMessage.textContent = "Player 2 has stopped rolling";
      statusMessage.classList.add("stop-turn");
    }
  }
  
  if (!roll_1 && !roll_2) {
    checkWinner();
    disableRollButton();
  } else {
    change();
    checkGameEnd(turn);
    updateRollButton();
  }
}

function updateRollButton() {
  const rollButton = document.getElementById("roll");
  if ((turn === 1 && !roll_1) || (turn === 2 && !roll_2)) {
    rollButton.disabled = true;
    rollButton.textContent = "Can't Roll";
  } else {
    rollButton.disabled = false;
    rollButton.textContent = "Roll Dice";
  }
}

function disableRollButton() {
  const rollButton = document.getElementById("roll");
  rollButton.disabled = true;
  rollButton.textContent = "Game Over";
}

function checkWinner() {
  let winner;
  if (score_1 > score_2) {
    winner = "Player 1";
  } else if (score_2 > score_1) {
    winner = "Player 2";
  } else {
    winner = "It's a tie!";
  }
  
  hideGameButtons();
  showWinnerInTurnDisplay(winner);
  const rollButton = document.getElementById("roll");
  rollButton.disabled = true;
  rollButton.textContent = "Game Over";
}

function hideGameButtons() {
  document.getElementById("roll").style.display = "none";
  document.getElementById("stop").style.display = "none";
}

function showWinnerInTurnDisplay(winner) {
  const turnElement = document.getElementById("turn");
  if (winner === "It's a tie!") {
    turnElement.innerHTML = `<strong>It's a tie!</strong>`;
  } else {
    turnElement.innerHTML = `<strong>${winner} Wins!</strong>`;
  }
  turnElement.style.color = "#ffeb3b";
  turnElement.style.fontSize = "1.3em";
}
