import { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface FormFieldDatalistProps {
  id: string;
  label: string;
  values: string[];
  errors: Record<string, { message?: string }>;
  name: string;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  selectedValue?: string;
}
