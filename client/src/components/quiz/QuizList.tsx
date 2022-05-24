import { QuizFiltersBuilder } from "../../factory/FilterFactory";
import { IEntity, IQuiz } from "../../interfaces/EntityInterfaces";
import { IFilterBuilder } from "../../interfaces/Interfaces";
import Quiz from "./Quiz";
import FSGenericList, {
  BaseFilterableSearchableListProps,
} from "../lists/FSList";

const QuizList = ({ ...props }: QuizFilterableSearchableListProps) => {
  return (
    <>
      <FSGenericList {...props} />
    </>
  );
};

export default QuizList;

export class QuizFilterableSearchableListProps extends BaseFilterableSearchableListProps {
  public filterBuilder: IFilterBuilder<IQuiz>;

  constructor(data: IQuiz[]) {
    super(data);
    this.data = data;

    this.filterBuilder = new QuizFiltersBuilder();
    this.filterInfo = this.filterBuilder.getFilterTerms();
    this.searchS = "";
  }

  public renderUI = (entity: IEntity) => {
    console.log(`Set to render quiz id=${entity._id}`);
    return <Quiz key={`quiz-l-${entity._id}`} quiz={entity as IQuiz} />;
  };

  public searchBy = (entity: IEntity, searchStr: string): boolean => {
    const lcsearchS = searchStr.toLocaleLowerCase();
    return (
      lcsearchS === "" ||
      (entity as IQuiz).title.toLowerCase().includes(lcsearchS) ||
      (entity as IQuiz).desc.toLowerCase().includes(lcsearchS)
    );
  };
}
