import React from 'react';
import {StyleSheet, View} from 'react-native';
import DefaultInput from '../../../components/DefaultInput';
import {getModerateScale} from '../../../utils/Scaling';
import {IIcon} from '../../../utils/types';

interface IProps {
  onSearch: (value: string) => void;
}

const SEARCH_ICON: IIcon = {
  name: 'search',
  family: 'ionicon',
  size: getModerateScale(20),
};

export const SearchBar = (props: IProps) => {
  const {styles} = useStyles();

  const handleSearch = (v: string) => {
    if (!props.onSearch) {
      return;
    } else {
      props.onSearch(v);
    }
  };

  return (
    <View style={styles.container}>
      <DefaultInput
        onChangeText={handleSearch}
        placeholder={'Search todo'}
        icon={SEARCH_ICON}
      />
    </View>
  );
};

const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      // marginVertical: 5,
      flex: 1,
    },
  });

  return {styles};
};
