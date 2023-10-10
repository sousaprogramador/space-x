import { HeaderGroup } from 'react-table';

interface Props {
  headerGroups: HeaderGroup<{}>[];
}

const TableHeader = ({ headerGroups }: Props) => {
  return (
    <thead>
      {headerGroups.map((headerGroup: any) => (
        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => {
            return (
              <th scope="col" key={column.id}>
                {column.render('Header')}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
