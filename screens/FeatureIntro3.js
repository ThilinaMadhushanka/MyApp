
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const FeatureIntro3 = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Secure and Simple</Text>
            <Image source={require('../assets/OIP.png')} style={{ width: 200, height: 200, marginBottom: 20 }} />
            <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 16, color: '#555'}}>
                Manage your profile, track your order history, and enjoy a seamless experience.
            </Text>
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={commonStyles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeatureIntro3;
