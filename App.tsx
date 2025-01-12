import React from 'react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import MainNavigationContainer from './src/router';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNavigationContainer />
          <Toast />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
