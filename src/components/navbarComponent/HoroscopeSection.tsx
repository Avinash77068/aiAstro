import { COLORS } from '../../constants/colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

/* =========================
   DATA (Daily / Monthly / Yearly)
========================= */
const horoscopeList = [
  {
    image: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    title: 'Daily Horoscope',
    route: '/daily-horoscope',
    data: {
      career: 'Good day for meetings and new ideas.',
      relationship:
        'Clear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bonds.',
      mentalHealth:
        'Avoid overthinking and stay calm.Clear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bonds',
      health:
        'Light exercise will help your energy.Clear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bonds',
      finance:
        'Avoid impulsive spending.Clear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bonds',
      luckyColor: 'Blue',
      advice: 'Trust your instincts today.Clear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bondsClear communication will strengthen bonds',
    },
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/512/869/869636.png',
    title: 'Monthly Horoscope',
    route: '/monthly-horoscope',
    data: {
      career: 'New responsibilities may come your way.',
      relationship: 'Patience will improve relationships.',
      mentalHealth: 'Meditation will bring balance.',
      health: 'Maintain routine and proper sleep.',
      finance: 'Stable month with slow growth.',
      luckyColor: 'Green',
      advice: 'Consistency is the key.',
    },
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    title: 'Yearly Horoscope',
    route: '/yearly-horoscope',
    data: {
      career: 'Big opportunities and growth ahead.',
      relationship: 'Emotional stability will increase.',
      mentalHealth: 'Focus on long-term peace.',
      health: 'Overall positive health.',
      finance: 'Good year for savings.',
      luckyColor: 'Golden',
      advice: 'Plan ahead and stay disciplined.',
    },
  },
];

/* =========================
   COMPONENT
========================= */
export default function HoroscopeSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedData = horoscopeList[selectedIndex].data;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔮 Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {horoscopeList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.horoscopeCard,
              selectedIndex === index && styles.activeCard,
            ]}
            onPress={() => setSelectedIndex(index)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 📌 Details Section */}
      <View style={styles.detailsCard}>
        <Detail label="Career" value={selectedData.career} />
        <Detail label="Relationship" value={selectedData.relationship} />
        <Detail label="Mental Health" value={selectedData.mentalHealth} />
        <Detail label="Health" value={selectedData.health} />
        <Detail label="Finance" value={selectedData.finance} />
        <Detail label="Lucky Color" value={selectedData.luckyColor} />
        <Detail label="Advice" value={selectedData.advice} />
      </View>
    </ScrollView>
  );
}

/* =========================
   SMALL COMPONENT
========================= */
const Detail = ({ label, value }:any) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },

  horizontalList: {
    paddingVertical: 12,
  },

  horoscopeCard: {
    width: 130,
    marginRight: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#1E1E2E',
    alignItems: 'center',
  },

  activeCard: {
    borderWidth: 2,
    borderColor: '#7C6EFF',
  },

  image: {
    width: 42,
    height: 42,
    marginBottom: 8,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  detailsCard: {
    marginTop: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
  },

  detailItem: {
    marginBottom: 14,
  },

  detailLabel: {
    color: '#A5B4FC',
    fontSize: 13,
    marginBottom: 2,
  },

  detailValue: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
  },
});
