
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const OrderSuccess = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Order Placed!</Text>
            <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 16, color: '#555'}}>
                Your order has been successfully placed. You can track its status in the 'Track' tab.
            </Text>
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={commonStyles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OrderSuccess;
