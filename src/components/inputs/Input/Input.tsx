import { ChangeEvent, Component } from 'react';

export enum InputType {
  Text = 'text',
  Search = 'search',
}

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  value: string;
}

export class Input extends Component<InputProps> {
  render() {
    const { onChange, type = InputType.Text, value } = this.props;
    return <input type={type} onChange={onChange} value={value} />;
  }
}
