import './Error.css';
import { Component } from 'react';
import { ErrorProps, State } from './Error.types.ts';

export class ErrorBoundary extends Component<ErrorProps, State> {
  state = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    if (!(error instanceof Error)) {
      console.warn(`Error is not instanceof Error: ${error}`);
    }

    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
