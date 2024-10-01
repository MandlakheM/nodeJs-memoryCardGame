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



document.getElementById("restart-btn").addEventListener("click", initGame);

initGame();
