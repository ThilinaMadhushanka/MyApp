
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

// Mock cart data
const cartItems = [
    { id: '1', name: 'MAS Filtered Water', quantity: 2, price: 1.50 },
    { id: '2', name: 'Canteen Filtered Water', quantity: 1, price: 1.00 },
];

const CartScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ width: '100%' }}
            />
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Checkout')}>
                <Text style={commonStyles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
