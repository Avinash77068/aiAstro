import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Bell, X, Clock, MessageCircle, Star, TrendingUp } from 'lucide-react-native';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';
import BottomModal from './BottomModal';

const { width, height } = Dimensions.get('window');

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'message',
    title: 'New Message from Astrologer',
    message: 'Mr. Krishnam has responded to your question about career guidance.',
    time: '2 min ago',
    read: false,
    icon: MessageCircle,
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Horoscope Reminder',
    message: 'Your daily horoscope for today is ready. Check your Gemini predictions.',
    time: '1 hour ago',
    read: false,
    icon: Star,
  },
  {
    id: '3',
    type: 'update',
    title: 'Premium Plan Expiring',
    message: 'Your premium astrology subscription will expire in 3 days.',
    time: '2 hours ago',
    read: true,
    icon: TrendingUp,
  },
  {
    id: '4',
    type: 'system',
    title: 'App Update Available',
    message: 'New features added! Update to the latest version for better experience.',
    time: '1 day ago',
    read: true,
    icon: Bell,
  },
];

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ visible, onClose }: NotificationPanelProps) {
  
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotification = ({ item }: { item: any }) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        style={[styles.notificationItem, !item.read && styles.unreadNotification]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.notificationIcon}>
          <IconComponent size={20} color={item.read ? COLORS.textSecondary : COLORS.primary} />
        </View>

        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <View style={styles.notificationFooter}>
            <Clock size={12} color={COLORS.textTertiary} />
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>

        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <BottomModal
      visible={visible}
      onClose={onClose}
      showCloseButton={false}
      header={
        <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Bell size={24} color={COLORS.primary} />
              <Text style={styles.headerTitle}>Notifications</Text>
              {unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>

            <View style={styles.headerRight}>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={markAllAsRead}>
                  <Text style={styles.markAllText}>Mark all read</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
      }
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        <View style={styles.panel}>

          {/* Notifications List */}
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notificationsList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Bell size={48} color={COLORS.textTertiary} />
                <Text style={styles.emptyStateTitle}>No notifications</Text>
                <Text style={styles.emptyStateText}>
                  You're all caught up! New notifications will appear here.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  overlayTouchable: {
    flex: 1,
  },
  panel: {
    height: height * 0.7,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingTop: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  unreadBadgeText: {
    color: COLORS.textInverse,
    fontSize: TEXT_SIZES.xs,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  markAllText: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '500',
  },
  closeButton: {
    padding: SPACING.xs,
  },
  notificationsList: {
    padding: SPACING.lg,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.cardBackground,
  },
  unreadNotification: {
    backgroundColor: COLORS.cardBackground,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  notificationIcon: {
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  unreadTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  notificationMessage: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  notificationTime: {
    color: COLORS.textTertiary,
    fontSize: TEXT_SIZES.xs,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['4xl'],
  },
  emptyStateTitle: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.lg,
    fontWeight: 'bold',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
    textAlign: 'center',
    paddingHorizontal: SPACING['2xl'],
  },
});
