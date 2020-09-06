import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { EleveurDrawerNav } from './drawers/EleveurDrawerNavigator';
import StartupScreen from '../screens/auth/StartupScreen';
import AuthScreen from '../screens/auth/AuthScreen';

//Composant principal de la navigation, englobant toutes les autres formes de navigation
//On affiche alternativement les écrans de connexion, l'écran intermédiaire d'autentification auto
//et enfin la navigation dans l'application à proprement parler.

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