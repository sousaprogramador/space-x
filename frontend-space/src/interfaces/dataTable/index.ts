import { TableInstance } from 'react-table';

interface DataTable extends TableInstance {
  page: any;
  pageOptions: number[];
  canNextPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  canPreviousPage: boolean;
  gotoPage: (pageIndex: number) => void;
  setGlobalFilter: (value: string) => void;
  state: {
    pageSize: number;
    pageIndex: number;
    hiddenColumns: string[];
  };
}

export default DataTable;
