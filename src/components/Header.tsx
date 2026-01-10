import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Wallet, Bell, Search } from 'lucide-react-native';
import { useSidebar } from '../store/SidebarContext';
import { appConfig } from '../data/data';

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{appConfig.appName}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity>
          <Wallet size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellContainer}>
          <Bell size={24} color="#FFFFFF" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{appConfig.notificationCount}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Search size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
    padding: 16,
    paddingTop: 60, // For status bar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bellContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
