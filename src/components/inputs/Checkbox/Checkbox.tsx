import styles from './Checkbox.module.css';
import { CheckboxProps } from './Checkbox.types.ts';
import clsx from 'clsx';

export function Checkbox(props: CheckboxProps) {
  const { label, onChange, isChecked, id, containerClassName, inputClassName, labelClassName } = props;
  const inputClassNames = clsx('checkbox', inputClassName);
  const containerClassNames = clsx(styles.checkboxContainer, containerClassName);
  const labelClassNames = clsx('checkbox-label', labelClassName);

  return (
    <div className={containerClassNames}>
      <input id={id} type="checkbox" className={inputClassNames} onChange={onChange} checked={isChecked} />
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
