/* eslint-disable func-names */
/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-syntax */
import '../css/style.css';
import '../css/style.scss';
import cardsArray from "./cards";

const mainContainer = document.getElementById('main-container');
const navList = document.getElementById('burger__menu');
const toogleMode = document.getElementById('gamestate-toogle');
const switchDescription = document.getElementById("switch__description");
const nodesMainContainer = mainContainer.childNodes;
const cardImages = document.getElementsByClassName("card-image");
const cardDescription = document.getElementsByClassName("card-description");
let guessedCards = [];
const startButton = document.getElementById("start-button");
let cardCounter = 0;
let currentCardsArray = [];
let currentCard = {};
const repeatButton = document.getElementById("repeat-button");
const scoreContainer = document.getElementById('score-container');
const correctAnswer = '<img src="./img/star-win.svg" class="scores-images" alt="">';
const incorrectAnswer = '<img src="./img/star.svg" class="scores-images" alt="">';
const winSection = document.getElementById("win-section");
const looseSection = document.getElementById("loose-section");
const switchContainer = document.getElementById("switch-container");
const burger = document.getElementById("burger-button");

burger.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("open");
  burger.classList.toggle("open");
});

// Detect all clicks on the document
document.addEventListener("click", function (event) {
  
  if (event.target.closest(".burger")) return;
  if (event.target.closest(".burger__menu")) return;
  if (document.body.classList.contains("open")){
      document.body.classList.toggle("open");
      burger.classList.toggle("open");
    } 
});

const gameState = {
  isStartPage: true,
  isGameMode: false,
  isTrainMode: false,
  isGameOn: false,
  hasMistakes: 0,
};

let cards = [];

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function resetCards() {
  document.getElementById('main-container').innerHTML = '';
  document.body.classList.toggle("open");
  document.getElementById("burger-button").classList.toggle("open");
  gameState.isGameOn = false;
  scoreContainer.innerHTML = "";
  startButton.classList.add('hidden');
  repeatButton.classList.add('hidden');
  cardCounter = 0;
  currentCard = {};
  currentCardsArray = [];
  guessedCards = [];
  switchContainer.classList.remove("hidden")
}

function drawCards(category = 'categories') {
  cards = cardsArray.filter((card) => card.category === category).sort(() => Math.random() - 0.5);
  for (const elem of cards) {
    const card = document.createElement('card');
    card.dataset.category = elem.category;
    if (elem.category === 'categories') {
      card.classList.add('categories_card');
      if (gameState.isGameMode) {
        card.classList.add('card-gamemode');
      }
      card.classList.add('card', 'front-card');
      gameState.isStartPage = true;
    } else {
      card.classList.add('card', 'front-card');
      gameState.isStartPage = false;
    }
    if (gameState.isStartPage && !gameState.isGameMode) {
      card.innerHTML = `<audio src="${elem.audioSrc}" class='hidden' id ='audio'></audio>
    <img src="${elem.image}" alt="" class='card-image'>
  <div class="card-description">
  <p class="card-name__eng">${elem.word}</p>
  <p class="card-name__rus hidden ">${elem.translation}</p>
  <span class="material-icons icon-rotate hidden">rotate_right</span>
  </div>
  </img>`;
    } else if (!gameState.isStartPage && gameState.isGameMode) {
      startButton.classList.remove("hidden")
      card.innerHTML = `<audio src="${elem.audioSrc}" class='hidden' id ='audio'></audio>
  <img src="${elem.image}" alt="" class='card-image card-cover'>
<div class="card-description hidden">
<p class="card-name__eng">${elem.word}</p>
<p class="card-name__rus hidden ">${elem.translation}</p>
<span class="material-icons icon-rotate ">rotate_right</span>
</div>
</img>`;
    } else if (gameState.isStartPage && gameState.isGameMode) {
      startButton.classList.add("hidden")
      card.innerHTML = `<audio src="${elem.audioSrc}" class='hidden' id ='audio'></audio>
  <img src="${elem.image}" alt="" class='card-image'>
<div class="card-description">
<p class="card-name__eng">${elem.word}</p>
<p class="card-name__rus hidden ">${elem.translation}</p>
<span class="material-icons icon-rotate ">rotate_right</span>
</div>
</img>`;
    } else {
      card.innerHTML = `<audio src="${elem.audioSrc}" class='hidden' id ='audio'></audio>
  <img src="${elem.image}" alt="" class='card-image'>
<div class="card-description">
<p class="card-name__eng">${elem.word}</p>
<p class="card-name__rus hidden ">${elem.translation}</p>
<span class="material-icons icon-rotate">rotate_right</span>
</div>
</img>`;
    }
    card.id = elem.word;
    mainContainer.appendChild(card);
  }

  const navElements = document.querySelectorAll('.burger__menu-element');
  navElements.forEach((navElem) => {
    navElem.classList.remove('link-active');
    if (navElem.id === category) {
      navElem.classList.add('link-active');
    }
  });
}

