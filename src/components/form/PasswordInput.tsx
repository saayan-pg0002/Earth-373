import { Icon, IconName } from "../Icon";
import { useState } from "react";
import { GeneralInputProps } from "./FormField";

export const PasswordInput: React.FC<GeneralInputProps> = ({
  required = true,
  id,
  name,
  value,
  isDisabled = false,
}) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const rightIconName = showPassword ? IconName.eyeCrossed : IconName.eye;

  const onClickToggleShowPassword = (): void => setShowPassword(!showPassword);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  return (
    <div
      className={`control ${isFocused ? "focused" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
    >
      <Icon name={IconName.lock} />
      <input
        value={value}
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        required={required}
        placeholder="Password"
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={isDisabled}
      />
      <span onClick={onClickToggleShowPassword}>
        <Icon name={rightIconName} />
      </span>
    </div>
  );
};
