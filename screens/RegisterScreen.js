
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [hostelBlock, setHostelBlock] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Test Firebase connection
    const testFirebaseConnection = async () => {
        console.log('Testing Firebase connection...');
        console.log('Auth instance:', auth);
        console.log('DB instance:', db);
        console.log('DB type:', typeof db);
        console.log('DB constructor:', db?.constructor?.name);
        
        if (!db) {
            console.error('Database is not initialized!');
            return false;
        }
        
        // Check if db has the expected Firestore methods
        if (typeof db.collection !== 'function' && typeof db.doc !== 'function') {
            console.error('Database does not have expected Firestore methods');
            console.log('Available methods:', Object.getOwnPropertyNames(db));
            return false;
        }
        
        try {
            // Test Firestore connection by trying to create a collection reference
            const testCollection = collection(db, 'test');
            console.log('Test collection reference created successfully:', testCollection);
            console.log('Collection path:', testCollection.path);
            console.log('Collection type:', testCollection.type);
            return true;
        } catch (error) {
            console.error('Firebase connection test failed:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                stack: error.stack
            });
            return false;
        }
    };

    const handleRegister = async () => {
        if (!studentId || !name || !roomNumber || !hostelBlock || !phone || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Test Firebase connection first
        const isFirebaseReady = await testFirebaseConnection();
        if (!isFirebaseReady) {
            Alert.alert('Error', 'Database service is not available. Please check your internet connection and try again.');
            return;
        }

        // Check if Firebase services are properly initialized
        if (!auth) {
            Alert.alert('Error', 'Authentication service is not available. Please try again.');
            return;
        }

        try {
            console.log('Starting user registration...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User created successfully:', user.uid);
            
            console.log('Saving user data to Firestore...');
            await setDoc(doc(db, 'users', user.uid), {
                studentId,
                name,
                roomNumber,
                hostelBlock,
                phone,
                email
            });
            console.log('User data saved successfully');
            
            Alert.alert('Success', 'Registration successful!');
            navigation.navigate('Main');
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
    <ImageBackground source={require('../assets/images/register_login.png')} style={styles.background} blurRadius={8}>
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
        color: '#fbf2f2ff',
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
        color: '#b7b7b7ff',
        fontSize: 15,
        marginTop: 8,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;
