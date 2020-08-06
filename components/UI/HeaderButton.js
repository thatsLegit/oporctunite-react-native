import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export const CustomHeaderButton = props => {
    return <HeaderButton {...props}
        IconComponent={Ionicons}
        iconSize={Dimensions.get('window').height > 1000 ? 50 : 30}
        color={Platform.OS == 'android' ? 'white' : Colors.primary} />;
};

export const CustomBackHeaderButton = props => {
    return <HeaderButton {...props}
        IconComponent={Entypo}
        iconSize={Dimensions.get('window').height > 1000 ? 50 : 30}
        color={Platform.OS == 'android' ? 'white' : Colors.primary} />;
};