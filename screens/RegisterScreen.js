import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={require('../assets/Screenshot 2025-09-17 084407.png')} style={styles.image} />
          <Text style={styles.title}>Create your Account</Text>
          <TextInput placeholder="Name" style={styles.input} placeholderTextColor="#888" />
          <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#888" keyboardType="email-address" autoCapitalize="none" />
          <TextInput placeholder="Password" style={styles.input} placeholderTextColor="#888" secureTextEntry />
          <TextInput placeholder="Confirm Password" style={styles.input} placeholderTextColor="#888" secureTextEntry />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
            Already have an account? <Text style={{color:'#007bff'}}>Login</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: 340,
    maxWidth: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: '#f8fafd',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 10,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  link: {
    color: '#555',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
