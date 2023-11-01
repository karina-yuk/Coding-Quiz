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
var countdownTimer = document.querySelector("#countdown");
var timeLeft = "75";

function countdown() {
  var timeInterval = setInterval(() => {
    countdownTimer.innerHTML = timeLeft;
    if (timeLeft < 1) {
      countdownTimer.innerHTML = "0";
      clearInterval(timeInterval);
      renderEnd();
    } else {
      timeLeft--;
    }
  }, 1000);
}

// Object including the questions, choices, and correct answer
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

var score = 0;
var timeleft = 60;
var index = 0;
var choicesEl = document.querySelector(".choices");

//Ask question function
function askquestion() {
  countdown()
  choicesEl.innerHTML = "";
  //show question 1
  var titleEl = document.querySelector("#title");
  titleEl.textContent = questions[index].question;
  //create a button for each choice
  questions[index].choices.forEach(function (choice) {
    var btn = document.createElement("button");
    btn.textContent = choice;
    btn.setAttribute("value", choice);
    btn.addEventListener("click", function () {
      if (this.value === questions[index].correct) {
        score++;
      } else {
        timeleft -= 10;
      }
      index++;
      askquestion();
      if (currentIndex < title.length) {
        askquestion();
      } else {
        renderEnd();
      }
    });
    choicesEl.appendChild(btn);
  });
}

function renderEnd() {
  quiz.style.display = "none";
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
  quiz.style.display = "none";
  endPage.style.display = "none";
  scorePage.style.display = "none";
}

function clearList() {
  localStorage.clear();
}

// View Highscores Link
scoreLink.addEventListener("click", function () {
  startPage.style.display = "none";
  quiz.style.display = "none";
  endPage.style.display = "none";
  scorePage.style.display = "flex";
});

// Button to begin the quiz
startBtn.addEventListener("click", function () {
  startPage.style.display = "none";
  quiz.style.display = "flex";
  renderQuestion();
});

// User selects their answer using buttons
optionOne.addEventListener("click", nextQuestion);
optionTwo.addEventListener("click", nextQuestion);
optionThree.addEventListener("click", nextQuestion);
optionFour.addEventListener("click", nextQuestion);

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
