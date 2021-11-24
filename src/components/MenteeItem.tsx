import { ContainedIcon, IconName, IconColors } from "./Icon";
import { getFormattedMonthYearString } from "../util/date";
import Link from "./Link";
import { Paths } from "../util/routes";

export interface MenteeItemProps {
  _id: string;
  mentor_id?: string;
  mentee_id: string;
  isActive?: boolean;
  questionnaire_ids?: [];
  goals?: [];
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
  mentee_name: string;
}

export const MenteeItem: React.FC<MenteeItemProps> = ({ _id, mentee_name }) => {
  return (
    <Link
      to={Paths.menteeProfileGoals}
      params={[{ name: "association_id", value: _id }]}
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
