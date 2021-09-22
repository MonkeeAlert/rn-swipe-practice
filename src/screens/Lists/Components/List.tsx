import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, ScrollView} from 'react-native';
import {ListCategory} from './ListCategory';
import {EmptyList} from './EmptyList';
import {IListItem, ListItem} from './ListItem';
import {useTheme} from '../../../utils/hooks';

interface IList {
  data: IListItem[];
}

const CATEGORIES = ['All', 'Active', 'Done', 'Deleted'];

export const List = (props: IList) => {
  const {colors} = useTheme();
  const [data, setData] = useState<IListItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const renderItem = (itemData: {item: IListItem}) => (
    <ListItem {...itemData.item} />
  );

  useEffect(() => {
    if (props.data?.length > 0) {
      if (activeCategory === 'all') {
        setData(props.data);
      } else {
        const filtered = props.data.filter(i => i.category === activeCategory);

        setData(filtered);
      }
    }
  }, [activeCategory]);

  const Categories = () => {
    return data.length > 0 ? (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categories}>
        {CATEGORIES.map(c => (
          <ListCategory
            key={`TodoListCategory_${c}`}
            title={c}
            onPress={() => setActiveCategory(c.toLowerCase())}
          />
        ))}
      </ScrollView>
    ) : (
      <View />
    );
  };

  const theme = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: data.length === 0 ? 'center' : 'flex-start',
      justifyContent: data.length === 0 ? 'center' : 'flex-start',
      backgroundColor: colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <Categories />
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        contentContainerStyle={[theme.container]}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categories: {
    marginVertical: 10,
    paddingHorizontal: 12,
    flexGrow: 0.05,
    flexBasis: 1,
  },
});
