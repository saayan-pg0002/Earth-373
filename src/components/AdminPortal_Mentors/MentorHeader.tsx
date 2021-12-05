import { Icon, IconName, IconColors, IconSizes } from "../Icon";

export interface MentorInfoProps {
  mentorName: string;
  mentorType: string;
  status: string;
  email: string;
  phoneNumber: string;
}

export const MentorHeader: React.FC<MentorInfoProps> = ({
  mentorName,
  mentorType,
  status,
  email,
  phoneNumber
}) => {
  return (
    <div className="mentee-profile-header">
      <div className="heading">
        <h1 className="page-title">
          {mentorName}
          <p className="subtext">{mentorType}</p>
        </h1>
        <button type="button" className="btn-small">
          Edit Mentor
        </button>
      </div>

      <div className="subtext">
        <Icon
          name={IconName.exclamation}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {status}
      </div>
      <div className="subtext">
        <Icon
          name={IconName.user}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {email}
      </div>
      <div className="subtext">
        <Icon
          name={IconName.phone}
          color={IconColors.baytreeNavy}
          size={IconSizes.xsmall}
        />
        {phoneNumber}
      </div>
    </div>
  );
};
