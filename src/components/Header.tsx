import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Wallet, Bell, Search } from 'lucide-react-native';
import { useSidebar } from '../customComponents/SidebarContext';
import { COLORS, TEXT_SIZES, SPACING } from '../constants/colors';
import NotificationPanel from './NotificationPanel';
import WalletPanel from './WalletPanel';
import SearchModal from './SearchModal';
import { useAppSelector } from '../redux/hooks';
import { AppConfig } from '../redux/slices/home/homeSlice';

export default function Header() {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
  const appConfig: AppConfig = homeData?.appConfig || { 
    appName: 'Astro AI', 
    notificationCount: '0',
    userProfile: {
      name: 'Guest',
      plan: 'Basic'
    }
  };
  const { toggleSidebar } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {}, [showNotifications]);

  useEffect(() => {}, [showWallet]);

  useEffect(() => {}, [showSearch]);

  const handleNotificationPress = () => {
    setShowNotifications(prev => {
      return true;
    });
  };

  const handleWalletPress = () => {
    setShowWallet(prev => {
      return true;
    });
  };

  const handleSearchPress = () => {
    setShowSearch(prev => {
      return true;
    });
  };

  const closeAllPanels = () => {
    setShowNotifications(false);
    setShowWallet(false);
    setShowSearch(false);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.left}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Menu size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>{appConfig?.appName}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={handleWalletPress}>
            <Wallet size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bellContainer}
            onPress={handleNotificationPress}
          >
            <Bell size={24} color={COLORS.textPrimary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {appConfig.notificationCount}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearchPress}>
            <Search size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Panels and Modals - Outside View for proper z-index */}
      <NotificationPanel visible={showNotifications} onClose={closeAllPanels} />
      <WalletPanel visible={showWallet} onClose={closeAllPanels} />
      <SearchModal visible={showSearch} onClose={closeAllPanels} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.headerBackground,
    padding: SPACING.md,
    paddingTop: 60, // For status bar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bellContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.notificationBadge,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.xs,
    fontWeight: 'bold',
  },
});
