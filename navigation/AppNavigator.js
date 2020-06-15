import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { EleveurDrawerNav } from './drawers/EleveurDrawerNavigator';


const AppNavigator = props => {
    return (
        <NavigationContainer>
            <EleveurDrawerNav />
        </NavigationContainer>
    );
};


export default AppNavigator;