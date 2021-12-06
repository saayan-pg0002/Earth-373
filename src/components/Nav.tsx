import { ReactComponent as BaytreeMentorPortalWordLogo } from "../assets/images/baytree-mentor-portal-word-logo.svg";
import { ReactComponent as BaytreeMentorPortalLogo } from "../assets/images/baytree-mentor-portal-logo.svg";
import { ContainedIcon, IconName, IconColors } from "../components/Icon";
import { Paths } from "../util/routes";
import Link from "./Link";
import { useLocation } from "react-router-dom";
import React from "react";

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <Link to={Paths.dashboard}>
        <BaytreeMentorPortalWordLogo className="desktop-only header-logo" />
      </Link>
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
          label="New Session"
          path={Paths.newSession}
          iconName={IconName.plus}
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

export const NavItem: React.FC<NavItemProps> = ({ path, iconName, label }) => {
  const isActive: boolean = useLocation().pathname === path;
  const isPrimaryAction: boolean = path === Paths.newSession;

  const getIconColor = (): IconColors =>
    isActive || isPrimaryAction ? IconColors.white : IconColors.black;

  const getIconBackgroundColor = (): IconColors => {
    if (isActive) {
      return IconColors.baytreeNavy;
    } else if (isPrimaryAction) {
      return IconColors.baytreeGreen;
    }
    return IconColors.white;
  };

  const getClasses = (): string => {
    let classes = "";
    if (isActive) {
      classes += " active";
    }

    if (isPrimaryAction) {
      classes += " primary-action";
    }

    return classes;
  };

  const color: IconColors = getIconColor();
  const backgroundColor: IconColors = getIconBackgroundColor();
  const classes = getClasses();

  return (
    <li className={classes}>
      <Link to={path}>
        <ContainedIcon
          name={iconName}
          color={color}
          backgroundColor={backgroundColor}
          isCircle={isPrimaryAction}
        />
        <span className="desktop-only">{label}</span>
      </Link>
    </li>
  );
};

export default Nav;
