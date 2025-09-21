
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const [privacy, setPrivacy] = useState(true);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('UserProfile')}>
                <View style={styles.settingLeft}>
                    <Ionicons name="person-circle-outline" size={24} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#bbb" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('NotificationSettings')}>
                <View style={styles.settingLeft}>
                    <Ionicons name="notifications-outline" size={24} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Notifications</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#bbb" />
            </TouchableOpacity>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="lock-closed-outline" size={24} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Privacy</Text>
                </View>
                <Switch value={privacy} onValueChange={setPrivacy} />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="moon-outline" size={24} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                </View>
                <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>

            <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="help-circle-outline" size={24} color="#1E90FF" />
                    <Text style={styles.settingLabel}>Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#bbb" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn}>
                <Ionicons name="log-out-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
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
        fontSize: 26,
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
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 40,
        alignSelf: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Settings;
