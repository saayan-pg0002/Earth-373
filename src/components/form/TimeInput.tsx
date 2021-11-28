import { useState } from "react";
import { getFormattedHourMinuteString } from "../../util/date";
import { Icon, IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface TimeInputProps {
  initialValue?: Date;
}

export const TimeInput: React.FC<GeneralInputProps & TimeInputProps> = ({
  name,
  id,
  isDisabled = false,
  initialValue,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const [value, setValue] = useState<string>(
    !!initialValue ? getFormattedHourMinuteString(initialValue) : ""
  );

  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <div
      className={`control ${isFocused ? "focused" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
    >
      <input
        type="time"
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        disabled={isDisabled}
      />
      <Icon name={IconName.clock} />
    </div>
  );
};
