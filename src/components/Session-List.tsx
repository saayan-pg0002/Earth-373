import { ReactComponent as BaytreeTreeGrey } from '../assets/images/baytree-tree-grey.svg';
import { SessionItem, SessionItemProps } from '../components/Session-Item';

interface SessionListProps {
  sessions: SessionItemProps[];
}

export const SessionList: React.FC<SessionListProps> = ({ sessions }) => {
  const isEmpty: boolean = sessions.length === 0;

  return (
    <div className={`session-list ${isEmpty ? 'empty' : ''}`}>
      {isEmpty ? (
        <div className='empty-state'>
          <BaytreeTreeGrey />
          <h1 className='widget-title'>You Have No Upcoming Sessions</h1>
          <p>
            Contact a staff member to get your schedule or to get matched with a
            mentee
          </p>
        </div>
      ) : (
        sessions.map(
          (
            { menteeName, clockInTime, clockOutTime }: SessionItemProps,
            index: number
          ) => (
            <SessionItem
              key={index}
              menteeName={menteeName}
              clockInTime={clockInTime}
              clockOutTime={clockOutTime}
            />
          )
        )
      )}
    </div>
  );
};
