import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AppNavigator from './AppNavigator';
import { useAppSelector } from '../redux/hooks';
import SplashScreen from '../components/SplashScreen';

const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, onboardingCompleted } = useAppSelector(state => state.authReducer);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleOnboardingComplete = () => {
    // Onboarding completion is handled by Redux
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!isAuthenticated || !onboardingCompleted) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return <AppNavigator />;
};

export default RootNavigator;
