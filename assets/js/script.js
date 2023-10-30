//Create Variables
var startBtn = document.querySelector(".start-btn");
var quizEl = document.querySelector(".quiz");
var score = 0;
var timeleft = 60;
var index = 0;

//Create questions
var questions = [
  { question: "question 1", choices: ["a", "b", "c", "d"], correct: "a" },
  { question: "question 2", choices: ["a", "b", "c", "d"], correct: "c" },
  { question: "question 3", choices: ["a", "b", "c", "d"], correct: "b" },
  { question: "question 4", choices: ["a", "b", "c", "d"], correct: "a" },
  { question: "question 5", choices: ["a", "b", "c", "d"], correct: "d" },
  { question: "question 6", choices: ["a", "b", "c", "d"], correct: "b" },
];

//Ask question function
function askquestion() {
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
    });
    choicesEl.appendChild(btn);
  });
  //check if correct
  //add 1 to score
  //delete 10s from timer
}
// Connect start button
// addEventListener
startBtn.addEventListener("click", function () {
  document.querySelector(".start").classList.add("hide");
  quizEl.classList.remove("hide");
  askquestion();
});

// Add Countdown Function
