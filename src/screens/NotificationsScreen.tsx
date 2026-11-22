import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

interface NotificationSetting {
  id: string;
  title: string;
  subtitle: string;
  enabled: boolean;
}

interface RecentAlert {
  id: string;
  title: string;
  time: string;
  badge: string;
}

const INITIAL_SETTINGS: NotificationSetting[] = [
  {
    id: '1',
    title: 'Order Updates',
    subtitle: 'Get real-time alerts when your groceries are packed or out for delivery.',
    enabled: true,
  },
  {
    id: '2',
    title: 'Promotions & Offers',
    subtitle: 'Receive exclusive promo codes, seasonal deals, and flash discounts.',
    enabled: true,
  },
  {
    id: '3',
    title: 'Fresh Arrivals',
    subtitle: 'Know when organic produce, dairy, and bakery items restock.',
    enabled: false,
  },
  {
    id: '4',
    title: 'Cart Reminders',
    subtitle: 'Gentle reminders if you leave items waiting in your cart.',
    enabled: true,
  },
];

const RECENT_ALERTS: RecentAlert[] = [
  {
    id: '101',
    title: 'Order #ORD-1048 is on the way to your address',
    time: '15m ago',
    badge: '🚚',
  },
  {
    id: '102',
    title: '20% off fresh produce with code FRESH20',
    time: '2h ago',
    badge: '🎟️',
  },
  {
    id: '103',
    title: 'Order #ORD-1032 was delivered successfully',
    time: 'Nov 12',
    badge: '✅',
  },
];

export default function NotificationsScreen({ navigation }: any) {
  const [settings, setSettings] = useState<NotificationSetting[]>(INITIAL_SETTINGS);
  const [savedBanner, setSavedBanner] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleSavePreferences = () => {
    setSavedBanner(true);
    setTimeout(() => {
      setSavedBanner(false);
      navigation.goBack();
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {savedBanner && (
          <View style={styles.savedBanner}>
            <Text style={styles.savedText}>✓ Notification preferences saved</Text>
          </View>
        )}

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        {settings.map((item) => (
          <View key={item.id} style={styles.settingCard}>
            <View style={styles.settingTextBox}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleSetting(item.id)}
              trackColor={{ false: '#E2E2E2', true: '#A5D6A7' }}
              thumbColor={item.enabled ? '#53B175' : '#F4F3F4'}
            />
          </View>
        ))}

        {/* Recent Alerts Section */}
        <Text style={[styles.sectionTitle, styles.alertsTitle]}>
          Recent Activity
        </Text>
        {RECENT_ALERTS.map((alert) => (
          <View key={alert.id} style={styles.alertRow}>
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeIcon}>{alert.badge}</Text>
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Save CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSavePreferences}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: { fontSize: 28, color: '#181725', fontWeight: '600' },
  headerTitle: { fontSize: 19, fontWeight: 'bold', color: '#181725' },
  placeholder: { width: 36 },
  scrollContent: { padding: 20, paddingBottom: 110 },
  savedBanner: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  savedText: { color: '#53B175', fontWeight: '700', fontSize: 14 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 14,
  },
  alertsTitle: { marginTop: 14 },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  settingTextBox: { flex: 1, paddingRight: 12 },
  settingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  settingSubtitle: { fontSize: 13, color: '#7C7C7C', lineHeight: 18 },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  alertBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F2F3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  alertBadgeIcon: { fontSize: 20 },
  alertContent: { flex: 1 },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 3,
  },
  alertTime: { fontSize: 12, color: '#7C7C7C' },
  bottomBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },
  saveButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});