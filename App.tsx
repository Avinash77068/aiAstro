/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigator/AppNavigator';
import { SidebarProvider } from './src/store/SidebarContext';
import Sidebar from './src/components/Sidebar';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SidebarProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'light-content'}
          backgroundColor="#000000"
          translucent={true}
        />
        <AppNavigator />
        <Sidebar />
      </SafeAreaProvider>
    </SidebarProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
