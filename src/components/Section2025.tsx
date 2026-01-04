import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Section2025() {
  const items = [
    { icon: '⚖️', title: 'Horoscope 2025' },
    { icon: '🪐', title: 'Jupiter Transit 2025' },
    { icon: '🪐', title: 'Saturn Transit 2025' },
    { icon: '💛', title: 'Love Horoscope 2025' },
    { icon: '💼', title: 'Career Horoscope 2025' },
    { icon: '🧘', title: 'Chinese Horoscope 2025' },
    { icon: '🎓', title: 'Education Horoscope 2025' },
    { icon: '💰', title: 'Finance Horoscope 2025' },
    { icon: '📖', title: 'Lalkitab Horoscope 2025' },
    { icon: '🔢', title: 'Numerology 2025' },
    { icon: '💑', title: 'Vivah Muhurat 2025' },
    { icon: '👶', title: 'Mundan Muhurat 2025' },
  ];

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
  banner: {
    backgroundColor: 'linear-gradient(to right, #1e3a8a, #7c3aed)', // blue-900 to purple-900
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FBBF24', // yellow-400
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  bannerText: {
    fontSize: 12,
    color: '#D1D5DB', // gray-300
  },
  bannerButton: {
    marginTop: 8,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bannerButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%', // 3 per row
    backgroundColor: '#374151', // gray-800
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
