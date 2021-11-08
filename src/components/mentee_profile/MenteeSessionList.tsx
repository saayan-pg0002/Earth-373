import { ReactComponent as BaytreeTreeGrey } from "../../assets/images/baytree-tree-grey.svg";
import { SessionItem, ItemProps } from "../SessionItem";

interface MenteeSessionListProps {
  sessions: ItemProps[];
}

export const MenteeSessionList: React.FC<MenteeSessionListProps> = ({
  sessions,
}) => {
  const isEmpty: boolean = sessions.length === 0;

  return (
    <div className={`session-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">You Have No Upcoming Sessions</h1>
          <p>
            Contact a staff member to get your schedule or to get matched with a
            mentee
          </p>
        </div>
      ) : (
        sessions.map(
          ({ value, clockInTime, clockOutTime }: ItemProps, index: number) => (
            <SessionItem
              key={index}
              value={value}
              clockInTime={clockInTime}
              clockOutTime={clockOutTime}
              isContainedImage={false}
            />
          )
        )
      )}
    </div>
  );
};
