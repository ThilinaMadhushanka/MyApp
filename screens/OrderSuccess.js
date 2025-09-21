
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderSuccess = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.orderId}>Order Id: one bottle</Text>
            <Image source={require('../assets/images/Order_Success.png')} style={styles.boxImage} />
            <Text style={styles.successTitle}>Order Successful</Text>
            <Text style={styles.successDesc}>
                A service that supplies clean drinking water regularly to hostels, ensuring students have easy and safe access to mass filtering water.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', { screen: 'Dashboard' })}>
                <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    orderId: {
        color: '#444',
        fontSize: 16,
        marginBottom: 18,
        marginTop: 24,
        textAlign: 'center',
    },
    boxImage: {
        width: 120,
        height: 120,
        marginBottom: 24,
        resizeMode: 'contain',
    },
    successTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 10,
        textAlign: 'center',
    },
    successDesc: {
        color: '#1E90FF',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#1E90FF',
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 40,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
        textAlign: 'center',
    },
});

export default OrderSuccess;
