import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface CheckboxProps {
  id: string;
  label: string;
  name: string;
  errors?: Record<string, { message?: string }>;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
}
