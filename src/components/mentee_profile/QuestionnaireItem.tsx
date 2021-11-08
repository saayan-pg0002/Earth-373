export interface QuestionnaireItemProps {
  month: string;
  year: string;
}

export const QuestionnaireItem: React.FC<QuestionnaireItemProps> = ({
  month,
  year,
}) => {
  return (
    <div className="mentee-item">
      <p className="semi-bold">
        {month} {year}
      </p>
    </div>
  );
};
