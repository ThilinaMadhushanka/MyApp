
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProfile } from '../UserProfileContext';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const { setProfile } = useUserProfile();
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [hostelBlock, setHostelBlock] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async () => {
        if (!studentId || !name || !roomNumber || !hostelBlock || !phone || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            setIsSubmitting(true);
            const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const user = cred.user;
            await setDoc(doc(db, 'Users', user.uid), {
                email: user.email,
                firstName: name,
                lastName: '',
                phone,
                address: `${roomNumber}, ${hostelBlock}`,
                studentId,
                roomNumber,
                hostelBlock,
                photo: ''
            });
            setProfile({
                name,
                email: user.email || email,
                phone,
                address: `${roomNumber}, ${hostelBlock}`,
                profileImage: ''
            });
            Alert.alert('Success', 'Registration successful!');
            navigation.navigate('Main');
        } catch (err) {
            Alert.alert('Registration failed', err.message || 'Please try again');
        } finally {
            setIsSubmitting(false);
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
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isSubmitting}>
                    {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>REGISTER</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// Styles remain the same
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
        alignItems: 'center'
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
