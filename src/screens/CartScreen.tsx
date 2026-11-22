import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface CartItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  icon: string;
}

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Organic Bananas', unit: '1kg, Price', price: 2.99, quantity: 2, icon: '🍌' },
  { id: '2', name: 'Red Apple', unit: '1kg, Price', price: 3.49, quantity: 1, icon: '🍎' },
  { id: '3', name: 'Fresh Tomatoes', unit: '500g, Price', price: 4.19, quantity: 1, icon: '🍅' },
];

export default function CartScreen({ navigation }: any) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>My Cart</Text>

        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add fresh groceries from Shop or Explore to get started.
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <View style={styles.iconBox}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                  </View>

                  <View style={styles.itemDetails}>
                    <View style={styles.itemTopRow}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text style={styles.removeText}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.itemUnit}>{item.unit}</Text>

                    <View style={styles.itemBottomRow}>
                      <View style={styles.counterContainer}>
                        <TouchableOpacity
                          style={styles.counterBtn}
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <Text style={styles.counterBtnText}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                          style={styles.counterBtn}
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <Text style={[styles.counterBtnText, styles.plusText]}>+</Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />

            <View style={styles.checkoutBox}>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('Checkout', { total: totalPrice })}
              >
                <Text style={styles.checkoutText}>Go to Checkout</Text>
                <View style={styles.totalBadge}>
                  <Text style={styles.totalBadgeText}>${totalPrice.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  listContent: { paddingTop: 10, paddingBottom: 170 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  iconBox: {
    width: 66,
    height: 66,
    borderRadius: 14,
    backgroundColor: '#F2F3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemIcon: { fontSize: 32 },
  itemDetails: { flex: 1 },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    flex: 1,
    marginRight: 8,
  },
  removeText: { fontSize: 16, color: '#B3B3B3', fontWeight: '600' },
  itemUnit: { fontSize: 13, color: '#7C7C7C', marginBottom: 12 },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterContainer: { flexDirection: 'row', alignItems: 'center' },
  counterBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnText: { fontSize: 18, color: '#7C7C7C', fontWeight: '600' },
  plusText: { color: '#53B175' },
  quantityText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    marginHorizontal: 14,
  },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  checkoutBox: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 80,
    backgroundColor: '#FFF',
    paddingTop: 8,
  },
  checkoutButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
  totalBadge: {
    position: 'absolute',
    right: 18,
    backgroundColor: '#489E67',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  totalBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyIcon: { fontSize: 48, marginBottom: 14 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});