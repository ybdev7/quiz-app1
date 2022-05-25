import React from "react";
import {
  IQuiz,
  QuizCategory,
  QuizLevel,
} from "../../interfaces/EntityInterfaces";
import IconButton, { IconPosition, IconsList } from "../buttons/IconButton";

interface IQuizProps {
  quiz: IQuiz;
}
/**
 * React.memo used here to guarantee that the quiz ui does not need to be re-rendered if the quiz is already part of the list
 */
const Quiz = React.memo(({ quiz }: IQuizProps) => {
  console.log(`Actually rendering quiz id=${quiz._id}`);
  return (
    <>
      <div className="quiz-div">
        <span className="font-bold text-slate-900">{quiz.title}</span>
        <br />
        <span className="font-light text-slate-700">{quiz.desc}</span>
        <br />
        <span className="font-light text-slate-700">
          {" Level: " + levelToString(quiz.level)}
        </span>
        <br />
        <span className="font-light text-slate-700">
          {" Category: " + categoryToString(quiz.category)}
        </span>
        <div className="mt-3 mb-0">
          <IconButton icon={IconsList.Delete} />
          <IconButton icon={IconsList.Edit} />
          <IconButton
            icon={IconsList.ArrowRight}
            iconPos={IconPosition.Right}
            text="Take Quiz"
          />
        </div>
      </div>
    </>
  );
});

export default Quiz;
function levelToString(level: QuizLevel) {
  switch (level) {
    case QuizLevel.Easy:
      return "Easy";
    case QuizLevel.Medium:
      return "Medium";
    case QuizLevel.Advanced:
      return "Advanced";
    case QuizLevel.Expert:
      return "Expoert";
  }
}
function categoryToString(category: QuizCategory) {
  switch (category) {
    case QuizCategory.Chemistry:
      return "Chemistry";
    case QuizCategory.Math:
      return "Math";
    case QuizCategory.History:
      return "History";
    case QuizCategory.French:
      return "French";
  }
}
