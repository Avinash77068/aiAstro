import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Sparkles,
  PlayCircle,
  MessageCircle,
  Clock,
} from 'lucide-react-native'; // Assuming we use this, or replace with SVG
import HomeScreen from '../screens/HomeScreen';
import AstroAIScreen from '../screens/AstroAIScreen';
import LiveScreen from '../screens/LiveScreen';
import AskScreen from '../screens/AskScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { COLORS } from '../../constants/colors';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === 'Home') {
            icon = <Home size={size} color={color} />;
          } else if (route.name === 'AstroAI') {
            icon = <Sparkles size={size} color={color} />;
          } else if (route.name === 'Live') {
            icon = <PlayCircle size={size} color={color} />;
          } else if (route.name === 'Ask') {
            icon = <MessageCircle size={size} color={color} />;
          } else if (route.name === 'History') {
            icon = <Clock size={size} color={color} />;
          }

          return icon;
        },
        tabBarActiveTintColor: COLORS.primary, // yellow-500
        tabBarInactiveTintColor: COLORS.textSecondary, // gray-400
        tabBarStyle: {
          backgroundColor: COLORS.background, // black
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.textInverse,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen
        name="AstroAI"
        component={AstroAIScreen}
        options={{ title: 'AI Astro', headerShown: false }}
      />
      <Tab.Screen
        name="Live"
        component={LiveScreen}
        options={{ title: 'Blog', headerShown: false }}
      />
      <Tab.Screen
        name="Ask"
        component={AskScreen}
        options={{ title: 'Ask', headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'History', headerShown: false }}
      />
    </Tab.Navigator>
  );
}
