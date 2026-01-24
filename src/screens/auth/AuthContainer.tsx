import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
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

  const handleSendOTP = async (phone: string) => {
    try {
      await dispatch(sendOTPThunk({phoneNumber: phone})).unwrap();
      setStep('otp');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!phoneNumber) return;

    try {
      await dispatch(verifyOTPThunk({phoneNumber, otp})).unwrap();
      onComplete();
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleResendOTP = async () => {
    if (!phoneNumber) return;

    try {
      await dispatch(sendOTPThunk({phoneNumber})).unwrap();
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const handleBack = () => {
    setStep('phone');
  };

  return (
    <View style={styles.container}>
      {step === 'phone' ? (
        <PhoneAuthScreen onNext={handleSendOTP} loading={loading} />
      ) : (
        <OTPVerificationScreen
          phoneNumber={phoneNumber || ''}
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
