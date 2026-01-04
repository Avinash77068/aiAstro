import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function LiveScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Live Astrologers</Text>
        <Text style={styles.subtitle}>Coming Soon...</Text>
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#9CA3AF',
  },
});
