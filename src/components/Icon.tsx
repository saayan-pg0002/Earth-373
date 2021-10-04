import React from 'react';
import { ReactComponent as AutoComplete } from '../assets/icons/icon-autocomplete.svg';
import { ReactComponent as Bell } from '../assets/icons/icon-bell.svg';
import { ReactComponent as Calendar } from '../assets/icons/icon-calendar.svg';
import { ReactComponent as ChevronDown } from '../assets/icons/icon-chevron-down.svg';
import { ReactComponent as Clock } from '../assets/icons/icon-clock.svg';
import { ReactComponent as DoubleArrowRight } from '../assets/icons/icon-double-arrow-right.svg';
import { ReactComponent as Edit } from '../assets/icons/icon-edit.svg';
import { ReactComponent as Exclamation } from '../assets/icons/icon-exclamation.svg';
import { ReactComponent as Eye } from '../assets/icons/icon-eye.svg';
import { ReactComponent as Home } from '../assets/icons/icon-home.svg';
import { ReactComponent as Info } from '../assets/icons/icon-info.svg';
import { ReactComponent as Link } from '../assets/icons/icon-link.svg';
import { ReactComponent as Lock } from '../assets/icons/icon-lock.svg';
import { ReactComponent as LogOut } from '../assets/icons/icon-log-out.svg';
import { ReactComponent as Plus } from '../assets/icons/icon-plus.svg';
import { ReactComponent as Settings } from '../assets/icons/icon-settings.svg';
import { ReactComponent as Smiley } from '../assets/icons/icon-smiley.svg';
import { ReactComponent as User } from '../assets/icons/icon-user.svg';

export enum IconName {
  autocomplete,
  bell,
  calendar,
  chevronDown,
  clock,
  doubleArrowRight,
  edit,
  exclamation,
  eye,
  home,
  info,
  link,
  lock,
  logOut,
  plus,
  settings,
  smiley,
  user,
}

export enum IconColors {
  black = 'black',
  white = 'white',
  baytreeNavy = 'baytree-navy',
  baytreeGreen = 'baytree-green',
  transparent = 'transparent',
}

interface IconProps {
  name: IconName;
  color?: IconColors;
}

export const Icon: React.FC<IconProps> = ({ name, color }) => {
  return <div className={`icon ${color ?? ''}`}>{getIcon(name)}</div>;
};

interface ContainedIconProps {
  name: IconName;
  color: IconColors;
  backgroundColor: IconColors;
}

export const ContainedIcon: React.FC<ContainedIconProps> = ({
  name,
  color,
  backgroundColor,
}) => {
  return (
    <div className={`contained-icon ${backgroundColor ?? ''}`}>
      <Icon name={name} color={color} />
    </div>
  );
};

const getIcon = (name: IconName): JSX.Element => {
  switch (name) {
    case IconName.autocomplete:
      return <AutoComplete />;
    case IconName.bell:
      return <Bell />;
    case IconName.calendar:
      return <Calendar />;
    case IconName.chevronDown:
      return <ChevronDown />;
    case IconName.clock:
      return <Clock />;
    case IconName.doubleArrowRight:
      return <DoubleArrowRight />;
    case IconName.edit:
      return <Edit />;
    case IconName.exclamation:
      return <Exclamation />;
    case IconName.eye:
      return <Eye />;
    case IconName.home:
      return <Home />;
    case IconName.info:
      return <Info />;
    case IconName.link:
      return <Link />;
    case IconName.lock:
      return <Lock />;
    case IconName.logOut:
      return <LogOut />;
    case IconName.plus:
      return <Plus />;
    case IconName.settings:
      return <Settings />;
    case IconName.smiley:
      return <Smiley />;
    case IconName.user:
      return <User />;
  }
};
