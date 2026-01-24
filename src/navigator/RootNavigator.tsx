import React, { useState } from 'react';
import { View } from 'react-native';

import AuthContainer from '../screens/auth/AuthContainer';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AppNavigator from './AppNavigator';
import { useAppSelector } from '../redux/hooks';
import SplashScreen from '../components/SplashScreen';

const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, onboardingCompleted, phoneVerified } = useAppSelector(state => state.authReducer);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handlePhoneAuthComplete = () => {
    // Phone verification completion is handled by Redux
  };

  const handleOnboardingComplete = () => {
    // Onboarding completion is handled by Redux
  };

  // Show splash screen
  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Show phone auth if not verified
  if (!phoneVerified) {
    return <AuthContainer onComplete={handlePhoneAuthComplete} />;
  }

  // Show onboarding if phone verified but not completed onboarding
  if (phoneVerified && (!isAuthenticated || !onboardingCompleted)) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Show main app if everything is complete
  return <AppNavigator />;
};

export default RootNavigator;
