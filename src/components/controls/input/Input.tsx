import type { InputProps } from './Input.ts';
import { InputType } from './Input.ts';

export function Input(props: InputProps) {
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
    inputType = InputType.Text,
  } = props;

  return (
    <div className="form-item">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        type={inputType}
        className={`input ${className}`}
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
