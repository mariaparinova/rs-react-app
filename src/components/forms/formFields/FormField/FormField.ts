import { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export enum InputTyp {
  Text = 'text',
  Password = 'password',
  Number = 'number',
}

export interface FormFieldProps {
  id: string;
  label: string;
  errors: Record<string, { message?: string }>;
  name: string;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  inputType?: InputTyp;
  tabindex?: number;
  className?: string;
  defaultValue?: string;
}
