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
import { useSidebar } from '../store/SidebarContext';
import SidebarItem from './SidebarItem';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = 320;

const Sidebar: React.FC = () => {
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
              <User size={40} color="#9CA3AF" />
            </View>
            <View>
              <Text style={styles.name}>918334904005</Text>
              <Text style={styles.plan}>Basic</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menu}>
            <SidebarItem
              icon={<Bell size={24} color="#FFFFFF" />}
              text="Notification Setting"
            />
            <SidebarItem
              icon={<Globe size={24} color="#FFFFFF" />}
              text="Change Language"
            />
            <SidebarItem
              icon={<TrendingUp size={24} color="#FFFFFF" />}
              text="Upgrade Plan"
            />
            <SidebarItem
              icon={<XCircle size={24} color="#FFFFFF" />}
              text="Remove Ads"
            />
            <SidebarItem
              icon={<MessageSquare size={24} color="#FFFFFF" />}
              text="Feedback"
            />
            <SidebarItem
              icon={<Star size={24} color="#FFFFFF" />}
              text="Rate AstroSage AI"
            />
            <SidebarItem
              icon={<Users size={24} color="#FFFFFF" />}
              text="About Us"
            />
            <SidebarItem
              icon={<FileText size={24} color="#FFFFFF" />}
              text="Astrologer Registration"
            />
            <SidebarItem
              icon={<BookOpen size={24} color="#FFFFFF" />}
              text="Choose Your Kundli"
            />
            <SidebarItem
              icon={<Download size={24} color="#FFFFFF" />}
              text="Downloads"
            />
            <SidebarItem
              icon={<Gift size={24} color="#FFFFFF" />}
              text="Refer & Earn"
            />
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
    borderBottomColor: '#374151',
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#374151',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  plan: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  menu: {
    // space-y-1 equivalent
  },
});

export default Sidebar;
