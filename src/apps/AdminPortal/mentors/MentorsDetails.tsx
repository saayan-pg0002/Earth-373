import { MentorHeader } from "../../../components/AdminPortal_Mentors/MentorHeader";
import TableComponent from "../../../components/AdminPortal_Mentors/TableView";
import Link from "../../../components/Link";
import PageHelmet from "../../../util/PageHelmet";
import { Paths } from "../../../util/routes";

const MenteeTableHeading: string[] = ["Id", "Name", "Start Date", "End Date"];

export interface MenteeTableBodyProps {
  id: number;
  name: string;
  startDate: string;
  endDate?: string;
}

const MenteeList: MenteeTableBodyProps[] = [
  {
    id: 1,
    name: "Melissa Nguyen",
    startDate: "Sept 25, 2021"
  },
  {
    id: 2,
    name: "Dianne Russell",
    startDate: "Sept 25, 2021"
  },
  {
    id: 3,
    name: "Tessa Pampangan",
    startDate: "Jan 01, 2020",
    endDate: "Mar 30, 2021"
  },
  {
    id: 4,
    name: "Tessa Pampangan",
    startDate: "Jan 01, 2020"
  }
];

function createMentorListRows(MenteeList: MenteeTableBodyProps[]) {
  return MenteeList.map((mentee) => {
    const { id, endDate, ...items } = mentee;
    return { id, items: [...Object.values(items), endDate ?? "..."] };
  });
}

const MentorsDetails: React.FC<{}> = () => {
  const mentorName = "Wendy Stuart";
  const mentorType = "IntoSchool Mentor";
  const status = "Active";
  const email = "wendy123@gmail.com";
  const phoneNumber = "234-808-6043";
  return (
    <main className="container">
      <PageHelmet title="Mentors Details" isAdminPortal="true"/>

      <MentorHeader
        mentorName={mentorName}
        mentorType={mentorType}
        status={status}
        email={email}
        phoneNumber={phoneNumber}
      />
      <div className="mentee-profile-header">
        <div className="heading">
          <h1 className="widget-title">Mentees</h1>
          <div>
            <Link to={Paths.mentorPairMentee}>
              <button type="button" className="btn-small">
                Pair New Mentee
              </button>
            </Link>

            <button type="button" className="btn-small white">
              Export
            </button>
          </div>
        </div>
      </div>

      <TableComponent
        heading={MenteeTableHeading}
        body={createMentorListRows(MenteeList)}
      />
    </main>
  );
};

export default MentorsDetails;
