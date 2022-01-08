import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {defaultBorderRadius} from '../utils/constants';
import {useTheme} from '../utils/hooks';
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
    <SafeAreaView style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={handleRedirect}>
        <View style={[styles.container, theme.container]}>
          <View style={styles.text}>
            <Title text={props.title} color={colors.white} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default NavigationLink;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
  },
  container: {
    width: '100%',
    height: 125,
    borderRadius: defaultBorderRadius,
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
    bottom: 10,
    left: 15,
  },
});
