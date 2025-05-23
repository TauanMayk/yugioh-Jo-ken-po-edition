const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldsCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playerSides: {
    player1: "player-cards",
    player1BOX: document.getElementById("player-cards"),
    computer: "computer-cards",
    computerBOX: document.getElementById("computer-cards"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};
const playerSides = {
  player1: "player-cards",
  computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";
const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [1, 3, 4, 5, 7, 8, 10, 12],
    LoseOf: [2, 6, 9, 11],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf: [3, 7, 8, 10, 12],
    LoseOf: [0, 4, 5, 6, 9, 11],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Special",
    img: `${pathImages}exodia.png`,
    WinOf: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    LoseOf: [],
  },
  {
    id: 3,
    name: "Old Dragon",
    type: "Dragon",
    img: `${pathImages}olddragon.png`,
    WinOf: [7, 8, 10, 12],
    LoseOf: [1, 2, 3, 4, 5, 6, 9, 11],
  },
  {
    id: 4,
    name: "Red-Eyes Black Dragon",
    type: "Scissors",
    img: `${pathImages}RedDragon.png`,
    WinOf: [3, 7, 8, 10, 12],
    LoseOf: [0, 1, 2, 4, 5, 6, 9, 11],
  },
  {
    id: 5,
    name: "Dark Magician Girl",
    type: "Paper",
    img: `${pathImages}magiciangirl.png`,
    WinOf: [3, 7, 8, 10, 12],
    LoseOf: [0, 1, 2, 4, 5, 6, 9, 11],
  },
  {
    id: 6,
    name: "Kuriboh",
    type: "Special",
    img: `${pathImages}kuriboh.png`,
    WinOf: [],
    LoseOf: [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 2, 9],
  },
  {
    id: 7,
    name: "Celta-Guardian",
    type: "Scissors",
    img: `${pathImages}celta-warrior.png`,
    WinOf: [8, 12],
    LoseOf: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11],
  },
  {
    id: 8,
    name: "Magician Time",
    type: "Special",
    img: `${pathImages}magicianTime.png`,
    WinOf: [],
    LoseOf: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12],
  },
  {
    id: 9,
    name: "Millenium Eye",
    type: "Special",
    img: `${pathImages}milleniumEye.png`,
    WinOf: [0, 1, 3, 4, 5, 6, 7, 8, 10, 11, 12],
    LoseOf: [2],
  },
  {
    id: 10,
    name: "Dark-Fairy",
    type: "Scissors",
    img: `${pathImages}fairy.png`,
    WinOf: [7, 8, 12],
    LoseOf: [0, 1, 2, 3, 4, 5, 6, 9, 10, 11],
  },
  {
    id: 11,
    name: "Ultimate White Dragon",
    type: "Rock",
    img: `${pathImages}dragonThreeEyes.png`,
    WinOf: [0, 1, 3, 4, 5, 7, 8, 10, 12],
    LoseOf: [2, 6, 9],
  },
  {
    id: 12,
    name: "Baby Dragon",
    type: "Paper",
    img: `${pathImages}dragonBaby.png`,
    WinOf: [8],
    LoseOf: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11],
  },
];

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  if (fieldSide === playerSides.player1) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(idCard);
    });
  }

  return cardImage;
}

async function setCardsField(cardId) {
  await showHiddenCardFieldsImages(true);

  await removeAllCardsImages();

  let computerCardId = await getRandomCardId();

  await hiddenCardDetails();

  await drawCardsInField(cardId, computerCardId);

  let duelResults = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButtton(duelResults);
}

async function drawCardsInField(cardId, computerCardId) {
  state.fieldsCards.player.src = cardData[cardId].img;
  state.fieldsCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value) {
  if (value === true) {
    state.fieldsCards.player.style.display = "block";
    state.fieldsCards.computer.style.display = "block";
  }

  if (value === false) {
    state.fieldsCards.player.style.display = "none";
    state.fieldsCards.computer.style.display = "none";
  }
}

async function hiddenCardDetails() {
  state.cardSprites.avatar.src = "";
  state.cardSprites.name.innerText = "";
  state.cardSprites.type.innerText = "";
}

async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButtton(text) {
  state.actions.button.innerText = text.toUpperCase();
  state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "Draw";
  let playerCard = cardData[playerCardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    duelResults = "Win";
    state.score.playerScore++;
  }

  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResults = "Lose";
    state.score.computerScore++;
  }
  await playAudio(duelResults);
  return duelResults;
}

async function removeAllCardsImages() {
  let { computerBOX, player1BOX } = state.playerSides;
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function resetDuel() {
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";

  state.fieldsCards.player.style.display = "none";
  state.fieldsCards.computer.style.display = "none";

  init();
}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  try {
    audio.play();
  } catch (error) {
    console.log(error);
  }
}

function init() {
  showHiddenCardFieldsImages(false);
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);

  const bgm = document.getElementById("bgm");
  bgm.play();
}

init();
