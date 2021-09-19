import React, {useEffect} from 'react';
import MainStackScreen from './src/navigation/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <MainStackScreen />;
};

export default App;
