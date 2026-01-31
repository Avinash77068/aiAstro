import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

export default function Banner({source}: {source?: string}) {
  return (
    <View>
      <View style={styles.banner}>
             <Text style={styles.bannerTitle}>2026 New Year</Text>
             <Text style={styles.bannerSubtitle}>LIVE Astrologers</Text>
             <Text style={styles.bannerText}>Ask Question, Get Solution</Text>
             <TouchableOpacity style={styles.bannerButton}>
               <Text style={styles.bannerButtonText}>First Chat Free</Text>
             </TouchableOpacity>
           </View>
    </View>
  )
}
const styles = StyleSheet.create({
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
});