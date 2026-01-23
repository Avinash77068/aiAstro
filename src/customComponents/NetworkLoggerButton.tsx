import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import NetworkLogger from 'react-native-network-logger';

const NetworkLoggerButton = () => {
  const [showNetworkLogger, setShowNetworkLogger] = useState(false);

  return (
    <>
      {!showNetworkLogger && (
        <TouchableOpacity
          style={styles.networkLoggerButton}
          onPress={() => setShowNetworkLogger(true)}>
          <Text style={styles.networkLoggerButtonText}>📡</Text>
        </TouchableOpacity>
      )}

      {showNetworkLogger && (
        <View style={styles.networkLoggerOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowNetworkLogger(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <NetworkLogger />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  networkLoggerButton: {
    position: 'absolute',
    top: 110,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  networkLoggerButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  networkLoggerOverlay: {
    position: 'absolute',
    top: 0,
    paddingTop: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 9999,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10000,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NetworkLoggerButton;
