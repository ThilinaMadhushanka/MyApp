
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../assets/images/welcome.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={{ flex: 1 }} />
            <View style={styles.bottomPanel}>
                <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('FeatureIntro1')}>
                    <Text style={commonStyles.buttonText}>See Features</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    bottle: {
        width: 220,
        height: 350,
        marginTop: 60,
    },
    bottomPanel: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: 'rgba(255,255,255,0.0)',
    },
});

export default WelcomeScreen;
