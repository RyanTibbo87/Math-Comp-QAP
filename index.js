const express = require("express");
const app = express();
const port = 3000;
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

let currentQuestion = null;
let streak = 0;
let leaderboard = [];

app.get("/", (req, res) => {
  res.render("index", { streak, leaderboard });
});

app.get("/quiz", (req, res) => {
  currentQuestion = getQuestion();
  res.render("quiz", { question: currentQuestion.question, streak });
});

app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  const userAnswer = parseFloat(answer);

  if (isCorrectAnswer(currentQuestion.question, userAnswer)) {
    streak++;
    res.render("result", {
      correct: true,
      streak,
      question: currentQuestion.question,
      userAnswer,
      correctAnswer: currentQuestion.answer,
    });
  } else {
    if (streak > 0) {
      leaderboard.push(streak);
      leaderboard.sort((a, b) => b - a);
      leaderboard = leaderboard.slice(0, 10);
    }
    res.render("result", {
      correct: false,
      streak,
      question: currentQuestion.question,
      userAnswer,
      correctAnswer: currentQuestion.answer,
    });
    streak = 0;
  }
});

app.get("/leaderboard", (req, res) => {
  res.render("leaderboard", { leaderboard });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// working
