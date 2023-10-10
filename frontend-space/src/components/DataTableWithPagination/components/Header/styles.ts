import { Button } from 'reactstrap';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  strong {
    width: 100%;
    color: var(--text-muted);
  }

  @media (max-width: 750px) {
    gap: 1rem;
    flex-direction: column;
  }
`;

export const InputSearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const IconContainer = styled(Button)`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  border: none !important;
  justify-content: center;
  background-color: #262a2f;
  border-radius: 0 0.375rem 0.375rem 0;
`;

export const InputSearch = styled.input`
  width: 20rem;
  border: none;
  outline: none;
  height: 2.5rem;
  color: #ced4da;
  padding: 0 1rem;
  margin-left: -1px;
  background-color: #262a2f;
  border-radius: 0.375rem 0 0 0.375rem;

  &::placeholder,
  :-ms-input-placeholder,
  ::-webkit-input-placeholder {
    color: #ced4da;
  }

  @media (max-width: 750px) {
    width: 100%;
  }
`;
