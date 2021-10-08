import { ContainedIcon, IconName, IconColors } from "./Icon";
import { getStartEndFormattedTimeString } from "../util/date";

import React from "react";

const weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

export const MenteeItem: React.FC<MenteeItemProps> = ({
  menteeName,
  clockInTime,
  clockOutTime,
  dayOfWeek,
}) => {
  return (
    <div className="mentee-item">
      <div className="body">
        <p className="subtext"> </p>
        {weekday[dayOfWeek.getDay()]}{" "}
        {getStartEndFormattedTimeString(clockInTime, clockOutTime)}
        <p className="semi-bold">{menteeName}</p>
      </div>
      <ContainedIcon
        name={IconName.edit}
        color={IconColors.black}
        backgroundColor={IconColors.transparent}
      ></ContainedIcon>
    </div>
  );
};

export interface MenteeItemProps {
  menteeName: string;
  clockInTime: Date;
  clockOutTime: Date;
  dayOfWeek: Date;
}
