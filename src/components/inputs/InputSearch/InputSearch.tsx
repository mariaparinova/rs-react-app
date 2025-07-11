import { ChangeEvent, Component } from 'react';
import { Input, InputType } from '../Input/Input.tsx';

interface InputSearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export class InputSearch extends Component<InputSearchProps> {
  render() {
    const { onChange, value } = this.props;
    return <Input onChange={onChange} type={InputType.Search} value={value} />;
  }
}
