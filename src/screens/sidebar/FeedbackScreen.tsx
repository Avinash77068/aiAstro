import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react-native';

const FeedbackScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!feedback.trim() && rating === 0) {
      Alert.alert('Error', 'Please provide feedback or a rating.');
      return;
    }
    // Here you would typically send the feedback and rating to a server
    Alert.alert('Thank You', 'Your feedback has been submitted.');
    navigation.goBack();
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => setRating(star)}>
        <Star
          size={32}
          color={star <= rating ? COLORS.primary : COLORS.border}
          fill={star <= rating ? COLORS.primary : 'transparent'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Feedback</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rate AstroSage AI</Text>
        <View style={styles.ratingContainer}>
          {renderStars()}
        </View>
        <Text style={styles.ratingText}>
          {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Tap to rate'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Feedback</Text>
        <View style={styles.feedbackContainer}>
          <MessageSquare size={20} color={COLORS.textTertiary} style={styles.feedbackIcon} />
          <TextInput
            style={styles.feedbackInput}
            placeholder="Tell us what you think..."
            placeholderTextColor={COLORS.textTertiary}
            multiline
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top"
          />
        </View>
      </View>

      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  section: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  feedbackIcon: {
    marginRight: SPACING.sm,
    marginTop: SPACING.xs,
  },
  feedbackInput: {
    flex: 1,
    fontSize: TEXT_SIZES.base,
    color: COLORS.textPrimary,
    minHeight: 100,
  },
  submitContainer: {
    padding: SPACING.md,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  submitText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
