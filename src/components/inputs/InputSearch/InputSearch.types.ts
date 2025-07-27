import { ChangeEvent } from 'react';

export interface InputSearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
}
