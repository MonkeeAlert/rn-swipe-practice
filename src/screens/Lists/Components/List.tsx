import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {EmptyList} from './EmptyList';
import {ListItem} from './ListItem';
import {useTheme} from '../../../utils/hooks';
import {ITodo} from '../../../store/types/todosTypes';
import {Swipeable} from 'react-native-gesture-handler';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';
import {getModerateScale} from '../../../utils/Scaling';

interface IList {
  data: ITodo[];
}

const CATEGORIES = ['All', 'Active', 'Done'];

export const List = <ITodo, ItemProps>(props: IList) => {
  const {colors, fonts} = useTheme();
  const [data, setData] = useState<ITodo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const ref = useRef<Swipeable>(null);

  const theme = StyleSheet.create({
    container: {
      alignItems: data.length === 0 ? 'center' : 'flex-start',
      justifyContent: data.length === 0 ? 'center' : 'flex-start',
      backgroundColor: colors.white,
    },
    empty: {
      flex: 1,
    },
    buttonTextStyle: {
      fontSize: fonts.regular,
      color: colors.darkGrey,
    },
    buttonStyle: {},
    selectedButtonText: {
      color: colors.error,
    },
  });

  useEffect(() => {
    if (props.data?.length > 0) {
      if (selectedCategory === 'all') {
        setData(props.data);
      } else {
        const filtered = props.data.filter(
          i => i.category === selectedCategory,
        );

        setData(filtered);
      }
    } else {
      setData([]);
    }
  }, [selectedCategory, props.data]);

  const renderItem = (itemData: {item: ITodo}) => (
    <ListItem ref={ref} {...itemData.item} />
  );

  const handleCategory = (c: number) => {
    setSelectedIndex(c);
    setSelectedCategory(CATEGORIES[c].toLowerCase());
  };

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttons={CATEGORIES}
        onPress={handleCategory}
        selectedIndex={selectedIndex}
        innerBorderStyle={styles.buttonGroupBorder}
        containerStyle={styles.buttonContainer}
        selectedTextStyle={theme.selectedButtonText}
        textStyle={theme.buttonTextStyle}
      />
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        contentContainerStyle={[
          theme.container,
          data.length === 0 ? theme.empty : null,
        ]}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 7,
    height: getModerateScale(45),
  },
  buttonGroupBorder: {
    width: 0,
  },
});
