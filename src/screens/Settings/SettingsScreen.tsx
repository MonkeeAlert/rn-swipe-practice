import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import GoBackButton from '../../components/GoBackButton';
import Title from '../../components/Title';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';

export const SettingsScreen = () => {
  const {styles} = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={styles.back}>
          <GoBackButton size={32} />
        </View>

        <View style={styles.header}>
          <Title text={'Settings'} />
        </View>

        <View></View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    header: {
      marginTop: 50,
      marginBottom: 20,
    },
    mainWrapper: {
      paddingHorizontal: 15,
      position: 'relative',
    },
    back: {
      marginTop: 20,
      marginLeft: -getModerateScale(10),
      alignItems: 'flex-start',
    },
  });

  return {styles};
};
