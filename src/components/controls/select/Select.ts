import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface SelectProps {
  id: string;
  label: string;
  values: string[];
  name: string;
  errors?: Record<string, { message?: string }>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  ref?: Ref<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  selectedValue?: string;
}
