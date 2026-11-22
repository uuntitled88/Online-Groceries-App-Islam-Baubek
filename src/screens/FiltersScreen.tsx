import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CATEGORIES = [
  'Eggs',
  'Noodles & Pasta',
  'Chips & Crisps',
  'Fast Food',
];

const BRANDS = [
  'Individual Collection',
  'Cocola',
  'Ifad',
  'Kazi Farmas',
];

export default function FiltersScreen({ navigation }: any) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Eggs']);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Cocola']);

  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Panel */}
      <View style={styles.filterPanel}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories Section */}
          <Text style={styles.sectionTitle}>Categories</Text>
          {CATEGORIES.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <TouchableOpacity
                key={category}
                style={styles.checkboxRow}
                onPress={() =>
                  toggleItem(category, selectedCategories, setSelectedCategories)
                }
              >
                <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.checkboxLabel,
                    isChecked && styles.checkboxLabelActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Brands Section */}
          <Text style={[styles.sectionTitle, styles.brandTitle]}>Brand</Text>
          {BRANDS.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <TouchableOpacity
                key={brand}
                style={styles.checkboxRow}
                onPress={() =>
                  toggleItem(brand, selectedBrands, setSelectedBrands)
                }
              >
                <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.checkboxLabel,
                    isChecked && styles.checkboxLabelActive,
                  ]}
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Apply Filter CTA */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
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
  },
  closeButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  closeIcon: { fontSize: 20, color: '#181725', fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  placeholder: { width: 34 },
  filterPanel: {
    flex: 1,
    backgroundColor: '#F2F3F2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 26,
    paddingHorizontal: 22,
  },
  scrollContent: { paddingBottom: 110 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 18,
  },
  brandTitle: { marginTop: 22 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B1B1B1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  checkboxActive: {
    backgroundColor: '#53B175',
    borderColor: '#53B175',
  },
  checkmark: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  checkboxLabelActive: { color: '#53B175', fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 24,
  },
  applyButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  applyButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});