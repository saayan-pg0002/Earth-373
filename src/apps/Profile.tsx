import PageHelmet from "../util/PageHelmet";
import { FormField } from "../components/form/FormField";
import { PasswordInput } from "../components/form/PasswordInput";
import { RenderAttributes } from "../components/form/RenderAttributes";
import { IconName } from "../components/Icon";

const Profile: React.FC<{}> = () => {
  return (
    <main className="profile">
      <PageHelmet title="Profile" />

      <div className="container">
        <h1 className="page-title">Settings</h1>
        <h2 className="h2">Profile Information</h2>
        <form className="form">
          <FormField labelText="Email">
            <RenderAttributes
              leftIconName={IconName.user}
              attribute="pambeesly@gmail.com"
            ></RenderAttributes>
          </FormField>
          <FormField labelText="Name">
            <RenderAttributes
              attribute="Pamela Halbert"
              leftIconName={IconName.smiley}
            ></RenderAttributes>
          </FormField>
          <FormField labelText="Password">
            <PasswordInput value="admin123" />
          </FormField>
          <FormField labelText="Mentor Type">
            <RenderAttributes attribute="IntoSchool Mentor" />
          </FormField>
        </form>
      </div>
    </main>
  );
};

export default Profile;
