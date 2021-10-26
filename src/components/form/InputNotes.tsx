import { useState } from "react";
import { IconName } from "../Icon";

interface InputNotesProps {
  required?: boolean;
  id?: string;
  name?: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  placeholderText: string;
  type?: string;
  isDisabled?: boolean;
  notes?: string;
}

export const InputNotes: React.FC<InputNotesProps> = ({
  required,
  id,
  name,
  placeholderText,
  isDisabled,
  notes,
}) => {
  const [inputNotes, setNotes] = useState(notes ? notes : "");
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);

  const handleNotesChange = (e: any) => {
    if (isDisabled) {
      alert("You first need to start the session");
    } else {
      setNotes(e.target.value);
    }
    e.preventDefault();
  };

  return (
    <div className={`input-notes control ${isFocused ? "focused" : ""}`}>
      <textarea
        id={id}
        name={name}
        placeholder={placeholderText}
        value={inputNotes}
        onChange={handleNotesChange}
        disabled={isDisabled}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {inputNotes}
      </textarea>
    </div>
  );
};
