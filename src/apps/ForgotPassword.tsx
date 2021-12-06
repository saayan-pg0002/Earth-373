import { FormField } from "../components/form/FormField";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { TextInput } from "../components/form/TextInput";
import { IconName } from "../components/Icon";
import { TabletDesktopView } from "../components/TabletDesktopView";
import PageHelmet from "../util/PageHelmet";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { MessageToastType, showMessageToast } from "../components/MessageToast";

const ForgotPassword: React.FC<{}> = () => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    const email: string = target.email.value;

    sendRequest(
      RequestType.POST,
      { endpoint: Endpoints.forgotPassword },
      { email }
    )
      .then(({ data }) => {
        const message: string = data?.["message"];
        showMessageToast(MessageToastType.INFO, message);
      })
      .catch((err) =>
        showMessageToast(MessageToastType.ERROR, "Unable to send reset email")
      );
  };
  return (
    <div className="login">
      <PageHelmet title="Forgot Password" />

      <TabletDesktopView />

      <div className="container">
        <main>
          <BaytreeMentorPortalLogo className="logo" />
          <form onSubmit={onSubmit} className="form">
            <header>
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
                Reset Password
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ForgotPassword;
