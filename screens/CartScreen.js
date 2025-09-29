import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUserProfile } from '../UserProfileContext';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const CartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { profile } = useUserProfile();
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    // Check phone verification status on component mount
    useEffect(() => {
        checkPhoneVerification();
    }, []);

    const checkPhoneVerification = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, 'Users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsPhoneVerified(userData.phoneVerified || false);
                }
            }
        } catch (error) {
            console.log('Error checking phone verification:', error);
        }
    };
    const product = route.params?.product || {
            name: 'Filtering Mas water',
            price: 'Rs.100',
            bottleSize: '19L',
            quantity: 1,
        };
        const [quantity, setQuantity] = useState(product.quantity || 1);
        const [bottleSize, setBottleSize] = useState(product.bottleSize || '19L');
        const [showDropdown, setShowDropdown] = useState(false);
        const bottleSizes = ['5L', '19L'];
    // Get cart items from params (favorites from DashboardMain)
    const [cartItems, setCartItems] = useState(() => {
        const items = route.params?.cartItems || [];
        // Ensure each item has a quantity property
        return items.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
    });
    const total = cartItems.reduce((sum, item) => sum + (parseInt(item.price.replace(/\D/g, '')) * (item.quantity || 1)), 0);

    const updateQuantity = (index, newQuantity) => {
        console.log('Updating quantity for index:', index, 'to:', newQuantity);
        if (newQuantity < 1) {
            // Remove item if quantity goes to 0 or below
            removeItem(index);
            return;
        }
        const updatedItems = [...cartItems];
        updatedItems[index].quantity = newQuantity;
        setCartItems(updatedItems);
    };

    const removeItem = (index) => {
        console.log('Removing item at index:', index);
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
    };

    const handleCheckout = () => {
        if (!isPhoneVerified) {
            // Log unverified phone number attempt
            console.log('Cart checkout attempted with unverified phone number:', profile.phone);
            Alert.alert(
                'Phone Verification Required',
                'Please verify your phone number before proceeding to checkout. You can do this in your profile settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Go to Profile', onPress: () => navigation.navigate('UserProfile') }
                ]
            );
            return;
        }

        if (cartItems.length > 0) {
            navigation.navigate('ProductDetail', {
                product: {
                    price: product.price,
                    bottleSize: bottleSize,
                    quantity: quantity,
                },
            });
        }
    };
    

    return (
        <ImageBackground source={require('../assets/images/welcome.png')} style={styles.bg} blurRadius={8}>
            <View style={styles.overlay} />
            <View style={styles.cartContainer}>
                {cartItems.length === 0 ? (
                    <Text style={styles.emptyText}>No items in cart.</Text>
                ) : (
                    cartItems.map((item, index) => (
                        <View key={index} style={styles.cartCard}>
                            <Image source={item.image} style={styles.cartImage} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.cartItemName}>{item.name}</Text>
                                <Text style={styles.cartItemPrice}>{item.price}</Text>
                                <View style={styles.qtyRow}>
                                    <TouchableOpacity 
                                        style={styles.qtyBtn}
                                        onPress={() => {
                                            console.log('Decrease button pressed for item:', index);
                                            updateQuantity(index, (item.quantity || 1) - 1);
                                        }}
                                    >
                                        <Text style={styles.qtyBtnText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{item.quantity || 1}</Text>
                                    <TouchableOpacity 
                                        style={styles.qtyBtn}
                                        onPress={() => {
                                            console.log('Increase button pressed for item:', index);
                                            updateQuantity(index, (item.quantity || 1) + 1);
                                        }}
                                    >
                                        <Text style={styles.qtyBtnText}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.trashBtn}
                                        onPress={() => {
                                            removeItem(index);
                                        }}
                                    >
                                        <Ionicons name="trash" size={22} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                )}
                
                {/* Phone Verification Status */}
                {!isPhoneVerified && (
                    <View style={styles.verificationWarning}>
                        <Ionicons name="warning" size={20} color="#ff6b6b" />
                        <Text style={styles.warningText}>Phone number not verified</Text>
                    </View>
                )}

                <View style={styles.cartFooter}>
                    <Text style={styles.totalLabel}>TOTAL</Text>
                    <Text style={styles.totalValue}>Rs. {total}</Text>
                    <TouchableOpacity
                        style={[styles.checkoutBtn, !isPhoneVerified && styles.disabledCheckoutBtn]}
                        onPress={handleCheckout}
                    >
                        <Text style={styles.checkoutText}>CHECKOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.5)' },
    cartContainer: { flex: 1, padding: 24, justifyContent: 'center' },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    cartTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E90FF' },
    cartCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 18, marginBottom: 24, elevation: 2 },
    cartImage: { width: 70, height: 70, borderRadius: 12, marginRight: 18 },
    cartItemName: { fontSize: 18, fontWeight: 'bold', color: '#1E90FF', marginBottom: 4 },
    cartItemPrice: { fontSize: 16, color: '#333', marginBottom: 8 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    qtyBtn: { backgroundColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginHorizontal: 4 },
    qtyBtnText: { fontSize: 18, fontWeight: 'bold', color: '#1E90FF' },
    qtyText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginHorizontal: 8 },
    trashBtn: { backgroundColor: '#1E90FF', borderRadius: 8, padding: 8, marginLeft: 16 },
    cartFooter: { alignItems: 'center' },
    totalLabel: { fontSize: 14, color: '#888', marginBottom: 2 },
    totalValue: { fontSize: 22, fontWeight: 'bold', color: '#1E90FF', marginBottom: 16 },
    checkoutBtn: { backgroundColor: '#1E90FF', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 40 },
    checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    emptyText: { color: '#888', fontSize: 18, textAlign: 'center', marginTop: 40 },

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    verificationWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffe6e6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b6b',
    },
    warningText: {
        color: '#ff6b6b',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    disabledCheckoutBtn: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
});

export default CartScreen;
