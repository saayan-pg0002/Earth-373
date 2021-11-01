import { Icon, IconName, IconColors } from "./Icon";
import { Link } from "react-router-dom";

export interface SettingItemProps {
  icon: IconName;
  content: string;
  path: string;
}

export const AccountSettingItem: React.FC<SettingItemProps> = ({
  icon,
  content,
  path,
}) => {
  return (
    <Link to={path} className='setting-item'>
      <Icon name={icon} color={IconColors.black} />
      <div className=' body'>
        <p>{content}</p>
      </div>
    </Link>
  );
};
