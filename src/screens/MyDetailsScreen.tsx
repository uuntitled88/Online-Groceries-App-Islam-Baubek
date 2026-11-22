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
  DEFAULT_PROFILE,
  loadProfile,
  saveProfile,
} from '../utils/userStorage';

export default function MyDetailsScreen({ navigation }: any) {
  const [name, setName] = useState(DEFAULT_PROFILE.name);
  const [email, setEmail] = useState(DEFAULT_PROFILE.email);
  const [phone, setPhone] = useState(DEFAULT_PROFILE.phone);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    loadProfile().then((data) => {
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    });
  }, []);

  const handleSave = async () => {
    await saveProfile({
      name: name.trim() || DEFAULT_PROFILE.name,
      email: email.trim() || DEFAULT_PROFILE.email,
      phone: phone.trim() || DEFAULT_PROFILE.phone,
    });
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
        <Text style={styles.headerTitle}>My Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#B3B3B3"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#B3B3B3"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone"
            placeholderTextColor="#B3B3B3"
            keyboardType="phone-pad"
          />
        </View>

        {savedBanner && (
          <View style={styles.savedBox}>
            <Text style={styles.savedText}>✓ Profile saved</Text>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  scrollContent: { padding: 24, paddingBottom: 40 },
  fieldGroup: { marginBottom: 22 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C7C7C',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 16,
    color: '#181725',
  },
  savedBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  savedText: { color: '#53B175', fontWeight: '700', fontSize: 14 },
  saveButton: {
    marginTop: 12,
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});