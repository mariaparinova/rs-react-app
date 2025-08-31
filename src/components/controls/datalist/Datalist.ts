import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface DatalistProps {
  id: string;
  label: string;
  values: string[];
  name: string;
  errors?: Record<string, { message?: string }>;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  selectedValue?: string;
}
