import { useState } from "react";

interface DropdownMenuProps {
  id?: string;
  name?: string;
  options: string[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ options }) => {
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
        placeholder="Select Mentee"
      >
        {options.map((item: string) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};
