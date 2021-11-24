import { useState } from "react";
import { IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface InputNotesProps {
  leftIconName?: IconName;
  rightIconName?: IconName;
  placeholderText: string;
  type?: string;
  initialValue?: string;
}

export const InputNotes: React.FC<GeneralInputProps & InputNotesProps> = ({
  required,
  id,
  name,
  placeholderText,
  isDisabled = false,
  initialValue,
}) => {
  const [value, setValue] = useState<string>(initialValue ? initialValue : "");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const onChange = (event: any) => setValue(event.target.value);

  return (
    <div
      className={`input-notes control ${isFocused ? "focused" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
    >
      <textarea
        id={id}
        name={name}
        placeholder={placeholderText}
        value={value}
        disabled={isDisabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      >
        {value}
      </textarea>
    </div>
  );
};
