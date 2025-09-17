
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Welcome to Water Delivery</Text>
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('FeatureIntro1')}>
                <Text style={commonStyles.buttonText}>See Features</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={commonStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={commonStyles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen;
