import { FC, useState } from "react";
import { GeneralInputProps } from "./FormField";

export interface CheckboxProps {
  isChecked: boolean;
  label?: string;
}

export const Checkbox: FC<GeneralInputProps & CheckboxProps> = ({
  required,
  id,
  name,
  isChecked,
  label,
  isDisabled = false,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const onClick = () => setChecked(!checked);

  return (
    <label className={`checkbox ${isDisabled ? "disabled" : ""}`} htmlFor={id}>
      <input
        required={required}
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onClick}
        disabled={isDisabled}
      />
      <span className="checkmark"></span>
      {label && <p className="label">{label}</p>}
    </label>
  );
};
