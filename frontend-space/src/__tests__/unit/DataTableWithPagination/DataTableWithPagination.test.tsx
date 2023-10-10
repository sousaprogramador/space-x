import 'regenerator-runtime';
import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import DataTableWithPagination from '../../../components/DataTableWithPagination';

describe('DataTableWithPagination', () => {
  it('renders without errors', async () => {
    render(<DataTableWithPagination />);

    await waitFor(() => {
      expect(screen.getByTestId('DataTableWithPagination')).toBeInTheDocument();
    });
  });
});
