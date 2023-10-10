import { Badge } from 'reactstrap';
import EmpatyData from '../../../ui/EmpatyData';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

interface Props {
  page: any;
  columns: {
    Header: string;
    accessor: string;
    disableSortBy: boolean;
  }[];
  prepareRow: (row: Row<{}>) => void;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<{}> | undefined
  ) => TableBodyProps;
}

const TableBody = ({ page, columns, prepareRow, getTableBodyProps }: Props) => {
  const renderCell = (cell: any) => {
    const { column } = cell;
    const { Header } = column;

    if (Header === 'Resultado') {
      return (
        <td key={cell.id} {...cell.getCellProps()}>
          <Badge color={cell.value === 'Sucesso' ? 'success' : 'danger'} pill>
            {cell.render('Cell')}
          </Badge>
        </td>
      );
    }

    return (
      <td key={cell.id} {...cell.getCellProps()}>
        <strong>{cell.render('Cell')}</strong>
      </td>
    );
  };

  return (
    <tbody {...getTableBodyProps()}>
      {page.length === 0 ? (
        <tr>
          <td colSpan={columns.length}>
            <EmpatyData />
          </td>
        </tr>
      ) : (
        <>
          {page.map((row: any) => {
            prepareRow(row);

            return (
              <tr key={row.getRowProps().key} className="table-active">
                {row.cells.map((cell: any) => renderCell(cell))}
              </tr>
            );
          })}
        </>
      )}
    </tbody>
  );
};

export default TableBody;
