import { FormField } from '../components/form/FormField';
import { PasswordInput } from '../components/form/PasswordInput';
import { RenderAttributes } from '../components/form/RenderAttributes';
import { TextInput } from '../components/form/TextInput';
import { IconName } from '../components/Icon';

const Profile: React.FC<{}> = () => {
  return (
    <main className='profile'>
      <div className='container'>
        <h1 className='page-title'>Settings</h1>
        <h3 className='sub-title'>Profile Information</h3>
        <FormField labelText='E-Mail'>
          <TextInput
            type='email'
            placeholderText='pambeesly@gmail.com'
            leftIconName={IconName.user}
          ></TextInput>
        </FormField>
        <FormField labelText='Name'>
          <TextInput
            type='name'
            placeholderText='Pamela Halbert'
            leftIconName={IconName.smiley}
          ></TextInput>
        </FormField>
        <FormField labelText='Password'>
          <PasswordInput />
        </FormField>
        <FormField labelText='Mentor Type'>
          <RenderAttributes attribute='IntoSchool Mentor' />
        </FormField>
      </div>
    </main>
  );
};

export default Profile;
