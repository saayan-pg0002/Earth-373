import PageHelmet from "../util/PageHelmet";
import { AvatarHeader } from "../components/AvatarHeader";
import { FC, useEffect, useState } from "react";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { showMessageToast, MessageToastType } from "../components/MessageToast";
import { Icon, IconName } from "../components/Icon";
import { DashboardPieChart } from "../components/DashboardPieChart";

interface StatsInterface {
  completed_goals: number;
  cancelled_sessions: number;
  total_sessions: number;
  total_goals: number;
}

const Dashboard: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [completedGoals, setCompletedGoals] = useState<number>();
  const [cancelledSessions, setCancelledSessions] = useState<number>();
  const [totalSessions, setTotalSessions] = useState<number>();
  const [totalGoals, setTotalGoals] = useState<number>();
  const [goalCompletionPercentage, setGoalCompletionPercentage] =
    useState<number>(0);

  useEffect(() => {
    sendRequest(RequestType.GET, { endpoint: Endpoints.me })
      .then(({ data }) => {
        const { first_name } = data;
        setFirstName(first_name);
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to load user name")
      );

    sendRequest(RequestType.GET, { endpoint: Endpoints.stats })
      .then(({ data }) => {
        const {
          completed_goals = 0,
          cancelled_sessions = 0,
          total_sessions = 0,
          total_goals = 0
        }: StatsInterface = data;

        setCompletedGoals(completed_goals);
        setCancelledSessions(cancelled_sessions);
        setTotalSessions(total_sessions);
        setTotalGoals(total_goals);

        if (completedGoals && totalGoals) {
          setGoalCompletionPercentage(Math.round(completedGoals / totalGoals));
        }
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to load dashboard")
      );
  }, []);

  return (
    <main className="dashboard">
      <PageHelmet title="Dashboard" />

      <div className="container">
        <div className="header">
          {firstName && <h1 className="page-title">Hi, {firstName}!</h1>}
          <AvatarHeader />
        </div>
        {totalSessions !== undefined && cancelledSessions !== undefined && (
          <div className="stats-grid">
            <StatWidget
              label="Sessions"
              iconName={IconName.hashtag}
              value={totalSessions}
            />

            <StatWidget
              label="Cancelled"
              iconName={IconName.x}
              value={cancelledSessions}
            />

            <div className="goal-widget">
              <p className="semi-bold">{`${completedGoals} / ${totalGoals}`}</p>
              <progress value={completedGoals} max={totalGoals}>
                {`${goalCompletionPercentage}%`}
              </progress>
              <p className="subtext">Goals Complete</p>
            </div>
            <div className="pie-chart">
              <DashboardPieChart
                totalSessions={totalSessions}
                cancelledSessions={cancelledSessions}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

interface StatWidgetProps {
  label: string;
  iconName: IconName;
  value: number;
}

const StatWidget: FC<StatWidgetProps> = ({ label, iconName, value }) => {
  return (
    <div className="stat-widget">
      <Icon name={iconName} />
      <div className="body">
        <p className="semi-bold">{value}</p>
        <p className="subtext bold">{label}</p>
      </div>
    </div>
  );
};

export default Dashboard;
