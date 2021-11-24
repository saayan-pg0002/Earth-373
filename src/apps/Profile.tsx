import PageHelmet from "../util/PageHelmet";
import { FormField } from "../components/form/FormField";
import { IconName } from "../components/Icon";
import { TextInput } from "../components/form/TextInput";
import Link from "../components/Link";
import { Paths } from "../util/routes";
import { DropdownMenu } from "../components/form/DropdownMenu";

const mentorTypes: string[] = [
  "Into School Mentor",
  "Youth Mentor",
  "Women Mentor",
];

const Profile: React.FC<{}> = () => {
  return (
    <main className="profile">
      <PageHelmet title="Profile" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Profile</h1>
          <Link to={Paths.settings} className="back-btn">
            Go Back
          </Link>
        </div>
        <form className="form">
          <p className="subtext">
            This is a view-only page. To change any fields, please contact an
            admin
          </p>
          <FormField labelText="Mentor Type">
            <DropdownMenu
              options={mentorTypes}
              initialValue={mentorTypes[0]}
              isDisabled={true}
            />
          </FormField>
          <FormField labelText="Email">
            <TextInput
              leftIconName={IconName.user}
              placeholderText="Email"
              initialValue="wendy.389@gmail.com"
              isDisabled={true}
            ></TextInput>
          </FormField>
          <FormField labelText="Name">
            <TextInput
              placeholderText="Name"
              leftIconName={IconName.smiley}
              initialValue="Wendy Stuart"
              isDisabled={true}
            ></TextInput>
          </FormField>
        </form>
      </div>
    </main>
  );
};

export default Profile;
