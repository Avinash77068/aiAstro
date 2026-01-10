import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Briefcase,
  User,
  Calendar,
  Heart,
  MessageCircle,
} from 'lucide-react-native';
import { aiOptions, quickActions, astrologers } from '../data/data';

export default function AstroAIPage() {

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.aiOptions}
      >
        {aiOptions?.map((option, idx) => (
          <TouchableOpacity
            key={idx + 1}
            style={[styles.aiOption, { backgroundColor: option.bgColor }]}
          >
            <View style={styles.aiOptionContent}>
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text
                style={[
                  styles.aiOptionText,
                  option.bgColor === '#FBBF24' && styles.aiOptionTextActive,
                ]}
              >
                {option.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Should I talk to a friend now?"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickActions}
      >
        {quickActions.map((action, idx) => {
          const IconComponent = { Briefcase, User, Calendar, Heart }[action.iconKey];
          if (!IconComponent) return null;
          return (
            <TouchableOpacity key={idx} style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <IconComponent size={24} color="#FBBF24" />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Call & Chat</Text>
        <Text style={styles.sectionArrow}>→</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.astrologers}
      >
        {astrologers.map((astro, idx) => (
          <View key={idx} style={styles.astrologer}>
            <View style={styles.astrologerAvatar} />
            <Text style={styles.astrologerName}>{astro.name}</Text>
            <Text
              style={[
                styles.astrologerPrice,
                astro.price === 'FREE' && styles.freePrice,
              ]}
            >
              {astro.price}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callText}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton}>
          <View style={styles.chatButtonContent}>
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.chatText}>Free Chat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  aiOptions: {
    marginBottom: 24,
  },
  aiOption: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiOptionContent: {
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  aiOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aiOptionTextActive: {
    color: '#000000',
  },
  inputContainer: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#FBBF24',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendText: {
    color: '#000000',
    fontSize: 18,
  },
  quickActions: {
    marginBottom: 24,
  },
  quickAction: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#374151',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionArrow: {
    color: '#FBBF24',
    fontSize: 16,
  },
  astrologers: {
    marginBottom: 24,
  },
  astrologer: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  astrologerAvatar: {
    width: 64,
    height: 64,
    backgroundColor: '#4B5563',
    borderRadius: 32,
    marginBottom: 8,
  },
  astrologerName: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  astrologerPrice: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  freePrice: {
    color: '#10B981',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  callText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
