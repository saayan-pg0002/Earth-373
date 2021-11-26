import { useState, ChangeEvent } from "react";
import { Icon, IconColors, IconName } from "../Icon";
import { GeneralInputProps } from "./FormField";

interface DropdownMenuProps {
  options: string[];
  initialValue?: string;
}

export const DropdownMenu: React.FC<GeneralInputProps & DropdownMenuProps> = ({
  options,
  id,
  name,
  isDisabled = false,
  initialValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    initialValue ?? options[0]
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
        {options.map((item: string, index: number) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Icon name={IconName.chevronDown} color={IconColors.black} />
    </div>
  );
};
