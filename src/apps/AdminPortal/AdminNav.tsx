import { ReactComponent as BaytreeAdminPortalWordLogo } from "../../assets/images/baytree-admin-portal-word-logo.svg";
import { ReactComponent as BaytreeAdminPortalLogo } from "../../assets/images/baytree-admin-portal-logo.svg";
import React from "react";
import Link from "../../components/Link";
import { Paths } from "../../util/routes";
import { IconName } from "../../components/Icon";
import { NavItem } from "../../components/Nav";

const AdminNav: React.FC = () => {
  return (
    <nav className="nav">
      <Link to={Paths.dashboard}>
        <BaytreeAdminPortalWordLogo className="desktop-only header-logo" />
      </Link>
      <ul className="items">
        <NavItem
          label="Dashboard"
          path={Paths.dashboard}
          iconName={IconName.home}
        />
        <NavItem
          label="Mentors"
          path={Paths.mentors}
          iconName={IconName.smiley}
        />
        <NavItem
          label="Mentees"
          path={Paths.dashboard}
          iconName={IconName.smiley}
        />
        <NavItem
          label="Questionnaires"
          path={Paths.mentees}
          iconName={IconName.checklist}
        />
        <NavItem
          label="Notifications"
          path={Paths.notifications}
          iconName={IconName.bell}
        />
        <NavItem
          label="Resources"
          path={Paths.resources}
          iconName={IconName.folders}
        />
        <NavItem
          label="Admin Users"
          path={Paths.dashboard}
          iconName={IconName.settings}
        />
      </ul>
      <BaytreeAdminPortalLogo className="desktop-only footer-logo" />
    </nav>
  );
};

export default AdminNav;
