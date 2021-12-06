import { useState } from "react";
import { Icon, IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface TextInputProps {
  leftIconName?: IconName;
  rightIconName?: IconName;
  placeholderText: string;
  type?: string;
  initialValue?: string;
}

export const TextInput: React.FC<GeneralInputProps & TextInputProps> = ({
  required = true,
  id,
  name,
  leftIconName,
  rightIconName,
  placeholderText,
  type = "text",
  initialValue,
  isDisabled = false
}) => {
  const [value, setValue] = useState<string>(initialValue ?? "");
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const onChange = (event: any) => setValue(event.target.value);

  return (
    <div
      className={`control ${isFocused ? "focused" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
    >
      {leftIconName && <Icon name={leftIconName} />}
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholderText}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
      />
      {rightIconName && <Icon name={rightIconName} />}
    </div>
  );
};
