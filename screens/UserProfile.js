
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const UserProfile = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        // TODO: Add Firebase logout logic here
        navigation.navigate('Login');
    };

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>My Profile</Text>
            
            <View style={styles.profileInfo}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>John Doe</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>john.doe@example.com</Text>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.label}>Room:</Text>
                <Text style={styles.value}>Block B - 203</Text>
            </View>

            <TouchableOpacity style={commonStyles.button} onPress={() => { /* Navigate to Edit Profile */ }}>
                <Text style={commonStyles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.button} onPress={handleLogout}>
                <Text style={commonStyles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    profileInfo: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
    },
    value: {
        fontSize: 16,
    },
});

export default UserProfile;
