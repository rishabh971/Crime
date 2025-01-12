import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigationContainer from './src/router';
import { store } from './src/redux/store';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <MainNavigationContainer />
        {/* </PersistGate> */}
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
