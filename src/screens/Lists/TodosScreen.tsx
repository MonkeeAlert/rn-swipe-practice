import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {EmptyList} from './Components/EmptyList';
import {ListItem} from './Components/ListItem';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {Swipeable} from 'react-native-gesture-handler';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getTodosState} from '../../store/rootSelectors';
import {ITodo} from '../../store/types/todosTypes';

const CATEGORIES = [
  {
    title: 'All',
    key: 'default',
  },
  {
    title: 'Active',
    key: 'active',
  },
  {
    title: 'Done',
    key: 'done',
  },
];

const TodosScreen = () => {
  const {colors, fonts} = useTheme();
  const ref = useRef<Swipeable>(null);
  const {list} = useSelector(getTodosState);

  const [data, setData] = useState<ITodo[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ITodo['category']>('default');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const theme = StyleSheet.create({
    container: {
      alignItems: data.length === 0 ? 'center' : 'flex-start',
      justifyContent: data.length === 0 ? 'center' : 'flex-start',
    },
    empty: {
      flex: 1,
    },
    buttonTextStyle: {
      fontSize: fonts.regular,
      color: colors.darkGrey,
      fontWeight: 'bold',
    },
    buttonStyle: {},
    selectedButtonText: {
      color: colors.black,
    },
  });

  useEffect(() => {
    if (list?.length > 0) {
      if (selectedCategory === 'default') {
        setData(list);
      } else {
        const filtered = list.filter(i => i.category === selectedCategory);

        setData(filtered);
      }
    } else {
      setData([]);
    }

    return () => {
      ref.current = null;
    };
  }, [selectedCategory, list]);

  const renderItem = (itemData: {item: ITodo}) => {
    return (
      <ListItem
        ref={ref}
        {...itemData.item}
        selectedCategory={selectedCategory}
      />
    );
  };

  const handleCategory = (c: number) => {
    const category = CATEGORIES[c].key as ITodo['category'];

    setSelectedIndex(c);
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonGroup
        buttons={CATEGORIES.map(i => i.title)}
        onPress={handleCategory}
        selectedIndex={selectedIndex}
        innerBorderStyle={styles.buttonGroupBorder}
        containerStyle={styles.buttonContainer}
        selectedTextStyle={theme.selectedButtonText}
        textStyle={theme.buttonTextStyle}
      />
      <FlatList
        data={data}
        ListHeaderComponent={() => {
          const isEmpty =
            list.filter(i => i.category === selectedCategory).length === 0;

          return selectedCategory === 'default' ? (
            list.length === 0 ? (
              <EmptyList />
            ) : null
          ) : isEmpty ? (
            <EmptyList />
          ) : null;
        }}
        renderItem={renderItem}
        contentContainerStyle={theme.container}
      />
    </SafeAreaView>
  );
};

export default TodosScreen;

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
