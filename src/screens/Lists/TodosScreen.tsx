import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SectionList, Text, Pressable} from 'react-native';
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
import {parseTodosForSectionList} from '../../utils/functions';
import {CategoriesBar} from './Components/CategoriesBar';
import {Icon} from 'react-native-elements';

const ICON_SIZE = 20;
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
  const {styles, colors} = useStyles();
  const itemRef = useRef<any>(null);
  const {list} = useSelector(getTodosState);

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIndex, selectIndex] = useState<number>(0);
  const [areCategoriesVisible, showCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const handleShowCategories = () => showCategories(prev => !prev);

  const renderItem = (itemData: {item: ITodo}) => {
    return (
      <ListItem
        ref={itemRef}
        {...itemData.item}
        selectedCategory={CATEGORIES[selectedIndex].key as ITodo['status']}
      />
    );
  };

  const renderSectionHeader = (itemData: {section: any}) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{itemData.section.title}</Text>
      </View>
    );
  };

  const filterListByTitle = (l: ITodo[]) =>
    l.filter(i => i.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);

  useEffect(() => {
    const status = CATEGORIES[selectedIndex].key;

    if (list?.length > 0) {
      let filtered = filterListByTitle(list);

      if (status !== 'default') {
        filtered = filtered.filter(i => i.status === status);
      }

      if (categories.length > 0) {
        filtered = filtered.filter(i =>
          categories.includes(i.colorParams.color),
        );
      }

      setData(parseTodosForSectionList(filtered));
    } else {
      setData([]);
    }

    return () => {
      itemRef.current = null;
    };
  }, [selectedIndex, list, search, categories]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.searchBar}>
          <SearchBar onSearch={setSearch} />
          <Pressable
            style={styles.categoriesButton}
            onPress={handleShowCategories}>
            <Icon
              type={'ionicons'}
              name={'grid-view'}
              color={colors.darkGrey}
              size={getModerateScale(ICON_SIZE)}
            />
          </Pressable>
        </View>
        {areCategoriesVisible && list.length > 0 ? (
          <View style={styles.categoriesBar}>
            <View style={styles.cut} />
            <CategoriesBar
              data={[...new Set(list.map(i => i.colorParams.color))]}
              onSelect={setCategories}
            />
          </View>
        ) : null}
      </View>
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
        <SectionList
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled={true}
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
    headerContainer: {
      backgroundColor: colors.lightGrey,
      paddingVertical: getModerateScale(6),
      alignItems: 'center',
    },
    headerText: {
      color: colors.darkGrey,
      fontWeight: '500',
      fontSize: fonts.regular,
    },
    headerBar: {
      paddingHorizontal: getModerateScale(10),
      marginVertical: getModerateScale(6),
    },
    searchBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    categoriesButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: getModerateScale(42),
      height: getModerateScale(42),
      marginLeft: getModerateScale(10),
    },
    categoriesBar: {
      backgroundColor: colors.white,
      paddingHorizontal: getModerateScale(12),
      paddingVertical: getModerateScale(6),
      borderRadius: defaultBorderRadius,
      borderWidth: 1,
      borderColor: colors.grey,
      position: 'relative',
      marginTop: getModerateScale(6),
    },
    cut: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      backgroundColor: colors.white,
      position: 'absolute',
      top: -ICON_SIZE / 2,
      right: ICON_SIZE / 2,
      borderLeftColor: colors.grey,
      borderTopColor: colors.grey,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderWidth: 1,
      transform: [
        {
          rotateZ: '45deg',
        },
      ],
    },
  });

  return {styles, colors};
};
