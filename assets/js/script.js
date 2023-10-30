//Create Variables
var startBtn = document.querySelector(".start-btn");
var quizEl = document.querySelector(".quiz");
var score = 0;
var timeleft = 60;
var index = 0;
var choicesEl = document.querySelector(".choices");



//Create questions
var questions = [
  { question: "What does JS stand for?", choices: ["JavaSpace", "JavaScript", "JavaScope", "JavaSite"], correct: "JavaScript" },
  { question: "Javascript is an _______ language?", choices: ["object-Based", "Procedural", "Object-Oriented", "None of the above"], correct: "Object-Oriented" },
  { question: "Which of the following keywords is used to define a variable in Javascript?", choices: ["let", "var", "Both a and b", "None of the above"], correct: "Both a and b" },
  { question: "Which of the following are closures in Javascript?", choices: ["Variables", "Objects", "Functions", "All of the above"], correct: "All of the above" },
  { question: "How do we write a comment in javascript?", choices: ["//", ":", "#", "$="], correct: "//" },
  { question: "Which of the following are JavaScript Data Types?", choices: ["String", "Number", "Undefined", "All of the above"], correct: "All of the above" },

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
