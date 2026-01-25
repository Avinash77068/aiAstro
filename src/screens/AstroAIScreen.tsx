import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../common/Header';
import { TEXT_SIZES } from '../constants/colors';

export default function AstroAIScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Ask Astro AI</Text>
        <Text style={styles.subtitle}>Get answers from expert astrologers</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: TEXT_SIZES['2xl'],
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#9CA3AF',
  },
});
