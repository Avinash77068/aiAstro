// Screen for API testing and demonstration
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getConsultAstrologers,
  getAiAstrologers,
  startChatSession,
  startCallSession,
  getUserProfile,
  getWalletBalance,
  getNotifications,
  getChatHistory,
} from '../services/api';
import { COLORS } from '../constants/colors';

export default function ApiTestScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');

  const testApi = async (apiFunction: () => Promise<any>, testName: string) => {
    setLoading(true);
    setResults('');
    
    try {
      const response = await apiFunction();
      setResults(`✅ ${testName}:\n\n${JSON.stringify(response, null, 2)}`);
    } catch (error: any) {
      setResults(`❌ ${testName}:\n\n${error?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const apiTests = [
    {
      name: 'Get Consult Astrologers',
      action: () => testApi(() => getConsultAstrologers(), 'Get Consult Astrologers'),
    },
    {
      name: 'Get AI Astrologers',
      action: () => testApi(() => getAiAstrologers(), 'Get AI Astrologers'),
    },
    {
      name: 'Start Chat Session',
      action: () => testApi(() => startChatSession('1', '918334904005'), 'Start Chat Session'),
    },
    {
      name: 'Start Call Session',
      action: () => testApi(() => startCallSession('1', '918334904005'), 'Start Call Session'),
    },
    {
      name: 'Get User Profile',
      action: () => testApi(() => getUserProfile('918334904005'), 'Get User Profile'),
    },
    {
      name: 'Get Wallet Balance',
      action: () => testApi(() => getWalletBalance('918334904005'), 'Get Wallet Balance'),
    },
    {
      name: 'Get Notifications',
      action: () => testApi(() => getNotifications('918334904005'), 'Get Notifications'),
    },
    {
      name: 'Get Chat History',
      action: () => testApi(() => getChatHistory('918334904005'), 'Get Chat History'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>API Test Screen</Text>
        <Text style={styles.subtitle}>Test all API endpoints</Text>

        <View style={styles.buttonsContainer}>
          {apiTests.map((test, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.testButton}
              onPress={test.action}
              disabled={loading}
            >
              <Text style={styles.testButtonText}>{test.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Testing API...</Text>
          </View>
        )}

        {results && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Results:</Text>
            <ScrollView style={styles.resultsScroll}>
              <Text style={styles.resultsText}>{results}</Text>
            </ScrollView>
          </View>
        )}
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
    padding: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  testButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
  },
  testButtonText: {
    color: COLORS.textInverse,
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    color: COLORS.textPrimary,
    marginTop: 16,
    fontSize: 16,
  },
  resultsContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 16,
  },
  resultsTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultsScroll: {
    maxHeight: 300,
  },
  resultsText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: 'monospace',
  },
});
