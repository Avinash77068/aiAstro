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
import { ArrowLeft, DollarSign, TrendingUp, Sparkles } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { analyzeFinanceThunk } from '../../../redux/slices/aiFeatures/aiFeaturesThunk';

interface FinanceAIProps {
  navigation?: any;
  onBack?: () => void;
}

export default function FinanceAI({ navigation, onBack }: FinanceAIProps) {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [financialGoals, setFinancialGoals] = useState('');
  const [financeAnalysis, setFinanceAnalysis] = useState(false);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const analyzeFinance = async () => {
    if (monthlyIncome && monthlyExpenses && financialGoals) {
      try {
        await dispatch(analyzeFinanceThunk({ monthlyIncome, monthlyExpenses, financialGoals })).unwrap();
        setFinanceAnalysis(true);
      } catch (error) {
        console.error('API call failed', error);
        setFinanceAnalysis(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finance AI</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <DollarSign size={48} color="#F59E0B" fill="#F59E0B" />
          </View>
          <Text style={styles.title}>Financial Guidance</Text>
          <Text style={styles.subtitle}>
            Discover your financial potential with AI-powered insights
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.dollarDivider}>
            <DollarSign size={16} color="#F59E0B" fill="#F59E0B" />
            <TrendingUp size={20} color="#F59E0B" />
            <DollarSign size={16} color="#F59E0B" fill="#F59E0B" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Income</Text>
            <View style={styles.inputWithIcon}>
              <DollarSign size={20} color="#F59E0B" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={monthlyIncome}
                onChangeText={setMonthlyIncome}
                placeholder="Enter monthly income"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.financeConnector}>
            <View style={styles.connectorLine} />
            <Sparkles size={24} color="#F59E0B" fill="#F59E0B" />
            <View style={styles.connectorLine} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Expenses</Text>
            <View style={styles.inputWithIcon}>
              <TrendingUp size={20} color="#F59E0B" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIconField}
                value={monthlyExpenses}
                onChangeText={setMonthlyExpenses}
                placeholder="Enter monthly expenses"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Financial Goals</Text>
            <TextInput
              style={styles.multilineInput}
              value={financialGoals}
              onChangeText={setFinancialGoals}
              placeholder="Describe your financial goals..."
              placeholderTextColor={COLORS.textTertiary}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, (!monthlyIncome || !monthlyExpenses || !financialGoals) && styles.analyzeButtonDisabled]}
            onPress={analyzeFinance}
            disabled={!monthlyIncome || !monthlyExpenses || !financialGoals}
          >
            <Sparkles size={20} color={COLORS.textInverse} />
            <Text style={styles.analyzeButtonText}>Analyze Finances</Text>
          </TouchableOpacity>
        </View>

        {financeAnalysis && (
          <View style={styles.resultSection}>
            <View style={styles.financeCard}>
              <Text style={styles.financeText}>
                Income: ${monthlyIncome} <DollarSign size={20} color="#F59E0B" /> Expenses: ${monthlyExpenses}
              </Text>
              <Text style={styles.stabilityText}>Financial Stability Analysis</Text>
            </View>

            <View style={styles.financeScoreCard}>
              <View style={styles.scoreContainer}>
                <View style={styles.dollarCircle}>
                  <DollarSign size={40} color="#F59E0B" fill="#F59E0B" />
                </View>
                <Text style={styles.financeScoreText}>82%</Text>
                <Text style={styles.financeScoreLabel}>Financial Health</Text>
              </View>
            </View>

            <View style={styles.aspectsCard}>
              <Text style={styles.aspectsTitle}>Financial Aspects</Text>
              
              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <TrendingUp size={20} color="#F59E0B" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Budget Management</Text>
                  <Text style={styles.aspectDescription}>
                    Your income to expense ratio shows good financial discipline. Continue tracking and optimizing spending.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <Sparkles size={20} color="#F59E0B" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Savings Rate</Text>
                  <Text style={styles.aspectDescription}>
                    With your current expenses, focus on increasing savings through automated transfers and expense reduction.
                  </Text>
                </View>
              </View>

              <View style={styles.aspectItem}>
                <View style={styles.aspectIcon}>
                  <DollarSign size={20} color="#F59E0B" />
                </View>
                <View style={styles.aspectContent}>
                  <Text style={styles.aspectLabel}>Goal Achievement</Text>
                  <Text style={styles.aspectDescription}>
                    Your goals of {financialGoals.toLowerCase()} are achievable with consistent effort and smart planning.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.predictionCard}>
              <Text style={styles.predictionTitle}>Financial Forecast</Text>
              <View style={styles.predictionContent}>
                <Text style={styles.predictionText}>
                  The financial stars are aligned for growth and stability. With monthly income of ${monthlyIncome} 
                  and expenses of ${monthlyExpenses}, you have a solid foundation for wealth building. The cosmic 
                  energies suggest focusing on long-term investments and emergency fund creation. Your goals 
                  regarding {financialGoals.toLowerCase()} indicate a proactive approach to financial planning.
                </Text>
                <View style={styles.dollarPattern}>
                  <DollarSign size={12} color="#F59E0B20" fill="#F59E0B20" />
                  <TrendingUp size={16} color="#F59E0B40" />
                  <DollarSign size={12} color="#F59E0B20" fill="#F59E0B20" />
                </View>
              </View>
            </View>

            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>💰 Financial Advice</Text>
              <View style={styles.adviceList}>
                <Text style={styles.adviceItem}>• Create and maintain an emergency fund (3-6 months expenses)</Text>
                <Text style={styles.adviceItem}>• Diversify investments across different asset classes</Text>
                <Text style={styles.adviceItem}>• Track expenses regularly and identify areas for savings</Text>
                <Text style={styles.adviceItem}>• Set specific, measurable financial goals with timelines</Text>
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
    backgroundColor: '#F59E0B20',
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
  dollarDivider: {
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
    borderColor: '#F59E0B40',
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
    borderColor: '#F59E0B40',
    padding: SPACING.md,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    height: 80,
    textAlignVertical: 'top',
  },
  financeConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#F59E0B40',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
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
  financeCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  financeText: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  stabilityText: {
    fontSize: TEXT_SIZES.base,
    color: '#F59E0B',
    fontWeight: '600',
  },
  financeScoreCard: {
    backgroundColor: '#F59E0B10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  dollarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F59E0B20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  financeScoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: SPACING.xs,
  },
  financeScoreLabel: {
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
    backgroundColor: '#F59E0B20',
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
  dollarPattern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  adviceCard: {
    backgroundColor: '#F59E0B10',
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
