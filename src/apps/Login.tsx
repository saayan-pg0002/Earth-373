import PageHelmet from "../util/PageHelmet";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { FormField } from "../components/form/FormField";
import { TextInput } from "../components/form/TextInput";
import { PasswordInput } from "../components/form/PasswordInput";
import { IconName } from "../components/Icon";
import { sendRequest, RequestType, Endpoints } from "../util/request";
import { dispatch } from "../util/store";
import { ActionType } from "../util/state/actions";

const Login: React.FC<{}> = () => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email: string = target.email.value;
    const password: string = target.password.value;

    sendRequest(RequestType.POST, Endpoints.login, { email, password }).then(
      ({ data }) =>
        dispatch({ type: ActionType.STORE_TOKEN, payload: data.token })
    );
  };

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
          <form onSubmit={onSubmit} className="form">
            <header className="header">
              <h1 className="page-title no-margin-bottom">Log In</h1>
            </header>
            <FormField labelText="Email">
              <TextInput
                name="email"
                type="email"
                leftIconName={IconName.user}
                placeholderText="Email"
              />
            </FormField>
            <FormField labelText="Password">
              <PasswordInput name="password" />
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
