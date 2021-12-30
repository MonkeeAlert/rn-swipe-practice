import {Dimensions} from 'react-native';

// Theme colors
export const colors = {
  white: '#fff',
  black: '#141414',
  grey: '#e0e0e0',
  lightGrey: '#eeeeee',
  darkGrey: '#aeaeae',
  infoMain: '#0288d1',
  infoLight: '#03a9f4',
  infoDark: '#01579b',
  successMain: '#2e7d32',
  successLight: '#4caf50',
  successDark: '#1b5e20',
  error: '#b00020',
  completed: '#aed581',
};

export const borders = Dimensions.get('screen').width - 100;
export const defaultBorderRadius = 6;

// Placeholers for todos
export const defaultTodoPlaceholders = [
  'Wash the dishes',
  'Make the bed',
  'Buy some food',
  'Jogging',
  'Watch Netflix',
];

// Days
export const days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

// Months
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const defaultAnimationTiming = 500;
