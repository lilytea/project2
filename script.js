// scripts.js
const cards = document.querySelectorAll(".memory-card");

let matchCount = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  var snd = new Audio(
    "https://cdn.glitch.me/21e0e233-611c-4362-a876-bd76a0fc45d1%2Fzapsplat_foley_stone_small_set_down_wood_001_32923.mp3?v=1634228049019"
  ); // buffers automatically when created
  snd.play();
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    disableCards();
    var snd = new Audio(
      "https://cdn.glitch.me/21e0e233-611c-4362-a876-bd76a0fc45d1%2Fmixkit-gear-lock-sound-2856(1).wav?v=1634145734996"
    ); // buffers automatically when created
    snd.play();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchCount++;
  if (matchCount == 6) {
    setTimeout(changeCover, 2000);
  }
  resetBoard();
}
function changeCover() {
  document.getElementById("cover").style.visibility = "visible";
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1500);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener("click", flipCard));
