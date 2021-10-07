import { MenteeList } from "../components/MenteeList";
import { MenteeItem, MenteeItemProps } from "../components/MenteeItem";

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
      <div className="container">
        <h1 className="page-title">Mentees</h1>
        <MenteeList mentees={menteeList} />
      </div>
    </main>
  );
};

export default Mentees;
