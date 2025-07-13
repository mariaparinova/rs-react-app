import './Input.css';
import { ChangeEvent, Component } from 'react';

export enum InputType {
  Text = 'text',
  Search = 'search',
}

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  type?: InputType;
  placeholder?: string;
  isDisabled?: boolean;
}

export class Input extends Component<InputProps> {
  render() {
    const { onChange, type = InputType.Text, value, id, placeholder = '', isDisabled = false } = this.props;
    return (
        <>
          <label htmlFor={id}></label>
          <input placeholder={placeholder} id={id} className='input' type={type} onChange={onChange} value={value} disabled={isDisabled} />
        </>
    );
  }
}
