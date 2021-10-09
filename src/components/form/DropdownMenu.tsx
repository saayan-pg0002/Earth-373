import { useState } from 'react';
import { Icon, IconName } from '../Icon';

interface DropdownMenuProps {
  id?: string;
  name?: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  attribute?: string;
  menteeName?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  rightIconName,
  menteeName
}) => {
     
  const selectMentee = (event : any) =>{
     menteeName = event.value;
  }

  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  return (
    <div >
      <select onClick = {selectMentee} 
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder='Select Mentee'
        className={`control ${isFocused ? 'focused' : ''}`}
        >
        <option value='Melissa Nguyen'> Melissa Nguyen</option>
        <option value='Dianne Russell'> Dianne Russell</option>
        <option value='Tessa Pampangan'> Tessa Pampangan</option>
        {rightIconName && <Icon name={rightIconName}/>}
      </select>
    </div>
  );
};
