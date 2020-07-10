import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { EleveurDrawerNav } from './drawers/EleveurDrawerNavigator';
import StartupScreen from '../screens/auth/StartupScreen';
import AuthScreen from '../screens/auth/AuthScreen';


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token); //check if we have a valid token, !! forces the true/false
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <EleveurDrawerNav />}
            {!isAuth && didTryAutoLogin && <AuthScreen />}
            {!didTryAutoLogin && !isAuth && <StartupScreen />}
        </NavigationContainer>
    );
};


export default AppNavigator;