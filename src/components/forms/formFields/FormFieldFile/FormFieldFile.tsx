import '../FormField/FormField.css';
import { FormFieldFileProps } from './FormFieldFile.ts';

export function FormFieldFile(props: FormFieldFileProps) {
  const { id, label, errors, onBlur, ref, name, onChange, className } = props;

  return (
    <div className="form-item file">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`input ${className}`}
        id={id}
        type="file"
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="helper-text">{errors?.[name]?.message}</div>
    </div>
  );
}
