import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ChatScreen from '../../components/chat/ChatScreen';
import { KundliAI, MatchingAI, LoveAI, HealthAI, CareerAI, MentalHealthAI, FinanceAI, EducationAI } from '../screens/ai-features';
import Sidebar from '../../common/Sidebar';
import SettingsScreen from '../screens/sidebar/SettingsScreen';
import PremiumScreen from '../screens/sidebar/PremiumScreen';
import FeedbackScreen from '../screens/sidebar/FeedbackScreen';
import AboutScreen from '../screens/sidebar/AboutScreen';
import FeaturesScreen from '../screens/sidebar/FeaturesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/kundli-ai"
          component={KundliAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/matching"
          component={MatchingAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/love-ai"
          component={LoveAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/health-ai"
          component={HealthAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/career"
          component={CareerAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/mental-health"
          component={MentalHealthAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/finance"
          component={FinanceAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="/education"
          component={EducationAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedbackScreen"
          component={FeedbackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeaturesScreen"
          component={FeaturesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Sidebar/>

    </NavigationContainer>
  );
}
