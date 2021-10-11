import { MenteeItem, MenteeItemProps } from "./MenteeItem";
import { ReactComponent as BaytreeTreeGrey } from "../assets/images/baytree-tree-grey.svg";

interface MenteeListProps {
  mentees: MenteeItemProps[];
}

export const MenteeList: React.FC<MenteeListProps> = ({ mentees }) => {
  const isEmpty: boolean = mentees.length === 0;
  return (
    <div className={`mentee-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">You Currently Have No Mentees</h1>
          <p>Contact an admin to get matched!</p>
        </div>
      ) : (
        mentees.map(
          (
            {
              menteeName,
              clockInTime,
              clockOutTime,
              dayOfWeek,
            }: MenteeItemProps,
            index: number
          ) => (
            <MenteeItem
              key={index}
              menteeName={menteeName}
              clockInTime={clockInTime}
              clockOutTime={clockOutTime}
              dayOfWeek={dayOfWeek}
            />
          )
        )
      )}
    </div>
  );
};
