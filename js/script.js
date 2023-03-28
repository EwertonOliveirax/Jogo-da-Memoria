const cards = document.querySelectorAll('.card');
const scoreboard = document.querySelector('.scoreboard');
const scoreDisplay = document.querySelector('#score');
const movesDisplay = document.querySelector('#moves');
const restartBtn = document.querySelector('#restart-btn');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let moves = 0;

function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
}

restartBtn.addEventListener("click", resetGame);


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
  incrementMoves();
}

function checkForMatch() {
  let isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  incrementScore(10);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });
}

function incrementScore(value) {
  score += value;
  scoreDisplay.textContent = score;
}

function incrementMoves() {
  moves++;
  movesDisplay.textContent = moves;
}

function restartGame() {
  shuffle();
  resetScore();
  resetMoves();
  resetBoard();
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function resetScore() {
  score = 0;
  scoreDisplay.textContent = score;
}

function resetMoves() {
  moves = 0;
  movesDisplay.textContent = moves;
}

shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));
restartBtn.addEventListener('click', restartGame);
