//Main stack navigator
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ParametreScreen, { screenOptions as ParametreScreenOptions } from '../../screens/main/ParametreScreen';
import ProfilScreen, { screenOptions as ProfilScreenOptions } from '../../screens/main/ProfilScreen';
import defaultNavOptions from '../../components/Navigation/DefaultNavOptions';


const MainStackNavigator = createStackNavigator();
export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <MainStackNavigator.Screen
                name='Profil'
                component={ProfilScreen}
                options={ProfilScreenOptions}
            />
            <MainStackNavigator.Screen
                name='Parametre'
                component={ParametreScreen}
                options={ParametreScreenOptions}
            />
        </MainStackNavigator.Navigator>
    );
};