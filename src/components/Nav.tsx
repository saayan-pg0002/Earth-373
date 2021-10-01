import { ContainedIcon, IconName, IconColors } from '../components/Icon';
import { Paths } from '../util/routes';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav className='nav'>
      <div className='container centered'>
        <ul className='items'>
          <NavItem path={Paths.dashboard} iconName={IconName.home} />
          <NavItem path={Paths.mentees} iconName={IconName.smiley} />
          <NavItem path={Paths.notifications} iconName={IconName.bell} />
          <NavItem path={Paths.settings} iconName={IconName.settings} />
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
