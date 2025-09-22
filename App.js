import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { UserProfileProvider } from './UserProfileContext';

export default function App() {
    return (
        <UserProfileProvider>
            <AppNavigator />
        </UserProfileProvider>
    );
}
