import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  Briefcase,
  User,
  Wallet,
  Heart,
  Book,
  MessageCircle,
} from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/native';

export default function AstroAIPage() {
  const navigation = useNavigation<any>();
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const { data: astrologerData } = useAppSelector(state => state.astrologerReducer);
  const aiOptions = homeData?.aiOptions || [];
  const quickActions = homeData?.quickActions || [];

  const astrologers = astrologerData || [];
  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.aiOptions}
      >
        {aiOptions?.map((option:any, idx) => {
          return (
            <TouchableOpacity
              key={idx + 1}
              style={[styles.aiOption, { backgroundColor: option.bgColor }]}
              onPress={() => navigation.navigate(option.route)}
            >
              <View style={styles.aiOptionContent}>
                {option.image && (
                  <Image
                    source={{ uri: option.image }}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                )}
                <Text
                  style={[
                    styles.aiOptionText,
                    option.bgColor === COLORS.primary &&
                      styles.aiOptionTextActive,
                  ]}
                >
                  {option.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Share with your friends get free chat."
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
          const IconComponent = { Briefcase, User, Wallet, Heart, Book }[
            action.iconKey
          ];
          if (!IconComponent) return null;
          return (
            <TouchableOpacity key={idx} style={styles.quickAction} onPress={() => { 
              navigation.navigate(action.route);
            }}
            >
              <View style={styles.quickActionIcon}>
                <IconComponent size={24} color={COLORS.primary} />
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
          <View key={astro._id || idx} style={styles.astrologer}>
            {astro.image ? (
              <Image
                source={{ uri: astro.image }}
                style={styles.astrologerAvatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.astrologerAvatar} />
            )}
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
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => {
            navigation.navigate('Home', { section: 'Consult' });
          }}
        >
          <Text style={styles.callText}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => {
            navigation.navigate('Home', { section: 'Consult' });
          }}
        >
          <View style={styles.chatButtonContent}>
            <MessageCircle size={20} color={COLORS.textInverse} />
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
    backgroundColor: COLORS.background,
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
    fontSize: TEXT_SIZES['4xl'],
    marginBottom: 8,
  },
  optionImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  aiOptionText: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.base,
    fontWeight: 'bold',
  },
  aiOptionTextActive: {
    color: COLORS.textInverse,
  },
  inputContainer: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.lg,
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
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 10,
    borderColor: 'transparent',
  },
  quickActionLabel: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  sectionArrow: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.lg,
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
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  astrologerPrice: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textTertiary,
  },
  freePrice: {
    color: COLORS.success,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  callButton: {
    flex: 1,
    backgroundColor: COLORS.success,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.3,
  },
  callText: {
    color: COLORS.textInverse,
    fontWeight: 'bold',
    fontSize: TEXT_SIZES.lg,
  },
  chatButton: {
    flex: 1,
    backgroundColor: COLORS.info,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatText: {
    color: COLORS.textInverse,
    fontWeight: 'bold',
    fontSize: TEXT_SIZES.lg,
    marginLeft: 8,
  },
});
