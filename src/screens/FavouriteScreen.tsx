import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface FavouriteItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  icon: string;
}

const INITIAL_FAVOURITES: FavouriteItem[] = [
  { id: '1', name: 'Organic Bananas', unit: '1kg, Price', price: 2.99, icon: '🍌' },
  { id: '2', name: 'Red Apple', unit: '1kg, Price', price: 3.49, icon: '🍎' },
  { id: '3', name: 'Fresh Tomatoes', unit: '500g, Price', price: 4.19, icon: '🍅' },
  { id: '4', name: 'Organic Milk', unit: '1L, Price', price: 2.49, icon: '🥛' },
];

export default function FavouriteScreen({ navigation }: any) {
  const [favourites, setFavourites] = useState<FavouriteItem[]>(INITIAL_FAVOURITES);

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Favourite</Text>

        {favourites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💚</Text>
            <Text style={styles.emptyTitle}>No favourites yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on any product to save it for later.
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={favourites}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.favItem}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { product: item })
                  }
                >
                  <View style={styles.iconBox}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemUnit}>{item.unit}</Text>
                  </View>

                  <View style={styles.rightSection}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeFavourite(item.id)}
                    >
                      <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />

            <View style={styles.bottomBar}>
              <TouchableOpacity
                style={styles.addAllButton}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
              >
                <Text style={styles.addAllText}>Add All To Cart</Text>
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
  listContent: { paddingTop: 8, paddingBottom: 160 },
  favItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#F2F3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  itemIcon: { fontSize: 30 },
  itemDetails: { flex: 1, paddingRight: 10 },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  itemUnit: { fontSize: 13, color: '#7C7C7C' },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginRight: 12,
  },
  removeBtn: { padding: 4 },
  removeText: { fontSize: 15, color: '#B3B3B3', fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 80,
    backgroundColor: '#FFF',
    paddingTop: 8,
  },
  addAllButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addAllText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
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