import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function OrderAcceptedScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badgeCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        <Text style={styles.title}>Your Order Has Been Accepted</Text>
        <Text style={styles.subtitle}>
          Your items have been placed and are on their way to being processed.
        </Text>
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.replace('Orders')}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.replace('MainTabs', { screen: 'Shop' })}
        >
          <Text style={styles.homeButtonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 42,
  },
  checkIcon: { fontSize: 54, color: '#FFF', fontWeight: 'bold' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  trackButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  trackButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
  homeButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  homeButtonText: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
});