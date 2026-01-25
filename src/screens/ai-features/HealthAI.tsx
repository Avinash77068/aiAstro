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
import { ArrowLeft, Activity, User, Calendar, Droplet } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';

interface HealthAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function HealthAI({ navigation, onBack }: HealthAIProps) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [healthAnalysis, setHealthAnalysis] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const analyzeHealth = () => {
    if (name && dateOfBirth) {
      setHealthAnalysis(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Activity size={48} color="#34D399" />
          </View>
          <Text style={styles.title}>Health Analysis</Text>
          <Text style={styles.subtitle}>
            Get personalized health insights based on your astrological profile
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name</Text>
            <View style={styles.inputWithIcon}>
              <User size={20} color="#34D399" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.inputWithIcon}>
              <Calendar size={20} color="#34D399" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, (!name || !dateOfBirth) && styles.analyzeButtonDisabled]}
            onPress={analyzeHealth}
            disabled={!name || !dateOfBirth}
          >
            <Activity size={20} color={COLORS.textInverse} />
            <Text style={styles.analyzeButtonText}>Analyze Health</Text>
          </TouchableOpacity>
        </View>

        {healthAnalysis && (
          <View style={styles.resultSection}>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewTitle}>Health Overview for {name}</Text>
              <View style={styles.healthScore}>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreNumber}>85</Text>
                  <Text style={styles.scoreLabel}>Health Score</Text>
                </View>
                <View style={styles.scoreDetails}>
                  <View style={styles.scoreItem}>
                    <View style={[styles.scoreDot, { backgroundColor: '#34D399' }]} />
                    <Text style={styles.scoreText}>Excellent</Text>
                  </View>
                  <Text style={styles.scoreDescription}>
                    Your overall health indicators are strong. Continue maintaining your wellness routine.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.vitalStatsCard}>
              <Text style={styles.cardTitle}>Vital Areas</Text>
              
              <View style={styles.vitalItem}>
                <View style={styles.vitalHeader}>
                  <View style={styles.vitalIconContainer}>
                    <Activity size={20} color="#34D399" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={styles.vitalLabel}>Physical Energy</Text>
                    <Text style={styles.vitalStatus}>Strong</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '90%', backgroundColor: '#34D399' }]} />
                </View>
              </View>

              <View style={styles.vitalItem}>
                <View style={styles.vitalHeader}>
                  <View style={styles.vitalIconContainer}>
                    <Droplet size={20} color="#60A5FA" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={styles.vitalLabel}>Immunity</Text>
                    <Text style={styles.vitalStatus}>Good</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '80%', backgroundColor: '#60A5FA' }]} />
                </View>
              </View>

              <View style={styles.vitalItem}>
                <View style={styles.vitalHeader}>
                  <View style={styles.vitalIconContainer}>
                    <Activity size={20} color="#A78BFA" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={styles.vitalLabel}>Mental Clarity</Text>
                    <Text style={styles.vitalStatus}>Excellent</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '85%', backgroundColor: '#A78BFA' }]} />
                </View>
              </View>

              <View style={styles.vitalItem}>
                <View style={styles.vitalHeader}>
                  <View style={styles.vitalIconContainer}>
                    <Droplet size={20} color="#F472B6" />
                  </View>
                  <View style={styles.vitalInfo}>
                    <Text style={styles.vitalLabel}>Digestive Health</Text>
                    <Text style={styles.vitalStatus}>Moderate</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '70%', backgroundColor: '#F472B6' }]} />
                </View>
              </View>
            </View>

            <View style={styles.recommendationsCard}>
              <Text style={styles.cardTitle}>AI Recommendations</Text>
              
              <View style={styles.recommendationItem}>
                <View style={styles.recommendationIcon}>
                  <Text style={styles.recommendationEmoji}>🧘</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Yoga & Meditation</Text>
                  <Text style={styles.recommendationText}>
                    Practice morning yoga for 20 minutes. Focus on breathing exercises to enhance mental clarity.
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationItem}>
                <View style={styles.recommendationIcon}>
                  <Text style={styles.recommendationEmoji}>🥗</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Balanced Diet</Text>
                  <Text style={styles.recommendationText}>
                    Include more green vegetables and fruits. Avoid heavy meals late at night for better digestion.
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationItem}>
                <View style={styles.recommendationIcon}>
                  <Text style={styles.recommendationEmoji}>💧</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Hydration</Text>
                  <Text style={styles.recommendationText}>
                    Drink at least 8 glasses of water daily. Start your day with warm water and lemon.
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationItem}>
                <View style={styles.recommendationIcon}>
                  <Text style={styles.recommendationEmoji}>😴</Text>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>Quality Sleep</Text>
                  <Text style={styles.recommendationText}>
                    Maintain 7-8 hours of sleep. Avoid screens 1 hour before bedtime for better rest.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.warningCard}>
              <Text style={styles.warningTitle}>⚠️ Areas to Monitor</Text>
              <Text style={styles.warningText}>
                Pay attention to your digestive health. Consider consulting a healthcare professional 
                if you experience persistent discomfort. Your planetary positions suggest being mindful 
                of stress levels during the next few weeks.
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
    backgroundColor: '#34D39920',
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: '#34D39940',
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
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34D399',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  analyzeButtonDisabled: {
    opacity: 0.5,
  },
  analyzeButtonText: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textInverse,
  },
  resultSection: {
    padding: SPACING.lg,
  },
  overviewCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#34D399',
  },
  overviewTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  healthScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#34D39920',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#34D399',
  },
  scoreLabel: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  scoreDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scoreText: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  scoreDescription: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  vitalStatsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  vitalItem: {
    marginBottom: SPACING.lg,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  vitalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  vitalInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vitalLabel: {
    fontSize: TEXT_SIZES.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  vitalStatus: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
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
  recommendationsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  recommendationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#34D39920',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  recommendationEmoji: {
    fontSize: 24,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  recommendationText: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  warningCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  warningTitle: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: SPACING.sm,
  },
  warningText: {
    fontSize: TEXT_SIZES.sm,
    color: '#78350F',
    lineHeight: 20,
  },
});
