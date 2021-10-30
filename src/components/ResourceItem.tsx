import { Icon, IconName, IconColors } from "./Icon";

interface ResourceItemProps {
  content: string;
  path: string;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({
  content,
  path,
}) => {
  return (
    <a href={path} className='setting-item' target='_blank' rel='noreferrer'>
      <Icon name={IconName.link} color={IconColors.black} />
      <div className=' body'>
        <p>{content}</p>
      </div>
    </a>
  );
};
