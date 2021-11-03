import PageHelmet from "../util/PageHelmet";
import { FormField } from "../components/form/FormField";
import { PasswordInput } from "../components/form/PasswordInput";
import { RenderAttributes } from "../components/form/RenderAttributes";
import { IconName } from "../components/Icon";
import { TextInput } from "../components/form/TextInput";
import { Link } from "react-router-dom";
import { Paths } from "../util/routes";

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
            <RenderAttributes attribute="IntoSchool Mentor" />
          </FormField>
          <FormField labelText="Email">
            <TextInput
              leftIconName={IconName.user}
              placeholderText="pambeesly@gmail.com"
            ></TextInput>
          </FormField>
          <FormField labelText="Name">
            <TextInput
              placeholderText="Pamela Halbert"
              leftIconName={IconName.smiley}
            ></TextInput>
          </FormField>
          <FormField labelText="Password">
            <PasswordInput value="admin123" />
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
