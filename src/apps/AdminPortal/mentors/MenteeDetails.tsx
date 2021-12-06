import { Route, Router, useParams } from "react-router-dom";
import { MenteeHeader } from "../../../components/AdminPortal_Mentors/MenteeHeader";
import MenteeGoals from "../../../components/mentee_profile/MenteeGoals";
// import { MenteeSessionList } from "../../../components/mentee_profile/MenteeSessionList";
import { QuestionnaireList } from "../../../components/mentee_profile/QuestionnaireList";
import { TabNav, TabNavItemProps } from "../../../components/TabNav";
import PageHelmet from "../../../util/PageHelmet";
import { history, Paths } from "../../../util/routes";
import { questionnaireList } from "../../MenteeProfile";

const MenteeDetails: React.FC<{}> = () => {
  const menteeName = "Melissa Nguyen";
  const startDate = "January 1, 2021";
  const birthday = "January 1, 2021";

  const routes: TabNavItemProps[] = [
    {
      label: "Goals",
      to: Paths.adminViewMenteeProfileGoals
    },
    {
      label: "Sessions",
      to: Paths.adminViewMenteeProfileSessions
    },
    {
      label: "Questionnaires",
      to: Paths.adminViewMenteeProfileQuestionnaires
    }
  ];
  const { association_id } = useParams<{ association_id: string }>();

  return (
    <main className="container">
      <PageHelmet title="Mentee Details" isAdminPortal="true" />
      <MenteeHeader
        menteeName={menteeName}
        startDate={startDate}
        birthday={birthday}
      />
      <TabNav routes={routes} />

      <Router history={history}>
        <Route path={Paths.adminViewMenteeProfileGoals}>
          <MenteeGoals
            menteeName={menteeName}
            startDate={startDate}
            birthday={birthday}
          />
        </Route>
        {/* <Route path={Paths.adminViewMenteeProfileSessions}>
          <MenteeSessionList sessions={sessionHistoryList} />
        </Route> */}
        <Route path={Paths.adminViewMenteeProfileQuestionnaires}>
          <QuestionnaireList
            questionnaires={questionnaireList}
            association_id={association_id}
          />
        </Route>
      </Router>
    </main>
  );
};

export default MenteeDetails;
