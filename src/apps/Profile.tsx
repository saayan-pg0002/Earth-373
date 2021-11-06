import PageHelmet from "../util/PageHelmet";
import { FormField } from "../components/form/FormField";
import { PasswordInput } from "../components/form/PasswordInput";
import { IconName } from "../components/Icon";
import { TextInput } from "../components/form/TextInput";
import { Link } from "react-router-dom";
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
          <FormField labelText="Mentor Type">
            <DropdownMenu options={mentorTypes} />
          </FormField>
          <FormField labelText="Email">
            <TextInput
              leftIconName={IconName.user}
              placeholderText="Email"
              defaultValue="wendy.389@gmail.com"
            ></TextInput>
          </FormField>
          <FormField labelText="Name">
            <TextInput
              placeholderText="Name"
              leftIconName={IconName.smiley}
              defaultValue="Wendy Stuart"
            ></TextInput>
          </FormField>
          <FormField labelText="Password">
            <PasswordInput />
          </FormField>
          <div className="actions">
            <button type="button" className="btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
