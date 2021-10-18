import {colors} from './constants';
import {getModerateScale} from './Scaling';

export const useTheme = () => {
  const fonts = {
    small: getModerateScale(14 - 2),
    regular: getModerateScale(16 - 2),
    medium: getModerateScale(18 - 2),
    large: getModerateScale(20 - 2),
  };

  return {colors, fonts};
};
