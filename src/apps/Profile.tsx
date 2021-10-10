import { ProfilerProps } from 'react';

const Profile: React.FC<ProfilerProps> = () => {
  return (
    <main className='Profile'>
      <div className='container'>
        <h1 className='page-title'>Settings</h1>
        <h3 className='sub-title'>Profile Information</h3>
      </div>
    </main>
  );
};

export default Profile;
