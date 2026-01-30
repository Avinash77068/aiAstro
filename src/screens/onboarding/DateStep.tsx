import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {Calendar} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS} from '../../constants/colors';

interface DateStepProps {
  onNext: (date: string) => void;
  onBack: () => void;
  initialValue?: string;
}

export default function DateStep({
  onNext,
  onBack,
  initialValue,
}: DateStepProps) {
  const [date, setDate] = useState(
    initialValue ? new Date(initialValue) : new Date(),
  );

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleNext = () => {
    const formattedDate = date.toISOString().split('T')[0];
    onNext(formattedDate);
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Calendar size={48} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>When were you born?</Text>
        <Text style={styles.subtitle}>
          Select your date of birth for accurate predictions
        </Text>

        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continue</Text>
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
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TEXT_SIZES['3xl'],
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
  dateButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '100%',
  },
  dateText: {
    fontSize: TEXT_SIZES.xl,
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
  buttonText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
});
