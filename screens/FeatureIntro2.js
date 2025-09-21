import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const FeatureIntro2 = () => {
    const navigation = useNavigation();

    return (
        <View style={[commonStyles.container, { backgroundColor: '#fff', flex: 1 }]}> 
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                <Text style={styles.arrowText}>{'\u2190'}</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Image source={require('../assets/images/FeatureIntro2.png')} style={styles.illustration} />
                <Text style={styles.title}>Schedule when you want{"\n"}your water delivered</Text>
                <Text style={styles.subtitle}>Fresh Water, Anytime, Anywhere{"\n"}Fast & Reliable Water Delivery</Text>
            </View>
            <View>
                <View style={styles.progressContainer}>
                    <View style={styles.progressDot} />
                    <View style={[styles.progressDot, styles.activeDot]} />
                    <View style={styles.progressDot} />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeatureIntro3')}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    backArrow: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    arrowText: {
        fontSize: 28,
        color: '#0080FF',
        fontWeight: 'bold',
    },
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
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#0080FF',
        textAlign: 'center',
        marginBottom: 20,
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
        paddingHorizontal: 50,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
export default FeatureIntro2;
