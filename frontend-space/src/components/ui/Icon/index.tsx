import iconsName from '../../constants/iconsName';

import { I } from './styles';

type IconsNameKey = keyof typeof iconsName;

interface Props {
  size?: number;
  color?: string;
  name: IconsNameKey;
}

export default function Icon({ color, name, size }: Props) {
  const iconName = iconsName[name];

  if (!iconName) return null;

  return <I className={iconName} color={color} size={size} />;
}
