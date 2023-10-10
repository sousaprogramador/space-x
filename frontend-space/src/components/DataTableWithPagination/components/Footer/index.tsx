import { FC } from 'react';
import { Row } from 'reactstrap';
import Icon from '../../../ui/Icon';

import { BackAndNextButton, ButtonItem } from './styles';

interface Props {
  pageIndex: number;
  nextPage: () => void;
  canNextPage: boolean;
  pageOptions: number[];
  previousPage: () => void;
  canPreviousPage: boolean;
  gotoPage: (pageIndex: number) => void;
}

const Footer: FC<Props> = ({
  gotoPage,
  nextPage,
  pageIndex,
  pageOptions,
  canNextPage,
  previousPage,
  canPreviousPage,
}) => {
  return (
    <Row>
      <div className="pagination pagination-separated pagination-md justify-content-end gap-1 mb-0">
        {pageOptions.map((item, key) => (
          <ButtonItem
            key={key}
            onClick={() => gotoPage(item)}
            color={pageIndex === item ? 'success' : 'dark'}
          >
            {item + 1}
          </ButtonItem>
        ))}

        <div className="d-flex gap-1">
          <BackAndNextButton
            type="button"
            color={'dark'}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <Icon size={1.3} name="chevronLeft" />
          </BackAndNextButton>

          <BackAndNextButton
            type="button"
            color={'dark'}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <Icon size={1.3} name="chevronRight" />
          </BackAndNextButton>
        </div>
      </div>
    </Row>
  );
};

export default Footer;
