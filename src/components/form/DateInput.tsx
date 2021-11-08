import { useState } from "react";
import { getFormattedYearMonthDayNumericString } from "../../util/date";
import { Icon, IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface DateInputProps {
  date?: Date;
}

export const DateInput: React.FC<GeneralInputProps & DateInputProps> = ({
  date,
  name,
  id,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const [value, setValue] = useState<string>(
    !!date ? getFormattedYearMonthDayNumericString(date) : ""
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
        name={name}
        id={id}
      />
      <Icon name={IconName.calendar} />
    </div>
  );
};
