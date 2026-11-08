import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export default function SignInScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Вход в аккаунт</Text>
        <Text style={styles.subtitle}>Введите свою почту и пароль</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor="#B3B3B3"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Пароль" 
          placeholderTextColor="#B3B3B3"
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginBottom: 40 },
  input: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#53B175', padding: 18, borderRadius: 19, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});