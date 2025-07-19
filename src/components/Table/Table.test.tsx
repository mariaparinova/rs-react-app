import { render, screen } from '@testing-library/react';
import { Table } from './Table.tsx';

describe('<Table>', () => {
  test('that table renders right number of columns', () => {
    // ARRANGE
    const columnNames = ['id', 'name'];
    const data = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Pete' },
      { id: '3', name: 'Nano' },
    ];

    // ACT
    render(<Table columnNames={columnNames} tableData={data} />);

    // ASSERT
    const thead = screen.getByTestId('thead-id');
    const theadCols = thead.querySelectorAll('th');

    expect(theadCols.length).toEqual(2);
  });

  test('that table renders data in the head correctly', () => {
    // ARRANGE
    const columnNames = ['id', 'name'];
    const data = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Pete' },
      { id: '3', name: 'Nano' },
    ];

    // ACT
    render(<Table columnNames={columnNames} tableData={data} />);

    // ASSERT
    const thead = screen.getByTestId('thead-id');
    const theadCols = thead.querySelectorAll('th');

    expect(theadCols[0]).toHaveTextContent('id');
    expect(theadCols[1]).toHaveTextContent('name');
  });

  test('that table renders data in the body correctly', () => {
    // ARRANGE
    const columnNames = ['id', 'name'];
    const data = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Pete' },
      { id: '3', name: 'Nano' },
    ];

    // ACT
    render(<Table columnNames={columnNames} tableData={data} ariaLabel="Test table" />);

    // ASSERT
    const table = screen.getByRole('table', { name: 'Test table' });
    const tbody = table.querySelector('tbody');
    const firstRow = tbody!.querySelector('tr');
    const firstRowCols = firstRow?.querySelectorAll('td');

    expect(firstRowCols ? firstRowCols[0] : undefined).toHaveTextContent('1');
    expect(firstRowCols ? firstRowCols[1] : undefined).toHaveTextContent('John');
  });
});
