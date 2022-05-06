import Nedb from "nedb";
import * as path from "path";
import { IQuiz } from "./interfaces/interfaces";

export class QuizWorker {
  private _db: Nedb;

  constructor() {
    this._db = new Nedb({
      filename: path.join(__dirname, "quiz.db"),
      autoload: true,
    });
  }

  public addQuiz(quiz: IQuiz): Promise<IQuiz> {
    console.log("IN QuizWorker.addQuiz()", quiz);

    return new Promise<IQuiz>((resolveHandler, rejectHandler) => {
      this._db.insert<IQuiz>(quiz, (err: Error | null, newQuiz: IQuiz) => {
        if (err) {
          console.log("ERROR in QuizWorker.addQuiz(): ", err);
          rejectHandler(err);
        } else {
          console.log("SUCCESS in QuizWorker.addQuiz(): ", newQuiz);
          resolveHandler(newQuiz);
        }
      });
    });
  }

  public listQuizzes(): Promise<IQuiz[]> {
    console.log("in QuizWorker.listQuizzes()");

    return new Promise((resolveHandler, rejectHandler) => {
      this._db.find({}, (err: Error, quizzes: IQuiz[]) => {
        if (err) {
          console.log("ERROR in QuizWorker.listQuizzes(): Error", err);
          rejectHandler(err);
        } else {
          console.log(
            `SUCCESS in QuizWorker.listQuizzes(). Retrieved ${quizzes.length} quizzes.`
          );
          resolveHandler(quizzes);
        }
      });
    });
  }

  /**
   *
   * @param id
   * @returns null if no quiz with such id exists in the database
   */
  public getQuizById(id: string): Promise<IQuiz> {
    console.log(`in QuizWorker.getQuizById(${id})`);

    return new Promise((resolveHandler, rejectHandler) => {
      this._db.findOne({ _id: id }, (err: Error | null, quiz: IQuiz) => {
        if (err) {
          console.log(`ERROR in QuizWorker.getQuizById(${id}): Error`, err);
          rejectHandler(err);
        } else {
          if (quiz) console.log(`SUCCESS in QuizWorker.getQuizById(${id}).`);
          resolveHandler(quiz);
        }
      });
    });
  }
}
