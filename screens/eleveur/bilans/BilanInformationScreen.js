import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../components/UI/HeaderButton';


const BilanInformationScreen = props => {
    return (
        <View>
            <Text>
                Informations
            </Text>
            <Button title='Retour au bilan' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Information',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
});


export default BilanInformationScreen;