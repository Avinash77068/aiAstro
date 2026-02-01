
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';
import {
  COLORS,
  TEXT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../constants/colors';

const { height } = Dimensions.get('window');

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children?: React.ReactNode;
  height?: number | string;
  showCloseButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
}

export default function BottomModal({
  visible,
  onClose,
  header,
  children,
  height = '80%',
  showCloseButton = true,
  animationType = 'slide',
}: BottomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Tap outside to close */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View style={[styles.sheet, { height: height as any }]}>
          {/* Drag Indicator */}
          <View style={styles.dragHandle} />

          {/* Header */}
          {(header || showCloseButton) && (
            <View style={styles.header}>
              <View style={styles.headerLeft}>{header}</View>

              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <X size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    paddingBottom: SPACING.lg,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    // Elevation (Android)
    elevation: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginVertical: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerLeft: {
    flex: 1,
  },
  closeBtn: {
    padding: SPACING.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
});
