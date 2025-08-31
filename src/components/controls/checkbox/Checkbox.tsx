import type { CheckboxProps } from './Checkbox.ts';

export function Checkbox(props: CheckboxProps) {
  const { id, label, errors, name, ref, onChange, onBlur, className, disabled = false, checked = false } = props;

  return (
    <div key={id} className="form-item checkbox">
      <input
        type="checkbox"
        id={id}
        className={className}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        checked={checked}
      />
      <label className={`label ${disabled && 'disabled'}`} htmlFor={id}>
        {label}
      </label>
      <div className="helper-text">{errors?.[name]?.message}</div>
    </div>
  );
}
