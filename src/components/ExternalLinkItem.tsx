import { Icon, IconName, IconColors } from "./Icon";

interface ExternalLinkItemProps {
  content: string;
  path: string;
}

export const ExternalLinkItem: React.FC<ExternalLinkItemProps> = ({
  content,
  path,
}) => {
  return (
    <a href={path} className="setting-item" target="_blank" rel="noreferrer">
      <Icon name={IconName.link} color={IconColors.black} />
      <div className=" body">
        <p>{content}</p>
      </div>
    </a>
  );
};
