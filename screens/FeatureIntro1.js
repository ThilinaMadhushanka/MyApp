
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const FeatureIntro1 = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Easy Ordering</Text>
            <Image source={require('../assets/hostel.png')} style={{ width: 200, height: 200, marginBottom: 20 }} />
            <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 16, color: '#555'}}>
                Order clean, potable water delivered directly to your hostel room with just a few taps.
            </Text>
            <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('FeatureIntro2')}>
                <Text style={commonStyles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeatureIntro1;
