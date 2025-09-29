import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../UserProfileContext';
import { useTheme } from '../ThemeContext';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserProfile = () => {
    const navigation = useNavigation();
    const { profile, setProfile } = useUserProfile();
    const { colors } = useTheme();
    const [editing, setEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);
    const [enrollCount] = useState(7);
    const [profileImage, setProfileImage] = useState(null);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    useEffect(() => {
        setEditProfile(profile);
        if (profile.profileImage) {
            setProfileImage(profile.profileImage);
        }
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const ref = doc(db, 'Users', user.uid);
                    const snap = await getDoc(ref);
                    if (snap.exists()) {
                        const data = snap.data();
                        setProfile(prev => ({
                            ...prev,
                            name: data.firstName || data.name || prev.name || user.email,
                            email: data.email || user.email,
                            phone: data.phone || prev.phone || '',
                            address: data.address || prev.address || `${data.roomNumber || ''} ${data.hostelBlock || ''}`.trim(),
                            profileImage: data.photo || prev.profileImage || ''
                        }));
                        if (data.photo) setProfileImage(data.photo);
                        setIsPhoneVerified(data.phoneVerified || false);
                    }
                } catch (e) {
                    // fail silently to avoid UX disruption
                }
            }
        });
        return unsub;
    }, [setProfile]);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const source = { uri: result.assets[0].uri };
            setProfileImage(source.uri);
            uploadImage(source.uri);
        }
    };

    const uploadImage = async (uri) => {
        setProfile(prevProfile => ({ ...prevProfile, profileImage: uri }));
        // Update in Firebase
        try {
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, 'Users', user.uid), {
                    photo: uri
                });
            }
        } catch (error) {
            console.log('Error updating profile image:', error);
        }
    };

    // Phone verification functions
    const sendVerificationCode = () => {
        if (!editProfile.phone) {
            Alert.alert('Error', 'Please enter a phone number first');
            return;
        }
        Alert.alert('Verification Code Sent', `A verification code has been sent to ${editProfile.phone}`);
        setShowVerification(true);
    };

    const verifyPhoneNumber = async () => {
        if (verificationCode === '1234') { // Simple demo code
            setIsPhoneVerified(true);
            setShowVerification(false);
            Alert.alert('Success', 'Phone number verified successfully!');
            
            // Update in Firebase
            try {
                const user = auth.currentUser;
                if (user) {
                    await updateDoc(doc(db, 'Users', user.uid), {
                        phoneVerified: true
                    });
                }
            } catch (error) {
                console.log('Error updating phone verification:', error);
            }
        } else {
            Alert.alert('Error', 'Invalid verification code. Try 1234 for demo.');
        }
    };


    const startEditing = () => {
        setEditProfile(profile);
        setEditing(true);
    };

    const handleSave = async () => {
        setProfile(editProfile);
        setEditing(false);
        Alert.alert('Success', 'Profile updated successfully!');
        if (navigation.canGoBack() && navigation.getState()?.routes?.some(r => r.params?.fromCheckout)) {
            navigation.navigate('Checkout', { address: `${editProfile.name},\n${editProfile.address}\n${editProfile.phone}` });
        }
    };

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
        <ImageBackground style={[styles.bg, { backgroundColor: colors.background }]} blurRadius={2}>
            <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
                <Text style={[styles.greeting, { color: colors.text }]}>Hi <Text style={{ color: colors.primary }}>{profile.name}</Text></Text>
                <Text style={[styles.greetingSub, { color: colors.textSecondary }]}>Good morning!</Text>
                <View style={styles.avatarWrap}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image source={{ uri: profileImage || 'https://via.placeholder.com/100' }} style={styles.avatar} />
                        <View style={styles.cameraIcon}>
                            <Ionicons name="camera" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionRow}>
                    {editing ? (
                        <TextInput
                            style={[styles.input, { flex: 1, marginRight: 8, minWidth: 120 }]}
                            value={editProfile.name}
                            onChangeText={t => setEditProfile({ ...editProfile, name: t })}
                            placeholder="Name"
                        />
                    ) : (
                        <Text style={styles.sectionTitle}>{profile.name}</Text>
                    )}
                    <TouchableOpacity onPress={editing ? () => setEditing(false) : startEditing}>
                        <Ionicons name="pencil" size={20} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
                {editing ? (
                    <View style={styles.editBlock}>
                        <TextInput
                            style={styles.input}
                            value={editProfile.email}
                            onChangeText={t => setEditProfile({ ...editProfile, email: t })}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <View style={styles.phoneContainer}>
                            <TextInput
                                style={[styles.input, styles.phoneInput]}
                                value={editProfile.phone}
                                onChangeText={t => setEditProfile({ ...editProfile, phone: t })}
                                placeholder="Phone"
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
                        <TextInput
                            style={styles.input}
                            value={editProfile.address}
                            onChangeText={t => setEditProfile({ ...editProfile, address: t })}
                            placeholder="Address"
                            multiline
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                                <Text style={styles.saveBtnText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditing(false)}>
                                <Text style={styles.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoText}>{profile.email}</Text>
                        <Text style={styles.infoText}>{profile.phone}</Text>
                        <Text style={styles.infoText}>{profile.address}</Text>
                    </View>
                )}
                <Text style={styles.sectionTitle2}>Activity</Text>
                <View style={styles.enrollRow}>
                    <Text style={styles.enrollText}>you enroll water bottles</Text>
                    <View style={styles.enrollBadge}><Text style={styles.enrollBadgeText}>{enrollCount}</Text></View>
                    <TouchableOpacity style={styles.viewBtn}><Text style={styles.viewBtnText}>View</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.helpText}>Help and Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.helpBtn, { marginTop: 10 }]} onPress={handleLogout}>
                    <Text style={[styles.helpText, { color: 'red' }]}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        alignItems: 'center',
        padding: 24,
        paddingTop: 40,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E90FF',
        alignSelf: 'flex-start',
    },
    greetingSub: {
        color: '#7bb6f7',
        fontSize: 15,
        marginBottom: 18,
        alignSelf: 'flex-start',
    },
    avatarWrap: {
        alignItems: 'center',
        marginBottom: 18,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        marginBottom: 8,
        borderWidth: 3,
        borderColor: '#fff',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        backgroundColor: '#1E90FF',
        borderRadius: 15,
        padding: 5,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginRight: 8,
    },
    sectionTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E90FF',
        alignSelf: 'flex-start',
        marginTop: 18,
        marginBottom: 6,
    },
    infoBlock: {
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    infoText: {
        color: '#1E90FF',
        fontSize: 15,
        marginBottom: 2,
    },
    editBlock: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#f8f9fa',
    },
    saveBtn: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginRight: 8,
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    cancelBtn: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    cancelBtnText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    enrollRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 18,
    },
    enrollText: {
        color: '#1E90FF',
        fontSize: 15,
        marginRight: 6,
    },
    enrollBadge: {
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    enrollBadgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    viewBtn: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    viewBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    helpBtn: {
        marginTop: 18,
        alignSelf: 'flex-start',
    },
    helpText: {
        color: '#1E90FF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    // Phone verification styles
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    phoneInput: {
        flex: 1,
        marginRight: 10,
    },
    verifyButton: {
        backgroundColor: '#1E90FF',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifiedButton: {
        backgroundColor: '#28a745',
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
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
});

export default UserProfile;
