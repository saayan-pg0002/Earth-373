import { useState } from "react";
import { getFormattedYearMonthDayNumericString } from "../../util/date";
import { Icon, IconName } from "../Icon";

interface DateInputProps {
  date?: Date;
  rightIconName?: IconName;
}

export const TimeInput: React.FC<DateInputProps> = ({
  date,
  rightIconName,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const [value, setValue] = useState<string>(
    !!date ? getFormattedYearMonthDayNumericString(date) : "blank"
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
      />
      {rightIconName && <Icon name={rightIconName} />}
    </div>
  );
};
