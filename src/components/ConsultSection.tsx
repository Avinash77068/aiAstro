import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Heart, Briefcase, Star } from 'lucide-react-native';
import { consultAstrologers } from '../data/data';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';
import { useAppSelector } from '../redux/hooks';

interface ConsultSectionProps {
  navigation?: any;
}

export default function ConsultSection({ navigation }: ConsultSectionProps) {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const { data: astrologerData } = useAppSelector(state => state.astrologerReducer);

  const consultFilters = homeData?.consultFilters || [];
  const astrologers = astrologerData.length > 0 ? astrologerData : (consultAstrologers as any);

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {consultFilters?.map((btn, idx) => {
          let IconComponent = null;
          if (btn.iconKey === 'Heart') IconComponent = Heart;
          if (btn.iconKey === 'Briefcase') IconComponent = Briefcase;
          
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.filterButton, idx === 0 && styles.activeFilter]}
            >
              <View style={styles.filterButtonContent}>
                {IconComponent && <IconComponent size={16} color={COLORS.textInverse} />}
                <Text
                  style={[
                    styles.filterText,
                    idx === 0 && styles.activeFilterText,
                  ]}
                >
                  {btn.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={astrologers}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.astrologerCard}>
            <View style={styles.astrologerInfo}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.avatar} />
              )}
              <View style={styles.details}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.verified && <Text style={styles.verified}>✓</Text>}
                  {item.status && (
                    <View style={[
                      styles.statusBadge,
                      item.status === 'ONLINE' ? styles.onlineBadge : styles.offlineBadge
                    ]}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.languages}>
                  {item.languages ? item.languages.join(', ') : 'English, Hindi'}
                </Text>
                {item.experience && (
                  <Text style={styles.experience}>Exp: {item.experience}</Text>
                )}
              </View>
            </View>
            <View style={styles.ratingPrice}>
              <View style={styles.rating}>
                <Star size={16} color={COLORS.primary} fill={COLORS.primary} />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviews}>({item.reviews})</Text>
              </View>
              <Text
                style={[
                  styles.price,
                  item.price === 'FREE' && styles.freePrice,
                ]}
              >
                {item.price}
              </Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity 
                style={styles.callButton} 
                onPress={() => {
                  console.log('Starting call with', item.name);
                  if (navigation) {
                    navigation.navigate('Chat', { 
                      astrologer: {
                        id: index.toString(),
                        name: item.name,
                        type: item.type,
                        rating: item.rating,
                        price: item.price,
                        verified: item.verified,
                      }
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.chatButton} 
                onPress={() => {
                  console.log('Starting chat with', item.name);
                  if (navigation) {
                    navigation.navigate('Chat', { 
                      astrologer: {
                        id: index.toString(),
                        name: item.name,
                        type: item.type,
                        rating: item.rating,
                        price: item.price,
                        verified: item.verified,
                      }
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  filterContainer: {
    marginBottom: SPACING.lg,
  },
  filterButton: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  activeFilterText: {
    color: COLORS.textInverse,
  },
  astrologerCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  astrologerInfo: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.border,
    borderRadius: 32,
  },
  details: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  name: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verified: {
    color: COLORS.info,
    marginLeft: SPACING.xs,
  },
  type: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
  },
  languages: {
    color: COLORS.textTertiary,
    fontSize: TEXT_SIZES.xs,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  reviews: {
    color: COLORS.textTertiary,
    marginLeft: SPACING.xs,
  },
  price: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  freePrice: {
    color: COLORS.success,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  callButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  chatButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textInverse,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statusBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: SPACING.xs,
  },
  onlineBadge: {
    backgroundColor: '#10B981',
  },
  offlineBadge: {
    backgroundColor: '#6B7280',
  },
  statusText: {
    color: COLORS.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
  },
  experience: {
    color: COLORS.textTertiary,
    fontSize: TEXT_SIZES.xs,
    marginTop: 2,
  },
});
