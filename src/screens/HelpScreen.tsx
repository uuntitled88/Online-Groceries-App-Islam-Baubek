import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'How fast is grocery delivery?',
    answer:
      'Most orders arrive within 30 to 60 minutes depending on your delivery address and time of day.',
  },
  {
    id: '2',
    question: 'Can I apply more than one promo code?',
    answer:
      'Only one promo code can be active per order, so choose the coupon that gives you the best savings.',
  },
  {
    id: '3',
    question: 'How do I report a damaged or missing item?',
    answer:
      'Open your order in the Orders screen or send a message below with your order number and our team will resolve it quickly.',
  },
  {
    id: '4',
    question: 'Can I update my delivery address after placing an order?',
    answer:
      'You can update your address while the order is still being prepared by contacting support immediately.',
  },
];

export default function HelpScreen({ navigation }: any) {
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentBanner, setSentBanner] = useState(false);

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setSentBanner(true);
    setSubject('');
    setMessage('');
    setTimeout(() => {
      setSentBanner(false);
    }, 2500);
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Contact Channels */}
        <View style={styles.channelsRow}>
          <View style={styles.channelCard}>
            <Text style={styles.channelIcon}>💬</Text>
            <Text style={styles.channelTitle}>Live Chat</Text>
            <Text style={styles.channelSub}>Avg. reply 3 min</Text>
          </View>
          <View style={styles.channelCard}>
            <Text style={styles.channelIcon}>📞</Text>
            <Text style={styles.channelTitle}>Call Us</Text>
            <Text style={styles.channelSub}>24/7 Support</Text>
          </View>
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQ_ITEMS.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.faqCard, isOpen && styles.faqCardOpen]}
              onPress={() => toggleFaq(item.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqChevron}>{isOpen ? '−' : '+'}</Text>
              </View>
              {isOpen && <Text style={styles.faqAnswer}>{item.answer}</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Send Message Form */}
        <Text style={[styles.sectionTitle, styles.formSectionTitle]}>
          Send a Message
        </Text>

        {sentBanner && (
          <View style={styles.sentBanner}>
            <Text style={styles.sentText}>
              ✓ Support request sent. We will reply shortly.
            </Text>
          </View>
        )}

        <View style={styles.formBox}>
          <TextInput
            style={styles.input}
            placeholder="Order number or topic (optional)"
            placeholderTextColor="#B3B3B3"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe how we can help..."
            placeholderTextColor="#B3B3B3"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send Message</Text>
          </TouchableOpacity>
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
  scrollContent: { padding: 20, paddingBottom: 48 },
  channelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  channelCard: {
    width: '48%',
    backgroundColor: '#F2F3F2',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
  },
  channelIcon: { fontSize: 26, marginBottom: 8 },
  channelTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 2,
  },
  channelSub: { fontSize: 12, color: '#7C7C7C' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 14,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  faqCardOpen: {
    borderColor: '#53B175',
    backgroundColor: '#F9FEFA',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#181725',
    paddingRight: 10,
  },
  faqChevron: { fontSize: 20, fontWeight: 'bold', color: '#53B175' },
  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: '#4C4F4D',
    lineHeight: 20,
  },
  formSectionTitle: { marginTop: 14 },
  sentBanner: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  sentText: { color: '#53B175', fontWeight: '700', fontSize: 13 },
  formBox: {
    backgroundColor: '#F2F3F2',
    borderRadius: 18,
    padding: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#181725',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  textArea: { minHeight: 96 },
  sendButton: {
    backgroundColor: '#53B175',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});