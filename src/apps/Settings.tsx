import PageHelmet from "../util/PageHelmet";
import { SettingItem } from "../components/SettingItem";
import { IconName } from "../components/Icon";
import { Paths } from "../util/routes";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";

const Settings: React.FC<{}> = () => {
  return (
    <main className="settings">
      <PageHelmet title="Settings" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Setting</h1>
        </div>

        <div className="setting-list">
          <SettingItem
            icon={IconName.user}
            content="Profile"
            path={Paths.profile}
          />
          <SettingItem
            icon={IconName.logOut}
            content="Log Out"
            path={Paths.login}
          />
          <SettingItem
            icon={IconName.info}
            content="About"
            path={Paths.settings}
          />
        </div>
        <BaytreeMentorPortalLogo className="logo" />
      </div>
    </main>
  );
};

export default Settings;
