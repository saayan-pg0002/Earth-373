import { ItemProps, SessionItem } from "./SessionItem";
import { EmptyState } from "../components/EmptyState";

interface SessionListProps {
  sessions: ItemProps[];
}

export const SessionList: React.FC<SessionListProps> = ({ sessions }) => {
  const isEmpty: boolean = sessions.length === 0;

  return (
    <div className={`session-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty ? (
        <EmptyState
          title="You Have No Upcoming Sessions"
          message="Contact a staff member to get matched with a mentee"
        />
      ) : (
        sessions.map(
          (
            { value, clockInTime, clockOutTime }: ItemProps,
            index: number
          ) => (
            <SessionItem
              key={index}
              value={value}
              clockInTime={clockInTime}
              clockOutTime={clockOutTime}
            />
          )
        )
      )}
    </div>
  );
};
