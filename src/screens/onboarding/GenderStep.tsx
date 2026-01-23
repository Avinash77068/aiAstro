import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Users} from 'lucide-react-native';
import {COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS} from '../../constants/colors';

interface GenderStepProps {
  onNext: (gender: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function GenderStep({
  onNext,
  onBack,
  initialValue = '',
}: GenderStepProps) {
  const [selectedGender, setSelectedGender] = useState(initialValue);

  const genders = [
    {value: 'male', label: 'Male', emoji: '👨'},
    {value: 'female', label: 'Female', emoji: '👩'},
    {value: 'other', label: 'Other', emoji: '🧑'},
  ];

  const handleNext = () => {
    if (selectedGender) {
      onNext(selectedGender);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Users size={48} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Select your gender</Text>
        <Text style={styles.subtitle}>
          This helps us provide personalized predictions
        </Text>

        <View style={styles.genderContainer}>
          {genders.map(gender => (
            <TouchableOpacity
              key={gender.value}
              style={[
                styles.genderOption,
                selectedGender === gender.value && styles.genderOptionSelected,
              ]}
              onPress={() => setSelectedGender(gender.value)}>
              <Text style={styles.genderEmoji}>{gender.emoji}</Text>
              <Text
                style={[
                  styles.genderLabel,
                  selectedGender === gender.value && styles.genderLabelSelected,
                ]}>
                {gender.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !selectedGender && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!selectedGender}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  genderContainer: {
    marginBottom: SPACING.xl,
  },
  genderOption: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xl,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  genderOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}20`,
  },
  genderEmoji: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  genderLabel: {
    fontSize: TEXT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  genderLabelSelected: {
    color: COLORS.primary,
    fontWeight: 'bold',
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
