import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useGooglePlaces, PlaceDetails, PlaceSuggestion } from '../../../hooks/useGooglePlaces';
import { COLORS, SPACING, TEXT_SIZES, BORDER_RADIUS } from '../../../constants/colors';

interface AddressAutocompleteProps {
  onSelectPlace: (place: PlaceDetails) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function AddressAutocomplete({
  onSelectPlace,
  placeholder = 'Search for a place',
  initialValue = '',
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { loading, searchPlaces, getPlaceDetails } = useGooglePlaces();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 2) {
        const results = await searchPlaces(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, searchPlaces]);

  const handleSelectSuggestion = async (suggestion: PlaceSuggestion) => {
    setQuery(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);

    const placeDetails = await getPlaceDetails(suggestion.placeId);
    if (placeDetails) {
      onSelectPlace(placeDetails);
    }
  };

  const renderSuggestion = ({ item }: { item: PlaceSuggestion }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelectSuggestion(item)}>
      <MapPin size={20} color={COLORS.textSecondary} />
      <Text style={styles.suggestionText} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MapPin size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textTertiary}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="words"
        />
        {loading && <ActivityIndicator size="small" color={COLORS.primary} />}
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.placeId}
            style={styles.suggestionsList}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 56,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: TEXT_SIZES.lg,
    color: COLORS.textPrimary,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 250,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionsList: {
    maxHeight: 250,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  suggestionText: {
    flex: 1,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
  },
});
