import { Icon, IconName } from '../Icon';
import { useState } from 'react';
import { GeneralInputProps } from './FormField';

export const PasswordInput: React.FC<GeneralInputProps> = ({
  required = true,
  id,
  name,
}) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const rightIconName = showPassword ? IconName.eyeCrossed : IconName.eye;

  const onClickToggleShowPassword = (): void => setShowPassword(!showPassword);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  return (
    <div className={`control ${isFocused ? 'focused' : ''}`}>
      <Icon name={IconName.lock} />
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        required={required}
        placeholder='Password'
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <span onClick={onClickToggleShowPassword}>
        <Icon name={rightIconName} />
      </span>
    </div>
  );
};
