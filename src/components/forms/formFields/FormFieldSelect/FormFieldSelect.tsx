import '../FormField/FormField.css';
import { FormFieldSelectProps } from './FormFieldSelect.ts';

export function FormFieldSelect(props: FormFieldSelectProps) {
  const { id, label, values, errors, selectedValue, onBlur, ref, name, onChange } = props;

  return (
    <div className="form-item">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select
        className="select"
        id={id}
        defaultValue={selectedValue}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option key={'key'} value={''} />
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <div className="helper-text">{errors[name]?.message}</div>
    </div>
  );
}
