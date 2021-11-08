import { useState } from "react";
import { Icon, IconColors, IconName } from "../Icon";

interface DropdownMenuProps {
  id?: string;
  name?: string;
  options: string[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  id,
  name,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const selectOption = (event: any) => {
    options = event.value;
  };
  return (
    <div className={`control ${isFocused ? "focused" : ""}`}>
      <select
        onClick={selectOption}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        id={id}
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
