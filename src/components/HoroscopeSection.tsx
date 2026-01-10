import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { horoscopeItems } from '../data/data';

export default function HoroscopeSection() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {horoscopeItems?.map((item, idx) => (
          <View key={idx + 1} style={styles.gridItem}>
            <Text style={styles.itemIcon}>{item.icon}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
