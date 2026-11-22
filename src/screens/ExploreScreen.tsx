import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const EXPLORE_CATEGORIES = [
  { id: '1', title: 'Fresh Fruits & Vegetable', icon: '🥗', bgColor: '#E8F5E9', borderColor: '#53B175' },
  { id: '2', title: 'Cooking Oil & Ghee', icon: '🫙', bgColor: '#FFF8E1', borderColor: '#F3A953' },
  { id: '3', title: 'Meat & Fish', icon: '🥩', bgColor: '#FDECEC', borderColor: '#F7A593' },
  { id: '4', title: 'Bakery & Snacks', icon: '🥐', bgColor: '#F3E8FF', borderColor: '#D3B0E0' },
  { id: '5', title: 'Dairy & Eggs', icon: '🥛', bgColor: '#FFFDE7', borderColor: '#FDE598' },
  { id: '6', title: 'Beverages', icon: '🥤', bgColor: '#E3F2FD', borderColor: '#B7DFF5' },
];

export default function ExploreScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = EXPLORE_CATEGORIES.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Find Products</Text>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search store"
            placeholderTextColor="#7C7C7C"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories Grid */}
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: item.bgColor, borderColor: item.borderColor },
              ]}
              onPress={() =>
                navigation.navigate('CategoryProducts', {
                  categoryTitle: item.title,
                })
              }
            >
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
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
    marginBottom: 18,
  },
  searchContainer: { marginBottom: 20 },
  searchInput: {
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#181725',
  },
  listContent: { paddingBottom: 95 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  card: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 165,
  },
  cardIcon: { fontSize: 42, marginBottom: 14 },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
  },
});