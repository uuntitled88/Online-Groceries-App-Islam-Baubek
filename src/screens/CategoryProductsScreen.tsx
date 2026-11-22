import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface CategoryProduct {
  id: string;
  name: string;
  unit: string;
  price: number;
  icon: string;
}

const CATEGORY_ITEMS_MAP: Record<string, CategoryProduct[]> = {
  'Fresh Fruits & Vegetable': [
    { id: '101', name: 'Organic Bananas', unit: '1kg, Price', price: 2.99, icon: '🍌' },
    { id: '102', name: 'Red Apple', unit: '1kg, Price', price: 3.49, icon: '🍎' },
    { id: '103', name: 'Fresh Tomatoes', unit: '500g, Price', price: 4.19, icon: '🍅' },
    { id: '104', name: 'Bell Pepper Red', unit: '500g, Price', price: 4.99, icon: '🫑' },
  ],
  'Beverages': [
    { id: '201', name: 'Diet Coke', unit: '355ml, Price', price: 1.99, icon: '🥤' },
    { id: '202', name: 'Sprite Can', unit: '325ml, Price', price: 1.50, icon: '🥫' },
    { id: '203', name: 'Apple & Grape Juice', unit: '2L, Price', price: 15.99, icon: '🧃' },
    { id: '204', name: 'Orange Juice', unit: '2L, Price', price: 14.50, icon: '🍊' },
  ],
};

const DEFAULT_PRODUCTS: CategoryProduct[] = [
  { id: '301', name: 'Organic Egg Chicken Red', unit: '4pcs, Price', price: 1.99, icon: '🥚' },
  { id: '302', name: 'Organic Milk', unit: '1L, Price', price: 2.49, icon: '🥛' },
  { id: '303', name: 'Mayonnaises Eggless', unit: '330ml, Price', price: 4.99, icon: '🫙' },
  { id: '304', name: 'Beef Bone', unit: '1kg, Price', price: 9.99, icon: '🥩' },
];

export default function CategoryProductsScreen({ navigation, route }: any) {
  const categoryTitle: string = route?.params?.categoryTitle || 'Fresh Fruits & Vegetable';
  const products = CATEGORY_ITEMS_MAP[categoryTitle] || DEFAULT_PRODUCTS;

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
        <Text style={styles.headerTitle} numberOfLines={1}>
          {categoryTitle}
        </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filters')}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ProductDetails', { product: item })
            }
          >
            <View style={styles.imageBox}>
              <Text style={styles.productIcon}>{item.icon}</Text>
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
        )}
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
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  filterButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  filterIcon: { fontSize: 18 },
  listContent: { padding: 18, paddingBottom: 40 },
  row: { justifyContent: 'space-between', marginBottom: 14 },
  card: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#FFF',
  },
  imageBox: {
    height: 86,
    backgroundColor: '#F2F3F2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productIcon: { fontSize: 38 },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 3,
  },
  productUnit: { fontSize: 12, color: '#7C7C7C', marginBottom: 12 },
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