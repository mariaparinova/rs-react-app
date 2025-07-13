import { ChangeEvent, Component } from 'react';
import { Input, InputType } from '../Input/Input.tsx';

interface InputSearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export class InputSearch extends Component<InputSearchProps> {
  render() {
    const { onChange, value, id, placeholder = '', isDisabled = false } = this.props;
    return (
      <Input
        id={id}
        onChange={onChange}
        type={InputType.Search}
        value={value}
        placeholder={placeholder}
        isDisabled={isDisabled}
      />
    );
  }
}
