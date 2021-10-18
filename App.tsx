import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import MainStackScreen from './src/navigation/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import {store} from './src/store/rootSaga';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <MainStackScreen />
    </Provider>
  );
};

export default App;
