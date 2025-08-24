import '../FormField/FormField.css';
import { FormFieldDatalistProps } from './FormFieldDatalist.ts';

export function FormFieldDatalist(props: FormFieldDatalistProps) {
  const { id, label, values, errors, selectedValue, onChange, name, ref, onBlur } = props;

  return (
    <div className="form-item">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        id={id}
        list={`list-${id}`}
        value={selectedValue}
        onChange={onChange}
        name={name}
        ref={ref}
        onBlur={onBlur}
      />

      <datalist id={`list-${id}`}>
        {values.map((v: string) => (
          <option key={v} value={v} />
        ))}
      </datalist>
      <div className="helper-text">{errors[name]?.message}</div>
    </div>
  );
}
