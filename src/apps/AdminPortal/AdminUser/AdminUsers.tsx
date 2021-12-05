import TableComponent from "../../../components/AdminPortal_Mentors/TableView";
import Link from "../../../components/Link";
import PageHelmet from "../../../util/PageHelmet";
import { Paths } from "../../../util/routes";

const AdminUsersTableHeading: string[] = [
  "Id",
  "Name",
  "Email",
  "Phone Number",
  "Status"
];

export interface AdminUsersTableBodyProps {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
}

const AdminUsersList: AdminUsersTableBodyProps[] = [
  {
    id: 1,
    name: "Federica",
    email: "federica@baytreecentre.org",
    phoneNumber: "234-808-6090",
    status: "Active"
  },
  {
    id: 2,
    name: "Team Earth",
    email: "teamearth@sfu.ca",
    phoneNumber: "234-808-6006",
    status: "Active"
  },
  {
    id: 3,
    name: " Juliette Céleste",
    email: "jceleste@gmail.com",
    phoneNumber: "234-808-6089",
    status: "Active"
  }
];

function createAdminUsersListRows(AdminList: AdminUsersTableBodyProps[]) {
  return AdminList.map((admin) => {
    const { id, ...items } = admin;
    return { id, items: Object.values(items) };
  });
}

const AdminUsers: React.FC<{}> = () => {
  return (
    <main className="container">
      <PageHelmet title="Admin Users" isAdminPortal="true" />
      <div className="mentee-profile-header">
        <div className="heading">
          <h1 className="page-title">Admin Users</h1>
          <div>
            <Link to={Paths.createNewAdmin}>
              <button type="button" className="btn-small">
                Create New Admin User
              </button>
            </Link>
            <button type="button" className="btn-small white">
              Export
            </button>
          </div>
        </div>
      </div>

      <TableComponent
        heading={AdminUsersTableHeading}
        body={createAdminUsersListRows(AdminUsersList)}
      />
    </main>
  );
};

export default AdminUsers;
