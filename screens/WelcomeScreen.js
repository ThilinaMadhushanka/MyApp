
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    console.log('WelcomeScreen rendering...');

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/welcome.png')}
                style={styles.background}
                resizeMode="cover"
                onError={(error) => console.log('Image load error:', error)}
                onLoad={() => console.log('Image loaded successfully')}
            >
                <View style={{ flex: 1 }} />
                <View style={styles.bottomPanel}>
                    <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('FeatureIntro1')}>
                        <Text style={commonStyles.buttonText}>See Features</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Fallback background color
    },
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
