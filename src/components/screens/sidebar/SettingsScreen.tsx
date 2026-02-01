import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../../constants/colors';
import { ArrowLeft } from 'lucide-react-native';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Hindi', 'Spanish', 'French'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={notificationsEnabled ? COLORS.textInverse : COLORS.textTertiary}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.languageOptions}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageOption,
                selectedLanguage === lang && styles.selectedLanguage,
              ]}
              onPress={() => setSelectedLanguage(lang)}
            >
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === lang && styles.selectedLanguageText,
                ]}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  settingLabel: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageOption: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  selectedLanguage: {
    backgroundColor: COLORS.primary,
  },
  languageText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
  },
  selectedLanguageText: {
    color: COLORS.textInverse,
  },
});

export default SettingsScreen;
