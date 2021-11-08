import { FC, useState } from "react";
import { GeneralInputProps } from "./FormField";

export interface CheckboxProps {
  isChecked: boolean;
}

export const Checkbox: FC<GeneralInputProps & CheckboxProps> = ({
  required,
  id,
  name,
  value,
  isChecked,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const onClick = () => setChecked(!checked);

  return (
    <label className="checkbox" htmlFor={id}>
      <input
        required={required}
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onClick}
      />
      <span className="checkmark"></span>
    </label>
  );
};
