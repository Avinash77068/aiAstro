import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS, TEXT_SIZES, FONT_WEIGHTS, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { useAppSelector } from '../../redux/hooks';

export default function Section2025() {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const section2025Items = homeData?.section2025Items || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>2026 New Year</Text>
        <Text style={styles.bannerSubtitle}>LIVE Astrologers</Text>
        <Text style={styles.bannerText}>Ask Question, Get Solution</Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>First Chat Free</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {section2025Items.map((item, idx) => (
          <View key={idx} style={styles.gridItem}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="contain"
              />
            )}
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
  banner: {
    backgroundColor: '#1e3a8a', // Use single color instead of gradient array
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING['2xl'],
    marginBottom: SPACING['2xl'],
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: TEXT_SIZES['2xl'],
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bannerSubtitle: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
  },
  bannerText: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  bannerButton: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
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
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginBottom: SPACING.sm,
  },
  itemTitle: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
