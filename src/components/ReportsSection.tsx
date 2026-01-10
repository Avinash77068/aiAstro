import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { reports } from '../data/data';

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
    padding: 16,
  },
  banner: {
    backgroundColor: 'linear-gradient(to right, #dc2626, #ea580c)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  bannerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBBF24',
    marginTop: 8,
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
