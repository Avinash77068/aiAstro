
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SidebarProvider } from './src/components/customComponents/SidebarContext';
import NetworkLoggerButton from './src/components/customComponents/NetworkLoggerButton';
import { store, persistor } from './src/redux/store';
import { homeThunk } from './src/redux/slices/home/homeThunk';
import { astrologerThunk } from './src/redux/slices/astrologer/astrologerThunk';
import RootNavigator from './src/components/navigator/RootNavigator';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  
  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: '693739184836-s3rn40uaml3bfq2bdpteb53p8de38ji7.apps.googleusercontent.com',
      offlineAccess: true,
    });
    
    console.log('Dispatching API calls...');
    store.dispatch(homeThunk());
    store.dispatch(astrologerThunk());

    // Log initial store state
    console.log('Initial Redux Store State:', store.getState());

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
            {/* <NetworkLoggerButton /> */}
          </SafeAreaProvider>
        </SidebarProvider>
      </PersistGate>
    </Provider>
  );
}



export default App;
