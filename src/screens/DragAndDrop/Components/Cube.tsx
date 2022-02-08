import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  SharedValue,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {getOrder, getPosition, SIZE} from '../Config/config';

interface IProps {
  title: string;
  id: string;
  map: SharedValue<any>;
}

type Context = {
  x: number;
  y: number;
};

export const Cube = ({id, map, title}: IProps) => {
  const {styles} = useStyles();

  const position = getPosition(map.value[id]);

  const isDragging = useSharedValue(false);

  // drag and drop shared values
  const translationX = useSharedValue(position.x);
  const translationY = useSharedValue(position.y);
  const tStyle = useAnimatedStyle(() => {
    return {
      zIndex: +isDragging.value,
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  }, [translationX, translationY]);

  const recalculate = (m: any) => {
    'worklet';
    const _map = getPosition(m);

    translationX.value = withSpring(_map.x);
    translationY.value = withSpring(_map.y);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: Context) => {
      isDragging.value = true;

      ctx.x = translationX.value;
      ctx.y = translationY.value;
    },
    onActive: (e, ctx: Context) => {
      translationX.value = e.translationX + ctx.x;
      translationY.value = e.translationY + ctx.y;

      const oldIdx = map.value[id];
      const newIdx = getOrder(translationX.value, translationY.value);

      if (oldIdx !== newIdx) {
        const to = Object.keys(map.value).find(k => map.value[k] === newIdx);

        if (to) {
          const _map = JSON.parse(JSON.stringify(map.value));

          _map[id] = newIdx;
          _map[to] = oldIdx;

          map.value = _map;
        }
      }
    },
    onEnd: () => {
      recalculate(map.value[id]);
      isDragging.value = false;
    },
  });

  useAnimatedReaction(
    () => map.value[id],
    next => {
      if (!isDragging.value) {
        recalculate(next);
      }
    },
  );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, tStyle]}>
        <Text style={styles.text}>{title ?? 'Title'}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const useStyles = () => {
  const {colors, fonts} = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: SIZE,
      height: SIZE,
      borderWidth: 2,
      borderRadius: defaultBorderRadius,
      borderStyle: 'dashed',
      borderColor: colors.darkGrey,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    text: {
      color: colors.darkGrey,
      fontSize: fonts.medium,
    },
  });

  return {styles};
};
