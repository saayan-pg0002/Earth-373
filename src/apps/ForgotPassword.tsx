import { FormField } from "../components/form/FormField";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { TextInput } from "../components/form/TextInput";
import { IconName } from "../components/Icon";
import { TabletDesktopView } from "../components/TabletDesktopView";
import PageHelmet from "../util/PageHelmet";

const ForgotPassword: React.FC<{}> = () => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    const email: string = target.email.value;

    console.log(email);
  };
  return (
    <div className="login">
      <PageHelmet title="Forgot Password"/>

      <TabletDesktopView />

      <div className="container">
        <main>
          <BaytreeMentorPortalLogo className="logo" />
          <form onSubmit={onSubmit} className="form">
            <header className="header">
              <h1 className="page-title no-margin-bottom">Forgot Password</h1>
              <p className="page-title text-center">
                Enter your email and we will share a link to create a new
                password
              </p>
            </header>
            <FormField labelText="Email">
              <TextInput
                name="email"
                type="email"
                leftIconName={IconName.user}
                placeholderText="Email"
              />
            </FormField>
            <div className="actions">
              <button type="submit" className="btn">
                Send Link
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ForgotPassword;
