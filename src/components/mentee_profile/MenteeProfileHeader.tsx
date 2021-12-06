import { MenteeInfoProps } from "./MenteeGoals";
import { Icon, IconName, IconColors, IconSizes } from "../Icon";
import { Paths, routeTo } from "../../util/routes";

export const MenteeProfileHeader: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
  sessionDay,
  sessionTime
}) => {
  return (
    <div className="mentee-profile-header">
      <div className="heading">
        <h1 className="page-title">{menteeName}</h1>
        <Icon
          name={IconName.edit}
          onClick={() => routeTo(Paths.editSchedule)}
        />
      </div>

      <div className="subtext">
        <Icon
          name={IconName.clock}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {sessionDay && sessionTime
          ? `Every ${sessionDay} at ${sessionTime}`
          : "Session time yet to decide"}
      </div>
      <div className="subtext">
        <Icon
          name={IconName.calendar}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {`Started: ${startDate}`}
      </div>
      <div className="subtext">
        <Icon
          name={IconName.gift}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {`Birthday: ${birthday}`}
      </div>
    </div>
  );
};
