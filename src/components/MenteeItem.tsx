import { ContainedIcon, IconName, IconColors } from "./Icon";
import { getFormattedMonthYearString } from "../util/date";
import Link from "./Link";
import { Paths } from "../util/routes";

export interface MenteeItemProps {
  menteeName: string;
  startDate: Date;
  endDate?: Date;
}

export const MenteeItem: React.FC<MenteeItemProps> = ({
  menteeName,
  startDate,
  endDate,
}) => {
  return (
    <Link to={Paths.menteeProfileGoals} className="mentee-item">
      <div className="body">
        <p className="subtext">
          {endDate
            ? `${getFormattedMonthYearString(
                startDate
              )} - ${getFormattedMonthYearString(endDate)}`
            : `${getFormattedMonthYearString(startDate)}`}
        </p>
        <p className="semi-bold">{menteeName}</p>
      </div>
      <div className="icon">
        <ContainedIcon
          name={IconName.user}
          color={IconColors.black}
          backgroundColor={IconColors.transparent}
        ></ContainedIcon>
      </div>
    </Link>
  );
};
