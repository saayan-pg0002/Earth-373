import { useState, ChangeEvent } from "react";
import { Icon, IconColors, IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface DropdownMenuProps {
  options: DropdownMenuOptionsProps[];
  initialValue?: string;
}

export interface DropdownMenuOptionsProps {
  label: string;
  value: any;
}

export const DropdownMenu: React.FC<GeneralInputProps & DropdownMenuProps> = ({
  options,
  id,
  name,
  isDisabled = false,
  initialValue
}) => {
  const [selectedOption, setSelectedOption] = useState<any>(
    initialValue ? initialValue : options[0]?.value
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setSelectedOption(event.target.value);

  return (
    <div
      className={`control ${isFocused ? "focused" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
    >
      <select
        value={selectedOption}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        id={id}
        disabled={isDisabled}
      >
        {options.map(({ label, value }, index: number) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      <Icon name={IconName.chevronDown} color={IconColors.black} />
    </div>
  );
};
