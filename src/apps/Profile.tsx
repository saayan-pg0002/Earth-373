import { PasswordInput } from '../components/form/PasswordInput';
import { TextInput } from '../components/form/TextInput';
import { IconName } from '../components/Icon';

const Profile: React.FC<{}> = () => {
  return (
    <main className='profile'>
      <div className='container'>
        <h1 className='page-title'>Settings</h1>
        <h3 className='sub-title'>Profile Information</h3>
        <TextInput
          type='email'
          placeholderText='pambeesly@gmail.com'
          leftIconName={IconName.user}
        ></TextInput>
        <TextInput
          type='name'
          placeholderText='Pamela Halbert'
          leftIconName={IconName.smiley}
        ></TextInput>
        <PasswordInput />
      </div>
    </main>
  );
};

export default Profile;
