import Link from '../ui/Link';
import api from '../../services';
import Footer from './components/Footer';
import Header from './components/Header';
import TableBody from './components/TableBody';
import formatDate from '../../utils/formatDate';
import DataTable from '../../interfaces/dataTable';
import TableHeader from './components/TableHeader';
import LaunchData from '../../interfaces/launchData';
import ListingData from '../../interfaces/listingData';
import { toast, ToastContainer } from 'react-toastify';
import { CardBody, CardHeader, CardFooter } from 'reactstrap';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useTable,
  TableState,
  useFilters,
  useExpanded,
  useRowSelect,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';

import { Container, Table } from './styles';

import 'react-toastify/dist/ReactToastify.css';

const DataTableWithPagination = () => {
  let notify = true;
  const [listingData, setListingData] = useState<ListingData[]>([]);

  const headerTitles = [
    'Número do vôo',
    'Logo',
    'Missão',
    'Data de lançamento',
    'Foguete',
    'Resultado',
    'Video',
  ];

  const data = useMemo(() => listingData, [listingData]);

  const columns = useMemo(
    () =>
      headerTitles.map((title: string) => ({
        Header: title,
        accessor: title,
        disableSortBy: true,
      })),
    []
  );

  const initialState = useMemo(() => {
    return { pageIndex: 0, pageSize: 5 };
  }, []) as Partial<TableState<object>>;

  const dataTable = useTable(
    { data, columns, initialState },
    useGlobalFilter,
    useFilters,
    useExpanded,
    usePagination,
    useRowSelect
  ) as DataTable;

  const {
    page,
    state,
    pageOptions,
    canNextPage,
    headerGroups,
    canPreviousPage,
    gotoPage,
    nextPage,
    prepareRow,
    previousPage,
    getTableProps,
    setGlobalFilter,
    getTableBodyProps,
  } = dataTable;

  const { pageIndex } = state;

  const handleNotification = useCallback(async () => {
    try {
      const { data } = await api.get('/notification');
      const { status, message } = data;

      const position = toast.POSITION.TOP_RIGHT;

      if (status === 'success') {
        toast.success(message, { position });
        return;
      }

      toast.error(message, { position });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSearch = useAsyncDebounce((value: string) => {
    setGlobalFilter(value);
  }, 500);

  const handleLaunchData = useCallback(async () => {
    try {
      const { data, status } = await api.get('/launches');
      if (status === 200) {
        const { results } = data;

        const mappedData = results.map(mapLaunch);
        setListingData(mappedData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const mapLaunch = ({
    links,
    rocket,
    success,
    name: mission,
    date_utc: releaseDateOf,
    flight_number: flightNumber,
  }: LaunchData) => {
    const { name } = rocket;
    const { youtube_id, patch } = links;
    const { small } = patch;

    return {
      [headerTitles[0]]: flightNumber,
      [headerTitles[1]]: <Link link={small} iconName="image" />,
      [headerTitles[2]]: mission,
      [headerTitles[3]]: formatDate(releaseDateOf),
      [headerTitles[4]]: name,
      [headerTitles[5]]: success ? 'Sucesso' : 'Falha',
      [headerTitles[6]]: (
        <Link
          color="red"
          iconName="youtube"
          link={`https://www.youtube.com/watch?v=${youtube_id}`}
        />
      ),
    };
  };

  useEffect(() => {
    handleLaunchData();
  }, []);

  useEffect(() => {
    if (notify) {
      handleNotification();
      notify = false;
    }
  }, [])

  return (
    <Container data-testid="DataTableWithPagination">
      <CardHeader>
        <Header handleSearch={handleSearch} />
      </CardHeader>

      <CardBody>
        <div className="table-responsive">
          <Table
            {...getTableProps()}
            className="table table-borderless table-hover table-dark"
          >
            <TableHeader headerGroups={headerGroups} />

            <TableBody
              page={page}
              columns={columns}
              prepareRow={prepareRow}
              getTableBodyProps={getTableBodyProps}
            />
          </Table>
        </div>
      </CardBody>

      <CardFooter>
        <Footer
          nextPage={nextPage}
          gotoPage={gotoPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          canNextPage={canNextPage}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
        />
      </CardFooter>

      <ToastContainer />
    </Container>
  );
};

export default DataTableWithPagination;
