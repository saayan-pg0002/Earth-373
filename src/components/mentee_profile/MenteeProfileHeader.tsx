import { MenteeInfoProps } from "./MenteeGoals";
import { Icon, IconName } from "../Icon";
import { Paths, routeTo } from "../../util/routes";

export const MenteeProfileHeader: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
}) => {
  return (
    <div className="mentee-profile-header">
      <div className="heading">
        <h1 className="page-title">{menteeName}</h1>
        <Icon name={IconName.edit} onClick={() => routeTo(Paths.editMentee)} />
      </div>

      <div className="subtext">
        <Icon name={IconName.calendar} />
        {`Started ${startDate}`}
      </div>
      <div className="subtext">
        <Icon name={IconName.gift} />
        {birthday}
      </div>
    </div>
  );
};
