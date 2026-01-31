import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {loginThunk} from '../../redux/slices/auth/authThunk';
import NameStep from './NameStep';
import PlaceStep from './PlaceStep';
import DateStep from './DateStep';
import GenderStep from './GenderStep';
import {COLORS, SPACING, TEXT_SIZES} from '../../constants/colors';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({onComplete}: OnboardingScreenProps) {
  const dispatch = useAppDispatch();
  const {loading, error, phoneNumber, email, photo, isGoogleLogin,token} = useAppSelector(state => state.authReducer);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    dateOfBirth: '',
    gender: '',
    email: '',
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '693739184836-s3rn40uaml3bfq2bdpteb53p8de38ji7.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleNameNext = (name: string) => {
    setFormData(prev => ({...prev, name}));
    setCurrentStep(1);
  };

  const handlePlaceNext = (place: string) => {
    setFormData(prev => ({...prev, place}));
    setCurrentStep(2);
  };

  const handleDateNext = (dateOfBirth: string) => {
    setFormData(prev => ({...prev, dateOfBirth}));
    setCurrentStep(3);
  };

  const handleGenderNext = async (gender: string) => {
    const finalData = {
      ...formData,
      isGoogleLogin,
      token: token || undefined,
      gender,
      ...(email ? {email, photo: photo || undefined} : {}),
      ...(phoneNumber && !email ? {phoneNumber} : {}),
    };

    try {
      const result = await dispatch(loginThunk(finalData)).unwrap();
      console.log('Login successful:', result);
      onComplete();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <NameStep 
            onNext={handleNameNext} 
            initialValue={formData.name} 
          />
        );
      case 1:
        return (
          <PlaceStep
            onNext={handlePlaceNext}
            onBack={handleBack}
            initialValue={formData.place}
          />
        );
      case 2:
        return (
          <DateStep
            onNext={handleDateNext}
            onBack={handleBack}
            initialValue={formData.dateOfBirth}
          />
        );
      case 3:
        return (
          <GenderStep
            onNext={handleGenderNext}
            onBack={handleBack}
            initialValue={formData.gender}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {[0, 1, 2, 3].map(step => (
            <View
              key={step}
              style={[
                styles.progressDot,
                step <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {renderStep()}
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Setting up your profile...</Text>
          </View>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  progressContainer: {
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.base,
  },
  errorContainer: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.xl,
    right: SPACING.xl,
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.textInverse,
    textAlign: 'center',
    fontSize: TEXT_SIZES.sm,
  },
});
