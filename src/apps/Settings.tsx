import PageHelmet from "../util/PageHelmet";
import { SettingItem } from "../components/SettingItem";
import { IconName, Icon, IconColors } from "../components/Icon";
import { Paths, routeTo } from "../util/routes";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { removeLocalStorageItem } from "../util/localStorage";

const Settings: React.FC<{}> = () => {
  const onClickLogOut = (): void => {
    removeLocalStorageItem("token");
    removeLocalStorageItem("Initial");
    routeTo(Paths.login);
  };

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
          <div className="setting-item" onClick={onClickLogOut}>
            <Icon name={IconName.logOut} color={IconColors.black} />
            <div className=" body">
              <p>Log Out</p>
            </div>
          </div>
        </div>
        <BaytreeMentorPortalLogo className="logo" />
      </div>
    </main>
  );
};

export default Settings;
