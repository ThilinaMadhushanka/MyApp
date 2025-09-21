import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // Get cart items from params (favorites from DashboardMain)
    const cartItems = route.params?.cartItems || [];
    const total = cartItems.reduce((sum, item) => sum + parseInt(item.price.replace(/\D/g, '')), 0);

    return (
        <ImageBackground source={require('../assets/images/welcome.png')} style={styles.bg} blurRadius={8}>
            <View style={styles.overlay} />
            <View style={styles.cartContainer}>
                {cartItems.length === 0 ? (
                    <Text style={styles.emptyText}>No items in cart.</Text>
                ) : (
                    <View style={styles.cartCard}>
                        <Image source={cartItems[0].image} style={styles.cartImage} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cartItemName}>{cartItems[0].name}</Text>
                            <Text style={styles.cartItemPrice}>{cartItems[0].price}</Text>
                            <View style={styles.qtyRow}>
                                <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                                <Text style={styles.qtyText}>1</Text>
                                <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.trashBtn}><Ionicons name="trash" size={22} color="#fff" /></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                <View style={styles.cartFooter}>
                    <Text style={styles.totalLabel}>TOTAL</Text>
                    <Text style={styles.totalValue}>Rs. {total}</Text>
                    <TouchableOpacity
                        style={styles.checkoutBtn}
                        onPress={() => {
                            if (cartItems.length > 0) {
                                navigation.navigate('ProductDetail', {
                                    product: {
                                        ...cartItems[0],
                                        bottleSize: '19L',
                                        quantity: 1,
                                    },
                                });
                            }
                        }}
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
});

export default CartScreen;
