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
import { Search, X } from 'lucide-react-native';
import {
  COLORS,
  TEXT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../constants/colors';
import BottomModal from './BottomModal';

const { width, height } = Dimensions.get('window');

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <BottomModal
      showCloseButton={false}
      visible={visible}
      onClose={onClose}
      height="10%"
      header={
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={COLORS.textSecondary}
              style={styles.searchIcon}
            />
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
      }
    ></BottomModal>
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
