import { ContainedIcon, IconName, IconColors } from "./Icon";
import { getFormattedMonthYearString } from "../util/date";
import Link from "./Link";
import { Paths } from "../util/routes";

export interface MenteeItemProps {
  association_id: string;
  is_active: boolean;
  mentee_name: string;
}

export const MenteeItem: React.FC<MenteeItemProps> = ({
  association_id,
  mentee_name,
}) => {
  return (
    <Link
      to={Paths.menteeProfileGoals}
      params={[{ name: "association_id", value: association_id }]}
      className="mentee-item"
    >
      <div className="body">
        {/* <p className="subtext">
          {endDate
            ? `${getFormattedMonthYearString(
                startDate
              )} - ${getFormattedMonthYearString(endDate)}`
            : `${getFormattedMonthYearString(startDate)}`}
        </p> */}
        <p className="semi-bold">{mentee_name}</p>
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
