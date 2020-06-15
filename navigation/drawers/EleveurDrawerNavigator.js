import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { MainNavigator } from '../stacks/MainNavigator';
import { FichesNavigator } from '../stacks/FichesNavigator';
import { BilanNavigator, EvaluationNavigator } from '../stacks/EleveurNavigator';
import Colors from '../../constants/Colors';


const EleveurDrawerNavigator = createDrawerNavigator();
export const EleveurDrawerNav = () => {
    return (
        <EleveurDrawerNavigator.Navigator drawerContentOptions={{ activeTintColor: Colors.primary }}>
            <EleveurDrawerNavigator.Screen
                name='Main'
                component={MainNavigator}
                options={{
                    title: 'Profil',
                    drawerIcon: drawerConfig => (
                        <MaterialCommunityIcons
                            name="pig"
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <EleveurDrawerNavigator.Screen
                name='Fiches'
                component={FichesNavigator}
                options={{
                    drawerIcon: drawerConfig => (
                        <Ionicons
                            name={Platform.OS == 'android' ? 'md-book' : 'ios-book'}
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <EleveurDrawerNavigator.Screen
                name='Bilans'
                component={BilanNavigator}
                options={{
                    title: 'Mon bilan',
                    drawerIcon: drawerConfig => (
                        <AntDesign
                            name="linechart"
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <EleveurDrawerNavigator.Screen
                name='Evaluations'
                component={EvaluationNavigator}
                options={{
                    drawerIcon: drawerConfig => (
                        <MaterialCommunityIcons
                            name="test-tube"
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
        </EleveurDrawerNavigator.Navigator>
    );
};