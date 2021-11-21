import { MenteeItem, MenteeItemProps } from "./MenteeItem";
import { ReactComponent as BaytreeTreeGrey } from "../assets/images/baytree-tree-grey.svg";

interface MenteeListProps {
  mentees: MenteeItemProps[];
  showEmptyState?: boolean;
}

export const MenteeList: React.FC<MenteeListProps> = ({
  mentees,
  showEmptyState = false,
}) => {
  const isEmpty: boolean = mentees.length === 0;

  return (
    <div className={`mentee-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty && showEmptyState ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">You Currently Have No Mentees</h1>
          <p>Contact an admin to get matched!</p>
        </div>
      ) : (
        mentees.map(
          ({ _id, mentee_id, mentee_name }: MenteeItemProps, index: number) => (
            <MenteeItem
              key={_id}
              _id={_id}
              mentee_id={mentee_id}
              mentee_name={mentee_name}
            />
          )
        )
      )}
    </div>
  );
};
