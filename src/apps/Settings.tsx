import {
  AccountSettingItem,
  ExternalLinkSettingItem,
} from "../components/SettingItem";
import { IconName } from "../components/Icon";
import { Paths } from "../util/routes";

const Settings: React.FC<{}> = () => {
  return (
    <main className="settings">
      <div className="container">
        <h1 className="page-title">Settings</h1>
        <div className="account">
          <AccountSettingItem
            icon={IconName.user}
            content="Profile"
            path={Paths.profile}
          />
          <AccountSettingItem
            icon={IconName.logOut}
            content="Log Out"
            path={Paths.login}
          />
        </div>
        <h2 className="h2">Resources</h2>
        <div className="resources">
          <ExternalLinkSettingItem
            content="BayTree Centre Website"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkSettingItem
            content="Microsoft SharePoint folder"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkSettingItem
            content="Mentee Information"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkSettingItem
            content="Questionaire FAQ"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkSettingItem
            content="Director Contact Info"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkSettingItem
            content="About the Developer"
            path="https://www.baytreecentre.org"
          />
        </div>
      </div>
    </main>
  );
};

export default Settings;
