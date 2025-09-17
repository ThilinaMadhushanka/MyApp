import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function TrackingStatus() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/hostel.png')} style={styles.image} />
      <Text style={styles.title}>Delivery Notifications</Text>
      <Image source={require('../assets/OIP.png')} style={styles.card} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 200, height: 200, marginBottom: 10 },
  card: { width: 300, height: 100, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
