import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SplashScreen from '../components/SplashScreen';
import AppNavigator from './AppNavigator';

const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <AppNavigator />;
};

export default RootNavigator;
