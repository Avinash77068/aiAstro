import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
});

export default SidebarItem;
