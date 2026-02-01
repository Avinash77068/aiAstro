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
import { ArrowLeft, User, Heart, Sparkles } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';

interface MentalHealthAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function MentalHealthAI({ navigation, onBack }: MentalHealthAIProps) {
  const [currentMood, setCurrentMood] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [feelings, setFeelings] = useState('');
  const [mentalHealthAnalysis, setMentalHealthAnalysis] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const analyzeMentalHealth = () => {
    if (currentMood && stressLevel && feelings) {
      setMentalHealthAnalysis(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mental Health AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <User size={48} color="#10B981" fill="#10B981" />
          </View>
          <Text style={styles.title}>Mental Health Insights</Text>
          <Text style={styles.subtitle}>
            Discover your mental well-being with AI-powered analysis
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.userDivider}>
            <User size={16} color="#10B981" fill="#10B981" />
            <Heart size={20} color="#10B981" fill="#10B981" />
            <User size={16} color="#10B981" fill="#10B981" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Mood</Text>
            <View style={styles.inputWithIcon}>
              <Heart size={20} color="#10B981" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={currentMood}
                onChangeText={setCurrentMood}
                placeholder="e.g., Happy, Anxious, Calm"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.mentalConnector}>
            <View style={styles.connectorLine} />
            <Sparkles size={24} color="#10B981" fill="#10B981" />
            <View style={styles.connectorLine} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stress Level (1-10)</Text>
            <View style={styles.inputWithIcon}>
              <User size={20} color="#10B981" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={stressLevel}
                onChangeText={setStressLevel}
                placeholder="Enter stress level"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Describe Your Feelings</Text>
            <TextInput
              style={styles.multilineInput}
              value={feelings}
              onChangeText={setFeelings}
              placeholder="Share what's on your mind..."
              placeholderTextColor={COLORS.textTertiary}
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, (!currentMood || !stressLevel || !feelings) && styles.analyzeButtonDisabled]}
            onPress={analyzeMentalHealth}
            disabled={!currentMood || !stressLevel || !feelings}
          >
            <Sparkles size={20} color={COLORS.textInverse} />
            <Text style={styles.analyzeButtonText}>Analyze Mental Health</Text>
          </TouchableOpacity>
        </View>

        {mentalHealthAnalysis && (
          <View style={styles.resultSection}>
            <View style={styles.moodCard}>
              <Text style={styles.moodText}>
                {currentMood} <Heart size={20} color="#10B981" fill="#10B981" /> Stress: {stressLevel}/10
              </Text>
              <Text style={styles.wellnessText}>Mental Wellness Analysis</Text>
            </View>

            <View style={styles.mentalHealthScoreCard}>
              <View style={styles.scoreContainer}>
                <View style={styles.userCircle}>
                  <User size={40} color="#10B981" fill="#10B981" />
                </View>
                <Text style={styles.mentalHealthScoreText}>75%</Text>
                <Text style={styles.mentalHealthScoreLabel}>Mental Wellness</Text>
              </View>
            </View>

            <View style={styles.aspectsCard}>
              <Text style={styles.aspectsTitle}>Mental Health Aspects</Text>
              
              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Heart size={20} color="#10B981" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Emotional Balance</Text>
                  <Text style={styles.aspectDescription}>
                    Your emotions are relatively balanced. Focus on maintaining positive relationships and self-care routines.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Sparkles size={20} color="#10B981" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Stress Management</Text>
                  <Text style={styles.aspectDescription}>
                    With a stress level of {stressLevel}, consider incorporating relaxation techniques and mindfulness practices.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <User size={20} color="#10B981" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Self-Care</Text>
                  <Text style={styles.aspectDescription}>
                    Prioritize activities that bring joy and relaxation. Your feelings indicate a need for more personal time.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.predictionCard}>
              <Text style={styles.predictionTitle}>Mental Health Insights</Text>
              <View style={styles.predictionContent}>
                <Text style={styles.predictionText}>
                  Your current mental state shows resilience and awareness. The cosmic energies around mental health 
                  suggest focusing on mindfulness and positive affirmations. With stress level {stressLevel}, 
                  it's important to establish healthy boundaries and seek support when needed. Your feelings 
                  about {feelings.toLowerCase()} indicate an opportunity for growth and self-compassion.
                </Text>
                <View style={styles.heartPattern}>
                  <Heart size={12} color="#10B98120" fill="#10B98120" />
                  <Heart size={16} color="#10B98140" fill="#10B98140" />
                  <Heart size={12} color="#10B98120" fill="#10B98120" />
                </View>
              </View>
            </View>

            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>🧠 Mental Health Advice</Text>
              <View style={styles.adviceList}>
                <Text style={styles.adviceItem}>• Practice daily mindfulness or meditation</Text>
                <Text style={styles.adviceItem}>• Maintain a consistent sleep schedule</Text>
                <Text style={styles.adviceItem}>• Engage in regular physical activity</Text>
                <Text style={styles.adviceItem}>• Reach out to trusted friends or professionals when needed</Text>
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
    backgroundColor: '#10B98120',
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
  userDivider: {
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
    borderColor: '#10B98140',
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
    borderColor: '#10B98140',
    padding: SPACING.md,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    height: 100,
    textAlignVertical: 'top',
  },
  mentalConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#10B98140',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
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
  moodCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  moodText: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  wellnessText: {
    fontSize: TEXT_SIZES.base,
    color: '#10B981',
    fontWeight: '600',
  },
  mentalHealthScoreCard: {
    backgroundColor: '#10B98110',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  userCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10B98120',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  mentalHealthScoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: SPACING.xs,
  },
  mentalHealthScoreLabel: {
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
    backgroundColor: '#10B98120',
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
  heartPattern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  adviceCard: {
    backgroundColor: '#10B98110',
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
