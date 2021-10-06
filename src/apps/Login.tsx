import { ReactComponent as BaytreeMentorPortalLogo } from '../assets/images/baytree-mentor-portal-logo.svg';
import { FormField } from '../components/form/FormField';
import { TextInput } from '../components/form/TextInput';
import { PasswordInput } from '../components/form/PasswordInput';
import { IconName } from '../components/Icon';

const Login: React.FC<{}> = () => {
  return (
    <div className='login'>
      <div className='container centered'>
        <BaytreeMentorPortalLogo />
        <form className='form'>
          <header className='header'>
            <h1 className='page-title'>Log In</h1>
          </header>
          <FormField labelText='Email'>
            <TextInput
              type='email'
              leftIconName={IconName.user}
              placeholderText='Email'
            />
          </FormField>
          <FormField labelText='Password'>
            <PasswordInput />
          </FormField>
          <button type='submit' className='btn'>
            Log In
          </button>
          <p>Forgot Password?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
