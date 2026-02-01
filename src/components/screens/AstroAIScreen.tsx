import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../../common/Header';
import { TEXT_SIZES, SPACING, BORDER_RADIUS, COLORS } from '../../constants/colors';
import { useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/native';
import type { Astrologer as AstrologerType } from '../../redux/slices/astrologer/astrologerSlice';

export default function AstroAIScreen() {
  const navigation = useNavigation<any>();
  const { data: astrologerData } = useAppSelector(state => state.astrologerReducer);

  const handleSelect = (astrologer: AstrologerType) => {
    navigation.navigate('Chat', {
      astrologer: {
        id: astrologer._id,
        name: astrologer.name,
        type: astrologer.type,
        rating: astrologer.rating,
        reviews: astrologer.reviews,
        price: astrologer.price,
        verified: astrologer.verified,
        image: astrologer.image,
        experience: astrologer.experience,
        languages: astrologer.languages,
        specialization: astrologer.specialization,
        description: astrologer.description,
        sessionType: astrologer.sessionType,
        status: astrologer.status,
      },
    });
  };

  const renderAstrologer = ({ item }: { item: AstrologerType }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <View style={styles.row}> 
        <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={[styles.chip, item.status === 'ONLINE' ? styles.onlineChip : styles.offlineChip]}>
        <Text style={styles.chipText}>{item.status.toLowerCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.container1}>
        <FlatList
          data={astrologerData}
          keyExtractor={item => item._id}
          renderItem={renderAstrologer}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.rowWrapper}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Astrologers will appear here once they are fetched.
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // paddingTop: 60,
  },
  container1: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  grid: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING['2xl'],
    columnGap: SPACING.md,
  },
  rowWrapper: {
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    margin: SPACING.xs,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  avatar: {
    width: '100%',
    height: 120,
    borderRadius: BORDER_RADIUS['2xl'],
    marginBottom: SPACING.sm,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: '600',
  },
  type: {
    color: COLORS.textSecondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  rating: {
    color: COLORS.success,
    fontWeight: '600',
  },
  price: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.sm,
  },
  chipText: {
    fontSize: TEXT_SIZES.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  onlineChip: {
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: COLORS.success,
    borderWidth: 1,
  },
  offlineChip: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: COLORS.error,
    borderWidth: 1,
  },
  emptyText: {
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: SPACING['2xl'],
  },
});
