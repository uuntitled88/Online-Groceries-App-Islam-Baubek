import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  itemsCount: number;
  total: number;
  status: 'Delivered' | 'On the way' | 'Processing';
}

const ORDERS_DATA: OrderItem[] = [
  {
    id: '1',
    orderNumber: '#ORD-1048',
    date: 'Nov 20, 2026',
    itemsCount: 4,
    total: 14.85,
    status: 'On the way',
  },
  {
    id: '2',
    orderNumber: '#ORD-1032',
    date: 'Nov 12, 2026',
    itemsCount: 6,
    total: 23.40,
    status: 'Delivered',
  },
  {
    id: '3',
    orderNumber: '#ORD-1019',
    date: 'Nov 03, 2026',
    itemsCount: 3,
    total: 9.67,
    status: 'Delivered',
  },
];

export default function OrdersScreen({ navigation }: any) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const getStatusStyle = (status: OrderItem['status']) => {
    if (status === 'Delivered') {
      return { bg: '#E8F5E9', text: '#53B175' };
    }
    if (status === 'On the way') {
      return { bg: '#FFF8E1', text: '#E09F3E' };
    }
    return { bg: '#E3F2FD', text: '#2B7A78' };
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
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Orders List */}
      <FlatList
        data={ORDERS_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const statusTheme = getStatusStyle(item.status);
          const isExpanded = selectedOrderId === item.id;

          return (
            <TouchableOpacity
              style={styles.orderCard}
              onPress={() =>
                setSelectedOrderId(isExpanded ? null : item.id)
              }
            >
              <View style={styles.topRow}>
                <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                <View
                  style={[styles.statusBadge, { backgroundColor: statusTheme.bg }]}
                >
                  <Text style={[styles.statusText, { color: statusTheme.text }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.orderDate}>{item.date}</Text>

              <View style={styles.divider} />

              <View style={styles.bottomRow}>
                <Text style={styles.itemsMeta}>
                  {item.itemsCount} {item.itemsCount === 1 ? 'item' : 'items'}
                </Text>
                <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
              </View>

              {isExpanded && (
                <View style={styles.expandedBox}>
                  <Text style={styles.expandedText}>
                    Delivery address: 120 Green Street, Apt 4B
                  </Text>
                  <Text style={styles.expandedText}>
                    Payment method: Visa •••• 4821
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
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
  listContent: { padding: 20, paddingBottom: 40 },
  orderCard: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: '#FFF',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderNumber: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  orderDate: { fontSize: 13, color: '#7C7C7C', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#F2F3F2', marginBottom: 12 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsMeta: { fontSize: 14, color: '#7C7C7C', fontWeight: '600' },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  expandedBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
  },
  expandedText: { fontSize: 13, color: '#4C4F4D', marginBottom: 4 },
});