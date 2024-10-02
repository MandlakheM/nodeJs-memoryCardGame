let cards = [];
let flippedCards = [];
let matchedPairs = 0;

async function initGame() {
  const response = await fetch("/cards");
  cards = await response.json();
  renderCards();
}

function renderCards() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.dataset.index = index;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (flippedCards.length === 2) return;
  const index = parseInt(this.dataset.index);
  if (cards[index].matched || flippedCards.includes(index)) return;

  this.classList.add("flipped");
  this.style.backgroundImage = `url(${cards[index].image})`;
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function flipCard() {
  if (flippedCards.length === 2) return;
  const index = parseInt(this.dataset.index);
  if (cards[index].matched || flippedCards.includes(index)) return;

  this.classList.add('flipped');
  this.style.backgroundImage = `url(${cards[index].image})`;
  flippedCards.push(index);

  if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [index1, index2] = flippedCards;
  const card1 = cards[index1];
  const card2 = cards[index2];

  if (card1.id === card2.id) {
      card1.matched = true;
      card2.matched = true;
      matchedPairs++;
      if (matchedPairs === cards.length / 2) {
          setTimeout(() => alert('Congratulations! You won!'), 500);
      }
  } else {
      const flippedElements = document.querySelectorAll('.card.flipped:not([data-matched])');
      flippedElements.forEach(element => {
          element.classList.remove('flipped');
          element.style.backgroundImage = '';
      });
  }

  flippedCards = [];
}

document.getElementById("restart-btn").addEventListener("click", initGame);

initGame();
