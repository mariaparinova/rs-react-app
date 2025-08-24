import './FormField.css';
import { FormFieldProps, InputTyp } from './FormField.ts';

export function FormField(props: FormFieldProps) {
  const {
    id,
    label,
    errors,
    name,
    ref,
    onChange,
    onBlur,
    tabindex,
    className,
    defaultValue,
    inputType = InputTyp.Text,
  } = props;

  return (
    <div className="form-item">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        type={inputType}
        className={className}
        id={id}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        tabIndex={tabindex}
        defaultValue={defaultValue}
      />
      <div className="helper-text">{errors?.[name]?.message}</div>
    </div>
  );
}
