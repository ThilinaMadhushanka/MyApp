
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [hostelBlock, setHostelBlock] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (!studentId || !name || !roomNumber || !hostelBlock || !phone || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
    };

    return (
        <ImageBackground source={require('../assets/images/login-bg.png')} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Create Account</Text>
                <TextInput style={styles.input} placeholder="Student ID" value={studentId} onChangeText={setStudentId} />
                <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Room Number" value={roomNumber} onChangeText={setRoomNumber} />
                <TextInput style={styles.input} placeholder="Hostel Block" value={hostelBlock} onChangeText={setHostelBlock} />
                <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Sign in</Text>
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
        marginBottom: 30,
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

export default RegisterScreen;
