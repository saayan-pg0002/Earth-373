import { FormField } from "../components/form/FormField";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { TabletDesktopView } from "../components/TabletDesktopView";
import PageHelmet from "../util/PageHelmet";
import { PasswordInput } from "../components/form/PasswordInput";

const ResetPassword: React.FC<{}> = () => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      password: { value: string };
    };

    const password: string = target.password.value;

    console.log(password);
  };
  return (
    <div className="login">
      <PageHelmet title="Reset Password"/>

      <TabletDesktopView />

      <div className="container">
        <main>
          <BaytreeMentorPortalLogo className="logo" />
          <form onSubmit={onSubmit} className="form">
            <header className="header">
              <h1 className="page-title no-margin-bottom">Reset Password</h1>
              <p className="page-title text-center">
                Enter your new password below
              </p>
            </header>
            <FormField labelText="Password">
              <PasswordInput name="password" />
            </FormField>
            <div className="actions">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ResetPassword;
