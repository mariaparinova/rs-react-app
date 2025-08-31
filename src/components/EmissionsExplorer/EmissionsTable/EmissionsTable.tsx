import './EmissionsTable.css';
import type { EmissionsTableProps } from './EmissionsTable.ts';
import { memo } from 'react';

function EmissionsTableComponent(props: EmissionsTableProps) {
  const { headers, data } = props;

  return (
    <div className="table-container">
      <table className="table emissions">
        <thead className="thead">
          <tr>
            {headers.map((h) => (
              <td key={h} className="td">
                {h.split('_').join(' ')}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataArr) => (
            <tr key={`ems-tr-${dataArr[0]}`}>
              {dataArr.map((d: string, i: number) => (
                <td key={`ems-td-${dataArr[0]}-${d}-${i}`} className="td">
                  {d}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const EmissionsTable = memo(EmissionsTableComponent);
