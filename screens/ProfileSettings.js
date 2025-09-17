import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function ProfileSettings() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/OIP.png')} style={styles.avatar} />
      <Text style={styles.title}>Hi Saman</Text>
      <Text style={styles.subtitle}>saman@email.com</Text>
      <Text style={styles.subtitle}>Hostel Springs</Text>
      <Text style={styles.subtitle}>Activity</Text>
      <Text style={styles.subtitle}>Help and Support</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 5 },
});
