import React, { Fragment } from 'react';
import { Router } from 'react-router';
import { ContainedIcon, IconName, IconColors } from './Icon';
import { Link } from 'react-router-dom';
import { routes, Route } from '../util/routes';

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
      <Link to={path} className='account-setting-item'>
        <ContainedIcon
          name={icon}
          color={IconColors.black}
          backgroundColor={IconColors.transparent}
        />
        <div className=' body'>
          <p>{content}</p>
        </div>
      </Link>
      <hr className='separator' />
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
      <a href={path} className='link-setting-item'>
        <ContainedIcon
          name={icon}
          color={IconColors.black}
          backgroundColor={IconColors.transparent}
        />
        <div className=' body'>
          <p>{content}</p>
        </div>
      </a>
      <hr className='separator' />
    </Fragment>
  );
};
