import PageHelmet from "../util/PageHelmet";
import { MenteeList } from "../components/MenteeList";
import { MenteeItemProps } from "../components/MenteeItem";

const menteeList: MenteeItemProps[] = [
  {
    menteeName: "Melisa Nguyen",
    startDate: new Date("8/8/2018"),
  },
  {
    menteeName: "Dianne Russell",
    startDate: new Date("1/6/2020"),
  },
];

const pastMenteeList: MenteeItemProps[] = [
  {
    menteeName: "Tessa Pampangan",
    startDate: new Date("1/20/2020"),
    endDate: new Date("3/12/2020")
  },
  {
    menteeName: "Lila Singh",
    startDate: new Date("1/4/2018"),
    endDate: new Date("1/6/2018"),
  },
];

const Mentees: React.FC<{}> = () => {
  return (
    <main className="mentees">
      <PageHelmet title="Mentees" />

      <div className="container">
        <h1 className="page-title">Mentees</h1>
        <MenteeList mentees={menteeList} />
        <p className="subtext">Past Mentees</p>
        <MenteeList mentees={pastMenteeList} />
      </div>
    </main>
  );
};

export default Mentees;
