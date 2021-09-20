import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {capitalize} from '../../../assets/functions';
import {ListCategory} from './ListCategory';
import {EmptyList} from './EmptyList';
import {IListItem, ListItem} from './ListItem';

interface IList {
  data: IListItem[];
}

const CATEGORIES = ['All', 'Active', 'Done', 'Deleted'];

export const List = (props: IList) => {
  const [data, setData] = useState<IListItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const renderItem = (itemData: {item: IListItem}) => (
    <ListItem {...itemData.item} />
  );

  // const handleCategory = (c: string) => {
  //   console.log('@', c);
  //   setActiveCategory(c);
  // };

  // useEffect(() => {
  //   if (props.data?.length > 0) {
  //     // const cs = [...new Set(props.data.map(i => capitalize(i.category)))];

  //     // setData(props.data);
  //     setData(props.data);
  //     // setCategories(cs);
  //   }
  // }, [props.data]);

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
        {CATEGORIES.map((c, k) => (
          <>
            <ListCategory
              key={`TodoListCategory_${k}`}
              title={c}
              onPress={() => setActiveCategory(c.toLowerCase())}
            />
          </>
        ))}
      </ScrollView>
    ) : (
      <View />
    );
  };

  const theme = StyleSheet.create({
    container: {
      justifyContent: data.length === 0 ? 'center' : 'flex-start',
      alignItems: 'center',
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Categories />
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        contentContainerStyle={theme.container}
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
