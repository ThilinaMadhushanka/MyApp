import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

export default function OrderSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Screenshot 2025-09-17 084450.png')} style={styles.image} />
      <Text style={styles.title}>Order Successful!</Text>
      <Button title="Continue Shopping" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 200, height: 200, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
