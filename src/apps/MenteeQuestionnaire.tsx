import { ContainedIcon, IconColors, IconName } from "../components/Icon";
import { MenteeProfileHeader } from "../components/MenteeProfileHeader";
import { QuestionnaireItemProps } from "../components/QuestionnaireItem";
import { QuestionnaireList } from "../components/QuestionnaireList";
import PageHelmet from "../util/PageHelmet";
import { MenteeInfoProps } from "./MenteeGoals";

const questionnaireList: QuestionnaireItemProps[] = [
  {
    month: "September",
    year: "2021",
  },
  {
    month: "August",
    year: "2021",
  },
  {
    month: "July",
    year: "2021",
  },
];

const MenteeQuestionnaire: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
}) => {
  menteeName = "Melissa Nguyen";
  startDate = "September 2021";
  birthday = "Aug 2, 2010";

  const AddQuestionnare = () => {};
  return (
    <main className="container">
      <PageHelmet title="Mentee Questionnaire" />
      <MenteeProfileHeader
        menteeName={menteeName}
        startDate={startDate}
        birthday={birthday}
      />
      {/* TODO: tab component*/}

      <div>
        <div className="subtext statusTag ">
          Complete
          <span onClick={AddQuestionnare}>
            <ContainedIcon
              name={IconName.plus}
              color={IconColors.black}
              backgroundColor={IconColors.white}
            ></ContainedIcon>
          </span>
        </div>
      </div>

      <div>
        <QuestionnaireList quationnaires={questionnaireList} />
      </div>
    </main>
  );
};

export default MenteeQuestionnaire;
