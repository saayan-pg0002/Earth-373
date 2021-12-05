import TableComponent from "../../../components/AdminPortal_Mentors/TableView";
import PageHelmet from "../../../util/PageHelmet";

const MentorTableHeading: string[] = [
  "Id",
  "Name",
  "Type",
  "Email",
  "Phone Number",
  "Status"
];

export interface MentorTableBodyProps {
  id: number;
  name: string;
  mentorType: string;
  email: string;
  phoneNumber: string;
  status: string;
}

const MentorList: MentorTableBodyProps[] = [
  {
    id: 1,
    name: "Wendy Stuart",
    mentorType: "IntoSchool",
    email: "wendy.389@gmail.com",
    phoneNumber: "234-808-6043",
    status: "Active"
  },
  {
    id: 2,
    name: "Emilia Ethel",
    mentorType: "Youth Mentor",
    email: "Emilia.389@gmail.com",
    phoneNumber: "234-808-6012",
    status: "Active"
  },
  {
    id: 3,
    name: "Mayuko Hitoro",
    mentorType: "Women Mentor",
    email: "Mayuko.389@gmail.com",
    phoneNumber: "234-808-6056",
    status: "Active"
  }
];

function createMentorListRows(MentorList: MentorTableBodyProps[]) {
  return MentorList.map((mentor) => {
    const { id, ...items } = mentor;
    return { id, items: Object.values(items) };
  });
}

const Mentors: React.FC<{}> = () => {
  return (
    <main className="container">
      <PageHelmet title="Mentors" isAdminPortal="true"/>
      <div className="mentee-profile-header">
        <div className="heading">
          <h1 className="page-title">Mentors</h1>
          <button type="button" className="btn-small">
            Edit Mentor
          </button>
        </div>
      </div>

      <TableComponent
        heading={MentorTableHeading}
        body={createMentorListRows(MentorList)}
      />
    </main>
  );
};

export default Mentors;
