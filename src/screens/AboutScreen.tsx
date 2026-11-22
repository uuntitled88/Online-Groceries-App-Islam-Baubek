import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface LegalDoc {
  id: string;
  title: string;
  summary: string;
}

const LEGAL_DOCS: LegalDoc[] = [
  {
    id: '1',
    title: 'Terms of Service',
    summary:
      'Orders are subject to product availability and delivery zone coverage. Prices include applicable local taxes unless stated otherwise.',
  },
  {
    id: '2',
    title: 'Privacy Policy',
    summary:
      'We use your contact details and delivery addresses strictly to fulfill orders, personalize recommendations, and provide customer support.',
  },
  {
    id: '3',
    title: 'Open Source Licenses',
    summary:
      'Built with React Native, Expo, TypeScript, and React Navigation under their respective open-source licenses.',
  },
];

export default function AboutScreen({ navigation }: any) {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  const toggleDoc = (id: string) => {
    setActiveDocId((prev) => (prev === id ? null : id));
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
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Brand Hero */}
        <View style={styles.brandCard}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoEmoji}>🥕</Text>
          </View>
          <Text style={styles.appName}>Nectar Groceries</Text>
          <Text style={styles.versionText}>Version 1.0.0 (Build 21)</Text>
          <Text style={styles.missionText}>
            Fresh produce, daily essentials, and pantry favorites delivered straight
            to your door with care and speed.
          </Text>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsRow}>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightValue}>30-60m</Text>
            <Text style={styles.highlightLabel}>Fast Delivery</Text>
          </View>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightValue}>100%</Text>
            <Text style={styles.highlightLabel}>Fresh Quality</Text>
          </View>
        </View>

        {/* Legal & Info Section */}
        <Text style={styles.sectionTitle}>Legal & Information</Text>
        {LEGAL_DOCS.map((doc) => {
          const isOpen = activeDocId === doc.id;
          return (
            <TouchableOpacity
              key={doc.id}
              style={[styles.docCard, isOpen && styles.docCardOpen]}
              onPress={() => toggleDoc(doc.id)}
            >
              <View style={styles.docHeader}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                <Text style={styles.docChevron}>{isOpen ? '⌄' : '›'}</Text>
              </View>
              {isOpen && <Text style={styles.docSummary}>{doc.summary}</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Nectar Groceries. All rights reserved.
          </Text>
        </View>
      </ScrollView>
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
  scrollContent: { padding: 20, paddingBottom: 40 },
  brandCard: {
    backgroundColor: '#F9FEFA',
    borderWidth: 1,
    borderColor: '#E8F5E9',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoEmoji: { fontSize: 36 },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#53B175',
    marginBottom: 12,
  },
  missionText: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: 20,
  },
  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  highlightBox: {
    width: '48%',
    backgroundColor: '#F2F3F2',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 4,
  },
  highlightLabel: { fontSize: 12, color: '#7C7C7C', fontWeight: '600' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 12,
  },
  docCard: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  docCardOpen: {
    borderColor: '#53B175',
    backgroundColor: '#F9FEFA',
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docTitle: { fontSize: 15, fontWeight: 'bold', color: '#181725' },
  docChevron: { fontSize: 20, color: '#181725', fontWeight: '600' },
  docSummary: {
    marginTop: 10,
    fontSize: 13,
    color: '#4C4F4D',
    lineHeight: 19,
  },
  footer: { marginTop: 18, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#B3B3B3' },
});