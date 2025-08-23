import { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface FormFieldSelectProps {
  id: string;
  label: string;
  values: string[];
  errors: Record<string, { message?: string }>;
  name: string;
  onChange: ChangeEventHandler;
  ref?: Ref<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  selectedValue?: string;
}
