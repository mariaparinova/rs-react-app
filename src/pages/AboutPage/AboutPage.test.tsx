import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage.tsx';
import { expect, describe, test } from 'vitest';
import '@testing-library/jest-dom';

describe('<AboutPage>', () => {
  test('checks info about author', () => {
    // ACT
    render(<AboutPage />);

    // ASSERT
    const authorName = screen.getByText('Maria Parinova');
    const authorDescription = screen.getByTestId('description');
    expect(authorName).toBeInTheDocument();
    expect(authorDescription).toBeInTheDocument();
  });

  test('checks link to RSS react course', () => {
    // ACT
    render(<AboutPage />);

    // ASSERT
    const link = screen.getByRole('link', { name: 'React course' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
