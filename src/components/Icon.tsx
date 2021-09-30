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

export enum IconNames {
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
  white = 'white',
  baytreeNavy = 'baytree-navy',
  baytreeGreen = 'baytree-green',
}

interface IconProps {
  name: IconNames;
  color?: IconColors;
}

export const Icon: React.FC<IconProps> = ({ name, color }) => {
  return <div className={`icon ${color ?? ''}`}>{getIcon(name)}</div>;
};

const getIcon = (name: IconNames): JSX.Element => {
  switch (name) {
    case IconNames.autocomplete:
      return <AutoComplete />;
    case IconNames.bell:
      return <Bell />;
    case IconNames.calendar:
      return <Calendar />;
    case IconNames.chevronDown:
      return <ChevronDown />;
    case IconNames.clock:
      return <Clock />;
    case IconNames.doubleArrowRight:
      return <DoubleArrowRight />;
    case IconNames.edit:
      return <Edit />;
    case IconNames.exclamation:
      return <Exclamation />;
    case IconNames.eye:
      return <Eye />;
    case IconNames.home:
      return <Home />;
    case IconNames.info:
      return <Info />;
    case IconNames.link:
      return <Link />;
    case IconNames.lock:
      return <Lock />;
    case IconNames.logOut:
      return <LogOut />;
    case IconNames.plus:
      return <Plus />;
    case IconNames.settings:
      return <Settings />;
    case IconNames.smiley:
      return <Smiley />;
    case IconNames.user:
      return <User />;
  }
};
