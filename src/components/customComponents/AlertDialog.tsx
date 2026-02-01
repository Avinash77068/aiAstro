import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/colors';

const { width } = Dimensions.get('window');

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColor?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'OK',
  confirmButtonColor = COLORS.primary,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            {onConfirm && (
              <TouchableOpacity
                style={[styles.button, styles.confirmButton, { backgroundColor: confirmButtonColor }]}
                onPress={onConfirm}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  dialog: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    width: width - SPACING.xl * 2,
    maxWidth: 400,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  title: {
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  message: {
    fontSize: TEXT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.border,
  },
  confirmButton: {
    // backgroundColor set via prop
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.base,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.base,
    fontWeight: '600',
  },
});

export default AlertDialog;
