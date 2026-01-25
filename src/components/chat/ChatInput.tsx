import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Send } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  loading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  loading,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Type your message..."
        placeholderTextColor={COLORS.textTertiary}
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        onPress={onSend}
        style={[styles.sendButton, (value.trim() === '' || loading) && styles.sendButtonDisabled]}
        disabled={value.trim() === '' || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Send size={20} color={value.trim() === '' ? COLORS.textTertiary : COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.base,
    maxHeight: 100,
  },
  sendButton: {
    padding: SPACING.sm,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
