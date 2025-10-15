const emojis = ['🍕', '🐶', '🚀', '🎵', '🌈', '🐱', '⚽', '🍓'];

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const gameBoard = document.getElementById('game-board');

let flippedCards = [];
let matchedCount = 0;
let lockBoard = false;

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  startGame();
});

restartBtn.addEventListener('click', () => {
  winScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  startGame();
});

function startGame() {
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedCount = 0;
  lockBoard = false;

  const cards = shuffle([...emojis, ...emojis]);

  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = '';
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick(e) {
  if (lockBoard) return;

  const card = e.currentTarget;

  if (card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.emoji;

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [first, second] = flippedCards;
  if (first.dataset.emoji === second.dataset.emoji) {
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === emojis.length * 2) {
      setTimeout(() => {
        gameScreen.classList.add('hidden');
        winScreen.classList.remove('hidden');
      }, 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.textContent = '';
      });
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
