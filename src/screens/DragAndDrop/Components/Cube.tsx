import {Text, StyleSheet, LayoutChangeEvent} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultBorderRadius} from '../../../utils/constants';
import {useTheme} from '../../../utils/hooks';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {ICube} from '../../../utils/types';

interface IProps {
  title: string;
  map: {[name: string]: ICube};
  overflowedRef: {value: any};
  onLoading: (item: ICube) => void;
}

type Context = {
  x: number;
  y: number;
};

interface ICubeInfo {
  name: string;
  dx: number;
  dy: number;
}

const SIZE = 64;

const getIndex = (item: ICubeInfo, map: any) => {
  'worklet';

  for (const k in map) {
    if (k === item.name) {
      // skipping comparing element with itself
      continue;
    } else {
      const dx = map[item.name].x - map[k].x + item.dx;
      const dy = map[item.name].y - map[k].y + item.dy;

      if (Math.abs(dx) < SIZE && Math.abs(dy) < SIZE) {
        return k;
      }
    }
  }
};

const reorderMap = (map: any, changerIdx: string, changeableIdx: string) => {
  'worklet';
  const _map = JSON.parse(JSON.stringify(map));

  const temp = _map[changerIdx];
  _map[changerIdx] = _map[changeableIdx];
  _map[changeableIdx] = temp;

  return _map;
};

export const Cube = (props: IProps) => {
  const {styles} = useStyles();

  const [layout, setLayout] =
    useState<LayoutChangeEvent['nativeEvent']['layout']>();
  const [moving, setMoving] = useState(false);

  const overflowed = useSharedValue<string | null>(null);

  // drag and drop shared values
  const translationX = useSharedValue(props.map.value[props.title]?.x ?? 0);
  const translationY = useSharedValue(props.map.value[props.title]?.y ?? 0);
  const tStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  }, [translationX, translationY]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: Context) => {
      context.x = translationX.value;
      context.y = translationY.value;

      runOnJS(setMoving)(true);
    },
    onActive: (e, context: Context) => {
      translationX.value = e.translationX + context.x;
      translationY.value = e.translationY + context.y;

      const _item: ICubeInfo = {
        name: props.title,
        dx: translationX.value,
        dy: translationY.value,
      };

      const overflowingIdx = getIndex(_item, props.map.value);

      if (overflowingIdx) {
        overflowed.value = overflowingIdx;

        props.map.value = reorderMap(
          props.map.value,
          props.title,
          overflowingIdx,
        );
      }
    },
    onEnd: () => {
      overflowed.value = null;
      runOnJS(setMoving)(false);
    },
  });

  useEffect(() => {
    if (layout && props.onLoading) {
      props.onLoading({[props.title]: layout});
    }
  }, [layout]);

  useAnimatedReaction(
    () => props.map.value[props.title],
    (next, prev) => {
      if (!moving) {
        // ...
      }
    },
    [moving],
  );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.container, tStyle]}
        onLayout={e => setLayout(e.nativeEvent.layout)}>
        <Text style={styles.text}>{props.title ?? 'Title'}</Text>
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
      margin: SIZE / 2,
    },
    text: {
      color: colors.darkGrey,
      fontSize: fonts.medium,
    },
  });

  return {styles};
};
