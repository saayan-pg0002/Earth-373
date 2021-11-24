import { useState, useEffect } from "react";
import { ContainedIcon, IconName, IconColors } from "./Icon";
import {
  isCurrentDateBetween,
  getStartEndFormattedTimeString,
} from "../util/date";
import Link from "./Link";
import { Paths } from "../util/routes";

export interface ItemProps {
  value: string;
  clockInTime: Date;
  clockOutTime: Date;
  viewOnly?: boolean;
  content?: string;
}

export const SessionItem: React.FC<ItemProps> = ({
  value,
  clockInTime,
  clockOutTime,
  viewOnly = false,
  content,
}) => {
  const [isOngoing, setIsOngoing] = useState<Boolean>(
    isCurrentDateBetween(clockInTime, clockOutTime)
  );

  useEffect(() => {
    const checkIsOngoingIntervalID = setInterval(() => {
      setIsOngoing(isCurrentDateBetween(clockInTime, clockOutTime));
    }, 1000);

    return () => clearInterval(checkIsOngoingIntervalID);
  });
  return (
    <Link
      to={viewOnly ? Paths.viewSession : Paths.newSession}
      className={`session-item ${isOngoing ? "ongoing" : ""}`}
    >
      <div className="body">
        {isOngoing && <p className="subtext bold ongoing-tag">Ongoing</p>}
        <p className="subtext">
          {getStartEndFormattedTimeString(clockInTime, clockOutTime)}
        </p>
        <p className="semi-bold">{value}</p>
        <p className="subtext content">{content}</p>
      </div>
      {!viewOnly && (
        <ContainedIcon
          name={isOngoing ? IconName.doubleArrowRight : IconName.plus}
          color={isOngoing ? IconColors.baytreeGreen : IconColors.black}
          backgroundColor={
            isOngoing ? IconColors.white : IconColors.transparent
          }
        />
      )}
    </Link>
  );
};
