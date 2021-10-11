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
    <Link to={path} className="setting-item">
      <Icon name={icon} color={IconColors.black} />
      <div className=" body">
        <p>{content}</p>
      </div>
    </Link>
  );
};

interface ExternalLinkSettingItemProps {
  content: string;
  path: string;
}

export const ExternalLinkSettingItem: React.FC<ExternalLinkSettingItemProps> =
  ({ content, path }) => {
    return (
      <a href={path} className="setting-item" target="_blank" rel="noreferrer">
        <Icon name={IconName.link} color={IconColors.black} />
        <div className=" body">
          <p>{content}</p>
        </div>
      </a>
    );
  };
