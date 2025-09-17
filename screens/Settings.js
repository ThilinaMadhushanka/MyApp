
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Settings</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Enable Notifications</Text>
                <Switch value={notifications} onValueChange={setNotifications} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    settingLabel: {
        fontSize: 16,
    },
});

export default Settings;
