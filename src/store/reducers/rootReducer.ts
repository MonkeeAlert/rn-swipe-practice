import {combineReducers} from 'redux';
import {todosReducer} from './todosReducers';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPersistedConfig = (key: string) => {
  return {key, storage: AsyncStorage};
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  todos: persistReducer(getPersistedConfig('todos'), todosReducer),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;
