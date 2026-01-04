import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Heart, Briefcase, Star } from 'lucide-react-native';

export default function ConsultSection() {
  const filterButtons = [
    { label: 'All', icon: null },
    { label: 'Love', icon: <Heart size={16} color="#FFFFFF" /> },
    { label: 'Career', icon: <Briefcase size={16} color="#FFFFFF" /> },
    { label: 'Marriage', icon: null },
  ];

  const astrologers = [
    {
      name: 'Mr. Krishnam',
      type: 'Vedic astrology',
      rating: '4.5',
      reviews: '288947',
      price: 'FREE',
      verified: true,
    },
    {
      name: 'Rrupa',
      type: 'Tarot',
      rating: '4.9',
      reviews: '15',
      price: '₹30/min',
      verified: true,
    },
    {
      name: 'Anika',
      type: 'Vedic astrology',
      rating: '4.4',
      reviews: '10',
      price: '₹17/min',
      verified: true,
    },
    {
      name: 'Nirmla D',
      type: 'Numerology',
      rating: '4.5',
      reviews: '6',
      price: '₹36/min',
      verified: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filterButtons?.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.filterButton, idx === 0 && styles.activeFilter]}
          >
            <View style={styles.filterButtonContent}>
              {btn.icon}
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
        ))}
      </ScrollView>

      <FlatList
        data={astrologers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
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
                <Star size={16} color="#FBBF24" fill="#FBBF24" />
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
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatButton}>
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
    padding: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#FBBF24',
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  activeFilterText: {
    color: '#000000',
  },
  astrologerCard: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  astrologerInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#4B5563',
    borderRadius: 32,
  },
  details: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verified: {
    color: '#3B82F6',
    marginLeft: 4,
  },
  type: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  languages: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  reviews: {
    color: '#9CA3AF',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  freePrice: {
    color: '#10B981',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#FBBF24',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  chatButton: {
    flex: 1,
    backgroundColor: '#FBBF24',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
