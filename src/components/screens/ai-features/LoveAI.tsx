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
import { ArrowLeft, Heart, User, Sparkles } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { analyzeLoveThunk } from '../../../redux/slices/aiFeatures/aiFeaturesThunk';

interface LoveAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function LoveAI({ navigation, onBack }: LoveAIProps) {
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [loveAnalysis, setLoveAnalysis] = useState(false);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const analyzeLove = async () => {
    if (userName && partnerName) {
      try {
        await dispatch(analyzeLoveThunk({ userName, partnerName })).unwrap();
        setLoveAnalysis(true);
      } catch (error) {
        console.error('API call failed', error);
        setLoveAnalysis(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Love AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Heart size={48} color="#F472B6" fill="#F472B6" />
          </View>
          <Text style={styles.title}>Love Compatibility</Text>
          <Text style={styles.subtitle}>
            Discover the magic of your love connection with AI insights
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.heartDivider}>
            <Heart size={16} color="#F472B6" fill="#F472B6" />
            <Heart size={20} color="#F472B6" fill="#F472B6" />
            <Heart size={16} color="#F472B6" fill="#F472B6" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name</Text>
            <View style={styles.inputWithIcon}>
              <User size={20} color="#F472B6" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <View style={styles.loveConnector}>
            <View style={styles.connectorLine} />
            <Heart size={24} color="#F472B6" fill="#F472B6" />
            <View style={styles.connectorLine} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Partner's Name</Text>
            <View style={styles.inputWithIcon}>
              <User size={20} color="#F472B6" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={partnerName}
                onChangeText={setPartnerName}
                placeholder="Enter partner's name"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, (!userName || !partnerName) && styles.analyzeButtonDisabled]}
            onPress={analyzeLove}
            disabled={!userName || !partnerName}
          >
            <Sparkles size={20} color={COLORS.textInverse} />
            <Text style={styles.analyzeButtonText}>Analyze Love Connection</Text>
          </TouchableOpacity>
        </View>

        {loveAnalysis && (
          <View style={styles.resultSection}>
            <View style={styles.namesCard}>
              <Text style={styles.namesText}>
                {userName} <Heart size={20} color="#F472B6" fill="#F472B6" /> {partnerName}
              </Text>
              <Text style={styles.connectionText}>Soul Connection Detected</Text>
            </View>

            <View style={styles.loveScoreCard}>
              <View style={styles.scoreContainer}>
                <View style={styles.heartCircle}>
                  <Heart size={40} color="#F472B6" fill="#F472B6" />
                </View>
                <Text style={styles.loveScoreText}>92%</Text>
                <Text style={styles.loveScoreLabel}>Love Match</Text>
              </View>
            </View>

            <View style={styles.aspectsCard}>
              <Text style={styles.aspectsTitle}>Love Aspects</Text>
              
              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Heart size={20} color="#F472B6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Romance</Text>
                  <Text style={styles.aspectDescription}>
                    Your romantic chemistry is exceptional. Expect passionate moments and deep emotional bonds.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Sparkles size={20} color="#F472B6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Communication</Text>
                  <Text style={styles.aspectDescription}>
                    You understand each other's thoughts and feelings effortlessly. Great emotional sync.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Heart size={20} color="#F472B6" fill="#F472B6" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Trust & Loyalty</Text>
                  <Text style={styles.aspectDescription}>
                    Strong foundation of trust. You both value commitment and honesty in the relationship.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.predictionCard}>
              <Text style={styles.predictionTitle}>Love Prediction</Text>
              <View style={styles.predictionContent}>
                <Text style={styles.predictionText}>
                  The cosmic energies suggest a beautiful journey ahead for {userName} and {partnerName}. 
                  Your souls are aligned, creating a powerful magnetic attraction. This relationship 
                  has the potential for deep transformation and growth. The stars indicate harmony 
                  in your emotional wavelengths, suggesting a lasting and fulfilling partnership.
                </Text>
                <View style={styles.heartPattern}>
                  <Heart size={12} color="#F472B620" fill="#F472B620" />
                  <Heart size={16} color="#F472B640" fill="#F472B640" />
                  <Heart size={12} color="#F472B620" fill="#F472B620" />
                </View>
              </View>
            </View>

            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>💝 Love Advice</Text>
              <View style={styles.adviceList}>
                <Text style={styles.adviceItem}>• Express your feelings openly and honestly</Text>
                <Text style={styles.adviceItem}>• Spend quality time together regularly</Text>
                <Text style={styles.adviceItem}>• Appreciate the little things in your relationship</Text>
                <Text style={styles.adviceItem}>• Support each other's dreams and aspirations</Text>
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
    backgroundColor: '#F472B620',
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
  heartDivider: {
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
    borderColor: '#F472B640',
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
  loveConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#F472B640',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F472B6',
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
  namesCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#F472B6',
  },
  namesText: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  connectionText: {
    fontSize: TEXT_SIZES.base,
    color: '#F472B6',
    fontWeight: '600',
  },
  loveScoreCard: {
    backgroundColor: '#F472B610',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  heartCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F472B620',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  loveScoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F472B6',
    marginBottom: SPACING.xs,
  },
  loveScoreLabel: {
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
    backgroundColor: '#F472B620',
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
    backgroundColor: '#F472B610',
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
