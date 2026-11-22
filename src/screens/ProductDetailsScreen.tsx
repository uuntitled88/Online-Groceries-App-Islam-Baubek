import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function ProductDetailsScreen({ navigation, route }: any) {
  const product = route?.params?.product || {
    id: '1',
    name: 'Organic Bananas',
    unit: '1kg, Price',
    price: 2.99,
    icon: '🍌',
    description:
      'Bananas are nutritious and good for your health. Freshly harvested and packed with vitamins for your daily diet.',
  };

  const [quantity, setQuantity] = useState(1);

  const unitPrice =
    typeof product.price === 'number'
      ? product.price
      : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 2.99;

  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.topIcon}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.topIcon}>⤢</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Preview */}
        <View style={styles.previewBox}>
          <Text style={styles.productEmoji}>{product.icon || '🛒'}</Text>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productUnit}>{product.unit || '1kg, Price'}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>♡</Text>
            </TouchableOpacity>
          </View>

          {/* Quantity & Price */}
          <View style={styles.quantityRow}>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Text style={styles.counterText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityValue}>{quantity}</Text>

              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Text style={[styles.counterText, styles.plusColor]}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPriceText}>${totalPrice}</Text>
          </View>

          {/* Description */}
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Product Detail</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {/* Nutrition Row */}
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.metaRight}>
              <View style={styles.gramBadge}>
                <Text style={styles.gramText}>100gr</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>

          {/* Review Row */}
          <View style={styles.divider} />
          <View style={styles.metaRow}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.metaRight}>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add To Basket CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
        >
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F2' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcon: { fontSize: 26, color: '#181725', fontWeight: '600' },
  scrollContent: { paddingBottom: 100 },
  previewBox: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: { fontSize: 84 },
  infoSection: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    minHeight: 460,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  titleBlock: { flex: 1, paddingRight: 12 },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  productUnit: { fontSize: 14, color: '#7C7C7C', fontWeight: '600' },
  favoriteButton: { padding: 4 },
  favoriteIcon: { fontSize: 26, color: '#7C7C7C' },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  counterContainer: { flexDirection: 'row', alignItems: 'center' },
  counterBtn: {
    width: 38,
    height: 38,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: { fontSize: 20, color: '#7C7C7C', fontWeight: '600' },
  plusColor: { color: '#53B175' },
  quantityValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#181725',
    marginHorizontal: 16,
  },
  totalPriceText: { fontSize: 22, fontWeight: 'bold', color: '#181725' },
  divider: {
    height: 1,
    backgroundColor: '#F2F3F2',
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRight: { flexDirection: 'row', alignItems: 'center' },
  gramBadge: {
    backgroundColor: '#F2F3F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  gramText: { fontSize: 11, color: '#7C7C7C', fontWeight: '600' },
  stars: { fontSize: 14, color: '#F3603F', marginRight: 8 },
  chevron: { fontSize: 22, color: '#181725' },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
  },
  addButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});