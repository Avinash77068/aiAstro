import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import Section2025 from '../components/Section2025';
import ConsultSection from '../components/ConsultSection';
import ReportsSection from '../components/ReportsSection';
import PanchangSection from '../components/PanchangSection';
import HoroscopeSection from '../components/HoroscopeSection';
import AstroAIPage from '../components/AstroAIPage';
import { useAppSelector } from '../redux/hooks';
import { COLORS } from '../constants/colors';

export default function HomeScreen() {
  const [selectedSection, setSelectedSection] = useState('2025');
  const { data: homeData } = useAppSelector(state => state.homeReducer);

  const renderContent = () => {
    switch (selectedSection) {
      case '2025':
        return <Section2025 />;
      case 'Astro Shop':
        return null
      case 'Consult':
        return <ConsultSection />;
      case 'Reports':
        return <ReportsSection />;
      case 'Panchang':
        return <PanchangSection />;
      case 'Horoscope':
        return <HoroscopeSection />;
      case 'Home':
        return <AstroAIPage />;
      default:
        return <Section2025 />;
    }
  };

  const tabs = homeData?.homeTabs;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        {/* Top Navigation Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
        >
          {tabs?.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedSection(tab)}
              style={[styles.tab, selectedSection === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedSection === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content */}
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    backgroundColor: COLORS.cardBackground, 
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary, 
  },
  tabText: {
    color: COLORS.textSecondary, 
  },
  activeTabText: {
    color: COLORS.primary, 
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});
