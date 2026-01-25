import React, { useState, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { COLORS, SPACING } from '../../constants/colors';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { sendMessageThunk } from '../../redux/slices/chat/chatThunk';
import { ChatScreenProps, Message } from './types';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';

export default function ChatScreen({ route, navigation, onBack }: ChatScreenProps) {
  const dispatch = useAppDispatch();
  const astrologerData = route?.params?.astrologer;
  const astrologerId = astrologerData?.id || 'default';
  const { user } = useAppSelector(state => state.authReducer);
  const { messagesByAstrologer, loading } = useAppSelector(state => state.chatReducer);
  
  const [inputText, setInputText] = useState('');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const messages = messagesByAstrologer[astrologerId] || [];

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const sendMessage = async () => {
    if (inputText.trim() === '' || !user?.userId) return;

    const messageText = inputText.trim();
    setInputText('');

    setShowTypingIndicator(true);
    setTimeout(scrollToEnd, 100);

    try {
      await dispatch(sendMessageThunk({
        userId: user.userId,
        message: messageText,
        astrologerId: astrologerId,
      })).unwrap();

      setShowTypingIndicator(false);
      setTimeout(scrollToEnd, 100);
    } catch (error) {
      console.error('Failed to send message:', error);
      setShowTypingIndicator(false);
    }
  };

  const startCall = () => {
    console.log('Starting voice call with', astrologerData?.name);
  };

  const startVideoCall = () => {
    console.log('Starting video call with', astrologerData?.name);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        astrologer={astrologerData}
        onBack={handleBack}
        onCall={startCall}
        onVideoCall={startVideoCall}
        showBackButton={!!(onBack || navigation)}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToEnd}
        ListFooterComponent={showTypingIndicator ? <TypingIndicator /> : null}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: SPACING.lg,
  },
});