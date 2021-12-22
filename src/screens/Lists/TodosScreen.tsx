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
  const {styles} = useStyles();
  const ref = useRef<Swipeable>(null);
  const {list} = useSelector(getTodosState);

  const [data, setData] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<ITodo['status']>('default');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const renderEmptyComponent = () => {
    const isEmpty = list.filter(i => i.status === status).length === 0;

    return status === 'default' ? (
      list.length === 0 ? (
        <EmptyList />
      ) : null
    ) : isEmpty ? (
      <EmptyList />
    ) : null;
  };

  const renderItem = (itemData: {item: ITodo}) => {
    return <ListItem ref={ref} {...itemData.item} selectedCategory={status} />;
  };

  const handleCategory = (c: number) => {
    const category = CATEGORIES[c].key as ITodo['status'];

    setSelectedIndex(c);
    setStatus(category);
  };

  useEffect(() => {
    if (list?.length > 0) {
      if (status === 'default') {
        setData(list);
      } else {
        const filtered = list.filter(i => i.status === status);

        setData(filtered);
      }
    } else {
      setData([]);
    }

    return () => {
      ref.current = null;
    };
  }, [status, list]);

  return (
    <SafeAreaView style={styles.container}>
      <ButtonGroup
        buttons={CATEGORIES.map(i => i.title)}
        onPress={handleCategory}
        selectedIndex={selectedIndex}
        innerBorderStyle={styles.buttonGroupBorder}
        containerStyle={styles.buttonContainer}
        selectedTextStyle={styles.selectedButtonText}
        textStyle={styles.buttonTextStyle}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.contentContainer,
          {
            justifyContent: data.length === 0 ? 'center' : 'flex-start',
          },
        ]}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default TodosScreen;

const useStyles = () => {
  const {colors, fonts} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
    },
    buttonContainer: {
      borderRadius: 7,
      height: getModerateScale(45),
    },
    buttonGroupBorder: {
      width: 0,
    },
    buttonTextStyle: {
      fontSize: fonts.regular,
      color: colors.darkGrey,
      fontWeight: 'bold',
    },
    selectedButtonText: {
      color: colors.black,
    },
  });

  return {styles};
};
