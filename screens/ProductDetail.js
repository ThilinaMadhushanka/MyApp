import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function ProductDetail() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/hostel.png')} style={styles.image} />
      <Text style={styles.title}>Filtering Mas Water</Text>
      <Text style={styles.price}>Rs. 100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 200, height: 200, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, color: '#007bff', marginBottom: 10 },
});
