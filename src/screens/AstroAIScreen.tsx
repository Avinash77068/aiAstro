import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import AstroAIPage from '../components/AstroAIPage';

export default function AstroAIScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <AstroAIPage />
    </View>
  );
}
