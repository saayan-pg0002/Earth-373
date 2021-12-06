import { FC } from "react";
import { getStartEndFormattedTimeString } from "../util/date";
import Link from "./Link";
import { Paths } from "../util/routes";
import { getFormattedMonthDateYearString } from "../util/date";

export interface SessionItemProps {
  notes: {
    views_id: string;
    description: string;
  };
  _id: string;
  start_time: string;
  end_time: string;
}

export const SessionItem: FC<SessionItemProps> = ({
  notes,
  _id,
  start_time,
  end_time
}) => {
  const startTime: Date = new Date(start_time);
  const endTime: Date = new Date(end_time);
  const date: string = getFormattedMonthDateYearString(startTime);

  return (
    <Link
      to={Paths.viewSession}
      params={[{ name: "session_id", value: _id }]}
      className="session-item"
    >
      <div className="body">
        <p className="subtext">
          {getStartEndFormattedTimeString(startTime, endTime)}
        </p>
        <p className="semi-bold">{date}</p>
        <p className="subtext content">{notes.description}</p>
      </div>
    </Link>
  );
};
