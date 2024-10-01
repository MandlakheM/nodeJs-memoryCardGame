let cards = [];

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
    gameBoard.appendChild(cardElement);
  });
}





document.getElementById("restart-btn").addEventListener("click", initGame);

initGame();
