import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { UserProfileProvider } from './UserProfileContext';
import { ThemeProvider } from './ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <UserProfileProvider>
                <AppNavigator />
            </UserProfileProvider>
        </ThemeProvider>
    );
}
