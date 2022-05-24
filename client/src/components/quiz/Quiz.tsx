import React from "react";
import {
  IQuiz,
  QuizCategory,
  QuizLevel,
} from "../../interfaces/EntityInterfaces";

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
      <div>
        <span>
          <b>{quiz.title}</b>
        </span>
        <br />
        <span>{quiz.desc}</span>
        <br />
        <span>{" Level: " + levelToString(quiz.level)}</span>
        <span>{" Category: " + categoryToString(quiz.category)}</span>
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
