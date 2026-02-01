import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import Header from '../common/Header';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

const featuredPosts = [
  {
    title: 'How to read your kundli in 5 mins',
    summary: 'A quick walkthrough of the essential houses and doshas every beginner should memorize.',
    category: 'Learning',
  },
  {
    title: 'Transit alert: Mars enters Taurus',
    summary: 'Understand which zodiac signs are favored this month and what rituals heighten the positive energy.',
    category: 'Transit',
  },
];

const recentUpdates = [
  'Ritual guides for the new moon cycle',
  'Astrologer spotlights: Meet Maya and Nikhil',
  'New premium readings based on your planetary period',
  'Behind the scenes: how we design each report',
];

export default function LiveScreen({}) {
  return (
    <View style={styles.page}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Live Insights from the Astro Desk</Text>
          <Text style={styles.heroSubtitle}>
            Daily guides, transit notes, and astrologer updates to keep you ahead of your stars.
          </Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Subscribe for Morning Notes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured articles</Text>
          <Text style={styles.sectionPill}>Curated</Text>
        </View>

        {featuredPosts.map(post => (
          <View key={post.title} style={styles.card}>
            <Text style={styles.cardCategory}>{post.category}</Text>
            <Text style={styles.cardTitle}>{post.title}</Text>
            <Text style={styles.cardBody}>{post.summary}</Text>
            <TouchableOpacity style={styles.cardAction}>
              <Text style={styles.cardActionText}>Read Story →</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.sectionHeader}> 
          <Text style={styles.sectionTitle}>Daily dispatches</Text>
          <Text style={styles.sectionPill}>Fresh</Text>
        </View>

        <View style={styles.list}>
          {recentUpdates.map(update => (
            <View key={update} style={styles.listItem}>
              <View style={styles.listMarker} />
              <Text style={styles.listText}>{update}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready for a deeper session?</Text>
          <Text style={styles.ctaBody}>
            Book a live consultation and get a bespoke roadmap tailored to your chart in under 30 minutes.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Schedule with an expert</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.lg,
    paddingBottom: 48,
    gap: SPACING.lg,
  },
  hero: {
    backgroundColor: '#151B3C',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroTitle: {
    color: '#F6F6FF',
    fontSize: TEXT_SIZES['3xl'],
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    color: '#CAD0FF',
    fontSize: TEXT_SIZES.base,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  heroButtonText: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: '700',
  },
  sectionPill: {
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    fontSize: TEXT_SIZES.xs,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  cardCategory: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.xs,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  cardBody: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
    lineHeight: 20,
  },
  cardAction: {
    marginTop: SPACING.md,
  },
  cardActionText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: TEXT_SIZES.base,
  },
  list: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    gap: SPACING.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  listMarker: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  listText: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.base,
  },
  ctaCard: {
    backgroundColor: '#0C1124',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  ctaTitle: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  ctaBody: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.base,
    marginBottom: SPACING.md,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
});
