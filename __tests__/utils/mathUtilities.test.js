const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Math Utilities", () => {
  describe("getQuestion", () => {
    test("returns an object with question and answer properties", () => {
      const result = getQuestion();
      expect(result).toHaveProperty("question");
      expect(result).toHaveProperty("answer");
    });

    test("generates a valid math question", () => {
      const { question } = getQuestion();
      expect(question).toMatch(/^\d+\s[\+\-\*\/]\s\d+$/);
    });

    test("generates questions within the correct range", () => {
      for (let i = 0; i < 100; i++) {
        const { question } = getQuestion();
        const [num1, operator, num2] = question.split(" ");

        switch (operator) {
          case "+":
          case "-":
            expect(Number(num1)).toBeLessThanOrEqual(75);
            expect(Number(num2)).toBeLessThanOrEqual(50);
            break;
          case "*":
          case "/":
            expect(Number(num1)).toBeLessThanOrEqual(144);
            expect(Number(num2)).toBeLessThanOrEqual(12);
            break;
        }
      }
    });

    test("division questions always result in whole numbers", () => {
      for (let i = 0; i < 100; i++) {
        const { question, answer } = getQuestion();
        if (question.includes("/")) {
          expect(Number.isInteger(answer)).toBe(true);
        }
      }
    });

    test("does not generate division by zero", () => {
      for (let i = 0; i < 100; i++) {
        const { question } = getQuestion();
        expect(question).not.toMatch(/\/\s*0$/);
      }
    });
  });

  describe("isCorrectAnswer", () => {
    test("correctly evaluates addition", () => {
      expect(isCorrectAnswer("7 + 1", 8)).toBe(true);
      expect(isCorrectAnswer("7 + 1", 9)).toBe(false);
    });

    test("correctly evaluates subtraction", () => {
      expect(isCorrectAnswer("12 - 6", 6)).toBe(true);
      expect(isCorrectAnswer("12 - 6", 5)).toBe(false);
    });

    test("correctly evaluates multiplication", () => {
      expect(isCorrectAnswer("5 * 5", 25)).toBe(true);
      expect(isCorrectAnswer("5 * 5", 30)).toBe(false);
    });

    test("correctly evaluates division", () => {
      expect(isCorrectAnswer("25 / 5", 5)).toBe(true);
      expect(isCorrectAnswer("25 / 4", 6)).toBe(false);
    });

    test("returns false for non-numeric answers", () => {
      expect(isCorrectAnswer("2 + 2", "four")).toBe(false);
    });
  });
});
