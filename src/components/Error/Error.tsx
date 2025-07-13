import './Error.css';
import { Component, ReactNode } from 'react';
import { Button, ButtonStyle } from '../Button/Button.tsx';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

const initState: ErrorBoundaryState = {
  hasError: false,
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = initState;

  static getDerivedStateFromError(error: unknown) {
    console.error('Rendering error:', error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="error">
          <h3>Error</h3>
          <div>Oops! Something went wrong.</div>
          <Button style={ButtonStyle.Primary} isDisabled={false} onClick={() => this.setState({ hasError: false })}>
            Go back
          </Button>
        </div>
      );
    }

    return children;
  }
}
