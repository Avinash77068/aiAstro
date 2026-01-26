import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {MapPin} from 'lucide-react-native';
import AddressAutocomplete from '../../components/AddressAutocomplete';
import {PlaceDetails} from '../../hooks/useGooglePlaces';
import {COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS} from '../../constants/colors';

interface PlaceStepProps {
  onNext: (place: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function PlaceStep({
  onNext,
  onBack,
  initialValue = '',
}: PlaceStepProps) {
  const [place, setPlace] = useState(initialValue);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);

  const handlePlaceSelect = (placeDetails: PlaceDetails) => {
    setSelectedPlace(placeDetails);
    setPlace(placeDetails.city || placeDetails.formattedAddress);
  };

  const handleNext = () => {
    if (place.trim()) {
      onNext(place.trim());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MapPin size={48} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Where are you from?</Text>
        <Text style={styles.subtitle}>
          Search and select your birth place or current location
        </Text>

        <View style={styles.inputContainer}>
          <AddressAutocomplete
            onSelectPlace={handlePlaceSelect}
            placeholder="Search for your city or location"
            initialValue={initialValue}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !place.trim() && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!place.trim()}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  selectedPlaceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  selectedPlaceText: {
    flex: 1,
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
});
