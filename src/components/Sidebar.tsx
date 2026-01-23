import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Bell,
  Globe,
  TrendingUp,
  XCircle,
  MessageSquare,
  Star,
  Users,
  FileText,
  BookOpen,
  Download,
  Gift,
  User,
} from 'lucide-react-native';
import { useSidebar } from '../customComponents/SidebarContext';
import SidebarItem from './SidebarItem';
import { sidebarMenuItems } from '../data/data';
import { COLORS, TEXT_SIZES, SPACING, BORDER_RADIUS } from '../constants/colors';
import { AppConfig } from '../redux/slices/home/homeSlice';
import { useAppSelector } from '../redux/hooks';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = 320;

const Sidebar: React.FC = () => {
  const { data: homeData } = useAppSelector(state => state.homeReducer);
    const appConfig: AppConfig = homeData?.appConfig || { 
      appName: 'Astro AI', 
      notificationCount: '0',
      userProfile: {
        name: 'Guest',
        plan: 'Basic'
      }
    };
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: sidebarOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [sidebarOpen, translateX]);

  if (!sidebarOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.overlayTouchable}
        onPress={toggleSidebar}
      />
      <Animated.View
        style={[
          styles.sidebar,
          styles.container,
          { transform: [{ translateX }] },
        ]}
      >
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <User size={40} color={COLORS.textTertiary} />
            </View>
            <View>
              <Text style={styles.name}>{appConfig.userProfile.name}</Text>
              <Text style={styles.plan}>{appConfig.userProfile.plan}</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menu}>
            {sidebarMenuItems.map((item, idx) => {
              const IconComponent = {
                Bell,
                Globe,
                TrendingUp,
                XCircle,
                MessageSquare,
                Star,
                Users,
                FileText,
                BookOpen,
                Download,
                Gift,
              }[item.iconKey];
              if (!IconComponent) return null;
              return (
                <SidebarItem
                  key={idx}
                  icon={<IconComponent size={24} color={COLORS.textPrimary} />}
                  text={item.text}
                />
              );
            })}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 40,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 40,
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: SIDEBAR_WIDTH,
    backgroundColor: '#000000',
    zIndex: 50,
    elevation: 5,
  },
  content: {
    padding: 24,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  plan: {
    fontSize: 14,
    color: COLORS.textTertiary,
  },
  menu: {
    // space-y-1 equivalent
  },
});

export default Sidebar;
