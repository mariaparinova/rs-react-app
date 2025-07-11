import { Component } from 'react';

interface TableProps {
  columnNames: string[];
  tableData: Record<string, string>[];
}

export class Table extends Component<TableProps> {
  render() {
    const { columnNames, tableData } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {columnNames.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              {columnNames.map((col) => (
                <td key={col}>{row[col.toLowerCase()]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
