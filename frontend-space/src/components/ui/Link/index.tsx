import Icon from '../Icon';
import iconsName from '../../constants/iconsName';

import { Container } from './styles';

type IconsNameKey = keyof typeof iconsName;

interface Props {
  link: string;
  color?: string;
  iconName: IconsNameKey;
}

export default function Link({ color, link, iconName }: Props) {
  return (
    <Container>
      <a href={link} target="_blank">
        <Icon name={iconName} color={color} />
      </a>
    </Container>
  );
}
