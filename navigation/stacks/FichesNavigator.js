import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import FavScreen, { screenOptions as FavScreenOptions } from '../../screens/fiches/FavScreen';
import SearchScreen, { screenOptions as SearchScreenOptions } from '../../screens/fiches/SearchScreen';
import RecoScreen, { screenOptions as RecoScreenOptions } from '../../screens/fiches/RecoScreen';
import FicheScreen, { screenOptions as FicheScreenOptions } from '../../screens/fiches/FicheScreen';
import defaultNavOptions from '../../components/Navigation/DefaultNavOptions';


//Search stack
const FichesSearchStackNavigator = createStackNavigator();
const FichesSearchNavigator = () => {
    return (
        <FichesSearchStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <FichesSearchStackNavigator.Screen
                name='Search'
                component={SearchScreen}
                options={SearchScreenOptions}
            />
            <FichesSearchStackNavigator.Screen
                name='Fiche'
                component={FicheScreen}
                options={FicheScreenOptions}
            />
        </FichesSearchStackNavigator.Navigator>
    );
};

//favoris stack
const FichesFavorisStackNavigator = createStackNavigator();
const FichesFavorisNavigator = () => {
    return (
        <FichesFavorisStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <FichesFavorisStackNavigator.Screen
                name='Favoris'
                component={FavScreen}
                options={FavScreenOptions}
            />
            <FichesFavorisStackNavigator.Screen
                name='Fiche'
                component={FicheScreen}
                options={FicheScreenOptions}
            />
        </FichesFavorisStackNavigator.Navigator>
    );
};

//recommandations stack
const FichesRecoStackNavigator = createStackNavigator();
const FichesRecoNavigator = () => {
    return (
        <FichesRecoStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <FichesRecoStackNavigator.Screen
                name='Recommandations'
                component={RecoScreen}
                options={RecoScreenOptions}
            />
            <FichesRecoStackNavigator.Screen
                name='Fiche'
                component={FicheScreen}
                options={FicheScreenOptions}
            />
        </FichesRecoStackNavigator.Navigator>
    );
};

//tabs
const FichesTabNav = createBottomTabNavigator();
export const FichesTabNavigator = () => {
    return (
        <FichesTabNav.Navigator
            tabBarOptions={{
                activeTintColor: Colors.secondary,
                inactiveTintColor: Colors.secondary,
                activeBackgroundColor: Colors.primary,
                inactiveBackgroundColor: 'gray',
                adaptive: true,
                tabStyle: { justifyContent: 'center' }
            }}
        >
            <FichesTabNav.Screen
                name='search'
                component={FichesSearchNavigator}
                options={{
                    tabBarLabel: () => {
                        return <AntDesign name="search1" size={25} color="white" />;
                    }
                }}
            />
            <FichesTabNav.Screen
                name='favoris'
                component={FichesFavorisNavigator}
                options={{
                    tabBarLabel: () => {
                        return <MaterialIcons name="favorite" size={25} color="white" />;
                    }
                }}
            />
            <FichesTabNav.Screen
                name='recommandations'
                component={FichesRecoNavigator}
                options={{
                    tabBarLabel: () => {
                        return <MaterialCommunityIcons name="google-analytics" size={25} color="white" />;
                    }
                }}
            />
        </FichesTabNav.Navigator>
    );
};