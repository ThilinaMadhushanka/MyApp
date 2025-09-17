
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';

const ProductDetail = () => {
    const navigation = useNavigation();
    const [waterType, setWaterType] = useState('MAS Filtered');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // TODO: Add to cart logic here
        navigation.navigate('Cart');
    };

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Place an Order</Text>

            {/* Water Type Selection */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Water Type:</Text>
                <View style={styles.optionButtons}>
                    <TouchableOpacity 
                        style={[styles.optionButton, waterType === 'MAS Filtered' && styles.selectedOption]} 
                        onPress={() => setWaterType('MAS Filtered')}>
                        <Text>MAS Filtered</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, waterType === 'Canteen Filtered' && styles.selectedOption]} 
                        onPress={() => setWaterType('Canteen Filtered')}>
                        <Text>Canteen Filtered</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.optionButton, waterType === 'Tap' && styles.selectedOption]} 
                        onPress={() => setWaterType('Tap')}>
                        <Text>Tap Water</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Quantity Selection */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Quantity:</Text>
                <View style={styles.quantitySelector}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(Math.min(5, quantity + 1))} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={commonStyles.button} onPress={handleAddToCart}>
                <Text style={commonStyles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    optionContainer: {
        marginBottom: 20,
        width: '100%',
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    optionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionButton: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    selectedOption: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 10,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
});

export default ProductDetail;
