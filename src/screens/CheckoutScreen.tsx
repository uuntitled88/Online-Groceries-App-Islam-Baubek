import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function CheckoutScreen({ navigation, route }: any) {
  const totalAmount = route?.params?.total || 10.67;
  const [deliveryMethod, setDeliveryMethod] = useState('Standard Delivery');
  const [paymentMethod, setPaymentMethod] = useState('Visa •••• 4821');

  const cycleDelivery = () => {
    setDeliveryMethod((prev) =>
      prev === 'Standard Delivery' ? 'Express Delivery' : 'Standard Delivery'
    );
  };

  const cyclePayment = () => {
    setPaymentMethod((prev) =>
      prev === 'Visa •••• 4821' ? 'Apple Pay' : 'Visa •••• 4821'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Row */}
        <TouchableOpacity style={styles.row} onPress={cycleDelivery}>
          <Text style={styles.rowLabel}>Delivery</Text>
          <View style={styles.rowRight}>
            <Text style={styles.rowValue}>{deliveryMethod}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Payment Row */}
        <TouchableOpacity style={styles.row} onPress={cyclePayment}>
          <Text style={styles.rowLabel}>Payment</Text>
          <View style={styles.rowRight}>
            <Text style={styles.paymentBadge}>💳</Text>
            <Text style={styles.rowValue}>{paymentMethod}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Promo Code Row */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Promo Code</Text>
          <View style={styles.rowRight}>
            <Text style={styles.promoValue}>Pick discount</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Total Cost Row */}
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.rowLabel}>Total Cost</Text>
          <View style={styles.rowRight}>
            <Text style={styles.totalValue}>
              ${Number(totalAmount).toFixed(2)}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>

        {/* Terms Note */}
        <Text style={styles.termsText}>
          By placing an order you agree to our{' '}
          <Text style={styles.termsBold}>Terms</Text> and{' '}
          <Text style={styles.termsBold}>Conditions</Text>.
        </Text>
      </ScrollView>

      {/* Place Order CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => navigation.replace('OrderAccepted')}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  backButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: { fontSize: 20, color: '#181725', fontWeight: '600' },
  headerTitle: { fontSize: 19, fontWeight: 'bold', color: '#181725' },
  placeholder: { width: 34 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 110 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  lastRow: { borderBottomWidth: 1 },
  rowLabel: { fontSize: 17, fontWeight: '600', color: '#7C7C7C' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  paymentBadge: { fontSize: 16, marginRight: 6 },
  rowValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    marginRight: 10,
  },
  promoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7C7C7C',
    marginRight: 10,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginRight: 10,
  },
  chevron: { fontSize: 22, color: '#181725' },
  termsText: {
    fontSize: 13,
    color: '#7C7C7C',
    lineHeight: 20,
    marginTop: 22,
  },
  termsBold: { fontWeight: 'bold', color: '#181725' },
  bottomBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },
  placeOrderButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  placeOrderText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});