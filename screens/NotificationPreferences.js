import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function NotificationPreferences() {
  const [enabled, setEnabled] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Preferences</Text>
      <View style={styles.row}>
        <Text>Enable Notifications</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
});
