import { getFormatedDayMonthYearString } from "../util/date";
import React from "react";

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
