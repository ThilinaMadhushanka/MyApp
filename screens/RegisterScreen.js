
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProfile } from '../UserProfileContext';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

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
    const [profileImage, setProfileImage] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(false);

    // Phone verification functions
    const sendVerificationCode = () => {
        if (!phone) {
            Alert.alert('Error', 'Please enter a phone number first');
            return;
        }
        // Simulate sending verification code
        Alert.alert('Verification Code Sent', `A verification code has been sent to ${phone}`);
        setShowVerification(true);
    };

    const verifyPhoneNumber = () => {
        // Simulate verification (in real app, you'd verify with backend)
        if (verificationCode === '1234') { // Simple demo code
            setIsPhoneVerified(true);
            setShowVerification(false);
            Alert.alert('Success', 'Phone number verified successfully!');
        } else {
            Alert.alert('Error', 'Invalid verification code. Try 1234 for demo.');
        }
    };

    // Image picker function
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleRegister = async () => {
        if (!studentId || !name || !roomNumber || !hostelBlock || !phone || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (!isPhoneVerified) {
            Alert.alert('Error', 'Please verify your phone number before registering');
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
                photo: profileImage || '',
                phoneVerified: true
            });
            setProfile({
                name,
                email: user.email || email,
                phone,
                address: `${roomNumber}, ${hostelBlock}`,
                profileImage: profileImage || ''
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
                
                {/* Profile Image Upload */}
                <View style={styles.imageUploadContainer}>
                    <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Ionicons name="camera" size={30} color="#007bff" />
                                <Text style={styles.uploadText}>Add Photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <TextInput style={styles.input} placeholder="Student ID" value={studentId} onChangeText={setStudentId} />
                <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Room Number" value={roomNumber} onChangeText={setRoomNumber} />
                <TextInput style={styles.input} placeholder="Hostel Block" value={hostelBlock} onChangeText={setHostelBlock} />
                
                {/* Phone Number with Verification */}
                <View style={styles.phoneContainer}>
                    <TextInput 
                        style={[styles.input, styles.phoneInput]} 
                        placeholder="Phone Number" 
                        value={phone} 
                        onChangeText={setPhone} 
                        keyboardType="phone-pad" 
                    />
                    <TouchableOpacity 
                        style={[styles.verifyButton, isPhoneVerified && styles.verifiedButton]} 
                        onPress={sendVerificationCode}
                        disabled={isPhoneVerified}
                    >
                        <Ionicons 
                            name={isPhoneVerified ? "checkmark-circle" : "send"} 
                            size={20} 
                            color={isPhoneVerified ? "#28a745" : "#fff"} 
                        />
                    </TouchableOpacity>
                </View>

                {/* Phone Verification Status */}
                <View style={styles.verificationStatus}>
                    <Ionicons 
                        name={isPhoneVerified ? "checkmark-circle" : "warning"} 
                        size={16} 
                        color={isPhoneVerified ? "#28a745" : "#ff6b6b"} 
                    />
                    <Text style={[styles.verificationText, { color: isPhoneVerified ? "#28a745" : "#ff6b6b" }]}>
                        {isPhoneVerified ? "Phone verified" : "Phone not verified"}
                    </Text>
                </View>

                {/* Verification Code Input */}
                {showVerification && (
                    <View style={styles.verificationContainer}>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Enter verification code" 
                            value={verificationCode} 
                            onChangeText={setVerificationCode} 
                            keyboardType="number-pad"
                        />
                        <TouchableOpacity style={styles.verifyCodeButton} onPress={verifyPhoneNumber}>
                            <Text style={styles.verifyCodeText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                )}

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
    // New styles for image upload and phone verification
    imageUploadContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageUploadButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#007bff',
        borderStyle: 'dashed',
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    placeholderImage: {
        alignItems: 'center',
    },
    uploadText: {
        color: '#007bff',
        fontSize: 12,
        marginTop: 5,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    phoneInput: {
        flex: 1,
        marginRight: 10,
    },
    verifyButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifiedButton: {
        backgroundColor: '#28a745',
    },
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    verifyCodeButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginLeft: 10,
    },
    verifyCodeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    verificationStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    verificationText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 6,
    },
});

export default RegisterScreen;
