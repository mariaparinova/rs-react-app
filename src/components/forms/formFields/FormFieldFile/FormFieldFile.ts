import { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

export interface FormFieldFileProps {
  id: string;
  label: string;
  errors: Record<string, { message?: string }>;
  name: string;
  onChange?: ChangeEventHandler;
  ref?: Ref<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  className?: string;
}
