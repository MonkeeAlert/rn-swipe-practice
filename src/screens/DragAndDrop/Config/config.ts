import 'react-native-reanimated';
import {generateID} from '../../../utils/functions';

export const SIZE = 64;

export const COLS = 2;
export const ROWS = 2;

export const createData = (n: number) => {
  return [...new Array(n)].reduce((a, _, k) => {
    const id = generateID();

    return {
      ...a,
      [id]: {
        id,
        title: `${k}`,
      },
    };
  }, {});
};

export const getPosition = (n: number) => {
  'worklet';
  const x = (n % COLS) * SIZE * COLS;
  const y = Math.floor(n / COLS) * SIZE * ROWS;

  return {x, y};
};

export const getOrder = (x: number, y: number) => {
  'worklet';
  const col = Math.floor(x / SIZE);
  const row = Math.floor(y / SIZE);

  return row * COLS + col;
};
