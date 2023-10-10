import '@testing-library/jest-dom';

import api from '../../../services';
import Header from '../../../components/Header';
import ResizeObserver from 'resize-observer-polyfill';
import LaunchStats from '../../../interfaces/lauchStats';
import { render, waitFor, screen } from '@testing-library/react';

global.ResizeObserver = ResizeObserver;

jest.mock('../../../services', () => ({
  get: jest.fn(),
}));

const mockLaunches = {
  launchCountByName: [
    {
      _id: 'Falcon 1',
      count: 5,
    },
    {
      _id: 'Falcon 9',
      count: 195,
    },
    {
      _id: 'Falcon Heavy',
      count: 5,
    },
  ],
  successLaunches: 181,
  failureLaunches: 5,
  launchCountByDate: [
    {
      _id: {
        year: 2015,
        name: 'Falcon 9',
      },
      count: 7,
    },
    {
      _id: {
        year: 2019,
        name: 'Falcon 9',
      },
      count: 11,
    },
    {
      _id: {
        year: 2019,
        name: 'Falcon Heavy',
      },
      count: 2,
    },
    {
      _id: {
        year: 2016,
        name: 'Falcon 9',
      },
      count: 9,
    },
    {
      _id: {
        year: 2014,
        name: 'Falcon 9',
      },
      count: 6,
    },
    {
      _id: {
        year: 2022,
        name: 'Falcon 9',
      },
      count: 60,
    },
    {
      _id: {
        year: 2012,
        name: 'Falcon 9',
      },
      count: 2,
    },
    {
      _id: {
        year: 2020,
        name: 'Falcon 9',
      },
      count: 26,
    },
    {
      _id: {
        year: 2008,
        name: 'Falcon 1',
      },
      count: 2,
    },
    {
      _id: {
        year: 2018,
        name: 'Falcon 9',
      },
      count: 20,
    },
    {
      _id: {
        year: 2018,
        name: 'Falcon Heavy',
      },
      count: 1,
    },
    {
      _id: {
        year: 2022,
        name: 'Falcon Heavy',
      },
      count: 2,
    },
    {
      _id: {
        year: 2007,
        name: 'Falcon 1',
      },
      count: 1,
    },
    {
      _id: {
        year: 2017,
        name: 'Falcon 9',
      },
      count: 18,
    },
    {
      _id: {
        year: 2009,
        name: 'Falcon 1',
      },
      count: 1,
    },
    {
      _id: {
        year: 2013,
        name: 'Falcon 9',
      },
      count: 3,
    },
    {
      _id: {
        year: 2006,
        name: 'Falcon 1',
      },
      count: 1,
    },
    {
      _id: {
        year: 2010,
        name: 'Falcon 9',
      },
      count: 2,
    },
    {
      _id: {
        year: 2021,
        name: 'Falcon 9',
      },
      count: 31,
    },
  ],
} as LaunchStats;

const mockApiSuccessResponse = (data: LaunchStats) => {
  (api.get as jest.Mock).mockResolvedValueOnce({ data, status: 200 });
};

describe('Header', () => {
  it('renders the component and fetches launch statistics', async () => {
    mockApiSuccessResponse(mockLaunches);

    render(<Header />);

    await waitFor(() => {
      expect(screen.getByText('Lançamento de foguetes')).toBeInTheDocument();
      expect(screen.getByText('Lançamento por ano')).toBeInTheDocument();
      expect(screen.getByText('Resultados de lançamento:')).toBeInTheDocument();
      expect(screen.getByText('Sucesso:')).toBeInTheDocument();
      expect(screen.getByText('Falha:')).toBeInTheDocument();
    });
  });
});
