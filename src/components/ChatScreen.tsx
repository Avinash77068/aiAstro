import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Send, Phone, Video, ArrowLeft } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { sendMessageThunk } from '../redux/slices/chat/chatThunk';
import { clearMessages } from '../redux/slices/chat/chatSlice';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Astrologer {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  verified: boolean;
  image?: string;
  languages?: string[];
  experience?: string;
  reviews?: number;
  status?: string;
  sessionType?: string;
  specialization?: string[];
  description?: string;
}


const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I am Dr. Rajesh Kumar. How can I help you with your astrology consultation today?',
    isUser: false,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: '2',
    text: 'Hi, I have some questions about my career path. Can you help?',
    isUser: true,
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: '3',
    text: 'Of course! I would be happy to help you understand your career prospects through astrology. What specific aspects of your career are you concerned about?',
    isUser: false,
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  },
];

interface ChatScreenProps {
  route?: {
    params?: {
      astrologer?: Astrologer;
    };
  };
  navigation?: any;
  astrologer?: Astrologer;
  onBack?: () => void;
}

export default function ChatScreen({ route, navigation, onBack }: ChatScreenProps) {
  const dispatch = useAppDispatch();
  const astrologerData = route?.params?.astrologer;
  const { user } = useAppSelector(state => state.authReducer);
  const { messages: reduxMessages, loading } = useAppSelector(state => state.chatReducer);
  
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (reduxMessages.length > 0) {
      setMessages(reduxMessages);
    }
  }, [reduxMessages]);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  const sendMessage = async () => {
    if (inputText.trim() === '' || !user?.userId) return;

    const messageText = inputText.trim();
    setInputText('');

    try {
      await dispatch(sendMessageThunk({
        userId: user.userId,
        message: messageText,
      })).unwrap();

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Failed to send message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, failed to send message. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.astrologerMessage]}>
      <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.astrologerMessageText]}>
        {item.text}
      </Text>
      <Text style={[styles.timestamp, item.isUser ? styles.userTimestamp : styles.astrologerTimestamp]}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {(onBack || navigation) && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          )}
          <View style={styles.astrologerInfo}>
            {astrologerData?.image ? (
              <Image  
                source={{ uri: astrologerData.image }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatar} />
            )}
            <View>
              <Text style={styles.astrologerName}>
                {astrologerData?.name}
                {astrologerData?.verified && <Text style={styles.verified}> ✓</Text>}
              </Text>
              <Text style={styles.astrologerType}>{astrologerData?.type}</Text>
              <Text style={styles.price}>{astrologerData?.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={startCall} style={styles.callButton}>
            <Phone size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={startVideoCall} style={styles.videoButton}>
            <Video size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor={COLORS.textTertiary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[styles.sendButton, (inputText.trim() === '' || loading) && styles.sendButtonDisabled]}
            disabled={inputText.trim() === '' || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Send size={20} color={inputText.trim() === '' ? COLORS.textTertiary : COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60
  },
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
  callButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.cardBackground,
  },
  videoButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.cardBackground,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: SPACING.lg,
  },
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
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
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