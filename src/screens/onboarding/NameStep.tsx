import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {User} from 'lucide-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS} from '../../constants/colors';

interface NameStepProps {
  onNext: (name: string) => void;
  onGoogleSignIn?: (userData: {name: string; email: string; photo?: string}) => void;
  initialValue?: string;
}

export default function NameStep({onNext, onGoogleSignIn, initialValue = ''}: NameStepProps) {
  const [name, setName] = useState(initialValue);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleNext = () => {
    if (name.trim()) {
      onNext(name.trim());
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
      } else {
        onNext(userData.name);
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <User size={48} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>What's your name?</Text>
        <Text style={styles.subtitle}>
          Let us know how to address you
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.textTertiary}
            value={name}
            onChangeText={setName}
            autoFocus
            autoCapitalize="words"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !name.trim() && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!name.trim()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          disabled={isGoogleLoading}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>
            {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>
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
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    fontSize: TEXT_SIZES.lg,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
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
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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
