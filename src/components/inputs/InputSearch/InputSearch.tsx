import { Input } from '../Input/Input.tsx';
import { InputSearchProps } from './InputSearch.types.ts';
import { InputType } from '../Input/Input.types.ts';

export const InputSearch = (props: InputSearchProps) => {
  const { onChange, value, id, placeholder = '', isDisabled = false } = props;

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
};
