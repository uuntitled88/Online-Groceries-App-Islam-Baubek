import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const BEST_SELLING = [
  { id: '1', name: 'Organic Bananas', unit: '1kg, Price', price: 2.99, icon: '🍌' },
  { id: '2', name: 'Red Apple', unit: '1kg, Price', price: 3.49, icon: '🍎' },
  { id: '3', name: 'Fresh Tomatoes', unit: '500g, Price', price: 4.19, icon: '🍅' },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Header */}
        <View style={styles.header}>
          <Text style={styles.locationText}>📍 Dhaka, Banasree</Text>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        {/* Products List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        >
          {BEST_SELLING.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ProductDetails', { product: item })
              }
            >
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.placeholderText}>{item.icon}</Text>
              </View>
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.productUnit}>{item.unit}</Text>
              <View style={styles.cardBottom}>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { product: item })
                  }
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { alignItems: 'center', marginBottom: 20 },
  locationText: { fontSize: 16, fontWeight: '600', color: '#4C4F4D' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  seeAll: { fontSize: 15, fontWeight: '600', color: '#53B175' },
  productsRow: { paddingRight: 10 },
  productCard: {
    width: 165,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 14,
    marginRight: 14,
    backgroundColor: '#FFF',
  },
  productImagePlaceholder: {
    height: 90,
    backgroundColor: '#F2F3F2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: { fontSize: 38 },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  productUnit: { fontSize: 12, color: '#7C7C7C', marginBottom: 14 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});