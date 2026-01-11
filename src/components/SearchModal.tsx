import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Search, X, Clock, TrendingUp, Star, MessageCircle } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

// Mock search data
const searchData = {
  recent: [
    { id: '1', query: 'Gemini horoscope today', type: 'horoscope', icon: Star },
    { id: '2', query: 'Career guidance', type: 'consultation', icon: MessageCircle },
    { id: '3', query: 'Love compatibility', type: 'matching', icon: TrendingUp },
  ],
  suggestions: [
    'Daily Horoscope',
    'Love Horoscope',
    'Career Prediction',
    'Marriage Compatibility',
    'Kundli Matching',
    'Gemstone Recommendation',
    'Panchang Today',
    'Chinese Horoscope',
    'Numerology',
    'Vastu Consultation',
  ],
};

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Mock search results
      const filtered = searchData.suggestions.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.map((item, index) => ({
        id: `result_${index}`,
        title: item,
        type: 'suggestion',
      })));
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const selectRecentSearch = (item: any) => {
    setSearchQuery(item.query);
    // Here you would navigate to the appropriate screen or perform the search
    console.log('Selected:', item.query);
  };

  const selectSuggestion = (item: any) => {
    setSearchQuery(item.title);
    // Here you would navigate to the appropriate screen or perform the search
    console.log('Selected suggestion:', item.title);
  };

  const renderRecentSearch = ({ item }: { item: any }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        style={styles.recentItem}
        onPress={() => selectRecentSearch(item)}
      >
        <View style={styles.recentIcon}>
          <IconComponent size={16} color={COLORS.textSecondary} />
        </View>
        <Text style={styles.recentText}>{item.query}</Text>
        <Clock size={14} color={COLORS.textTertiary} />
      </TouchableOpacity>
    );
  };

  const renderSuggestion = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => selectSuggestion(item)}
    >
      <Search size={16} color={COLORS.textSecondary} />
      <Text style={styles.suggestionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <Search size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search astrology, horoscopes, consultations..."
                placeholderTextColor={COLORS.textTertiary}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <X size={18} color={COLORS.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {isSearching ? (
              // Search Results
              <View style={styles.resultsSection}>
                <Text style={styles.sectionTitle}>Search Results</Text>
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id}
                  renderItem={renderSuggestion}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.resultsList}
                  ListEmptyComponent={
                    <View style={styles.emptyState}>
                      <Search size={48} color={COLORS.textTertiary} />
                      <Text style={styles.emptyStateTitle}>No results found</Text>
                      <Text style={styles.emptyStateText}>
                        Try different keywords or check your spelling
                      </Text>
                    </View>
                  }
                />
              </View>
            ) : (
              // Recent Searches and Suggestions
              <>
                {/* Recent Searches */}
                {searchData.recent.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <FlatList
                      data={searchData.recent}
                      keyExtractor={(item) => item.id}
                      renderItem={renderRecentSearch}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.recentList}
                    />
                  </View>
                )}

                {/* Popular Suggestions */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Popular Searches</Text>
                  <FlatList
                    data={searchData.suggestions.slice(0, 8).map((item, index) => ({
                      id: `suggestion_${index}`,
                      title: item,
                      type: 'suggestion',
                    }))}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSuggestion}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.suggestionsList}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  overlayTouchable: {
    flex: 1,
  },
  modal: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingTop: SPACING.sm,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.base,
    paddingVertical: 0,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  cancelText: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING['2xl'],
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentList: {
    gap: SPACING.xs,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.cardBackground,
  },
  recentIcon: {
    marginRight: SPACING.md,
  },
  recentText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.sm,
  },
  suggestionsList: {
    gap: SPACING.xs,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
  },
  suggestionText: {
    marginLeft: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.sm,
  },
  resultsSection: {
    flex: 1,
  },
  resultsList: {
    gap: SPACING.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['4xl'],
  },
  emptyStateTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
    textAlign: 'center',
    paddingHorizontal: SPACING['2xl'],
  },
});
