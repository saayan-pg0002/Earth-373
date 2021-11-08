import { MenteeProfileHeader } from "../components/mentee_profile/MenteeProfileHeader";
import { ItemProps } from "../components/SessionItem";
import { SessionHistoryList } from "../components/mentee_profile/SessionHistoryList";
import { getFormattedMonthDateyearString } from "../util/date";
import PageHelmet from "../util/PageHelmet";
import { MenteeInfoProps } from "./MenteeGoals";

const sessionHistoryList: ItemProps[] = [
  {
    value: getFormattedMonthDateyearString(new Date()),
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
  {
    value: getFormattedMonthDateyearString(new Date()),
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
  {
    value: getFormattedMonthDateyearString(new Date()),
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

const MenteeSessionHistory: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
}) => {
  menteeName = "Melissa Nguyen";
  startDate = "September 2021";
  birthday = "Aug 2, 2010";

  return (
    <main className="container">
      <PageHelmet title="Mentee Session History" />

      <MenteeProfileHeader
        menteeName={menteeName}
        startDate={startDate}
        birthday={birthday}
      />
      {/* TODO: tab component*/}

      <SessionHistoryList sessions={sessionHistoryList} />
    </main>
  );
};

export default MenteeSessionHistory;
