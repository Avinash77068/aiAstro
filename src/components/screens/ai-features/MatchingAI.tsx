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
import { ArrowLeft, Heart, User, Calendar, Sparkles } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { analyzeMatchingThunk } from '../../../redux/slices/aiFeatures/aiFeaturesThunk';

interface MatchingAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function MatchingAI({ navigation, onBack }: MatchingAIProps) {
  const [userName, setUserName] = useState('');
  const [userDOB, setUserDOB] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerDOB, setPartnerDOB] = useState('');
  const [matchingResult, setMatchingResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const checkCompatibility = async () => {
    if (userName && userDOB && partnerName && partnerDOB) {
      setLoading(true);
      try {
        await dispatch(analyzeMatchingThunk({ userName, userDOB, partnerName, partnerDOB })).unwrap();
        setMatchingResult(true);
      } catch (error) {
        console.error('API call failed', error);
        setMatchingResult(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const compatibilityScore = 78;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matching AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Heart size={78} color="#d50505ff" fill="#F472B6" />
          </View>
          <Text style={styles.title}>Compatibility Check</Text>
          <Text style={styles.subtitle}>
            Discover your cosmic connection with AI-powered matching
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.personSection}>
            <Text style={styles.sectionTitle}>Your Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name</Text>
              <View style={styles.inputWithIcon}>
                <User
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputWithIconField}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Enter your name"
                  placeholderTextColor={COLORS.textTertiary}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Date of Birth</Text>
              <View style={styles.inputWithIcon}>
                <Calendar
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputWithIconField}
                  value={userDOB}
                  onChangeText={setUserDOB}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={COLORS.textTertiary}
                />
              </View>
            </View>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Heart size={24} color="#374151" />
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.personSection}>
            <Text style={styles.sectionTitle}>Partner's Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Partner's Name</Text>
              <View style={styles.inputWithIcon}>
                <User
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputWithIconField}
                  value={partnerName}
                  onChangeText={setPartnerName}
                  placeholder="Enter partner's name"
                  placeholderTextColor={COLORS.textTertiary}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Partner's Date of Birth</Text>
              <View style={styles.inputWithIcon}>
                <Calendar
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.inputWithIconField}
                  value={partnerDOB}
                  onChangeText={setPartnerDOB}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={COLORS.textTertiary}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.checkButton,
              (!userName || !userDOB || !partnerName || !partnerDOB) &&
                styles.checkButtonDisabled,
            ]}
            onPress={checkCompatibility}
            disabled={!userName || !userDOB || !partnerName || !partnerDOB}
          >
            <Heart size={20} color={COLORS.textInverse} />
            <Text style={styles.checkButtonText}>Check Compatibility</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.resultSection}>
            <View style={styles.loadingContainer}>
              <Sparkles size={24} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.loadingText}>Analyzing compatibility...</Text>
            </View>
          </View>
        )}

        {matchingResult && (
          <View style={styles.resultSection}>
            <View style={styles.scoreCard}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreNumber}>{compatibilityScore}%</Text>
                <Text style={styles.scoreLabel}>Match</Text>
              </View>
              <Text style={styles.scoreTitle}>
                {userName} & {partnerName}
              </Text>
              <Text style={styles.scoreSubtitle}>
                {compatibilityScore >= 70
                  ? 'Excellent Match!'
                  : compatibilityScore >= 50
                  ? 'Good Match'
                  : 'Needs Work'}
              </Text>
            </View>

            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Compatibility Breakdown</Text>

              <View style={styles.compatibilityItem}>
                <View style={styles.compatibilityHeader}>
                  <Text style={styles.compatibilityLabel}>Emotional</Text>
                  <Text style={styles.compatibilityValue}>85%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: '85%', backgroundColor: '#34D399' },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.compatibilityItem}>
                <View style={styles.compatibilityHeader}>
                  <Text style={styles.compatibilityLabel}>Intellectual</Text>
                  <Text style={styles.compatibilityValue}>72%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: '72%', backgroundColor: '#60A5FA' },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.compatibilityItem}>
                <View style={styles.compatibilityHeader}>
                  <Text style={styles.compatibilityLabel}>Physical</Text>
                  <Text style={styles.compatibilityValue}>80%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: '80%', backgroundColor: '#F472B6' },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.compatibilityItem}>
                <View style={styles.compatibilityHeader}>
                  <Text style={styles.compatibilityLabel}>Spiritual</Text>
                  <Text style={styles.compatibilityValue}>75%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: '75%', backgroundColor: '#A78BFA' },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.insightsCard}>
              <Text style={styles.insightsTitle}>AI Insights</Text>
              <Text style={styles.insightsText}>
                Your relationship shows strong emotional and physical
                compatibility. Both of you share similar values and life goals.
                The intellectual connection is good, suggesting engaging
                conversations and mutual understanding. Your spiritual alignment
                indicates harmony in beliefs and life philosophy.
              </Text>
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
    backgroundColor: '#37415120',
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
  personSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TEXT_SIZES.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  checkButtonDisabled: {
    opacity: 0.5,
  },
  checkButtonText: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textInverse,
  },
  resultSection: {
    padding: SPACING.lg,
  },
  scoreCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#374151',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#37415120',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#374151',
  },
  scoreLabel: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  scoreTitle: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  scoreSubtitle: {
    fontSize: TEXT_SIZES.base,
    color: '#374151',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  detailsTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  compatibilityItem: {
    marginBottom: SPACING.lg,
  },
  compatibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  compatibilityLabel: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  compatibilityValue: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  insightsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  insightsTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  insightsText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  adviceItem: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  loadingText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
});
