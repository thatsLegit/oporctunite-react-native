import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors';
import defaultNavOptions from '../../components/Navigation/DefaultNavOptions';

import BilanScreen, { screenOptions as BilanScreenOptions } from '../../screens/eleveur/bilans/BilanScreen';

import BilanCategorie1Screen from '../../screens/eleveur/bilans/BilanCategorie1Screen';
import BilanCategorie2Screen from '../../screens/eleveur/bilans/BilanCategorie2Screen';
import BilanCategorie3Screen from '../../screens/eleveur/bilans/BilanCategorie3Screen';
import BilanCategorie4Screen from '../../screens/eleveur/bilans/BilanCategorie4Screen';

import BilanEvaluation1Screen from '../../screens/eleveur/bilans/BilanEvaluation1Screen';
import BilanEvaluation2Screen from '../../screens/eleveur/bilans/BilanEvaluation2Screen';

import BilanEvaluations1Screen from '../../screens/eleveur/bilans/BilanEvaluations1Screen';


//Bilan bottom-tab navigator
const BilanCategSelectionTabNavigator = createBottomTabNavigator();
export const BilanCategSelectionNavigator = () => {
    return (
        <BilanCategSelectionTabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: Colors.secondary,
                inactiveTintColor: Colors.secondary,
                activeBackgroundColor: Colors.primary,
                inactiveBackgroundColor: 'gray',
                adaptive: true,
                tabStyle: { justifyContent: 'center' }
            }}
        >
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCategorie1StackScreen'
                component={BilanSousCateg1Navigator}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Bon état général</Text>;
                    }
                }}
            />
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCategorie2Screen'
                component={BilanCategorie2Screen}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Environnement approprié</Text>;
                    }
                }}
            />
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCateg3StackScreen'
                component={BilanSousCateg3Navigator}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Expression des comportements</Text>;
                    }
                }}
            />
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCategorie4Screen'
                component={BilanCategorie4Screen}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Santé</Text>;
                    }
                }}
            />
        </BilanCategSelectionTabNavigator.Navigator>
    );
};

//Bilans stack navigators
const BilanSousCateg1StackNavigator = createStackNavigator();
export const BilanSousCateg1Navigator = () => {
    return (
        <BilanSousCateg1StackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanSousCateg1StackNavigator.Screen
                name='BilanCategorie1Screen'
                component={BilanCategorie1Screen}
                options={BilanScreenOptions}
            />

            <BilanSousCateg1StackNavigator.Screen
                name='BilanEvaluation1Screen'
                component={BilanEvaluation1Screen}
                options={BilanScreenOptions}
            />
        </BilanSousCateg1StackNavigator.Navigator>
    );
};

const BilanEvaluations1StackNavigator = createStackNavigator();
export const BilanEvaluations1Navigator = () => {
    return (
        <BilanEvaluations1StackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanEvaluations1StackNavigator.Screen
                name='BilanEvaluations1Screen'
                component={BilanEvaluations1Screen}
                options={BilanScreenOptions}
            />

            <BilanEvaluations1StackNavigator.Screen
                name='BilanEvaluation2Screen'
                component={BilanEvaluation2Screen}
                options={BilanScreenOptions}
            />
        </BilanEvaluations1StackNavigator.Navigator>
    );
};

const BilanSousCateg3StackNavigator = createStackNavigator();
export const BilanSousCateg3Navigator = () => {
    return (
        <BilanSousCateg3StackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanSousCateg3StackNavigator.Screen
                name='BilanCategorie3Screen'
                component={BilanCategorie3Screen}
                options={BilanScreenOptions}
            />

            <BilanSousCateg3StackNavigator.Screen
                name='BilanEvaluation2Screen'
                component={BilanEvaluations1Navigator}
                options={BilanScreenOptions}
            />
        </BilanSousCateg3StackNavigator.Navigator>
    );
};

//Main stackNav
const BilanStackNavigator = createStackNavigator();
export const BilanNavigator = () => {
    return (
        <BilanStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanStackNavigator.Screen
                name='Bilan'
                component={BilanScreen}
                options={BilanScreenOptions}
            />
            <BilanStackNavigator.Screen
                name='BilanCategorieScreen'
                component={BilanCategSelectionNavigator}
                options={BilanScreenOptions}
            />
            <BilanStackNavigator.Screen
                name='BilanEvaluation1Screen'
                component={BilanEvaluation1Screen}
                options={BilanScreenOptions}
            />
            <BilanStackNavigator.Screen
                name='BilanEvaluation2Screen'
                component={BilanEvaluation2Screen}
                options={BilanScreenOptions}
            />
        </BilanStackNavigator.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarLabel: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    }
});