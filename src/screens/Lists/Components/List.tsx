import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, ScrollView} from 'react-native';
import {ListCategory} from './ListCategory';
import {EmptyList} from './EmptyList';
import {ListItem} from './ListItem';
import {useTheme} from '../../../utils/hooks';
import {ITodo} from '../../../store/types/todosTypes';

interface IList {
  data: ITodo[];
}

const CATEGORIES = ['All', 'Active', 'Done', 'Deleted'];

export const List = (props: IList) => {
  const {colors} = useTheme();
  const [data, setData] = useState<ITodo[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const renderItem = (itemData: {item: ITodo}) => (
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
    } else {
      setData([]);
    }
  }, [activeCategory, props.data]);

  const Categories = () => {
    return (
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
    );
  };

  const theme = StyleSheet.create({
    container: {
      alignItems: data.length === 0 ? 'center' : 'flex-start',
      justifyContent: data.length === 0 ? 'center' : 'flex-start',
      backgroundColor: colors.white,
    },
    empty: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Categories />
      </View>
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
  categories: {
    marginVertical: 10,
    paddingHorizontal: 12,
  },
});
