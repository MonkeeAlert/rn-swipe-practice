import React, {useEffect} from 'react';
import MainStack from './src/navigation/MainStack';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <MainStack />;
};

export default App;
