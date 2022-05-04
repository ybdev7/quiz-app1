import { IQuiz, QuizCategory, QuizLevel } from "../interfaces/interfaces";
import { QuizWorker } from "../quiz_worker";

const quiz1: IQuiz = {
  title: "History Quiz - 20th Century",
  category: QuizCategory.History,
  desc: "Answer these easy questions about the 20th century",
  level: QuizLevel.Easy,
  questions: [
    {
      questionText: "What is the name of the first Nasa mission to the Moon?",
      score: 5,
      answers: [
        { answerText: "Artemis", isCorrect: false },
        { answerText: "Apollo 11", isCorrect: true },
        { answerText: "Endevour 11", isCorrect: false },
        { answerText: "Moonwalk 1", isCorrect: false },
      ],
    },
  ],
};

const quiz2: IQuiz = {
  title: "History Quiz - 19th Century",
  category: QuizCategory.History,
  desc: "Answer these easy questions about the 19th century",
  level: QuizLevel.Easy,
  questions: [
    {
      questionText:
        "What mode of transportation gained popularity in the 19th century?",
      score: 5,
      answers: [
        { answerText: "Boats", isCorrect: false },
        { answerText: "Railways", isCorrect: true },
        { answerText: "Airplanes", isCorrect: false },
        { answerText: "Cars", isCorrect: false },
      ],
    },
  ],
};

const quizWorker: QuizWorker = new QuizWorker();
quizWorker.addQuiz(quiz1).then(() => quizWorker.addQuiz(quiz2));
