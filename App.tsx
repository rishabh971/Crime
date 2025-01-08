import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigationContainer from './src/router';

function App() {
  return (
    <SafeAreaProvider>
      {/* <Provider store={store}>
        <PersistGate persistor={persistor}>
        </PersistGate>
      </Provider> */}
      <MainNavigationContainer/>
    </SafeAreaProvider>
  );
}

export default App;
