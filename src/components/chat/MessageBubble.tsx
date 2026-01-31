import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View style={[styles.messageContainer, message.isUser ? styles.userMessage : styles.astrologerMessage]}>
      <Text style={[styles.messageText, message.isUser ? styles.userMessageText : styles.astrologerMessageText]}>
        {message.text}
      </Text>
      <Text style={[styles.timestamp, message.isUser ? styles.userTimestamp : styles.astrologerTimestamp]}>
        {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: SPACING.lg,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  astrologerMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageText: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    fontSize: TEXT_SIZES.base,
  },
  userMessageText: {
    backgroundColor: COLORS.primary,
    color: COLORS.textInverse,
  },
  astrologerMessageText: {
    backgroundColor: COLORS.cardBackground,
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: TEXT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  userTimestamp: {
    color: COLORS.textTertiary,
    textAlign: 'right',
  },
  astrologerTimestamp: {
    color: COLORS.textTertiary,
    textAlign: 'left',
  },
});
