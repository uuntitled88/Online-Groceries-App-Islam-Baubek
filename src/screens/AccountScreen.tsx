import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  DEFAULT_PROFILE,
  loadProfile,
  UserProfile,
} from '../utils/userStorage';

export default function AccountScreen({ navigation }: any) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadProfile().then((data) => {
        if (active) {
          setProfile(data);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const menuItems = [
    { label: 'Orders', icon: '🛍️', route: 'Orders' },
    { label: 'My Details', icon: '🪪', route: 'MyDetails' },
    { label: 'Delivery Address', icon: '📍', route: 'DeliveryAddress' },
    { label: 'Payment Methods', icon: '💳', route: 'PaymentMethods' },
    { label: 'Promo Code', icon: '🏷️', route: 'PromoCode' },
    { label: 'Notifications', icon: '🔔', route: 'Notifications' },
    { label: 'Help', icon: '❓', route: 'Help' },
    { label: 'About', icon: 'ℹ️', route: 'About' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <TouchableOpacity
          style={styles.profileHeader}
          onPress={() => navigation.navigate('MyDetails')}
        >
          <View style={styles.avatarBox}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{profile.name}</Text>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
            <Text style={styles.userEmail}>{profile.email}</Text>
          </View>
        </TouchableOpacity>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuRow}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Out */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace('SignIn')}
        >
          <Text style={styles.logoutIcon}>⇥</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { paddingBottom: 32 },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarIcon: { fontSize: 30 },
  profileInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  userName: { fontSize: 19, fontWeight: 'bold', color: '#181725' },
  editIcon: { fontSize: 14 },
  userEmail: { fontSize: 14, color: '#7C7C7C', marginTop: 4 },
  menuContainer: { paddingHorizontal: 20 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIcon: { fontSize: 18 },
  menuLabel: { fontSize: 16, fontWeight: '600', color: '#181725' },
  chevron: { fontSize: 22, color: '#181725', fontWeight: '500' },
  logoutButton: {
    marginTop: 28,
    marginHorizontal: 20,
    backgroundColor: '#F2F3F2',
    borderRadius: 19,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoutIcon: { fontSize: 20, color: '#53B175', fontWeight: 'bold' },
  logoutText: { fontSize: 17, fontWeight: '700', color: '#53B175' },
});