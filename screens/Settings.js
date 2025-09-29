import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Alert } from 'react-native';

const Settings = () => {
    const navigation = useNavigation();
    const { isDarkMode, toggleTheme, colors } = useTheme();
    const [privacy, setPrivacy] = useState(true);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Alert.alert('Logged out', 'You have been logged out.');
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } catch (e) {
            Alert.alert('Logout failed', e.message || 'Please try again');
        }
    };


    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

            <TouchableOpacity style={[styles.settingItem, { borderColor: colors.border }]} onPress={() => navigation.navigate('Profile')}>
                <View style={styles.settingLeft}>
                    <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { borderColor: colors.border }]} onPress={() => navigation.navigate('Notification')}>
                <View style={styles.settingLeft}>
                    <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={[styles.settingItem, { borderColor: colors.border }]}>
                <View style={styles.settingLeft}>
                    <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy</Text>
                </View>
                <Switch 
                    value={privacy} 
                    onValueChange={setPrivacy}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={privacy ? colors.primaryText : colors.textSecondary}
                />
            </View>

            <View style={[styles.settingItem, { borderColor: colors.border }]}>
                <View style={styles.settingLeft}>
                    <Ionicons name="moon-outline" size={24} color={colors.primary} />
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                </View>
                <Switch 
                    value={isDarkMode} 
                    onValueChange={toggleTheme}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={isDarkMode ? colors.primaryText : colors.textSecondary}
                />
            </View>

            <TouchableOpacity style={[styles.settingItem, { borderColor: colors.border }]} onPress={() => navigation.navigate('HelpSupport')}>
                <View style={styles.settingLeft}>
                    <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.helpBtn, { marginTop: 10 }]} onPress={handleLogout}>
                                <Text style={[styles.helpText, { color: 'red' }]}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        marginLeft: 12,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 40,
        alignSelf: 'center',
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Settings;
