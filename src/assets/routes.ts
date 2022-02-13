import {ColorValue} from 'react-native';
import {IMAGES} from './imagesURI';

interface IRoute {
  key: string;
  title: string;
  route: string;
  color?: ColorValue;
  background: string;
}

export const routes: IRoute[] = [
  {
    key: 'Circle',
    title: 'Circle',
    route: 'CircleOverBorders',
    background: IMAGES.diagonals,
  },
  {
    key: 'Todos',
    title: 'Todos',
    route: 'Todos',
    color: '#4caf50',
    background: IMAGES.lines,
  },
  {
    key: 'DragAndDrop',
    title: 'Cubes',
    route: 'DragAndDrop',
    color: '#b00020',
    background: IMAGES.cubes,
  },
];
