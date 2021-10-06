import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList, View, ScrollView} from 'react-native';
import {ListCategory} from './ListCategory';
import {EmptyList} from './EmptyList';
import {ListItem} from './ListItem';
import {useTheme} from '../../../utils/hooks';
import {ITodo} from '../../../store/types/todosTypes';
import {Swipeable} from 'react-native-gesture-handler';

interface IList {
  data: ITodo[];
}

const CATEGORIES = ['All', 'Active', 'Done', 'Deleted'];

export const List = <ITodo, ItemProps>(props: IList) => {
  const {colors} = useTheme();
  const [data, setData] = useState<ITodo[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
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
  });

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

  const renderItem = (itemData: {item: ITodo}) => (
    <ListItem ref={ref} {...itemData.item} />
  );

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
