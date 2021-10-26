import { useState } from "react";
import { Icon, IconName } from "../Icon";

interface DropdownMenuProps {
  id?: string;
  name?: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  attribute?: string;
  menteeName?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  rightIconName,
  menteeName,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const selectMentee = (event: any) => {
    menteeName = event.value;
  };
  return (
    <div>
      <select
        onClick={selectMentee}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Select Mentee"
        className={`control ${isFocused ? "focused" : ""} regular`}
      >
        <option className="regular" value="Melissa Nguyen">
          {" "}
          Melissa Nguyen
        </option>
        <option className="regular" value="Dianne Russell">
          {" "}
          Dianne Russell
        </option>
        <option className="regular" value="Tessa Pampangan">
          {" "}
          Tessa Pampangan
        </option>
        {rightIconName && <Icon name={rightIconName} />}
      </select>
    </div>
  );
};
