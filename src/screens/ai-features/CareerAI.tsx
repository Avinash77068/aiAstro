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
import { ArrowLeft, Briefcase, User, Sparkles } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';

interface CareerAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function CareerAI({ navigation, onBack }: CareerAIProps) {
  const [currentJob, setCurrentJob] = useState('');
  const [experience, setExperience] = useState('');
  const [careerAnalysis, setCareerAnalysis] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const analyzeCareer = () => {
    if (currentJob && experience) {
      setCareerAnalysis(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Briefcase size={48} color="#3B82F6" fill="#3B82F6" />
          </View>
          <Text style={styles.title}>Career Guidance</Text>
          <Text style={styles.subtitle}>
            Discover your career potential with AI-powered insights
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.briefcaseDivider}>
            <Briefcase size={16} color="#3B82F6" fill="#3B82F6" />
            <Briefcase size={20} color="#3B82F6" fill="#3B82F6" />
            <Briefcase size={16} color="#3B82F6" fill="#3B82F6" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Occupation</Text>
            <View style={styles.inputWithIcon}>
              <Briefcase size={20} color="#3B82F6" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={currentJob}
                onChangeText={setCurrentJob}
                placeholder="Enter your current job"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.careerConnector}>
            <View style={styles.connectorLine} />
            <Sparkles size={24} color="#3B82F6" fill="#3B82F6" />
            <View style={styles.connectorLine} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Years of Experience</Text>
            <View style={styles.inputWithIcon}>
              <User size={20} color="#3B82F6" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={experience}
                onChangeText={setExperience}
                placeholder="Enter years of experience"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, (!currentJob || !experience) && styles.analyzeButtonDisabled]}
            onPress={analyzeCareer}
            disabled={!currentJob || !experience}
          >
            <Sparkles size={20} color={COLORS.textInverse} />
            <Text style={styles.analyzeButtonText}>Analyze Career Path</Text>
          </TouchableOpacity>
        </View>

        {careerAnalysis && (
          <View style={styles.resultSection}>
            <View style={styles.jobCard}>
              <Text style={styles.jobText}>
                {currentJob} <Briefcase size={20} color="#3B82F6" fill="#3B82F6" /> {experience} years
              </Text>
              <Text style={styles.potentialText}>High Potential Career</Text>
            </View>

            <View style={styles.careerScoreCard}>
              <View style={styles.scoreContainer}>
                <View style={styles.briefcaseCircle}>
                  <Briefcase size={40} color="#3B82F6" fill="#3B82F6" />
                </View>
                <Text style={styles.careerScoreText}>88%</Text>
                <Text style={styles.careerScoreLabel}>Career Fit</Text>
              </View>
            </View>

            <View style={styles.aspectsCard}>
              <Text style={styles.aspectsTitle}>Career Aspects</Text>
              
              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Sparkles size={20} color="#3B82F6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Skills Assessment</Text>
                  <Text style={styles.aspectDescription}>
                    Your skills align well with current market demands. Consider upskilling in emerging technologies.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Briefcase size={20} color="#3B82F6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Career Growth</Text>
                  <Text style={styles.aspectDescription}>
                    Strong potential for advancement. Focus on leadership and strategic thinking.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <User size={20} color="#3B82F6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Work-Life Balance</Text>
                  <Text style={styles.aspectDescription}>
                    Good balance achieved. Maintain healthy boundaries and prioritize personal well-being.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.predictionCard}>
              <Text style={styles.predictionTitle}>Career Prediction</Text>
              <View style={styles.predictionContent}>
                <Text style={styles.predictionText}>
                  The professional stars are aligned for you. With {experience} years of experience in {currentJob}, 
                  you have a solid foundation for career advancement. The cosmic energies suggest focusing on 
                  continuous learning and networking. Consider exploring opportunities in related fields that 
                  leverage your existing expertise.
                </Text>
                <View style={styles.starPattern}>
                  <Sparkles size={12} color="#3B82F620" fill="#3B82F620" />
                  <Sparkles size={16} color="#3B82F640" fill="#3B82F640" />
                  <Sparkles size={12} color="#3B82F620" fill="#3B82F620" />
                </View>
              </View>
            </View>

            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>💼 Career Advice</Text>
              <View style={styles.adviceList}>
                <Text style={styles.adviceItem}>• Invest in continuous professional development</Text>
                <Text style={styles.adviceItem}>• Build a strong professional network</Text>
                <Text style={styles.adviceItem}>• Set clear career goals and milestones</Text>
                <Text style={styles.adviceItem}>• Seek mentorship and feedback regularly</Text>
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
    backgroundColor: '#3B82F620',
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
  briefcaseDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
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
    borderColor: '#3B82F640',
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
  careerConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#3B82F640',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
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
  jobCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  jobText: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  potentialText: {
    fontSize: TEXT_SIZES.base,
    color: '#3B82F6',
    fontWeight: '600',
  },
  careerScoreCard: {
    backgroundColor: '#3B82F610',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  briefcaseCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B82F620',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  careerScoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: SPACING.xs,
  },
  careerScoreLabel: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
  },
  aspectsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  aspectsTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  aspectItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  aspectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F620',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  aspectContent: {
    flex: 1,
  },
  aspectLabel: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  aspectDescription: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  predictionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  predictionTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  predictionContent: {
    position: 'relative',
  },
  predictionText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  starPattern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  adviceCard: {
    backgroundColor: '#3B82F610',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  adviceTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  adviceList: {
    gap: SPACING.sm,
  },
  adviceItem: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});
