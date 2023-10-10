import { Card } from 'reactstrap';
import styled from 'styled-components';

export const Container = styled(Card)`
  width: 100%;
  display: flex;
  background-color: gray;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: var(--secondary-color) !important;
`;

export const Table = styled.table`
  border-radius: 0.375rem;
  background-color: var(--secundary-color) !important;
`;
