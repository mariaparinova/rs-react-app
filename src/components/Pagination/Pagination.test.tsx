import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Pagination } from './Pagination.tsx';
import userEvent from '@testing-library/user-event';

describe('<Pagination>', () => {
  test('checks pagination has button "To previous page"', () => {
    // ACT
    render(
      <Pagination activePage={1} totalPages={10} nextPageClickHandler={() => {}} previousPageClickHandler={() => {}} />
    );

    // ASSERT
    const prevPageBtn = screen.getByTestId('to-previous');
    expect(prevPageBtn).toBeInTheDocument();
  });

  test('checks pagination has button "To next page"', () => {
    // ACT
    render(
      <Pagination activePage={1} totalPages={10} nextPageClickHandler={() => {}} previousPageClickHandler={() => {}} />
    );

    // ASSERT
    const nextPageBtn = screen.getByTestId('to-next');
    expect(nextPageBtn).toBeInTheDocument();
  });

  test('checks pagination has text content', () => {
    // ACT
    render(
      <Pagination activePage={1} totalPages={10} nextPageClickHandler={() => {}} previousPageClickHandler={() => {}} />
    );

    // ASSERT
    const pagination = screen.getByTestId('pagination');
    const textContent_1 = screen.getByTestId('active-page');
    const elementWithTextContent_of = pagination.querySelector('.pagination-content');
    const textContent_10 = screen.getByTestId('total-pages');

    expect(textContent_1).toBeInTheDocument();
    expect(textContent_10).toBeInTheDocument();
    expect(elementWithTextContent_of).toHaveTextContent('of');
  });

  test('checks button "To previous page" is disabled when active page is 1', () => {
    // ACT
    render(
      <Pagination activePage={1} totalPages={10} nextPageClickHandler={() => {}} previousPageClickHandler={() => {}} />
    );

    // ASSERT
    const prevPageBtn = screen.getByTestId('to-previous');
    expect(prevPageBtn).toBeDisabled();
  });

  test('checks button "To next page" is disabled when active page equal to total pages', () => {
    // ACT
    render(
      <Pagination activePage={10} totalPages={10} nextPageClickHandler={() => {}} previousPageClickHandler={() => {}} />
    );

    // ASSERT
    const nextPageBtn = screen.getByTestId('to-next');
    expect(nextPageBtn).toBeDisabled();
  });

  test('checks buttons "To next page", "To previous page" are disabled when active page is undefined', () => {
    // ACT
    render(<Pagination activePage={10} nextPageClickHandler={() => {}} previousPageClickHandler={() => {}} />);

    // ASSERT
    const prevPageBtn = screen.getByTestId('to-previous');
    const nextPageBtn = screen.getByTestId('to-next');

    expect(prevPageBtn).toBeDisabled();
    expect(nextPageBtn).toBeDisabled();
  });

  test('checks previousPageClickHandler is called when button "To previous page" was clicked', async () => {
    // ARRANGE
    const previousPageClickHandler = vi.fn();

    // ACT
    render(
      <Pagination
        activePage={10}
        nextPageClickHandler={() => {}}
        previousPageClickHandler={previousPageClickHandler}
        totalPages={10}
      />
    );

    const prevPageBtn = screen.getByTestId('to-previous');
    await waitFor(() => userEvent.click(prevPageBtn));

    // ASSERT
    expect(previousPageClickHandler).toHaveBeenCalled();
  });

  test('checks nextPageClickHandler is called when button "To next page" was clicked', async () => {
    // ARRANGE
    const nextPageClickHandler = vi.fn();

    // ACT
    render(
      <Pagination
        activePage={8}
        nextPageClickHandler={nextPageClickHandler}
        previousPageClickHandler={() => {}}
        totalPages={10}
      />
    );

    const nextPageBtn = screen.getByTestId('to-next');
    await waitFor(() => userEvent.click(nextPageBtn));

    // ASSERT
    expect(nextPageClickHandler).toHaveBeenCalled();
  });
});
