
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Dashboard');
    };

    return (
        <ImageBackground source={require('../assets/images/login-bg.png')} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Please fill in your email password to login to your account.</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="abcd@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="**********" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'left',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    forgotPassword: {
        textAlign: 'right',
        color: '#007bff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 24,
        marginTop: 8,
        marginBottom: 10,
        shadowColor: '#007bff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
    },
    link: {
        color: '#555',
        fontSize: 15,
        marginTop: 8,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
