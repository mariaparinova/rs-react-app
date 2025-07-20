import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentContainer } from './ContentContainer.tsx';

describe('<ContentContainer>', () => {
  test('checks child is rendered', () => {
    // ACT
    render(
      <ContentContainer>
        <div data-testid="div-content-id">test content</div>
      </ContentContainer>
    );

    // ASSERT
    const div = screen.getByTestId('div-content-id');
    expect(div).toBeInTheDocument();
  });
});
