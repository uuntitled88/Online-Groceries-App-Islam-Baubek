import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Добро пожаловать</Text>
        <Text style={styles.subtitle}>Находите свежие продукты каждый день</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Начать покупки</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175' },
  content: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 30, paddingBottom: 50 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#FCFCFC', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#FFF', width: '100%', padding: 18, borderRadius: 19, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#53B175' }
});