import { useState } from "react";
import { getFormattedYearMonthDayNumericString } from "../../util/date";
import { Icon, IconName } from "../Icon";

interface TimeInputProps {
  time?: Date;
  rightIconName?: IconName;
  name?: string;
  id?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  time,
  rightIconName,
  name,
  id,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const [value, setValue] = useState<string>(
    !!time ? getFormattedYearMonthDayNumericString(time) : "blank"
  );

  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <div className={`control ${isFocused ? "focused" : ""}`}>
      <input
        type="time"
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
      />
      {rightIconName && <Icon name={rightIconName} />}
    </div>
  );
};
