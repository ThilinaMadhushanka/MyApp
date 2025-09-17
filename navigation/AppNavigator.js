
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen';
import FeatureIntro1 from '../screens/FeatureIntro1';
import FeatureIntro2 from '../screens/FeatureIntro2';
import FeatureIntro3 from '../screens/FeatureIntro3';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardMain from '../screens/DashboardMain';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccess from '../screens/OrderSuccess';
import TrackOrder from '../screens/TrackOrder';
import UserProfile from '../screens/UserProfile';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => (
    <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardMain} />
        <Tab.Screen name="Track" component={TrackOrder} />
        <Tab.Screen name="Profile" component={UserProfile} />
        <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="FeatureIntro1" component={FeatureIntro1} />
            <Stack.Screen name="FeatureIntro2" component={FeatureIntro2} />
            <Stack.Screen name="FeatureIntro3" component={FeatureIntro3} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainApp} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
