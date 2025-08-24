import './FormFieldCheckbox.css';
import '../FormField/FormField.css';
import { FormFieldCheckboxProps } from './FormFieldCheckbox.ts';

export function FormFieldCheckbox(props: FormFieldCheckboxProps) {
  const { id, label, errors, name, ref, onChange, onBlur } = props;

  return (
    <div key={id} className="form-item checkbox">
      <input type="checkbox" id={id} name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="helper-text">{errors[name]?.message}</div>
    </div>
  );
}
