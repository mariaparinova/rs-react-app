import { ReactNode } from 'react';

export interface ErrorProps {
  children?: ReactNode;
  fallback: ReactNode;
}

export interface State {
  hasError: boolean;
}
