import {CardStyleInterpolators} from '@react-navigation/stack';
import CircleOverBordersScreen from '../screens/CircleOverBordersScreen';

export const routes = [
  {
    key: 'DragCircle',
    title: 'Drag circle',
    route: 'CircleOverBorders',
    component: CircleOverBordersScreen,
    options: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerShown: false,
    },
  },
];
