import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { panchangItems } from '../data/data';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

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
    padding: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  itemTitle: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
