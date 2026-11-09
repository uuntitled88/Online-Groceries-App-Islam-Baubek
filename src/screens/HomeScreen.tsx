import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Beverages'];
const PRODUCTS = [
  { id: '1', name: 'Bananas (1kg)', price: '$2.99', category: 'Fruits' },
  { id: '2', name: 'Red Apples', price: '$3.49', category: 'Fruits' },
  { id: '3', name: 'Fresh Tomatoes', price: '$4.19', category: 'Vegetables' },
  { id: '4', name: 'Milk 3.2%', price: '$1.99', category: 'Dairy' },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Location Header */}
        <View style={styles.headerLocation}>
          <Text style={styles.locationText}>📍 Dhaka, Banani</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search store" 
            placeholderTextColor="#B3B3B3"
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Fresh Vegetables 20% OFF</Text>
          <Text style={styles.bannerSubtitle}>Get your daily fresh products</Text>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryChip, index === 0 && styles.activeCategoryChip]}>
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {PRODUCTS.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.placeholderText}>🛒</Text>
              </View>
              <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerLocation: { alignItems: 'center', marginBottom: 15 },
  locationText: { fontSize: 16, fontWeight: '600', color: '#4C4F4D' },
  searchContainer: { marginBottom: 20 },
  searchInput: { backgroundColor: '#F2F3F2', borderRadius: 15, padding: 15, fontSize: 14, color: '#000' },
  banner: { backgroundColor: '#53B175', borderRadius: 20, padding: 20, marginBottom: 25 },
  bannerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  bannerSubtitle: { color: '#E2F4E9', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  seeAll: { color: '#53B175', fontSize: 14, fontWeight: '600' },
  categoriesScroll: { marginBottom: 25 },
  categoryChip: { backgroundColor: '#F2F3F2', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 18, marginRight: 10, height: 45, justifyContent: 'center' },
  activeCategoryChip: { backgroundColor: '#53B175' },
  categoryText: { color: '#7C7C7C', fontWeight: '600' },
  activeCategoryText: { color: '#FFF' },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '48%', borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginBottom: 15, backgroundColor: '#FFF' },
  productImagePlaceholder: { height: 90, backgroundColor: '#F2F3F2', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  placeholderText: { fontSize: 28 },
  productName: { fontSize: 15, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productPrice: { fontSize: 14, fontWeight: '600', color: '#7C7C7C', marginBottom: 10 },
  addButton: { backgroundColor: '#53B175', width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' },
  addButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' }
});