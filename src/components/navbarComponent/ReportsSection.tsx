import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  COLORS,
  TEXT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../constants/colors';
import { useAppSelector } from '../../redux/hooks';
import Banner from '../../common/Banner';

export default function ReportsSection() {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const reports = homeData?.reports || [];
  console.log('reports', reports);

  return (
    <ScrollView style={styles.container}>
      <Banner />
      <View style={styles.grid}>
        {reports.map((report, idx) => (
          <View key={idx} style={styles.gridItem}>
            {report.image && (
              <Image
                source={{ uri: report.image }}
                style={styles.itemImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.itemTitle}>{report.title}</Text>
            {report.price && <Text style={styles.itemPrice}>{'Free'}</Text>}
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
  itemPrice: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
});