function generateNav() {
  const categories = cardsArray.filter((card) => card.category === 'categories');
  for (const elem of categories) {
    const category = document.createElement('li');
    category.classList.add('burger__menu-element');
    category.id = elem.word;
    category.innerHTML = `<img src="${elem.icon}" class='burger__menu-element__img' alt="">${elem.word}`;
    navList.append(category);
  }
}

drawCards();
generateNav();

// Statistic
function drawStatistics() {
  drawCards('statistics');
  switchContainer.classList.add("hidden")
  const statContainer = document.createElement('div');
  statContainer.classList.add('stat-container');
  statContainer.innerHTML = '<p>Statistic:</p> <br>';
  mainContainer.append(statContainer);
  const categoriesStats = cardsArray.filter((card) => card.category === 'categories');
  for (const category of categoriesStats) {
    const categoriesWords = cardsArray.filter((card) => card.category === category.word);
    statContainer.innerHTML += `<p class='statistic-categories'>Category: ${category.word}</p> <br>`;
    for (const word of categoriesWords) {
      statContainer.innerHTML += `<p class='statistic-words'>${word.word} - ${word.translation} </p> <br>`;
    }
  }
}

navList.addEventListener('click', (event) => {
  if (event.target.closest('li')) {

    const chosenCard = event.target.closest('li');
    if (chosenCard.id === 'statistics') {
      resetCards()
      drawStatistics();
    } else {
      resetCards();
      drawCards(chosenCard.id);
    }
  }
});


// Sound effects
function hideResults() {
  winSection.classList.add('hidden');
  looseSection.classList.add('hidden');
}

function playWin() {
  const audioAlerts = new Audio('./audio/success.mp3');
  audioAlerts.play();
  winSection.classList.remove('hidden');
  setTimeout(resetCards, 4900);
  setTimeout(drawCards, 5000);
  setTimeout(hideResults, 5000);

}


function playLose() {
  const audioAlerts = new Audio('./audio/failure.mp3');
  audioAlerts.play();
  looseSection.classList.remove('hidden');
  const loseScore = document.getElementById('lose-score');
  loseScore.innerText = `You were wrong ${gameState.hasMistakes} times`;
  setTimeout(resetCards, 4900);
  setTimeout(drawCards, 5000);
  setTimeout(hideResults, 5000);
}


// Game Mode
startButton.addEventListener('click', () => {
  startButton.classList.add('hidden');
  repeatButton.classList.remove('hidden');
  const currentCategory = document.querySelector('card').dataset.category;
  gameState.isGame = true;
  gameState.isGameOn = true;
  if (cardCounter === 0) {
    currentCardsArray = cardsArray.filter((card) => card.category === currentCategory).sort(() => Math.random() - 0.5);
    currentCard = currentCardsArray[cardCounter];
    const audio = new Audio(currentCard.audioSrc);
    sleep(500)
    audio.play();
  }
});

function playCard() {
  if (cardCounter >= currentCardsArray.length) {
    return;
  }
  currentCard = currentCardsArray[cardCounter];
  const audio = new Audio(currentCard.audioSrc);
  sleep(500)
  audio.play();

}

repeatButton.addEventListener('click', () => {
  currentCard = currentCardsArray[cardCounter];
  const audio = new Audio(currentCard.audioSrc);
  audio.play();
})


