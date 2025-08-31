import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export enum InputType {
  Text = 'text',
  Password = 'password',
  Number = 'number',
  Email = 'email',
  Search = 'search',
}

export interface InputProps {
  id: string;
  label: string;
  name: string;
  errors?: Record<string, { message?: string }>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  inputType?: InputType;
  tabindex?: number;
  className?: string;
  defaultValue?: string;
}
