import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { useAppSelector } from '../../redux/hooks';

export default function HoroscopeSection() {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const horoscopeItems = homeData?.horoscopeItems || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {horoscopeItems?.map((item, idx) => (
          <View key={idx + 1} style={styles.gridItem}>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING['2xl'],
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  itemIcon: {
    fontSize:TEXT_SIZES.lg,
    marginBottom: SPACING.sm,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginBottom: SPACING.sm,
  },
  itemTitle: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
