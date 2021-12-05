import { FormField } from "../components/form/FormField";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { TabletDesktopView } from "../components/TabletDesktopView";
import PageHelmet from "../util/PageHelmet";
import { PasswordInput } from "../components/form/PasswordInput";
import { MessageToastType, showMessageToast } from "../components/MessageToast";
import { Paths, routeTo } from "../util/routes";
import { useParams } from "react-router";
import { Endpoints, RequestType, sendRequest } from "../util/request";

const ResetPassword: React.FC<{}> = () => {
  const jwt: { token: string } = useParams();
  const token: string = jwt["token"];

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      password: { value: string };
      confirmPassword: { value: string };
    };

    if (target.password.value === target.confirmPassword.value) {
      const resetLink: string = token;
      const newPass: string = target.password.value;
      sendRequest(RequestType.POST, Endpoints.resetPassword, {
        resetLink,
        newPass
      })
        .then(({ data }) => {
          const message: string = data?.["message"];
          showMessageToast(MessageToastType.INFO, message);
          routeTo(Paths.login);
        })
        .catch((err) =>
          showMessageToast(MessageToastType.ERROR, "Unable to send reset email")
        );
    } else {
      showMessageToast(
        MessageToastType.ERROR,
        "Password Unmatched, Please re-enter"
      );
    }
  };

  return (
    <div className="login">
      <PageHelmet title="Reset Password" />

      <TabletDesktopView />

      <div className="container">
        <main>
          <BaytreeMentorPortalLogo className="logo" />
          <form onSubmit={onSubmit} className="form">
            <header>
              <h1 className="page-title no-margin-bottom">Reset Password</h1>
              <p className="page-title text-center">
                Enter your new password below
              </p>
            </header>
            <FormField labelText="Password">
              <PasswordInput name="password" />
            </FormField>
            <FormField labelText="Re-Enter New Password">
              <PasswordInput name="confirmPassword" />
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
