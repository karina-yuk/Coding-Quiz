//Variables
var startBtn = document.querySelector("#start-btn");
var startPage = document.querySelector(".startpage");
var quizEl = document.querySelector(".quiz");
var endPage = document.querySelector(".endpage");
var scorePage = document.querySelector(".highscorepage");
var scoreLink = document.querySelector("#highscorebtn");

var recentScore = document.querySelector(".recentscore");
var initialsInput = document.querySelector("#initials");
var saveScore = document.querySelector("#submitscore");
var scoreList = document.querySelector("#scorelist");
var clearScore = document.querySelector("#clearscore");
var tryAgain = document.querySelector("#startover");
var choicesEl = document.querySelector(".choices");

var countdownTimer = document.querySelector("#countdown");
var timeLeft = "75";
//Countdown function
function countdown() {
  var timeInterval = setInterval(() => {
    countdownTimer.innerHTML = timeLeft;
    if (timeLeft < 1) {
      countdownTimer.innerHTML = "0";
      clearInterval(timeInterval);
    } else {
      timeLeft--;
    }
  }, 1000);
}

// Create questions, choices, and correct answer
var title = [
  {
    question: "What does JS stand for?",
    choices: ["JavaSpace", "JavaScript", "JavaScope", "JavaSite"],
    correct: "JavaScript",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["let", "var", "Both a and b", "None of the above"],
    correct: "Both a and b",
  },
  {
    question: "Which of the following are closures in Javascript?",
    choices: ["Variables", "Objects", "Functions", "All of the above"],
    correct: "All of the above",
  },
  {
    question: "How do we write a comment in javascript?",
    choices: ["//", ":", "#", "$="],
    correct: "//",
  },
  {
    question: "Which of the following are JavaScript Data Types?",
    choices: ["String", "Number", "Undefined", "All of the above"],
    correct: "All of the above",
  },
];

var quizText = document.querySelector("#title");
var choiceOne = document.querySelector("#choice1");
var choiceTwo = document.querySelector("#choice2");
var choiceThree = document.querySelector("#choice3");
var choiceFour = document.querySelector("#choice4");
var verifyAnswer = document.querySelector(".verifyAnswer");

var index = 0;

function renderQuestion() {
  countdown();
  quizText.textContent = title[index].question;
  choiceOne.value = title[index].choices[0];
  choiceTwo.value = title[index].choices[1];
  choiceThree.value = title[index].choices[2];
  choiceFour.value = title[index].choices[3];
}

function nextQuestion(event) {
  var correctOption = title[index].correct;
  var selectedOption = event.target.value;
  if (correctOption === selectedOption) {
    verifyAnswer.textContent = "Correct!";
  } else {
    verifyAnswer.textContent = "Wrong!";
    timeLeft -= 10;
  }
  index++;
  if (index < title.length) {
    renderQuestion();
  } else {
    renderEnd();
  }
}

function renderEnd() {
  quizEl.style.display = "none";
  endPage.style.display = "flex";
  newScore = Number(timeLeft);
  recentScore.textContent = newScore;
}

var highScores = [];

function renderHighScores() {
  endPage.style.display = "none";
  scorePage.style.display = "flex";

  // Sort the high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  scoreList.innerHTML = "";

  // Loop through the high scores and display them
  for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    var li = document.createElement("li");
    li.textContent = score.initialsInput + ": " + score.score;
    li.setAttribute("data-index", i);

    scoreList.appendChild(li);
  }
}

function startOver() {
  startPage.style.display = "flex";
  quizEl.style.display = "none";
  endPage.style.display = "none";
  scorePage.style.display = "none";
}

function clearList() {
  localStorage.clear();
}

// View highscores button
scoreLink.addEventListener("click", function () {
  startPage.style.display = "none";
  quizEl.style.display = "none";
  endPage.style.display = "none";
  scorePage.style.display = "flex";
});

// Start buttojn
startBtn.addEventListener("click", function () {
  startPage.style.display = "none";
  quizEl.style.display = "flex";
  renderQuestion();
});

// User selects their answer using buttons
choiceOne.addEventListener("click", nextQuestion);
choiceTwo.addEventListener("click", nextQuestion);
choiceThree.addEventListener("click", nextQuestion);
choiceFour.addEventListener("click", nextQuestion);

// Reload Home page to try again
tryAgain.addEventListener("click", startOver);

saveScore.addEventListener("click", function () {
  var initialsValue = initialsInput.value.trim();
  if (initialsValue !== "") {
    var scoreObject = {
      initialsInput: initialsValue,
      score: Number(timeLeft),
    };

    // Add the new score to the high scores array
    highScores.push(scoreObject);

    // Save high scores to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    renderHighScores();
  }
});

// Load high scores from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
});

// Clear both the high scores array and localStorage
clearScore.addEventListener("click", function () {
  highScores = [];
  localStorage.removeItem("highScores");

  scoreList.innerHTML = "";
});
