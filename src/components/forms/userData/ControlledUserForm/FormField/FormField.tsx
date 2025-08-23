import './FormField.css';
import { FormFieldProps } from './FormField.ts';

export function FormField(props: FormFieldProps) {
  const { id, label, errors, name, ref, onChange, onBlur } = props;

  return (
    <div className="form-item">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input id={id} name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
      <div className="helper-text">{errors?.[name]?.message}</div>
    </div>
  );
}
