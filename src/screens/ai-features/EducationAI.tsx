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
import { ArrowLeft, Book, GraduationCap, Sparkles } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';

interface EducationAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function EducationAI({ navigation, onBack }: EducationAIProps) {
  const [educationLevel, setEducationLevel] = useState('');
  const [fieldOfInterest, setFieldOfInterest] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [educationAnalysis, setEducationAnalysis] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const analyzeEducation = () => {
    if (educationLevel && fieldOfInterest && learningGoals) {
      setEducationAnalysis(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Book size={48} color="#8B5CF6" fill="#8B5CF6" />
          </View>
          <Text style={styles.title}>Educational Guidance</Text>
          <Text style={styles.subtitle}>
            Discover your learning potential with AI-powered insights
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.bookDivider}>
            <Book size={16} color="#8B5CF6" fill="#8B5CF6" />
            <GraduationCap size={20} color="#8B5CF6" />
            <Book size={16} color="#8B5CF6" fill="#8B5CF6" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Education Level</Text>
            <View style={styles.inputWithIcon}>
              <GraduationCap size={20} color="#8B5CF6" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={educationLevel}
                onChangeText={setEducationLevel}
                placeholder="e.g., Bachelor's, High School, Master's"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.educationConnector}>
            <View style={styles.connectorLine} />
            <Sparkles size={24} color="#8B5CF6" fill="#8B5CF6" />
            <View style={styles.connectorLine} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Field of Interest</Text>
            <View style={styles.inputWithIcon}>
              <Book size={20} color="#8B5CF6" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={fieldOfInterest}
                onChangeText={setFieldOfInterest}
                placeholder="e.g., Computer Science, Medicine, Business"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Learning Goals</Text>
            <TextInput
              style={styles.multilineInput}
              value={learningGoals}
              onChangeText={setLearningGoals}
              placeholder="Describe your educational goals..."
              placeholderTextColor={COLORS.textTertiary}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, (!educationLevel || !fieldOfInterest || !learningGoals) && styles.analyzeButtonDisabled]}
            onPress={analyzeEducation}
            disabled={!educationLevel || !fieldOfInterest || !learningGoals}
          >
            <Sparkles size={20} color={COLORS.textInverse} />
            <Text style={styles.analyzeButtonText}>Analyze Education</Text>
          </TouchableOpacity>
        </View>

        {educationAnalysis && (
          <View style={styles.resultSection}>
            <View style={styles.educationCard}>
              <Text style={styles.educationText}>
                {educationLevel} <Book size={20} color="#8B5CF6" /> {fieldOfInterest}
              </Text>
              <Text style={styles.learningText}>Learning Potential Analysis</Text>
            </View>

            <View style={styles.educationScoreCard}>
              <View style={styles.scoreContainer}>
                <View style={styles.bookCircle}>
                  <Book size={40} color="#8B5CF6" fill="#8B5CF6" />
                </View>
                <Text style={styles.educationScoreText}>90%</Text>
                <Text style={styles.educationScoreLabel}>Learning Potential</Text>
              </View>
            </View>

            <View style={styles.aspectsCard}>
              <Text style={styles.aspectsTitle}>Educational Aspects</Text>
              
              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Sparkles size={20} color="#8B5CF6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Learning Style</Text>
                  <Text style={styles.aspectDescription}>
                    You show strong potential in {fieldOfInterest}. Focus on interactive and practical learning methods.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <GraduationCap size={20} color="#8B5CF6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Career Alignment</Text>
                  <Text style={styles.aspectDescription}>
                    Your goals align well with current market demands in {fieldOfInterest}. Consider advanced certifications.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Book size={20} color="#8B5CF6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Skill Development</Text>
                  <Text style={styles.aspectDescription}>
                    Build on your {educationLevel} foundation. Your goals of {learningGoals.toLowerCase()} are achievable with dedication.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.predictionCard}>
              <Text style={styles.predictionTitle}>Educational Forecast</Text>
              <View style={styles.predictionContent}>
                <Text style={styles.predictionText}>
                  The academic stars are brightly aligned for your educational journey. With your current level of {educationLevel} 
                  and interest in {fieldOfInterest}, you have excellent prospects for advancement. The cosmic energies 
                  suggest embracing lifelong learning and seeking mentorship. Your goals regarding {learningGoals.toLowerCase()} 
                  indicate a committed and focused approach to personal development.
                </Text>
                <View style={styles.bookPattern}>
                  <Book size={12} color="#8B5CF620" fill="#8B5CF620" />
                  <GraduationCap size={16} color="#8B5CF640" />
                  <Book size={12} color="#8B5CF620" fill="#8B5CF620" />
                </View>
              </View>
            </View>

            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>📚 Educational Advice</Text>
              <View style={styles.adviceList}>
                <Text style={styles.adviceItem}>• Set specific, measurable learning objectives</Text>
                <Text style={styles.adviceItem}>• Create a consistent study schedule and stick to it</Text>
                <Text style={styles.adviceItem}>• Seek out mentors and join professional communities</Text>
                <Text style={styles.adviceItem}>• Balance theoretical knowledge with practical application</Text>
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
    backgroundColor: '#8B5CF620',
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
  bookDivider: {
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
    borderColor: '#8B5CF640',
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
  multilineInput: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: '#8B5CF640',
    padding: SPACING.md,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    height: 80,
    textAlignVertical: 'top',
  },
  educationConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#8B5CF640',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
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
  educationCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  educationText: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  learningText: {
    fontSize: TEXT_SIZES.base,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  educationScoreCard: {
    backgroundColor: '#8B5CF610',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  bookCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8B5CF620',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  educationScoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: SPACING.xs,
  },
  educationScoreLabel: {
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
    backgroundColor: '#8B5CF620',
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
  bookPattern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  adviceCard: {
    backgroundColor: '#8B5CF610',
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
