import PageHelmet from "../util/PageHelmet";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { FormField } from "../components/form/FormField";
import { TextInput } from "../components/form/TextInput";
import { PasswordInput } from "../components/form/PasswordInput";
import { IconName } from "../components/Icon";

const Login: React.FC<{}> = () => {
  return (
    <div className="login">
      <PageHelmet />

      <div className="hero tablet-desktop-only">
        <div className="slogan">
          <p>Changing aspirations</p>
          <p>into realities</p>
        </div>
      </div>
      <div className="container">
        <main>
          <BaytreeMentorPortalLogo className="logo" />
          <form className="form">
            <header className="header">
              <h1 className="page-title no-margin-bottom">Log In</h1>
            </header>
            <FormField labelText="Email">
              <TextInput
                type="email"
                leftIconName={IconName.user}
                placeholderText="Email"
              />
            </FormField>
            <FormField labelText="Password">
              <PasswordInput />
            </FormField>
            <div className="actions">
              <button type="submit" className="btn">
                Log In
              </button>
              <p>Forgot Password?</p>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
