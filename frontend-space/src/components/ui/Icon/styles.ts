import styled from 'styled-components';

interface IconProps {
  size?: number;
  color?: string;
}

export const I = styled.i<IconProps>`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color ?? '#878a99'};
  font-size: ${({ size }) => `${size ?? 1.5}rem`};
`;
