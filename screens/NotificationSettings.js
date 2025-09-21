import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationSettings = () => {
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [promo, setPromo] = useState(false);
    const [reminders, setReminders] = useState(true);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Notification Settings</Text>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="cube-outline" size={22} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Order Updates</Text>
                </View>
                <Switch value={orderUpdates} onValueChange={setOrderUpdates} />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="pricetags-outline" size={22} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Promotions</Text>
                </View>
                <Switch value={promo} onValueChange={setPromo} />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="alarm-outline" size={22} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Reminders</Text>
                </View>
                <Switch value={reminders} onValueChange={setReminders} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginBottom: 24,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        marginLeft: 12,
        color: '#222',
    },
});

export default NotificationSettings;