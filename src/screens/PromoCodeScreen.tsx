import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface PromoItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountLabel: string;
}

const INITIAL_PROMOS: PromoItem[] = [
  {
    id: '1',
    code: 'FRESH20',
    title: '20% Off Fresh Produce',
    description: 'Valid on orders over $15.00 for fruits and vegetables.',
    discountLabel: '-20%',
  },
  {
    id: '2',
    code: 'FREEDEL',
    title: 'Free Express Delivery',
    description: 'Zero delivery fee on your next grocery order.',
    discountLabel: 'FREE DEL',
  },
  {
    id: '3',
    code: 'SAVE5',
    title: '$5 Instant Discount',
    description: 'Applicable on orders starting from $25.00.',
    discountLabel: '-$5.00',
  },
];

export default function PromoCodeScreen({ navigation }: any) {
  const [promos, setPromos] = useState<PromoItem[]>(INITIAL_PROMOS);
  const [selectedCode, setSelectedCode] = useState<string | null>('FRESH20');
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyInput = () => {
    const normalized = inputCode.trim().toUpperCase();
    if (!normalized) return;

    const existing = promos.find((p) => p.code === normalized);
    if (existing) {
      setSelectedCode(existing.code);
      setFeedback(`Applied promo code ${existing.code}`);
    } else {
      const customPromo: PromoItem = {
        id: Date.now().toString(),
        code: normalized,
        title: `${normalized} Special Offer`,
        description: 'Custom promo code added to your account.',
        discountLabel: '-10%',
      };
      setPromos((prev) => [customPromo, ...prev]);
      setSelectedCode(customPromo.code);
      setFeedback(`Added and applied ${customPromo.code}`);
    }
    setInputCode('');
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
        <Text style={styles.headerTitle}>Promo Code</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Enter Code Box */}
      <View style={styles.inputSection}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.codeInput}
            placeholder="Enter promo code"
            placeholderTextColor="#B3B3B3"
            autoCapitalize="characters"
            value={inputCode}
            onChangeText={setInputCode}
          />
          <TouchableOpacity style={styles.applyBtn} onPress={handleApplyInput}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {feedback && (
          <View style={styles.feedbackBanner}>
            <Text style={styles.feedbackText}>✓ {feedback}</Text>
          </View>
        )}
      </View>

      {/* Available Promos List */}
      <FlatList
        data={promos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedCode === item.code;
          return (
            <TouchableOpacity
              style={[styles.card, isSelected && styles.cardActive]}
              onPress={() => {
                setSelectedCode(item.code);
                setFeedback(`Selected promo code ${item.code}`);
              }}
            >
              <View style={styles.cardTop}>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeText}>🎟️ {item.code}</Text>
                </View>
                <View
                  style={[
                    styles.discountPill,
                    isSelected && styles.discountPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.discountText,
                      isSelected && styles.discountTextActive,
                    ]}
                  >
                    {item.discountLabel}
                  </Text>
                </View>
              </View>

              <Text style={styles.promoTitle}>{item.title}</Text>
              <Text style={styles.promoDesc}>{item.description}</Text>

              <Text style={styles.statusHint}>
                {isSelected ? '● Active for next order' : 'Tap to apply'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Done CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.doneButtonText}>Use Selected Promo</Text>
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
  inputSection: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  codeInput: {
    flex: 1,
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    color: '#181725',
    marginRight: 10,
  },
  applyBtn: {
    backgroundColor: '#53B175',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  applyBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  feedbackBanner: {
    marginTop: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  feedbackText: { color: '#53B175', fontSize: 13, fontWeight: '700' },
  listContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 110 },
  card: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: '#FFF',
  },
  cardActive: {
    borderColor: '#53B175',
    backgroundColor: '#F9FEFA',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeBadge: {
    backgroundColor: '#F2F3F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  codeText: { fontSize: 13, fontWeight: 'bold', color: '#181725' },
  discountPill: {
    backgroundColor: '#F2F3F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  discountPillActive: { backgroundColor: '#E8F5E9' },
  discountText: { fontSize: 13, fontWeight: 'bold', color: '#4C4F4D' },
  discountTextActive: { color: '#53B175' },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  promoDesc: { fontSize: 13, color: '#7C7C7C', marginBottom: 10 },
  statusHint: { fontSize: 12, fontWeight: '600', color: '#53B175' },
  bottomBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },
  doneButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 18,
    alignItems: 'center',
  },
  doneButtonText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
});