/**
 *
 * https://medium.com/soluto-engineering/size-matters-5aeeb462900a
 */

import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const GUIDELINE_BASE_WIDTH = 350;
const GUIDELINE_BASE_HEIGHT = 680;

/**
 * Получение масштаба по горизонтали
 *
 * @param x размер по горизонтали
 */
const getHorizontalScale = (x: number) => (width / GUIDELINE_BASE_WIDTH) * x;

/**
 * Получение масштаба по вертикали
 *
 * @param y размер по вертикали
 */
const getVerticalScale = (y: number) => (height / GUIDELINE_BASE_HEIGHT) * y;

/**
 * Получение полного масштаба
 *
 * @param size размер
 * @param factor (по умолчанию 0.5)
 */
const getModerateScale = (size: number, factor = 0.5) =>
  size + (getHorizontalScale(size) - size) * factor;

export {getHorizontalScale, getVerticalScale, getModerateScale};
