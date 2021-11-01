import { ContainedIcon, IconName, IconColors } from './Icon';
import { getStartEndFormattedTimeStringWithDay } from '../util/date';
import { Link } from 'react-router-dom';
import { Paths } from '../util/routes';

export const MenteeItem: React.FC<MenteeItemProps> = ({
  menteeName,
  clockInTime,
  clockOutTime,
  dayOfWeek,
}) => {
  return (
    <Link to={Paths.dashboard} className='mentee-item'>
      <div className='body'>
        <p className='subtext'>
          {getStartEndFormattedTimeStringWithDay(clockInTime, clockOutTime)}
        </p>
        <p className='semi-bold'>{menteeName}</p>
      </div>
      <div className='icon'>
        <ContainedIcon
          name={IconName.edit}
          color={IconColors.black}
          backgroundColor={IconColors.transparent}
        ></ContainedIcon>
      </div>
    </Link>
  );
};

export interface MenteeItemProps {
  menteeName: string;
  clockInTime: Date;
  clockOutTime: Date;
  dayOfWeek: Date;
}
