import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {sendOTPThunk, verifyOTPThunk} from '../../redux/slices/auth/authThunk';
import PhoneAuthScreen from './PhoneAuthScreen';
import OTPVerificationScreen from './OTPVerificationScreen';
import {COLORS} from '../../constants/colors';

interface AuthContainerProps {
  onComplete: () => void;
}

export default function AuthContainer({onComplete}: AuthContainerProps) {
  const dispatch = useAppDispatch();
  const {loading, phoneNumber} = useAppSelector(state => state.authReducer);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [authType, setAuthType] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '693739184836-j8nch0629ri9v4d8hkgg4v1618d075b3.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleSendOTP = async (value: string, type: 'phone' | 'email') => {
    try {
      setAuthType(type);
      setIdentifier(value);
      
      if (type === 'phone') {
        await dispatch(sendOTPThunk({phoneNumber: value})).unwrap();
      } else {
        await dispatch(sendOTPThunk({email: value})).unwrap();
      }
      setStep('otp');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!identifier) return;

    try {
      if (authType === 'phone') {
        await dispatch(verifyOTPThunk({phoneNumber: identifier, otp})).unwrap();
      } else {
        await dispatch(verifyOTPThunk({email: identifier, otp})).unwrap();
      }
      onComplete();
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleResendOTP = async () => {
    if (!identifier) return;

    try {
      if (authType === 'phone') {
        await dispatch(sendOTPThunk({phoneNumber: identifier})).unwrap();
      } else {
        await dispatch(sendOTPThunk({email: identifier})).unwrap();
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const handleGoogleSignIn = (userData: {name: string; email: string; photo?: string}) => {
    console.log('Google Sign-In successful:', userData);
    onComplete();
  };

  const handleBack = () => {
    setStep('phone');
  };

  return (
    <View style={styles.container}>
      {step === 'phone' ? (
        <PhoneAuthScreen 
          onNext={handleSendOTP} 
          onGoogleSignIn={handleGoogleSignIn}
          loading={loading} 
        />
      ) : (
        <OTPVerificationScreen
          phoneNumber={identifier}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onBack={handleBack}
          loading={loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
