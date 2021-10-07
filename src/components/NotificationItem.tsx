import { ContainedIcon, IconName, IconColors } from "./Icon";
import {
  getStartEndFormattedTimeString,
  getFormatedDayMonthYearString,
} from "../util/date";

import React from "react";

const weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

export const NotificationItem: React.FC<NotificationItemProps> = ({
  message,
  date,
}) => {
  return (
    <div className="notification-item">
      <div className="body">
        <p className="subtext">{getFormatedDayMonthYearString(date)}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export interface NotificationItemProps {
  message: string;
  date: Date;
}
