import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';
import { ArrowLeft, Users, FileText } from 'lucide-react-native';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleRegistration = () => {
    // Navigate to registration screen or open link
    Linking.openURL('https://astrosage.ai/astrologer-registration');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.aboutCard}>
          <Users size={24} color={COLORS.primary} style={styles.cardIcon} />
          <Text style={styles.aboutText}>
            AstroSage AI is your ultimate astrology companion, providing personalized horoscopes,
            accurate predictions, and expert guidance for all aspects of life. Our AI-powered
            insights help you make informed decisions and navigate life's challenges with wisdom.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Astrologer Registration</Text>
        <View style={styles.registrationCard}>
          <FileText size={24} color={COLORS.primary} style={styles.cardIcon} />
          <Text style={styles.registrationText}>
            Join our network of expert astrologers. Share your knowledge and help others
            discover their cosmic path. Register now to become a certified AstroSage astrologer.
          </Text>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
            <Text style={styles.registerText}>Register as Astrologer</Text>
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
    paddingTop: SPACING.lg,
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
  aboutCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: SPACING.sm,
  },
  aboutText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  versionText: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textTertiary,
    textAlign: 'center',
  },
  registrationCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  registrationText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  registerText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
