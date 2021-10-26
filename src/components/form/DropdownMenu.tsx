import { useState } from "react";

interface DropdownMenuProps {
  id?: string;
  name?: string;
  menteeName?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ menteeName }) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const selectMentee = (event: any) => {
    menteeName = event.value;
  };
  return (
    <div className={`control ${isFocused ? "focused" : ""}`}>
      <select
        onClick={selectMentee}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Select Mentee"
      >
        <option value="Melissa Nguyen">Melissa Nguyen</option>
        <option value="Dianne Russell">Dianne Russell</option>
        <option value="Tessa Pampangan"> Tessa Pampangan</option>
      </select>
    </div>
  );
};
