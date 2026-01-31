import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../common/Header';
import Section2025 from '../components/navbarComponent/Section2025';
import ConsultSection from '../components/bottomTabComponent/ConsultSection';
import ReportsSection from '../components/navbarComponent/ReportsSection';
import PanchangSection from '../components/navbarComponent/PanchangSection';
import HoroscopeSection from '../components/navbarComponent/HoroscopeSection';
import AstroAIPage from '../components/bottomTabComponent/AstroAIPage';
import { useAppSelector } from '../redux/hooks';
import { COLORS, TEXT_SIZES } from '../constants/colors';

export default function HomeScreen() {
  const route = useRoute<any>();
  const [selectedSection, setSelectedSection] = useState('Home');
  const { data: homeData } = useAppSelector(state => state.homeReducer);

  useEffect(() => {
    if (route.params?.section) {
      setSelectedSection(route.params.section);
    }
  }, [route.params]);

  const renderContent = () => {
    switch (selectedSection) {
      case '2025':
        return null
      case 'Astro Shop':
        return null
      case 'Consult':
        return <ConsultSection source="Home" />;
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
    fontSize: TEXT_SIZES.base,
  },
});
