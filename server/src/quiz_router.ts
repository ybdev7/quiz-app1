import express, { Request, Response } from "express";
import { IQuiz } from "./interfaces/interfaces";
import { QuizWorker } from "./quiz_worker";

//create router
const quizRouter = express.Router();

/**
 * Logs start of endpoint logic
 */
quizRouter.use((req, res, next) => {
  //log date and time, method, and url for each request
  const date = Date.now();
  console.log(
    `>> ${new Date(date).toLocaleString()} ${req.method} ${req.baseUrl}${
      req.url
    } `
  );
  next();
});

/**
 * Tests if router endpoint can be reached
 */
quizRouter.get("/test", (req, res, next) => {
  res.json({ message: "Quiz router test::working!" });
  next();
});

/**
 * Responds with an error
 */
quizRouter.get("/error", (req, res, next) => {
  try {
    throw new Error("this is an error");
  } catch (err) {
    errorHandler(req, res, err);
  }
  next();
});

/**
 * GET all quizzes
 */
quizRouter.get("/", async (req, res, next) => {
  try {
    const quizWorker: QuizWorker = new QuizWorker();
    const quizzes: IQuiz[] = await quizWorker.listQuizzes();
    res.json(quizzes);
    next();
  } catch (err) {
    errorHandler(req, res, err);
  }
});

/**
 * Add a new quiz
 */
quizRouter.post("/", async (req, res, next) => {
  try {
    const quizWorker: QuizWorker = new QuizWorker();
    const quiz: IQuiz = await quizWorker.addQuiz(req.body);
    res.json(quiz);
    next();
  } catch (err) {
    errorHandler(req, res, err);
  }
});

/**
 * Logs end of endpoint logic
 */
quizRouter.use((req, res, next) => {
  //log end of each request
  console.log(`<<END ${req.method} ${req.baseUrl}${req.url} `);
  next();
});

//Error handling
const errorHandler = (req: Request, res: Response, err: any) => {
  console.log(`ERROR:: ${req.method} ${req.baseUrl}${req.url} - ${err}`);
  res.status(err.status || 500).send({ error: err.message });
};

//export router
module.exports = quizRouter;
