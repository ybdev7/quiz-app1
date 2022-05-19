import { IQuiz, QuizCategory, QuizLevel } from "../interfaces/interfaces";
import { QuizWorker } from "../quiz_worker";

const quiz1: IQuiz = {
  title: "History Quiz - 20th Century",
  category: QuizCategory.History,
  desc: "Answer these easy questions about the 20th century",
  level: QuizLevel.Easy,
  questions: [
    {
      _id: uuid4(),
      questionText: "What is the name of the first Nasa mission to the Moon?",
      score: 5,
      answers: [
        { _id: uuid4(), answerText: "Artemis", isCorrect: false },
        { _id: uuid4(), answerText: "Apollo 11", isCorrect: true },
        { _id: uuid4(), answerText: "Endevour 11", isCorrect: false },
        { _id: uuid4(), answerText: "Moonwalk 1", isCorrect: false },
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
      _id: uuid4(),
      questionText:
        "What mode of transportation gained popularity in the 19th century?",
      score: 5,
      answers: [
        { _id: uuid4(), answerText: "Boats", isCorrect: false },
        { _id: uuid4(), answerText: "Railways", isCorrect: true },
        { _id: uuid4(), answerText: "Airplanes", isCorrect: false },
        { _id: uuid4(), answerText: "Cars", isCorrect: false },
      ],
    },
  ],
};

const quizWorker: QuizWorker = new QuizWorker();
quizWorker.addQuiz(quiz1).then(() => quizWorker.addQuiz(quiz2));
function uuid4(): string | undefined {
  throw new Error("Function not implemented.");
}
