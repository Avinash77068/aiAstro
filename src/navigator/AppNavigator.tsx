import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ChatScreen from '../components/chat/ChatScreen';
import { KundliAI, MatchingAI, LoveAI, HealthAI } from '../screens/ai-features';

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
          name="KundliAI"
          component={KundliAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchingAI"
          component={MatchingAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoveAI"
          component={LoveAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthAI"
          component={HealthAI}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
