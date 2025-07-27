import { ChangeEvent } from 'react';

export enum InputType {
  Text = 'text',
  Search = 'search',
}

export type InputProps = {
  value: string;
  id: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  placeholder?: string;
  isDisabled?: boolean;
};
