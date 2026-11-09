import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

const MENU_ITEMS = [
  { id: '1', title: 'My Orders', icon: '📦' },
  { id: '2', title: 'My Details', icon: 'T' },
  { id: '3', title: 'Delivery Address', icon: '📍' },
  { id: '4', title: 'Payment Methods', icon: '💳' },
  { id: '5', title: 'Promo Cords', icon: '🎟️' },
  { id: '6', title: 'Notifications', icon: '🔔' },
  { id: '7', title: 'Help', icon: '❓' },
  { id: '8', title: 'About', icon: 'ℹ️' },
];

export default function AccountScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Islam Developer</Text>
            <Text style={styles.profileEmail}>islam@example.com</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.replace('SignIn')}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 20, paddingBottom: 90 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#F2F3F2', paddingBottom: 20 },
  avatarPlaceholder: { width: 65, height: 65, backgroundColor: '#F2F3F2', borderRadius: 32.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { fontSize: 30 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#181725', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: '#7C7C7C' },
  menuList: { marginBottom: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { fontSize: 18, marginRight: 15, width: 25, textAlign: 'center' },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#181725' },
  menuArrow: { fontSize: 22, color: '#7C7C7C' },
  logoutButton: { backgroundColor: '#F2F3F2', borderRadius: 20, padding: 18, alignItems: 'center', marginTop: 10 },
  logoutButtonText: { color: '#53B175', fontSize: 16, fontWeight: 'bold' }
});