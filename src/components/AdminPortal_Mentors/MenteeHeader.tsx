import { Icon, IconName, IconColors, IconSizes } from "../Icon";
import { MenteeInfoProps } from "../mentee_profile/MenteeGoals";

export const MenteeHeader: React.FC<MenteeInfoProps> = ({
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
        <div>
          <button type="button" className="btn-small">
            Migrate From Views
          </button>
          <button type="button" className="btn-small white">
            Export
          </button>
        </div>
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
        {`Started ${startDate}`}
      </div>
      <div className="subtext">
        <Icon
          name={IconName.gift}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {birthday}
      </div>
    </div>
  );
};
