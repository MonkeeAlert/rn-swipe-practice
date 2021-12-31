import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {EmptyList} from './Components/EmptyList';
import {ListItem} from './Components/ListItem';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getTodosState} from '../../store/rootSelectors';
import {ITodo} from '../../store/types/todosTypes';
import {SearchBar} from './Components/SearchBar';
import {defaultBorderRadius} from '../../utils/constants';

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
  const itemRef = useRef<any>(null);
  const {list} = useSelector(getTodosState);

  const [data, setData] = useState<ITodo[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIndex, selectIndex] = useState<number>(0);

  const renderItem = (itemData: {item: ITodo}) => {
    return (
      <ListItem
        ref={itemRef}
        {...itemData.item}
        selectedCategory={CATEGORIES[selectedIndex].key as ITodo['status']}
      />
    );
  };

  const filterListByTitle = (l: ITodo[]) =>
    l.filter(i => i.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);

  useEffect(() => {
    const status = CATEGORIES[selectedIndex].key;

    if (list?.length > 0) {
      if (status === 'default') {
        const filtered = filterListByTitle(list);

        setData(filtered);
      } else {
        const filtered = filterListByTitle(list).filter(
          i => i.status === status,
        );

        setData(filtered);
      }
    } else {
      setData([]);
    }

    return () => {
      itemRef.current = null;
    };
  }, [selectedIndex, list, search]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={setSearch} />
      <ButtonGroup
        buttons={CATEGORIES.map(i => i.title)}
        onPress={selectIndex}
        selectedIndex={selectedIndex}
        innerBorderStyle={styles.buttonGroupBorder}
        containerStyle={styles.buttonContainer}
        selectedTextStyle={styles.selectedButtonText}
        textStyle={styles.buttonTextStyle}
      />
      {data.length === 0 ? (
        <View style={[styles.contentContainer, styles.emptyListContainer]}>
          <EmptyList />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
        />
      )}
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
      borderRadius: defaultBorderRadius,
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
    emptyListContainer: {
      justifyContent: 'center',
    },
  });

  return {styles};
};
