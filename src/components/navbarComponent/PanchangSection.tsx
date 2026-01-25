import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { useAppSelector } from '../../redux/hooks';

export default function PanchangSection() {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const panchangItems = homeData?.panchangItems || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {panchangItems.map((item, idx) => (
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
    fontSize: TEXT_SIZES.lg,
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
