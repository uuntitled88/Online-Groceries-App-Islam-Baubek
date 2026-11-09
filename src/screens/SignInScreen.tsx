import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';

export default function SignInScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Title */}
        <Text style={styles.title}>Get your groceries with us</Text>
        <Text style={styles.subtitle}>Enter your email and password</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="example@gmail.com" 
            placeholderTextColor="#B3B3B3"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="********" 
            placeholderTextColor="#B3B3B3"
            secureTextEntry
          />
        </View>

        {/* Log In Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginBottom: 30 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: '#7C7C7C', fontWeight: '600', marginBottom: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, fontSize: 16, color: '#000' },
  button: { backgroundColor: '#53B175', borderRadius: 20, padding: 18, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});