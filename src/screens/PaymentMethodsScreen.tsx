import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface PaymentMethodItem {
  id: string;
  brand: string;
  details: string;
  expiry: string;
  icon: string;
  isDefault: boolean;
}

const INITIAL_METHODS: PaymentMethodItem[] = [
  {
    id: '1',
    brand: 'Visa',
    details: '•••• •••• •••• 4821',
    expiry: 'Expires 08/28',
    icon: '💳',
    isDefault: true,
  },
  {
    id: '2',
    brand: 'Mastercard',
    details: '•••• •••• •••• 9104',
    expiry: 'Expires 11/27',
    icon: '🏦',
    isDefault: false,
  },
  {
    id: '3',
    brand: 'Apple Pay',
    details: 'imshuvo97@gmail.com',
    expiry: 'Connected',
    icon: '📱',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen({ navigation }: any) {
  const [methods, setMethods] = useState<PaymentMethodItem[]>(INITIAL_METHODS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const selectMethod = (id: string) => {
    setMethods((prev) =>
      prev.map((item) => ({ ...item, isDefault: item.id === id }))
    );
  };

  const handleAddCard = () => {
    const digitsOnly = cardNumber.replace(/\D/g, '');
    if (digitsOnly.length < 4) return;
    const lastFour = digitsOnly.slice(-4);

    const created: PaymentMethodItem = {
      id: Date.now().toString(),
      brand: 'New Card',
      details: `•••• •••• •••• ${lastFour}`,
      expiry: expiryDate.trim() ? `Expires ${expiryDate.trim()}` : 'Expires 05/29',
      icon: '💳',
      isDefault: false,
    };

    setMethods((prev) => [...prev, created]);
    setCardHolder('');
    setCardNumber('');
    setExpiryDate('');
    setShowAddForm(false);
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.isDefault && styles.cardActive]}
            onPress={() => selectMethod(item.id)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.methodIcon}>{item.icon}</Text>
              </View>
              <View>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.detailsText}>{item.details}</Text>
                <Text style={styles.expiryText}>{item.expiry}</Text>
              </View>
            </View>

            {item.isDefault ? (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            ) : (
              <View style={styles.radioCircle} />
            )}
          </TouchableOpacity>
        )}
        ListFooterComponent={
          showAddForm ? (
            <View style={styles.formBox}>
              <Text style={styles.formTitle}>Add New Card</Text>

              <TextInput
                style={styles.input}
                placeholder="Cardholder Name"
                placeholderTextColor="#B3B3B3"
                value={cardHolder}
                onChangeText={setCardHolder}
              />

              <TextInput
                style={styles.input}
                placeholder="Card Number (e.g., 4242 4242 4242 1234)"
                placeholderTextColor="#B3B3B3"
                keyboardType="number-pad"
                maxLength={19}
                value={cardNumber}
                onChangeText={setCardNumber}
              />

              <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                placeholderTextColor="#B3B3B3"
                maxLength={5}
                value={expiryDate}
                onChangeText={setExpiryDate}
              />

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowAddForm(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveSmallBtn}
                  onPress={handleAddCard}
                >
                  <Text style={styles.saveSmallText}>Save Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
      />

      {/* Add Card CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm((prev) => !prev)}
        >
          <Text style={styles.addButtonText}>
            {showAddForm ? 'Close Form' : '+ Add New Card'}
          </Text>
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
  listContent: { padding: 20, paddingBottom: 110 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: '#FFF',
  },
  cardActive: {
    borderColor: '#53B175',
    backgroundColor: '#F9FEFA',
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  methodIcon: { fontSize: 22 },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 2,
  },
  detailsText: { fontSize: 14, color: '#4C4F4D', marginBottom: 2 },
  expiryText: { fontSize: 12, color: '#7C7C7C' },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  defaultText: { fontSize: 12, fontWeight: '700', color: '#53B175' },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#B3B3B3',
  },
  formBox: {
    backgroundColor: '#F2F3F2',
    borderRadius: 18,
    padding: 16,
    marginTop: 6,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#181725',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 10, marginRight: 8 },
  cancelText: { color: '#7C7C7C', fontWeight: '600', fontSize: 14 },
  saveSmallBtn: {
    backgroundColor: '#53B175',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  saveSmallText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  bottomBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },
  addButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});