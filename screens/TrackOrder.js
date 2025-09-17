
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

// Mock order data
const orders = [
    { id: '1', status: 'Out for Delivery', expected: '10:30 AM' },
    { id: '2', status: 'Pending', expected: 'Tomorrow' },
];

const TrackOrder = () => {
    const renderItem = ({ item }) => (
        <View style={styles.orderContainer}>
            <Text style={styles.orderStatus}>{item.status}</Text>
            <Text style={styles.orderExpected}>Expected: {item.expected}</Text>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Track Your Orders</Text>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    orderContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
    },
    orderStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    orderExpected: {
        fontSize: 16,
        color: '#555',
    },
});

export default TrackOrder;
