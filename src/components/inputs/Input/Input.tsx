import './Input.css';
import { InputProps, InputType } from './Input.types.ts';

export const Input = (props: InputProps) => {
  const { onChange, type = InputType.Text, value, id, placeholder = '', isDisabled = false } = props;

  return (
    <>
      <label htmlFor={id}></label>
      <input
        placeholder={placeholder}
        id={id}
        className="input"
        type={type}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
      />
    </>
  );
};
