
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const CheckoutScreen = () => {
    const navigation = useNavigation();

    const handleConfirmOrder = () => {
        // TODO: Add order creation logic and payment processing here
        navigation.navigate('OrderSuccess');
    };

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Checkout</Text>

            {/* Delivery Address */}
            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Delivery Address</Text>
                <TextInput style={commonStyles.input} defaultValue="Block B - Room 203" />
            </View>

            {/* Order Summary */}
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <Text style={styles.summaryText}>3 items - $4.00</Text>
            </View>

            <TouchableOpacity style={commonStyles.button} onPress={handleConfirmOrder}>
                <Text style={commonStyles.buttonText}>Confirm Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    addressContainer: {
        width: '100%',
        marginBottom: 20,
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryContainer: {
        width: '100%',
        marginBottom: 30,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 16,
    },
});

export default CheckoutScreen;
