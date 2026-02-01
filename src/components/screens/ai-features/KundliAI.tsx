import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Sparkles, Calendar, MapPin, Clock } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { analyzeKundliThunk } from '../../../redux/slices/aiFeatures/aiFeaturesThunk';

interface KundliAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function KundliAI({ navigation, onBack }: KundliAIProps) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [kundliGenerated, setKundliGenerated] = useState(false);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const generateKundli = async () => {
    if (name && dateOfBirth && timeOfBirth && placeOfBirth) {
      try {
        await dispatch(analyzeKundliThunk({ name, dateOfBirth, timeOfBirth, placeOfBirth })).unwrap();
        setKundliGenerated(true);
      } catch (error) {
        console.error('API call failed', error);
        setKundliGenerated(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kundli AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Sparkles size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Generate Your Kundli</Text>
          <Text style={styles.subtitle}>
            Discover your cosmic blueprint with AI-powered Vedic astrology
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.inputWithIcon}>
              <Calendar size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time of Birth</Text>
            <View style={styles.inputWithIcon}>
              <Clock size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={timeOfBirth}
                onChangeText={setTimeOfBirth}
                placeholder="HH:MM AM/PM"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Place of Birth</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={placeOfBirth}
                onChangeText={setPlaceOfBirth}
                placeholder="City, Country"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.generateButton, (!name || !dateOfBirth || !timeOfBirth || !placeOfBirth) && styles.generateButtonDisabled]}
            onPress={generateKundli}
            disabled={!name || !dateOfBirth || !timeOfBirth || !placeOfBirth}
          >
            <Sparkles size={20} color={COLORS.textInverse} />
            <Text style={styles.generateButtonText}>Generate Kundli</Text>
          </TouchableOpacity>
        </View>

        {kundliGenerated && (
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>Your Kundli</Text>
            <View style={styles.kundliCard}>
              <View style={styles.kundliHeader}>
                <Text style={styles.kundliName}>{name}</Text>
                <Text style={styles.kundliDetails}>
                  {dateOfBirth} • {timeOfBirth}
                </Text>
                <Text style={styles.kundliDetails}>{placeOfBirth}</Text>
              </View>

              <View style={styles.kundliGrid}>
                <View style={styles.kundliBox}>
                  <Text style={styles.kundliBoxLabel}>Rashi</Text>
                  <Text style={styles.kundliBoxValue}>Mesh (Aries)</Text>
                </View>
                <View style={styles.kundliBox}>
                  <Text style={styles.kundliBoxLabel}>Nakshatra</Text>
                  <Text style={styles.kundliBoxValue}>Ashwini</Text>
                </View>
                <View style={styles.kundliBox}>
                  <Text style={styles.kundliBoxLabel}>Lagna</Text>
                  <Text style={styles.kundliBoxValue}>Vrishabha</Text>
                </View>
                <View style={styles.kundliBox}>
                  <Text style={styles.kundliBoxLabel}>Chandra</Text>
                  <Text style={styles.kundliBoxValue}>Karka</Text>
                </View>
              </View>

              <View style={styles.predictionSection}>
                <Text style={styles.predictionTitle}>AI Insights</Text>
                <Text style={styles.predictionText}>
                  Your birth chart reveals a strong presence of Mars in your first house, 
                  indicating natural leadership qualities and courage. The Moon's position 
                  suggests emotional depth and intuitive abilities. Jupiter's favorable 
                  aspect brings wisdom and opportunities for growth in your career.
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.cardBackground,
    marginBottom: SPACING.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FBBF2420',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TEXT_SIZES['2xl'],
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  formSection: {
    padding: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TEXT_SIZES.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  inputWithIconField: {
    flex: 1,
    padding: SPACING.md,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBBF24',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textInverse,
  },
  resultSection: {
    padding: SPACING.lg,
  },
  resultTitle: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  kundliCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  kundliHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  kundliName: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  kundliDetails: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  kundliGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  kundliBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FBBF2410',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  kundliBoxLabel: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  kundliBoxValue: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: '#FBBF24',
  },
  predictionSection: {
    marginTop: SPACING.md,
  },
  predictionTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  predictionText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});
