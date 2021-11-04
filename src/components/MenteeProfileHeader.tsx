import { MenteeInfoProps } from "../apps/MenteeGoals";
import { Icon, IconName } from "./Icon";

export const MenteeProfileHeader: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
}) => {
  return (
    <div className="mentee-profile-header">
      <div className="heading">
        <h1 className="page-title">{menteeName}</h1>
        <Icon name={IconName.edit} />
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
