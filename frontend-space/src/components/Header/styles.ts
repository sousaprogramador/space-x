import styled from 'styled-components';
import { Card, CardHeader } from 'reactstrap';

export const HeaderContainer = styled.div`
  text-align: center;
`;

export const CardHeaderStyled = styled(CardHeader)`
  color: var(--text-muted) !important;
`;

export const ContainerDataLaunches = styled.div`
  strong {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    justify-content: flex-start;
  }

  div {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .success {
    color: green;
  }

  .failure {
    color: red;
  }
`;

export const CardStyled = styled(Card)`
  height: 100%;
  border: none;
  text-align: center;
  transition: all 0.4s;
  background-color: var(--secondary-color) !important;

  &:hover {
    transform: translateY(calc(-1.5rem / 5));
    box-shadow: 0 0.3125rem 0.625rem rgba(30, 32, 37, 0.12);
  }
`;

export const TitleContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 3rem;
  }

  h1 {
    color: var(--text-muted);
  }
`;
