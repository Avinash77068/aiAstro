import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {Phone, Mail} from 'lucide-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {COLORS, SPACING, TEXT_SIZES} from '../../constants/colors';

interface PhoneAuthScreenProps {
  onNext: (identifier: string, type: 'phone' | 'email') => void;
  onGoogleSignIn?: (userData: {name: string; email: string; photo?: string}) => void;
  loading?: boolean;
}

export default function PhoneAuthScreen({onNext, onGoogleSignIn, loading}: PhoneAuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    setError('');
    
    if (activeTab === 'phone') {
      if (!phoneNumber.trim()) {
        setError('Please enter your phone number');
        return;
      }

      if (!validatePhoneNumber(phoneNumber)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      onNext(phoneNumber, 'phone');
    } else {
      if (!email.trim()) {
        setError('Please enter your email');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      onNext(email, 'email');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const userData = {
        name: userInfo.data?.user.name || '',
        email: userInfo.data?.user.email || '',
        photo: userInfo.data?.user.photo || undefined,
      };

      if (onGoogleSignIn) {
        onGoogleSignIn(userData);
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Sign-In Failed', 'Unable to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {activeTab === 'phone' ? (
            <Phone size={60} color={COLORS.primary} />
          ) : (
            <Mail size={60} color={COLORS.primary} />
          )}
        </View>

        <Text style={styles.title}>Welcome to AstroSage AI</Text>
        <Text style={styles.subtitle}>
          Choose your preferred login method
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'phone' && styles.activeTab]}
            onPress={() => {
              setActiveTab('phone');
              setError('');
            }}>
            <Phone size={20} color={activeTab === 'phone' ? COLORS.textInverse : COLORS.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'phone' && styles.activeTabText]}>
              Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'email' && styles.activeTab]}
            onPress={() => {
              setActiveTab('email');
              setError('');
            }}>
            <Mail size={20} color={activeTab === 'email' ? COLORS.textInverse : COLORS.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'email' && styles.activeTabText]}>
              Email
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {activeTab === 'phone' ? (
            <View style={styles.phoneInputWrapper}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit phone number"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={text => {
                  setPhoneNumber(text.replace(/[^0-9]/g, ''));
                  setError('');
                }}
                editable={!loading}
              />
            </View>
          ) : (
            <View style={styles.emailInputWrapper}>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={text => {
                  setEmail(text.trim());
                  setError('');
                }}
                editable={!loading}
              />
            </View>
          )}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.textInverse} />
          ) : (
            <Text style={styles.buttonText}>Send OTP</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          disabled={isGoogleLoading || loading}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>
            {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TEXT_SIZES['3xl'],
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING['2xl'],
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  countryCode: {
    fontSize: TEXT_SIZES.lg,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: TEXT_SIZES.lg,
    color: COLORS.textPrimary,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TEXT_SIZES.sm,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.lg,
    fontWeight: '600',
  },
  termsText: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 4,
    marginBottom: SPACING.xl,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.textInverse,
  },
  emailInputWrapper: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  emailInput: {
    height: 56,
    fontSize: TEXT_SIZES.lg,
    color: COLORS.textPrimary,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
    fontSize: TEXT_SIZES.sm,
  },
  googleButton: {
    backgroundColor: COLORS.cardBackground,
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: SPACING.sm,
  },
  googleButtonText: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: '600',
  },
});
