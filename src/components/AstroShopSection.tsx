import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { shopProducts } from '../data/data';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

export default function AstroShopSection() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Up to 75% Off</Text>
        <Text style={styles.bannerSubtitle}>on all Astrology Products</Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {shopProducts?.map((product, idx) => (
          <View key={idx + 1} style={styles.gridItem}>
            <Text style={styles.itemIcon}>{product.img}</Text>
            <Text style={styles.itemTitle}>{product.name}</Text>
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
    backgroundColor: COLORS.error, // Use centralized error color for red gradient
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING['2xl'],
    marginBottom: SPACING['2xl'],
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: TEXT_SIZES['4xl'],
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bannerSubtitle: {
    fontSize: TEXT_SIZES.base,
    marginBottom: SPACING.md,
  },
  bannerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  bannerButtonText: {
    color: COLORS.textInverse,
    fontWeight: 'bold',
    fontSize: TEXT_SIZES.base,
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
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  itemTitle: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
