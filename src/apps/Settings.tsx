import {
  AccountSettingItem,
  ExternalLinkSettingItem,
} from '../components/SettingItem';
import { IconName } from '../components/Icon';
import { Paths } from '../util/routes';

const Settings: React.FC<{}> = () => {
  return (
    <main className='setting'>
      <div className='container'>
        <h1 className='page-title'>Settings</h1>
        <div className='account'>
          <AccountSettingItem
            icon={IconName.user}
            content='Profile'
            path={Paths.profile}
          />
          <AccountSettingItem
            icon={IconName.logOut}
            content='Log Out'
            path={Paths.login}
          />
        </div>
        <h3 className='section-title'>Resources</h3>
        <div className='resources'>
          <ExternalLinkSettingItem
            icon={IconName.link}
            content='BayTree Centre Website'
            path='https://www.baytreecentre.org'
          />
          <ExternalLinkSettingItem
            icon={IconName.link}
            content='Microsoft SharePoint folder'
            path='https://www.baytreecentre.org'
          />
          <ExternalLinkSettingItem
            icon={IconName.link}
            content='Mentee Information'
            path='https://www.baytreecentre.org'
          />
          <ExternalLinkSettingItem
            icon={IconName.link}
            content='Questionair FAQ'
            path='https://www.baytreecentre.org'
          />
          <ExternalLinkSettingItem
            icon={IconName.link}
            content='Director Contact Info'
            path='https://www.baytreecentre.org'
          />
          <ExternalLinkSettingItem
            icon={IconName.info}
            content='About the Developer'
            path='https://www.baytreecentre.org'
          />
        </div>
      </div>
    </main>
  );
};

export default Settings;
