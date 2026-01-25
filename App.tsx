
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SidebarProvider } from './src/customComponents/SidebarContext';
import Sidebar from './src/common/Sidebar';
import RootNavigator from './src/navigator/RootNavigator';
import NetworkLoggerButton from './src/customComponents/NetworkLoggerButton';
import { store, persistor } from './src/redux/store';
import { homeThunk } from './src/redux/slices/home/homeThunk';
import { astrologerThunk } from './src/redux/slices/astrologer/astrologerThunk';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  
  useEffect(() => {
    console.log('Dispatching API calls...');
    store.dispatch(homeThunk());
    store.dispatch(astrologerThunk());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SidebarProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'dark-content' : 'light-content'}
              backgroundColor="#000000"
              translucent={true}
            />
            <RootNavigator />
            <Sidebar />
            <NetworkLoggerButton />
          </SafeAreaProvider>
        </SidebarProvider>
      </PersistGate>
    </Provider>
  );
}



export default App;
