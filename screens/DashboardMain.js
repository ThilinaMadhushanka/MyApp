import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function DashboardMain() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/hostel.png')} style={styles.image} />
        <Text style={styles.title}>Hostel Springs</Text>
        <Image source={require('../assets/OIP.png')} style={styles.banner} />
        <Text style={styles.subtitle}>Filtering Mass Water</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f8fa',
    padding: 24,
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
  banner: {
    width: 220,
    height: 80,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
});
