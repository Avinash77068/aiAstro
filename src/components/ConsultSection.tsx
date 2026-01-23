import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Heart, Briefcase, Star } from 'lucide-react-native';
import { consultAstrologers } from '../data/data';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';
import { useAppSelector } from '../redux/hooks';

interface ConsultSectionProps {
  navigation?: any;
}

export default function ConsultSection({ navigation }: ConsultSectionProps) {
  const { data: userData, loading: userLoading, error: userError } = useAppSelector(state => state.userReducer);
  const { data: homeData, loading: homeLoading, error: homeError } = useAppSelector(state => state.homeReducer);

  useEffect(() => {
    if (userData) {
      console.log('Redux Storage Data:', JSON.stringify(userData, null, 2));
      console.log('Total Users from API:', userData.length);
    }
    if (homeData) {
      console.log('Home Data:', JSON.stringify(homeData, null, 2));
      console.log('Consult Filters:', homeData.consultFilters);
    }
  }, [userData, homeData]);

  const consultFilters = homeData?.consultFilters || [];

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
        data={consultAstrologers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.astrologerCard}>
            <View style={styles.astrologerInfo}>
              <View style={styles.avatar} />
              <View style={styles.details}>
                <Text style={styles.name}>
                  {item.name}
                  {item.verified && <Text style={styles.verified}>✓</Text>}
                </Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.languages}>English, Hindi</Text>
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
});
