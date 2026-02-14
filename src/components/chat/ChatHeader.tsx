import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Phone, Video, ArrowLeft } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { Astrologer } from './types';

interface ChatHeaderProps {
  astrologer?: Astrologer;
  onBack: () => void;
  onCall: () => void;
  onVideoCall: () => void;
  showBackButton: boolean;
  showTimer?: boolean;
  countdownSeconds?: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  astrologer,
  onBack,
  onCall,
  onVideoCall,
  showBackButton,
  showTimer = true,
  countdownSeconds = 60,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(countdownSeconds);

  useEffect(() => {
    setRemainingSeconds(countdownSeconds);

    if (!showTimer) {
      return undefined;
    }

    const interval = setInterval(() => {
      setRemainingSeconds(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer, countdownSeconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes} : ${secs}`;
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.astrologerInfo}>
          {astrologer?.image ? (
            <Image
              source={{ uri: astrologer.image }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatar} />
          )}
          <View>
            <Text style={styles.astrologerName}>
              {astrologer?.name}
              {astrologer?.verified && <Text style={styles.verified}> ✓</Text>}
            </Text>
            <Text style={styles.astrologerType}>{astrologer?.type}</Text>
            <Text style={styles.price}>{astrologer?.price}</Text>
          </View>
        </View>
      </View>
      {showTimer ? (
        <View style={styles.headerRightForTimer}>
          <Text style={styles.timerText}>{formatTime(remainingSeconds)}</Text>
        </View>
      ) : (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onCall} style={styles.callButton}>
            <Phone size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onVideoCall} style={styles.videoButton}>
            <Video size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: SPACING.xs,
    padding: SPACING.sm,
  },
  astrologerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.md,
  },
  astrologerName: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
  verified: {
    color: COLORS.verified,
    fontSize: TEXT_SIZES.base,
  },
  astrologerType: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
  },
  price: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  headerRightForTimer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
  },
  timerText: {
    color: COLORS.primaryDark,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
  callButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.cardBackground,
    opacity: 0.2,
  },
  videoButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.cardBackground,
    opacity: 0.2,
  },
});
