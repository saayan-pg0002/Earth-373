import PageHelmet from "../util/PageHelmet";
import { AccountSettingItem } from "../components/SettingItem";
import { IconName } from "../components/Icon";
import { Paths } from "../util/routes";

const Settings: React.FC<{}> = () => {
  return (
    <main className="settings">
      <PageHelmet title="Settings" />

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
      </div>
    </main>
  );
};

export default Settings;
