import { ReactComponent as BaytreeMentorPortalWordLogo } from "../assets/images/baytree-mentor-portal-word-logo.svg";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { ContainedIcon, IconName, IconColors } from "../components/Icon";
import { Paths } from "../util/routes";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <BaytreeMentorPortalWordLogo className="desktop-only header-logo" />
      <ul className="items">
        <NavItem
          label="Dashboard"
          path={Paths.dashboard}
          iconName={IconName.home}
        />
        <NavItem
          label="Mentees"
          path={Paths.mentees}
          iconName={IconName.smiley}
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
      </ul>
      <BaytreeMentorPortalLogo className="desktop-only footer-logo" />
    </nav>
  );
};

interface NavItemProps {
  path: string;
  iconName: IconName;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ path, iconName, label }) => {
  const isActive = useLocation().pathname === path;
  const color = isActive ? IconColors.white : IconColors.black;
  const backgroundColor = isActive ? IconColors.baytreeNavy : IconColors.white;

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={path}>
        <ContainedIcon
          name={iconName}
          color={color}
          backgroundColor={backgroundColor}
        />
        <span className="desktop-only">{label}</span>
      </Link>
    </li>
  );
};

export default Nav;
