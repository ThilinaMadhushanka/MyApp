
import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../UserProfileContext';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserProfile = () => {
    const navigation = useNavigation();
    const { profile, setProfile } = useUserProfile();
    const [editing, setEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);
    const [enrollCount] = useState(7);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setProfile(userData);
                    setEditProfile(userData);
                    if (userData.profileImage) {
                        setProfileImage(userData.profileImage);
                    }
                }
            }
        };
        fetchProfile();
    }, []);


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
        const user = auth.currentUser;
        if (user) {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storage = getStorage();
            const storageRef = ref(storage, `profile-images/${user.uid}`);
            uploadBytes(storageRef, blob).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    await setDoc(doc(db, 'users', user.uid), { profileImage: downloadURL }, { merge: true });
                    setProfile(prevProfile => ({ ...prevProfile, profileImage: downloadURL }));
                });
            });
        }
    };


    const startEditing = () => {
        setEditProfile(profile);
        setEditing(true);
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), editProfile, { merge: true });
                setProfile(editProfile);
                setEditing(false);
                Alert.alert('Success', 'Profile updated successfully!');
                if (navigation.canGoBack() && navigation.getState()?.routes?.some(r => r.params?.fromCheckout)) {
                    navigation.navigate('Checkout', { address: `${editProfile.name},\n${editProfile.address}\n${editProfile.phone}` });
                }
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <ImageBackground style={styles.bg} blurRadius={2}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.greeting}>Hi <Text style={{ color: '#1E90FF' }}>{profile.name}</Text></Text>
                <Text style={styles.greetingSub}>Good morning!</Text>
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
                        <TextInput
                            style={styles.input}
                            value={editProfile.phone}
                            onChangeText={t => setEditProfile({ ...editProfile, phone: t })}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                        />
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
});

export default UserProfile;
