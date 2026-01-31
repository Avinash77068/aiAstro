import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { ArrowLeft, BookOpen, Download, Gift } from 'lucide-react-native';

const FeaturesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedKundli, setSelectedKundli] = useState('');

  const kundliTypes = [
    { name: 'North Indian', description: 'Traditional Vedic astrology style' },
    { name: 'South Indian', description: 'Dravidian astrology format' },
    { name: 'East Indian', description: 'Bengali astrology style' },
  ];

  const downloads = [
    { name: 'Horoscope PDF', size: '2.5 MB' },
    { name: 'Compatibility Report', size: '1.8 MB' },
    { name: 'Lucky Numbers Guide', size: '1.2 MB' },
  ];

  const handleShareReferral = async () => {
    try {
      const result = await Share.share({
        message: 'Join AstroSage AI with my referral code: ASTRO2024! Get exclusive discounts on premium features.',
      });
      if (result.action === Share.sharedAction) {
        Alert.alert('Success', 'Referral shared successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share referral');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Features</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Kundli</Text>
        {kundliTypes.map((kundli) => (
          <TouchableOpacity
            key={kundli.name}
            style={[
              styles.kundliOption,
              selectedKundli === kundli.name && styles.selectedKundli,
            ]}
            onPress={() => setSelectedKundli(kundli.name)}
          >
            <BookOpen size={20} color={selectedKundli === kundli.name ? COLORS.textInverse : COLORS.primary} />
            <View style={styles.kundliInfo}>
              <Text
                style={[
                  styles.kundliName,
                  selectedKundli === kundli.name && styles.selectedText,
                ]}
              >
                {kundli.name}
              </Text>
              <Text
                style={[
                  styles.kundliDesc,
                  selectedKundli === kundli.name && styles.selectedText,
                ]}
              >
                {kundli.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Downloads</Text>
        {downloads.map((item) => (
          <View key={item.name} style={styles.downloadItem}>
            <Download size={20} color={COLORS.primary} />
            <View style={styles.downloadInfo}>
              <Text style={styles.downloadName}>{item.name}</Text>
              <Text style={styles.downloadSize}>{item.size}</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Refer & Earn</Text>
        <View style={styles.referCard}>
          <Gift size={24} color={COLORS.primary} style={styles.referIcon} />
          <Text style={styles.referText}>
            Share AstroSage AI with friends and earn rewards! Get premium access
            and exclusive discounts for each successful referral.
          </Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShareReferral}>
            <Text style={styles.shareText}>Share Referral Code</Text>
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
  kundliOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  selectedKundli: {
    backgroundColor: COLORS.primary,
  },
  kundliInfo: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  kundliName: {
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  kundliDesc: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  selectedText: {
    color: COLORS.textInverse,
  },
  downloadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  downloadInfo: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  downloadName: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
  },
  downloadSize: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textTertiary,
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  downloadText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.sm,
    fontWeight: 'bold',
  },
  referCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  referIcon: {
    marginBottom: SPACING.sm,
  },
  referText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  shareText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
  },
});

export default FeaturesScreen;
