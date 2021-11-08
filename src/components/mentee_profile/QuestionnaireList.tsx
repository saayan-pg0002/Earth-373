import { ReactComponent as BaytreeTreeGrey } from "../../assets/images/baytree-tree-grey.svg";
import { QuestionnaireItem, QuestionnaireItemProps } from "./QuestionnaireItem";

interface QuestionnaireListProps {
  questionnaires: QuestionnaireItemProps[];
}

export const QuestionnaireList: React.FC<QuestionnaireListProps> = ({
  questionnaires,
}) => {
  const isEmpty: boolean = questionnaires.length === 0;
  return (
    <div className={`mentee-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">
            You Currently haven't completed any Questionnaires
          </h1>
          <p>Click the + to fill out a new questionnaire</p>
        </div>
      ) : (
        questionnaires.map(
          ({ month, year }: QuestionnaireItemProps, index: number) => (
            <QuestionnaireItem key={index} month={month} year={year} />
          )
        )
      )}
    </div>
  );
};
