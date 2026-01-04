import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PanchangSection() {
  const items = [
    { icon: '☀️', title: 'Daily Panchang' },
    { icon: '📅', title: 'Monthly Calendar' },
    { icon: '🕉️', title: 'Hindu Calendar' },
    { icon: '☀️', title: 'Yearly Vrat' },
    { icon: '🎉', title: 'Festival 2026' },
    { icon: '⏰', title: 'Hora' },
    { icon: '🕐', title: 'Chogadia' },
    { icon: '🕐', title: 'Do Ghati' },
    { icon: '🕐', title: 'Rahu Kaal' },
    { icon: '📅', title: 'Other Calendars' },
    { icon: '🔮', title: 'Panchak' },
    { icon: '⚡', title: 'Bhadra' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {items.map((item, idx) => (
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
