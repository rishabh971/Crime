import logger from 'redux-logger';
import {Action, combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({});

const rootReducer = (state: any, action: Action<any>) => {
  console.log('statestatestate', state);
  if (action.type === 'USER_LOGOUT') {
    const {configReducer} = state;
    //@ts-ignore
    return appReducer({configReducer}, action);
  }
  return appReducer(state, action);
};

/**
 * @param getDefaultMiddleware
 * @returns
 */
const getMiddleware = (
  getDefaultMiddleware: (arg0: {serializableCheck: boolean}) => any[],
) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['authReducer', 'configReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: getMiddleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
