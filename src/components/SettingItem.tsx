import React, { Fragment } from 'react';
import { Icon, IconName, IconColors } from './Icon';
import { Link } from 'react-router-dom';

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
    <Fragment>
      <Link to={path} className='setting-item'>
        <Icon name={icon} color={IconColors.black} />
        <div className=' body'>
          <p>{content}</p>
        </div>
      </Link>
    </Fragment>
  );
};

export const ExternalLinkSettingItem: React.FC<SettingItemProps> = ({
  icon,
  content,
  path,
}) => {
  return (
    <Fragment>
      <a href={path} className='setting-item' target='_blank' rel='noreferrer'>
        <Icon name={icon} color={IconColors.black} />
        <div className=' body'>
          <p>{content}</p>
        </div>
      </a>
    </Fragment>
  );
};
