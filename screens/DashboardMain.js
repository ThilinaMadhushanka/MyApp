
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardMain = ({ navigation }) => {
  const products = [
    {
      name: 'Filtering Mass Water',
      price: 'Rs. 60',
    },
    {
      name: 'Filtering Fac. Water',
      price: 'Rs. 100',
    },
    {
      name: 'Market Water',
      price: 'Rs. 100',
    },
    {
      name: 'Tap Water',
      price: 'Rs. 100',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={styles.header}
      >
        <Text style={styles.headerWelcome}>Welcome Back!</Text>
        <Text style={styles.headerUser}>Mr Product!</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Something..."
          />
          <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        </View>
      </View>

      <View style={styles.card}>
        <View
          style={styles.cardBackground}
        >
          <Text style={styles.cardTitle}>Hostel Springs</Text>
          <Text style={styles.cardSubtitle}>Bottle water delivery</Text>
          <TouchableOpacity style={styles.quickShopButton}>
            <Text style={styles.quickShopButtonText}>QUICK SHOP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.waterTypeTitle}>Water type</Text>
      <View style={styles.waterTypeContainer}>
        <TouchableOpacity style={[styles.waterTypeButton, styles.activeButton]}>
          <Text style={styles.waterTypeButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.waterTypeButton}>
          <Text style={styles.waterTypeButtonText}>Filtering mass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.waterTypeButton}>
          <Text style={styles.waterTypeButtonText}>Filtering faculty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.waterTypeButton}>
          <Text style={styles.waterTypeButtonText}>Market bottle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productGrid}>
        {products.map((product, index) => (
          <View key={index} style={styles.productCard}>
            <TouchableOpacity style={styles.favoriteIcon}>
                <Ionicons name="heart-outline" size={24} color="blue" />
            </TouchableOpacity>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    headerWelcome: {
        fontSize: 18,
        color: 'black',
    },
    headerUser: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginTop: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    searchIcon: {
        marginLeft: 10,
    },
    card: {
        borderRadius: 20,
        margin: 20,
        overflow: 'hidden',
    },
    cardBackground: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    cardSubtitle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
    },
    quickShopButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    quickShopButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    waterTypeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10,
    },
    waterTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    waterTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeButton: {
        backgroundColor: '#1E90FF',
    },
    waterTypeButtonText: {
        color: 'black',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    productCard: {
        width: '45%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    productName: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    productPrice: {
        color: '#888',
        marginTop: 5,
    },
});

export default DashboardMain;
