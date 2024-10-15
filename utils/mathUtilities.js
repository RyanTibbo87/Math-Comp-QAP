function getQuestion() {
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1, num2, question, answer;

  switch (operator) {
    case "+":
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 100) + 1;
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 100) + 51; // make sure num1 is always bigger
      num2 = Math.floor(Math.random() * 50) + 1;
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      question = `${num1} * ${num2}`;
      answer = num1 * num2;
      break;
    case "/":
      num2 = Math.floor(Math.random() * 10) + 1; // Divisor (1 to 10)
      answer = Math.floor(Math.random() * 10) + 1; // Quotient (1 to 10)
      num1 = num2 * answer; // Ensure division results in a whole number
      question = `${num1} / ${num2}`;
      break;
  }

  return { question, answer };
}

function isCorrectAnswer(question, userAnswer) {
  const parts = question.split(" ");
  const num1 = parseInt(parts[0]);
  const num2 = parseInt(parts[2]);
  const operator = parts[1];
  let correctAnswer;

  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = num1 / num2;
      break;
  }

  return Math.abs(correctAnswer - userAnswer) < 0.01;
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
