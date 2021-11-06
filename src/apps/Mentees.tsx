import PageHelmet from "../util/PageHelmet";
import { MenteeList } from "../components/MenteeList";
import { MenteeItemProps } from "../components/MenteeItem";
import { AvatarHeader } from "../components/AvatarHeader";

const menteeList: MenteeItemProps[] = [
  {
    menteeName: "Melisa Nguyen",
    clockInTime: (() => {
      const date: Date = new Date();
      date.setHours(9, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date: Date = new Date();
      date.setHours(10, 0);
      return date;
    })(),
    dayOfWeek: (() => {
      const date: Date = new Date();
      date.setUTCDate(5);
      return date;
    })(),
  },
  {
    menteeName: "Dianne Russell",
    clockInTime: (() => {
      const date: Date = new Date();
      date.setHours(19, 0);
      return date;
    })(),
    clockOutTime: (() => {
      const date: Date = new Date();
      date.setHours(20, 0);
      return date;
    })(),
    dayOfWeek: (() => {
      const date: Date = new Date();
      date.setUTCDate(5);
      return date;
    })(),
  },
];

const Mentees: React.FC<{}> = () => {
  return (
    <main className="mentees">
      <PageHelmet title="Mentees" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Mentees</h1>
          <AvatarHeader name="Wendy Evans" />
        </div>{" "}
        <MenteeList mentees={menteeList} />
      </div>
    </main>
  );
};

export default Mentees;
