

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
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
    const [isFav, setIsFav] = useState(false);
    // You should add a nature background image to assets/images/nature_bg.png for best match
    const natureBg = require('../assets/images/hostel.png');

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
            <ImageBackground source={natureBg} style={styles.bgNature}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color="#1E90FF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFav(f => !f)}>
                        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={28} color={isFav ? '#ff3366' : '#1E90FF'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottleWrap}>
                    <TouchableOpacity style={styles.lockBtn}>
                        <Ionicons name="lock-closed" size={22} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.detailCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.stockText}>(Available In Stock)</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.productDesc}>
                    A service that supplies clean drinking water regularly to hostels, ensuring students have easy and safe access to mass filtering water.
                </Text>
                <View style={styles.reviewRow}>
                    <Text style={styles.reviewScore}>4.5</Text>
                    <Ionicons name="star" size={16} color="#f8ff1eff" style={{ marginHorizontal: 2 }} />
                    <Text style={styles.reviewCount}>(128 reviews)</Text>
                </View>
                <View style={styles.optionsRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.optionLabel}>Bottle size</Text>
                        <View>
                            <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown(d => !d)}>
                                <Text style={styles.dropdownText}>{bottleSize}</Text>
                                <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={18} color="#fff" />
                            </TouchableOpacity>
                            {showDropdown && (
                                <View style={styles.dropdownList}>
                                    {bottleSizes.map(size => (
                                        <TouchableOpacity
                                            key={size}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setBottleSize(size);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{size}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.optionLabel}>Quantity</Text>
                        <View style={styles.qtyRow}>
                            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(q => Math.max(1, q - 1))}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(q => q + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('Checkout',
                    {
                        product: {
                            price:product.price,
                            bottleSize: bottleSize,
                            quantity: quantity,
                        },
                    }
                )}>
                    <Text style={styles.buyText}>BUY</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    bgNature: {
        height: 340,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        position: 'relative',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    bottleWrap: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: -60,
        position: 'relative',
    },
    bottleImage: {
        width: 180,
        height: 220,
        resizeMode: 'contain',
        zIndex: 2,
    },
    lockBtn: {
        position: 'absolute',
        right: 30,
        bottom: 18,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        elevation: 2,
        zIndex: 3,
    },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        marginHorizontal: 10,
        marginTop: -60,
        padding: 24,
        elevation: 2,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginBottom: 4,
    },
    stockText: {
        color: '#1E90FF',
        fontSize: 13,
        fontWeight: '600',
    },
    productPrice: {
        fontSize: 18,
        color: '#1E90FF',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productDesc: {
        color: '#1E90FF',
        fontSize: 14,
        marginBottom: 12,
    },
    reviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    reviewScore: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    reviewCount: {
        color: '#1E90FF',
        fontSize: 13,
        marginLeft: 4,
    },
    optionsRow: {
        flexDirection: 'row',
        marginBottom: 18,
    },
    optionLabel: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 6,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 2,
        backgroundColor: '#1E90FF',
    },
    dropdownList: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1E90FF',
        zIndex: 10,
        elevation: 4,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    dropdownItemText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    dropdownText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 6,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    qtyBtn: {
        backgroundColor: '#f0f4ff',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 4,
        marginHorizontal: 4,
    },
    qtyBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E90FF',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginHorizontal: 8,
    },
    buyBtn: {
        backgroundColor: '#1E90FF',
        borderRadius: 20,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#1E90FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buyText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
    },
});

export default ProductDetail;
