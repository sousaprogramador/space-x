import { Container } from 'reactstrap';
import Header from './components/Header';
import DataTableWithPagination from './components/DataTableWithPagination';

function App() {
  return (
    <div className="global page-content">
      <Container fluid>
        <Header />

        <DataTableWithPagination />
      </Container>
    </div>
  );
}

export default App;
