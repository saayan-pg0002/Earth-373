import { useState } from 'react';
import { Icon, IconName } from '../Icon';

interface TextInputProps {
  required?: boolean;
  id?: string;
  name?: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  placeholderText: string;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  required = true,
  id,
  name,
  leftIconName,
  rightIconName,
  placeholderText,
  type = 'text',
}) => {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  return (
    <div className={`control ${isFocused ? 'focused' : ''}`}>
      {leftIconName && <Icon name={leftIconName} />}
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholderText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {rightIconName && <Icon name={rightIconName} />}
    </div>
  );
};
