import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { panchangItems } from '../data/data';

export default function PanchangSection() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {panchangItems.map((item, idx) => (
          <View key={idx} style={styles.gridItem}>
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
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
