import React, { useState } from 'react';
import { useUserProfile } from '../UserProfileContext';
import { useTheme } from '../ThemeContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardMain = ({ navigation, route }) => {
  const { profile } = useUserProfile();
  const { colors } = useTheme();
  const userName = profile?.name || route?.params?.name || 'Mr Product';
  const [activeWaterType, setActiveWaterType] = useState('All');
  
  const [favorites, setFavorites] = useState([]);
  
  // All products with their categories
  const allProducts = [
    // Filtering Mass Water - Multiple sizes
    {
      id: 'filtering-mass-5l',
      name: 'Filtering Mass Water',
      size: '5L',
      price: 'Rs. 50',
      image: require('../assets/images/5l.png'),
      category: 'Filtering mass',
    },
    {
      id: 'filtering-mass-10l',
      name: 'Filtering Mass Water',
      size: '10L',
      price: 'Rs. 80',
      image: require('../assets/images/5l.png'),
      category: 'Filtering mass',
    },
    {
      id: 'filtering-mass-15l',
      name: 'Filtering Mass Water',
      size: '15L',
      price: 'Rs. 120',
      image: require('../assets/images/19l.png'),
      category: 'Filtering mass',
    },
    {
      id: 'filtering-mass-19l',
      name: 'Filtering Mass Water',
      size: '19L',
      price: 'Rs. 150',
      image: require('../assets/images/19l.png'),
      category: 'Filtering mass',
    },
    
    // Filtering Faculty Water - Multiple sizes
    {
      id: 'filtering-fac-5l',
      name: 'Filtering Fac. Water',
      size: '5L',
      price: 'Rs. 50',
      image: require('../assets/images/5l.png'),
      category: 'Filtering faculty',
    },
    {
      id: 'filtering-fac-10l',
      name: 'Filtering Fac. Water',
      size: '10L',
      price: 'Rs. 80',
      image: require('../assets/images/5l.png'),
      category: 'Filtering faculty',
    },
    {
      id: 'filtering-fac-15l',
      name: 'Filtering Fac. Water',
      size: '15L',
      price: 'Rs. 120',
      image: require('../assets/images/19l.png'),
      category: 'Filtering faculty',
    },
    {
      id: 'filtering-fac-19l',
      name: 'Filtering Fac. Water',
      size: '19L',
      price: 'Rs. 150',
      image: require('../assets/images/19l.png'),
      category: 'Filtering faculty',
    },
    
    // Market Water - Multiple sizes
    {
      id: 'market-500ml',
      name: 'Market Water',
      size: '500ml',
      price: 'Rs. 70',
      image: require('../assets/images/5l.png'),
      category: 'Market bottle',
    },
    {
      id: 'market-1l',
      name: 'Market Water',
      size: '1L',
      price: 'Rs. 100',
      image: require('../assets/images/5l.png'),
      category: 'Market bottle',
    },
    {
      id: 'market-5l',
      name: 'Market Water',
      size: '5L',
      price: 'Rs. 450',
      image: require('../assets/images/5l.png'),
      category: 'Market bottle',
    },
    
    // Tap Water - Multiple sizes
    {
      id: 'tap-5l',
      name: 'Tap Water',
      size: '5L',
      price: 'Rs. 40',
      image: require('../assets/images/5l.png'),
      category: 'Market bottle',
    },
    {
      id: 'tap-10l',
      name: 'Tap Water',
      size: '10L',
      price: 'Rs. 60',
      image: require('../assets/images/5l.png'),
      category: 'Market bottle',
    },
    {
      id: 'tap-15l',
      name: 'Tap Water',
      size: '15L',
      price: 'Rs. 80',
      image: require('../assets/images/19l.png'),
      category: 'Market bottle',
    },
    {
      id: 'tap-19l',
      name: 'Tap Water',
      size: '19L',
      price: 'Rs. 100',
      image: require('../assets/images/19l.png'),
      category: 'Market bottle',
    },
  ];

  // Filter products based on active water type
  const getFilteredProducts = () => {
    if (activeWaterType === 'All') {
      return allProducts;
    }
    return allProducts.filter(product => 
      product.category.toLowerCase() === activeWaterType.toLowerCase()
    );
  };

  const products = getFilteredProducts();

  const waterTypes = ['All', 'Filtering mass', 'Filtering faculty', 'Market bottle'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ImageBackground
        source={require('../assets/images/welcome.png')}
        style={styles.headerBg}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        blurRadius={8}
      >
        
        <View style={styles.headerContent}>
          <Text style={[styles.headerWelcome, { color: colors.text }]}>Welcome Back!</Text>
          <Text style={[styles.headerUser, { color: colors.text }]}>{userName}!</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput, { backgroundColor: colors.surface, color: colors.text }]}
              placeholder="Search Something..."
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity style={styles.searchIconButton}>
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Horizontal Banner Section */}
        <View style={styles.bannerSection}>
          <View style={styles.bannerCard}>
            <ImageBackground 
              source={require('../assets/images/ab.png')}
              style={styles.bannerImage}
              imageStyle={{ borderRadius: 18 }}
            >
              <View style={styles.bannerOverlay} />
              <View style={styles.bannerContent}>
                <Text style={styles.cardTitle}>Hostel Springs</Text>
                <Text style={styles.cardSubtitle}>Bottle water delivery</Text>
                <TouchableOpacity style={styles.quickShopButton}>
                  <Text style={styles.quickShopButtonText}>QUICK SHOP</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Water Type Section */}
        <View style={styles.waterTypeSection}>
          <View style={styles.waterTypeHeader}>
            <Text style={styles.waterTypeTitle}>Water type</Text>
            <Text style={styles.productCount}>{products.length} products</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.waterTypeScroll}
            contentContainerStyle={styles.waterTypeContainer}
          >
            {waterTypes.map((type, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.waterTypeButton, 
                  activeWaterType === type && styles.activeButton
                ]}
                onPress={() => setActiveWaterType(type)}
              >
                <Text style={[
                  styles.waterTypeButtonText, 
                  activeWaterType === type && styles.activeButtonText
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Progress Indicator */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarActive} />
            <View style={styles.progressBarInactive} />
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.productSection}>
          {products.length === 0 ? (
            <View style={styles.noProductsContainer}>
              <Ionicons name="water-outline" size={60} color="#ccc" />
              <Text style={styles.noProductsText}>No products found</Text>
              <Text style={styles.noProductsSubtext}>Try selecting a different water type</Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {products.map((product, index) => {
              // Find the original index in allProducts array using unique ID
              const originalIndex = allProducts.findIndex(p => p.id === product.id);
              const isFav = favorites.includes(originalIndex);
              return (
                <View key={product.id} style={styles.productCard}>
                  <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={() => {
                      setFavorites(favs => {
                        const updated = favs.includes(originalIndex)
                          ? favs.filter(i => i !== originalIndex)
                          : [...favs, originalIndex];
                        // After updating favorites, navigate to Cart with favorited products
                        const cartItems = updated.map(i => allProducts[i]);
                        setTimeout(() => {
                          // Only navigate if adding (not removing)
                          if (!favs.includes(originalIndex)) {
                            navigation.navigate('Cart', { cartItems });
                          }
                        }, 0);
                        return updated;
                      });
                    }}
                  >
                    <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={20} color={isFav ? '#ff3366' : '#666'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('ProductDetail', {
                      product: {
                        ...product,
                        bottleSize: product.size,
                        quantity: 1,
                      }
                    })}
                  >
                    <View style={styles.productImageContainer}>
                      <Image source={product.image} style={styles.productImage} />
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productSize}>{product.size}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerBg: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  headerBottle: {
    position: 'absolute',
    top: 40,
    right: 30,
    width: 120,
    height: 200,
    resizeMode: 'contain',
    zIndex: 1,
  },
  headerContent: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  headerWelcome: {
    fontSize: 16,
    color: '#ffffffff',
    fontWeight: '500',
  },
  headerUser: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  searchIconButton: {
    backgroundColor: '#1E90FF',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  scrollContent: {
    flex: 1,
    marginTop: -30,
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bannerCard: {
    height: 120,
    borderRadius: 18,
    overflow: 'hidden',
  },
  bannerImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 18,
  },
  bannerContent: {
    padding: 20,
    zIndex: 2,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  quickShopButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  quickShopButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  waterTypeSection: {
    marginBottom: 25,
  },
  waterTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  waterTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  waterTypeScroll: {
    paddingHorizontal: 15,
  },
  waterTypeContainer: {
    paddingHorizontal: 5,
  },
  waterTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#1E90FF',
  },
  waterTypeButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 12,
  },
  activeButtonText: {
    color: 'white',
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  progressBarActive: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1E90FF',
    marginHorizontal: 2,
  },
  progressBarInactive: {
    width: 10,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
  },
  productSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 5,
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 3,
  },
  productSize: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
  noProductsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noProductsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
  },
  noProductsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default DashboardMain;