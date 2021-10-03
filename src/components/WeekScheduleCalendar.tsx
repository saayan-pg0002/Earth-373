import { useState } from 'react';
import {
  formatWeekDateObjectsForCalendar,
  getCurrentWeekDateObjects,
} from '../util/date';

export const WeekScheduleCalendar: React.FC = () => {
  const [activeDate, setActiveDate] = useState<number>(new Date().getDate());
  const currentWeekDayItems = formatWeekDateObjectsForCalendar(
    getCurrentWeekDateObjects(new Date())
  );

  const onClick = (date: number): void => setActiveDate(date);

  return (
    <div className='week-schedule-calendar'>
      {currentWeekDayItems.map(({ dayOfWeek, date }, index) => (
        <DayItem
          key={index}
          dayOfWeek={dayOfWeek}
          date={date}
          isActive={activeDate === date}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

interface DayItemProps {
  dayOfWeek: String;
  date: number;
  isActive: boolean;
  onClick: (date: number) => void;
}

const DayItem: React.FC<DayItemProps> = ({
  dayOfWeek,
  date,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(date)}
      className={`day-item ${isActive ? 'active' : ''}`}
    >
      <p className='subtext bold'>{dayOfWeek[0]}</p>
      <p>{date}</p>
    </div>
  );
};
