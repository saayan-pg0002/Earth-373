import { ContainedIcon, IconName, IconColors } from '../components/Icon';
import { routes } from '../util/routes';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav className='nav'>
      <div className='container centered'>
        <ul className='items'>
          <NavItem path={routes.dashboard} iconName={IconName.home} />
          <NavItem path={routes.mentees} iconName={IconName.smiley} />
          <NavItem path={routes.notifications} iconName={IconName.bell} />
          <NavItem path={routes.settings} iconName={IconName.settings} />
        </ul>
      </div>
    </nav>
  );
};

interface NavItemProps {
  path: string;
  iconName: IconName;
}

const NavItem: React.FC<NavItemProps> = ({ path, iconName }) => {
  const isActive = useLocation().pathname === path;
  const color = isActive ? IconColors.white : IconColors.black;
  const backgroundColor = isActive ? IconColors.baytreeNavy : IconColors.white;

  return (
    <li>
      <Link to={path}>
        <ContainedIcon
          name={iconName}
          color={color}
          backgroundColor={backgroundColor}
        />
      </Link>
    </li>
  );
};

export default Nav;
