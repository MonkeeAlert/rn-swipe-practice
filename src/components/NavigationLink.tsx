import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {useTheme} from '../assets/hooks';
import Title from './Title';

interface INavigationLink {
  title: string;
  route: string;
  color?: string;
  routeOptions?: object;
}

const NavigationLink = (props: INavigationLink) => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();

  const theme = StyleSheet.create({
    container: {
      backgroundColor: props.color ?? colors.infoLight,
    },
  });

  // Redirection handler
  const handleRedirect = () => navigate(props.route, props.routeOptions);

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={handleRedirect}>
        <View style={[styles.container, theme.container]}>
          <View style={styles.text}>
            <Title text={props.title} color={colors.white} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NavigationLink;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  container: {
    width: '100%',
    height: 125,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 9.51,

    elevation: 10,
  },
  text: {
    position: 'absolute',
    bottom: 0,
    left: 15,
  },
});
