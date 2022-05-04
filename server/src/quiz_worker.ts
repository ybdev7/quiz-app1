import Nedb from "nedb";
import * as path from "path";
import { IEntity, IQuiz } from "./interfaces/interfaces";

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

    return new Promise<IQuiz>((inResolve, inReject) => {
      this._db.insert<IQuiz>(
        quiz,
        (inError: Error | null, inNewQuiz: IQuiz) => {
          if (inError) {
            console.log("ERROR in QuizWorker.addQuiz(): ", inError);
            inReject(inError);
          } else {
            console.log("SUCCESS in QuizWorker.addQuiz(): ", inNewQuiz);
            inResolve(inNewQuiz);
          }
        }
      );
    });
  }

  public listQuizzes(): Promise<IQuiz[]> {
    console.log("in QuizWorker.listQuizzes()");

    return new Promise((inResolve, inReject) => {
      this._db.find({}, (inError: Error, quizzes: IQuiz[]) => {
        if (inError) {
          console.log("ERROR in QuizWorker.listQuizzes(): Error", inError);
          inReject(inError);
        } else {
          console.log(
            `SUCCESS in QuizWorker.listQuizzes(). Retrieved ${quizzes.length} quizzes.`
          );
          inResolve(quizzes);
        }
      });
    });
  }
}
