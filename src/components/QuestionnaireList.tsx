import { ReactComponent as BaytreeTreeGrey } from "../assets/images/baytree-tree-grey.svg";
import { QuestionnaireItem, QuestionnaireItemProps } from "./QuestionnaireItem";

interface QuestionnaireListProps {
  quationnaires: QuestionnaireItemProps[];
}

export const QuestionnaireList: React.FC<QuestionnaireListProps> = ({
  quationnaires,
}) => {
  const isEmpty: boolean = quationnaires.length === 0;
  return (
    <div className={`mentee-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">
            You Currently haven't completed any Questionnaire
          </h1>
          <p>Contact an admin to get matched!</p>
        </div>
      ) : (
        quationnaires.map(
          ({ month, year }: QuestionnaireItemProps) => (
            <QuestionnaireItem month={month} year={year} />
          )
        )
      )}
    </div>
  );
};
