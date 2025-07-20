import './Input.css';
import { ChangeEvent, Component } from 'react';

export enum InputType {
  Text = 'text',
  Search = 'search',
}

type InputProps = {
  value: string;
  id: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  placeholder?: string;
  isDisabled?: boolean;
};

export class Input extends Component<InputProps> {
  render() {
    const { onChange, type = InputType.Text, value, id, placeholder = '', isDisabled = false } = this.props;

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
  }
}
