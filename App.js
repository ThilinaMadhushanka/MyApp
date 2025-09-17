
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import FeatureIntro1 from './screens/FeatureIntro1';
import FeatureIntro2 from './screens/FeatureIntro2';
import FeatureIntro3 from './screens/FeatureIntro3';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardMain from './screens/DashboardMain';
import ProductDetail from './screens/ProductDetail';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderSuccess from './screens/OrderSuccess';
import TrackingStatus from './screens/TrackingStatus';
import ProfileSettings from './screens/ProfileSettings';
import HelpSupport from './screens/HelpSupport';
import NotificationPreferences from './screens/NotificationPreferences';


import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

// Header button to go to the next page in sequence
const pageOrder = [
  'WelcomeScreen',
  'FeatureIntro1',
  'FeatureIntro2',
  'FeatureIntro3',
  'RegisterScreen',
  'LoginScreen',
  'DashboardMain',
  'ProductDetail',
  'CartScreen',
  'CheckoutScreen',
  'OrderSuccess',
  'TrackingStatus',
  'ProfileSettings',
  'HelpSupport',
  'NotificationPreferences',
];

function HeaderButtons({ navigation, route }) {
  const currentIndex = pageOrder.indexOf(route.name);
  const nextPage = currentIndex >= 0 && currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;
  return (
    <View style={styles.headerButtons}>
      {nextPage && (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate(nextPage)}
        >
          <Text style={styles.headerButtonText}>Next Page</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtons: { flexDirection: 'row', marginRight: 10 },
  headerButton: { backgroundColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginLeft: 6 },
  headerButtonText: { fontSize: 12, color: '#007bff' },
});



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={({ navigation, route }) => ({
          headerShown: true,
          headerRight: () => <HeaderButtons navigation={navigation} route={route} />,
        })}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="FeatureIntro1" component={FeatureIntro1} />
        <Stack.Screen name="FeatureIntro2" component={FeatureIntro2} />
        <Stack.Screen name="FeatureIntro3" component={FeatureIntro3} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DashboardMain" component={DashboardMain} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="TrackingStatus" component={TrackingStatus} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="NotificationPreferences" component={NotificationPreferences} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
