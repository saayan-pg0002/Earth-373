import { useState } from 'react';
import { Icon, IconName } from '../Icon';

interface RenderAttributesProps {
  id?: string;
  name?: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  attribute: string;
  isClockOut?:boolean
}

export const RenderAttributes: React.FC<RenderAttributesProps> = ({
  id,
  name,
  leftIconName,
  rightIconName,
  attribute,
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  return (
    <div className= {`control ${isFocused ? 'focused' : ''}`}>
      {leftIconName && <Icon name={leftIconName} />}
      <input type='text'
        id={id}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        value = {attribute}
        disabled
      />            
      {rightIconName && <Icon name={rightIconName} />}
    </div>
  );
};
