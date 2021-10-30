import { useState } from "react";
import { getFormattedYearMonthDayNumericString } from "../../util/date";
import { Icon, IconName } from "../Icon";

interface DateInputProps {
  date?: Date;
  rightIconName?: IconName;
}

export const DateInput: React.FC<DateInputProps> = ({
  date,
  rightIconName,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  // console.log(date)
  const [value, setValue] = useState<string>(
    !!date ? getFormattedYearMonthDayNumericString(date) : "blank"
  );


  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <div className={`control ${isFocused ? "focused" : ""}`}>
      <input
        type="date"
        onFocus={onFocus}
        onBlur={onBlur}
        min="1960-01-01"
        max="2030-12-31"
        value={value}
        onChange={onChange}
      />
      {rightIconName && <Icon name={rightIconName} />}
    </div>
  );
};
