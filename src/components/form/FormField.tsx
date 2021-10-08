export interface GeneralInputProps {
  required?: boolean;
  id?: string;
  name?: string;
}

interface FormFieldProps {
  id?: string;
  labelText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  labelText,
  children,
}) => {
  return (
    <div className='form-field'>
      {labelText && (
        <label htmlFor={id} className='subtext'>
          {labelText}
        </label>
      )}
      {children}
    </div>
  );
};
