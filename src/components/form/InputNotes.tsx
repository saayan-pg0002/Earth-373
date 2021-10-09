import { useState } from 'react';
import { IconName } from '../Icon';

interface InputNotesProps {
  required?: boolean;
  id?: string;
  name?: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  placeholderText: string;
  type?: string;
  isDisabled?: boolean
  notes?: string
}

export const InputNotes: React.FC<InputNotesProps> = ({
  required,
  id,
  name,
  placeholderText,
  isDisabled,
  notes
}) => {
    
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const onFocus = (): void => setIsFocused(true);
  const onBlur = (): void => setIsFocused(false);
  
  const[inputNotes, setNotes] = useState(notes? notes:"")
  
  const handleNotesChange = (e : any) =>{ 
    if(isDisabled){
      alert("You first need to start the session");
    }
    else{
      setNotes(e.target.value)
    }
    e.preventDefault();
  }

  return (
    <div>
        <textarea className={`control ${isFocused ? 'focused' : ''}`}
          id = {id}
          name={name}
          placeholder={placeholderText}
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputNotes}
          onChange={handleNotesChange}
          disabled = {isDisabled}
        >
          {inputNotes}
        </textarea>
    </div>
  );
};
