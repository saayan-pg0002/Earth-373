import { ContainedIcon, IconName, IconColors } from "./Icon";
import { getStartEndFormattedTimeString, DaysOfWeekShort } from "../util/date";
import { Link } from "react-router-dom";
import { Paths } from "../util/routes";

import React from "react";

export const MenteeItem: React.FC<MenteeItemProps> = ({
  menteeName,
  clockInTime,
  clockOutTime,
  dayOfWeek,
}) => {
  return (
    <Link to={Paths.dashboard} className="mentee-item">
      <div className="body">
        <p className="subtext"> </p>
        {DaysOfWeekShort[dayOfWeek.getDay()]}{" "}
        {getStartEndFormattedTimeString(clockInTime, clockOutTime)}
        <p className="semi-bold">{menteeName}</p>
      </div>
      <ContainedIcon
        name={IconName.edit}
        color={IconColors.black}
        backgroundColor={IconColors.transparent}
      ></ContainedIcon>
    </Link>
  );
};

export interface MenteeItemProps {
  menteeName: string;
  clockInTime: Date;
  clockOutTime: Date;
  dayOfWeek: Date;
}
