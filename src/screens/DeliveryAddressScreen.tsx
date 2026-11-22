import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  DEFAULT_ADDRESS,
  loadAddress,
  saveAddress,
} from '../utils/userStorage';

const PRESET_ADDRESSES = [
  DEFAULT_ADDRESS,
  'пр. Достык 123, кв. 45, Алматы',
  'мкр. Самал-2, д. 58, Алматы',
];

export default function DeliveryAddressScreen({ navigation }: any) {
  const [selectedAddress, setSelectedAddress] = useState(DEFAULT_ADDRESS);
  const [customAddress, setCustomAddress] = useState('');
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    loadAddress().then((addr) => {
      setSelectedAddress(addr);
      if (!PRESET_ADDRESSES.includes(addr)) {
        setCustomAddress(addr);
      }
    });
  }, []);

  const handleSave = async () => {
    const finalAddress = customAddress.trim() || selectedAddress;
    await saveAddress(finalAddress);
    setSelectedAddress(finalAddress);
    setSavedBanner(true);
    setTimeout(() => {
      setSavedBanner(false);
      navigation.goBack();
    }, 600);
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
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Saved Addresses</Text>

        {Array.from(new Set([DEFAULT_ADDRESS, ...PRESET_ADDRESSES])).map(
          (addr) => {
            const active =
              !customAddress.trim() && selectedAddress === addr;
            return (
              <TouchableOpacity
                key={addr}
                style={[styles.addressCard, active && styles.addressCardActive]}
                onPress={() => {
                  setCustomAddress('');
                  setSelectedAddress(addr);
                }}
              >
                <Text style={styles.addressText}>{addr}</Text>
                <Text style={styles.checkIcon}>{active ? '✓' : ''}</Text>
              </TouchableOpacity>
            );
          }
        )}

        <Text style={[styles.sectionTitle, styles.customTitle]}>
          Custom Address
        </Text>
        <TextInput
          style={styles.input}
          value={customAddress}
          onChangeText={setCustomAddress}
          placeholder="Enter street, house, apartment..."
          placeholderTextColor="#B3B3B3"
        />

        {savedBanner && (
          <View style={styles.savedBox}>
            <Text style={styles.savedText}>✓ Address saved</Text>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContent: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 12,
  },
  customTitle: { marginTop: 18 },
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  addressCardActive: {
    borderColor: '#53B175',
    backgroundColor: '#F4FBF6',
  },
  addressText: { flex: 1, fontSize: 15, color: '#181725', fontWeight: '500' },
  checkIcon: { fontSize: 16, fontWeight: 'bold', color: '#53B175', marginLeft: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#181725',
  },
  savedBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  savedText: { color: '#53B175', fontWeight: '700', fontSize: 14 },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});