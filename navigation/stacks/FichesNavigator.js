//Sheets stack navigator

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavScreen, { screenOptions as FavScreenOptions } from '../../screens/fiches/FavScreen';
import SearchScreen, { screenOptions as SearchScreenOptions } from '../../screens/fiches/SearchScreen';
import FicheScreen, { screenOptions as FicheScreenOptions } from '../../screens/fiches/FicheScreen';
import defaultNavOptions from '../../components/Navigation/DefaultNavOptions';


const FichesStackNavigator = createStackNavigator();
export const FichesNavigator = () => {
    return (
        <FichesStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <FichesStackNavigator.Screen
                name='Search'
                component={SearchScreen}
                options={SearchScreenOptions}
            />
            <FichesStackNavigator.Screen
                name='Fiche'
                component={FicheScreen}
                options={FicheScreenOptions}
            />
            <FichesStackNavigator.Screen
                name='Favoris'
                component={FavScreen}
                options={FavScreenOptions}
            />
        </FichesStackNavigator.Navigator>
    );
};