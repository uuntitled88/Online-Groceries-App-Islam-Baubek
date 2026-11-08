import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Корзина покупок</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
});