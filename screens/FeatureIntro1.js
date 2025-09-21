import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const FeatureIntro1 = () => {
    const navigation = useNavigation();

    return (
        <View style={[commonStyles.container, { backgroundColor: '#fff', flex: 1 }]}> 
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Image source={require('../assets/images/FeatureIntro1.png')} style={styles.illustration} />
                <Text style={styles.title}>We provide best quality water</Text>
                <Text style={styles.subtitle}>Fresh Water, Anytime, Anywhere{"\n"}Fast & Reliable Water Delivery</Text>
            </View>
            <View>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressDot, styles.activeDot]} />
                    <View style={styles.progressDot} />
                    <View style={styles.progressDot} />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeatureIntro2')}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    illustration: {
        width: 180,
        height: 180,
        marginBottom: 30,
        marginTop: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0080FF',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 15,
        color: '#0080FF',
        textAlign: 'center',
        marginBottom: 30,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    progressDot: {
        width: 24,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: '#0080FF',
    },
    button: {
        backgroundColor: '#0080FF',
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 80,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
export default FeatureIntro1;