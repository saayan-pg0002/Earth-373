import { useState } from "react";
import { getFormattedHourMinuteString } from "../../util/date";
import { Icon, IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface TimeInputProps {
  time?: Date;
}

export const TimeInput: React.FC<GeneralInputProps & TimeInputProps> = ({
  time,
  name,
  id,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const [value, setValue] = useState<string>(
    !!time ? getFormattedHourMinuteString(time) : ""
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
      <Icon name={IconName.clock} />
    </div>
  );
};