// Cards click
function cardCorrect(chosenCard) {
  scoreContainer.innerHTML = correctAnswer + scoreContainer.innerHTML;
  cardCounter += 1;
  guessedCards.push(chosenCard);
  const audioAlerts = new Audio('./audio/correct.mp3');
  audioAlerts.play();
  chosenCard.classList.add('card-guessed');
  if (cardCounter === cards.length) {
    if (gameState.hasMistakes === 0) {
      setTimeout(playWin, 1000);
    } else {
      setTimeout(playLose, 1000);
    }
    return;
  }
  setTimeout(playCard, 500);
}

function cardIncorrect() {
  gameState.hasMistakes += 1;
  scoreContainer.innerHTML = incorrectAnswer + scoreContainer.innerHTML;
  const audioAlerts = new Audio('./audio/error.mp3');
  audioAlerts.play();
}

mainContainer.addEventListener('click', (event) => {
  if (event.target.closest('card')) {
    const chosenCard = event.target.closest('card');
    if (guessedCards.includes(chosenCard)) {
      return;
    }
    if (gameState.isGameOn && gameState.isGameMode) {
      if (chosenCard.id === currentCard.word) {
        cardCorrect(chosenCard);
      } else {
        cardIncorrect();
      }
    }
    // choose category 
    else if (gameState.isStartPage) {
      resetCards();
      drawCards(chosenCard.id);
    } else if (!gameState.isStartPage & !gameState.isGameMode) {
      chosenCard.childNodes[0].play();
    }
    if (event.target.closest('span')) {
      chosenCard.classList.add('card-back');
      chosenCard.childNodes[4].childNodes[1].classList.add('hidden');
      chosenCard.childNodes[4].childNodes[3].classList.remove('hidden');
      chosenCard.addEventListener('mouseleave', () => {
        chosenCard.classList.remove('card-back');
        chosenCard.childNodes[4].childNodes[1].classList.remove('hidden');
        chosenCard.childNodes[4].childNodes[3].classList.add('hidden');
      });
    }
  }
});

toogleMode.addEventListener('click', () => {
  document.querySelector('label').classList.toggle("switch-gamemode");
  if (gameState.isGameMode && gameState.isStartPage) {
    switchDescription.innerHTML = "Train";
    gameState.isGameMode = false;
    for (const nodes of nodesMainContainer) {
      nodes.classList.remove("card-gamemode");
    }
  } else if (!gameState.isGameMode && gameState.isStartPage) {
    switchDescription.innerHTML = "Play";
    gameState.isGameMode = true;
    for (const nodes of nodesMainContainer) {
      nodes.classList.add("card-gamemode");
    }
  } else if (!gameState.isGameMode && !gameState.isStartPage) {
    switchDescription.innerHTML = "Play";
    gameState.isGameMode = true;
    startButton.classList.remove("hidden")
    for (const nodes of nodesMainContainer) {
      nodes.classList.add("card-gamemode");
    }
    for (const images of cardImages) {
      images.classList.add("card-cover");
    }
    for (const description of cardDescription) {
      description.classList.add("hidden");
    }

  } else if (gameState.isGameMode && gameState.isGameOn) {
    switchDescription.innerHTML = "Train";
    gameState.isGameMode = false;
    gameState.isGameOn = false;
    gameState.isStartPage = false;
    repeatButton.classList.add("hidden")
    startButton.classList.add("hidden")
    cardCounter = 0;
    currentCard = {};
    currentCardsArray = [];
    guessedCards = [];
    scoreContainer.innerHTML = "";
    for (const nodes of nodesMainContainer) {
      nodes.classList.remove("card-gamemode");
      nodes.classList.remove("card-guessed");
    }
    for (const images of cardImages) {
      images.classList.remove("card-cover");
    }
    for (const description of cardDescription) {
      description.classList.remove("hidden");
    }
  } else if (gameState.isGameMode && !gameState.isStartPage) {
    switchDescription.innerHTML = "Train";
    gameState.isGameMode = false;
    repeatButton.classList.add("hidden")
    startButton.classList.add("hidden")
    for (const nodes of nodesMainContainer) {
      nodes.classList.remove("card-gamemode");
    }
    for (const images of cardImages) {
      images.classList.remove("card-cover");
    }
    for (const description of cardDescription) {
      description.classList.remove("hidden");
    }
  }
})