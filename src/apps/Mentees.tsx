import { MenteeItem, MenteeItemProps } from "../components/MenteeItem";

const Mentees: React.FC<{}> = () => {
  return (
    <main className="container">
      <h1 className="page-title">Mentees</h1>
      <MenteeItem
        menteeName="James Phan"
        clockInTime={(() => {
          const date: Date = new Date();
          date.setHours(19, 0);
          return date;
        })()}
        clockOutTime={(() => {
          const date: Date = new Date();
          date.setHours(20, 0);
          return date;
        })()}
        dayOfWeek={(() => {
          const date: Date = new Date();
          date.setUTCDate(5);
          return date;
        })()}
      />
    </main>
  );
};

export default Mentees;
