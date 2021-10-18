import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList, View, Dimensions} from 'react-native';
import {EmptyList} from './Components/EmptyList';
import {ListItem} from './Components/ListItem';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {Swipeable} from 'react-native-gesture-handler';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getTodosState} from '../../store/rootSelectors';

const CATEGORIES = ['All', 'Active', 'Done'];

const TodosScreen = <ITodo, ItemProps>() => {
  const {colors, fonts} = useTheme();
  const ref = useRef<Swipeable>(null);
  const {list} = useSelector(getTodosState);

  const [data, setData] = useState<ITodo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      if (selectedCategory === 'all') {
        setData(list);
      } else {
        const filtered = list.filter(i => i.category === selectedCategory);

        setData(filtered);
      }
    } else {
      setData([]);
    }
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
    const category = CATEGORIES[c].toLowerCase();

    setSelectedIndex(c);
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
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
        ListHeaderComponent={() => {
          return (
            <>
              {selectedCategory !== 'all' &&
              list.filter(i => i.category === selectedCategory).length === 0 ? (
                <EmptyList />
              ) : null}
            </>
          );
        }}
        renderItem={renderItem}
        contentContainerStyle={[
          theme.container,
          // {
          //   position: 'relative',
          // },
          // data.length === 0 ? theme.empty : null,
        ]}
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
