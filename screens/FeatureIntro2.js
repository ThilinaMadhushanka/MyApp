
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const FeatureIntro2 = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Track Your Order</Text>
            <Image source={require('../assets/community.png')} style={{ width: 200, height: 200, marginBottom: 20 }} />
            <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 16, color: '#555'}}>
                Get real-time updates on your delivery status, from confirmation to arrival.
            </Text>
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('FeatureIntro3')}>
                <Text style={commonStyles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeatureIntro2;
