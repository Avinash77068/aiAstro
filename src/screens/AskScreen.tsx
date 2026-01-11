import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import ConsultSection from '../components/ConsultSection';

export default function AskScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.consultSection}>
          <ConsultSection />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  consultSection: {
    marginTop: 16,
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
