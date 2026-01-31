import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { ArrowLeft, Crown, XCircle } from 'lucide-react-native';

const PremiumScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [adsRemoved, setAdsRemoved] = useState(false);

  const plans = [
    { name: 'Basic', price: 'Free', features: ['Limited access', 'Ads included'] },
    { name: 'Premium', price: '$9.99/month', features: ['Full access', 'Ad-free', 'Priority support'] },
    { name: 'Pro', price: '$19.99/month', features: ['All Premium features', 'Advanced tools', 'Custom consultations'] },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Premium</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upgrade Your Plan</Text>
        {plans.map((plan) => (
          <View key={plan.name} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Crown size={20} color={COLORS.primary} />
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
            </View>
            <View style={styles.planFeatures}>
              {plan.features.map((feature, idx) => (
                <Text key={idx} style={styles.featureText}>• {feature}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ad Removal</Text>
        <View style={styles.adRemovalCard}>
          <XCircle size={24} color={COLORS.error} />
          <Text style={styles.adRemovalText}>Remove Ads for a better experience</Text>
          <TouchableOpacity
            style={[styles.removeAdsButton, adsRemoved && styles.disabledButton]}
            onPress={() => setAdsRemoved(!adsRemoved)}
            disabled={adsRemoved}
          >
            <Text style={[styles.removeAdsText, adsRemoved && styles.disabledText]}>
              {adsRemoved ? 'Ads Removed' : 'Remove Ads'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  section: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  planCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  planName: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  planPrice: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  planFeatures: {
    marginBottom: SPACING.sm,
  },
  featureText: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  upgradeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  upgradeText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
  },
  adRemovalCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  adRemovalText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginVertical: SPACING.sm,
  },
  removeAdsButton: {
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  removeAdsText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: COLORS.success,
  },
  disabledText: {
    color: COLORS.textInverse,
  },
});

export default PremiumScreen;
