import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './Error.tsx';

describe('<ErrorBoundary>', () => {
  test('checks that Error component triggers fallback element', () => {
    // ARRANGE
    const fallbackElement = <div>Error was caught</div>;
    const BuggyComponent = () => {
      throw new Error('error for testing');
    };

    // ACT
    render(
      <ErrorBoundary fallback={fallbackElement}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    // ASSERT
    expect(screen.getByText('Error was caught')).toBeInTheDocument();
  });

  test('checks that Error warns non-Error exceptions', () => {
    // ARRANGE
    const fallbackElement = <div></div>;
    const BuggyComponent = () => {
      throw 'error for testing';
    };
    using consoleSpy = vi.spyOn(console, 'warn');

    // ACT
    render(
      <ErrorBoundary fallback={fallbackElement}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    // ASSERT
    expect(consoleSpy).toHaveBeenCalled();
  });
});
