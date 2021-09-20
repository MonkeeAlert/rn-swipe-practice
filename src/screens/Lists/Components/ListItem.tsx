import React from 'react';
import {View, Text} from 'react-native';

export interface IListItem {
  id: number;
  created_at: number;
  started_at: number;
  finished_at: number;
  category: string;
  title: string;
  completed: boolean;
}

export const ListItem = (props: IListItem) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};
