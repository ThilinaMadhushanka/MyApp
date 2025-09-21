import React, { useState } from 'react';
import { useUserProfile } from '../UserProfileContext';
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
  const userName = profile?.name || route?.params?.name || 'Mr Product';
  const [activeWaterType, setActiveWaterType] = useState('All');
  
  const [favorites, setFavorites] = useState([]);
  const products = [
    {
      name: 'Filtering Mass Water',
      price: 'Rs. 100',
      image: require('../assets/images/19l.png'),
    },
    {
      name: 'Filtering Fac. Water',
      price: 'Rs. 100',
      image: require('../assets/images/19l.png'),
    },
    {
      name: 'Market Water',
      price: 'Rs. 150',
      image: require('../assets/images/5l.png'),
    },
    {
      name: 'Tap Water',
      price: 'Rs. 40',
      image: require('../assets/images/5l.png'),
    },
  ];

  const waterTypes = ['All', 'Filtering mass', 'Filtering faculty', 'Market bottle'];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/welcome.png')}
        style={styles.headerBg}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        blurRadius={8}
      >
        
        <View style={styles.headerContent}>
          <Text style={styles.headerWelcome}>Welcome Back!</Text>
          <Text style={styles.headerUser}>{userName}!</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Something..."
              placeholderTextColor="#999"
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
          <Text style={styles.waterTypeTitle}>Water type</Text>
          
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
          <View style={styles.productGrid}>
            {products.map((product, index) => {
              const isFav = favorites.includes(index);
              return (
                <View key={index} style={styles.productCard}>
                  <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={() => {
                      setFavorites(favs => {
                        const updated = favs.includes(index)
                          ? favs.filter(i => i !== index)
                          : [...favs, index];
                        // After updating favorites, navigate to Cart with favorited products
                        const cartItems = updated.map(i => products[i]);
                        setTimeout(() => {
                          // Only navigate if adding (not removing)
                          if (!favs.includes(index)) {
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
                        bottleSize: '19L',
                        quantity: 1,
                      }
                    })}
                  >
                    <View style={styles.productImageContainer}>
                      <Image source={product.image} style={styles.productImage} />
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
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
  waterTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
    color: '#333',
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
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
});

export default DashboardMain;