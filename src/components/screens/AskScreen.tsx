import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../common/Header';
import { COLORS, TEXT_SIZES } from '../../constants/colors';
import ConsultSection from '../../components/bottomTabComponent/ConsultSection';

export default function AskScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.consultSection}>
          <ConsultSection />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  consultSection: {
    marginTop: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES['2xl'],
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: COLORS.textSecondary,
  },
});
