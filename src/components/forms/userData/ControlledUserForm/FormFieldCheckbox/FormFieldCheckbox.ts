import { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface FormFieldCheckboxProps {
  id: string;
  label: string;
  errors: Record<string, { message?: string }>;
  name: string;
  onChange: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
