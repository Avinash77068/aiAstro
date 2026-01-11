import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { reports } from '../data/data';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

export default function ReportsSection() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Brihat Kundli</Text>
        <Text style={styles.bannerSubtitle}>One Solution for all Problems</Text>
        <Text style={styles.bannerPrice}>Only ₹996</Text>
      </View>

      <View style={styles.grid}>
        {reports.map((report, idx) => (
          <View key={idx} style={styles.gridItem}>
            <Text style={styles.itemIcon}>{report.icon}</Text>
            <Text style={styles.itemTitle}>{report.title}</Text>
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
  banner: {
    backgroundColor: '#dc2626', // Use single color from gradient
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING['2xl'],
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  bannerSubtitle: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
  },
  bannerPrice: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING.sm,
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
