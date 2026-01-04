import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function AstroShopSection() {
  const products = [
    { name: 'Brihat Kundli', img: '📋' },
    { name: 'Rudraksha', img: '📿' },
    { name: 'Yantra', img: '🔶' },
    { name: 'Gemstone', img: '💎' },
    { name: 'Mala', img: '📿' },
    { name: 'Jadi', img: '🌿' },
    { name: 'Services', img: '💰' },
    { name: 'Kundli AI+', img: '📄' },
    { name: 'CogniAstro', img: '🧠' },
    { name: 'Miscellaneous', img: '✨' },
    { name: 'Aroma', img: '🕯️' },
    { name: 'Bracelet', img: '📿' },
  ];

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
        {products?.map((product, idx) => (
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
    padding: 16,
  },
  banner: {
    backgroundColor: 'linear-gradient(to right, #dc2626, #ea580c)', // red-900 to orange-900
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
  bannerSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#FBBF24',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 4,
  },
  bannerButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 48,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
