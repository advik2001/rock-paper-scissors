// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);


const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const scoreAiNumber = document.querySelector(".score__number__ai");
let score = 0;
let scoreAi = 0;
const hurrayScreen = document.querySelector(".hurray-screen");

// Load score from localStorage on page load
function loadScore() {

  // getting user score 
  const savedScore_user = localStorage.getItem("user_score");
  score = savedScore_user ? parseInt(savedScore_user, 10) : 0;
  scoreNumber.innerText = score;

  // getting ai score 
  const savedScore_ai = localStorage.getItem("ai_score");
  scoreAi = savedScore_ai ? parseInt(savedScore_ai, 10) : 0;
  scoreAiNumber.innerText = scoreAi;
}
loadScore(); // call this at start

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {

      // Show hurray screen for 1 second
      hurrayScreen.classList.remove("hidden");

      setTimeout(() => {
        hurrayScreen.classList.add("hidden");

        resultText.innerText = "you win";
        resultDivs[0].classList.toggle("winner");
        // resultWinner.classList.remove("hidden");
        // resultsDiv.classList.add("show-winner");
      }, 1000);

      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "you lost";
      resultDivs[1].classList.toggle("winner");
      keepScoreAi(1);
    } else {
      resultText.innerText = "tie up";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}


function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem("user_score", score); // save updated score
}

function keepScoreAi(point) {
  scoreAi += point;
  scoreAiNumber.innerText = scoreAi;
  localStorage.setItem("ai_score", scoreAi); // save updated score
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});


// Toggle Rules
function toggleRules() {
  const rulesContainer = document.querySelector(".rulecard");
  if (rulesContainer.style.display === 'none' || rulesContainer.style.display === '') {
    rulesContainer.style.display = 'block';
  } else {
    rulesContainer.style.display = 'none';
  }
}

