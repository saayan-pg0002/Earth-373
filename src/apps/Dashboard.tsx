import PageHelmet from "../util/PageHelmet";
import { SessionList } from "../components/SessionList";
import { WeekScheduleCalendar } from "../components/WeekScheduleCalendar";
import { ItemProps } from "../components/SessionItem";

const sessionList: ItemProps[] = [
  {
    value: "Melissa Nguyen",
    clockInTime: (() => {
      const date = new Date();
      date.setHours(19, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date = new Date();
      date.setHours(20, 0);
      return date;
    })(),
  },
  {
    value: "Melissa Nguyen",
    clockInTime: (() => {
      const date = new Date();
      date.setHours(20, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date = new Date();
      date.setHours(21, 0);
      return date;
    })(),
  },
  {
    value: "Melissa Nguyen",
    clockInTime: (() => {
      const date = new Date();
      date.setHours(21, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date = new Date();
      date.setHours(22, 0);
      return date;
    })(),
  },
];

const Dashboard: React.FC = () => {
  return (
    <main className="dashboard">
      <PageHelmet title="Dashboard" />

      <div className="container">
        <h1 className="page-title">Hi, Wendy!</h1>
        <WeekScheduleCalendar />
        <SessionList sessions={sessionList} />
      </div>
    </main>
  );
};

export default Dashboard;
