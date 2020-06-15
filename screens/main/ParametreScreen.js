import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';


const ParametreScreen = props => {
    return (
        <View>
            <Text>
                Paramètres
            </Text>
            <Button title='Annuler' onPress={() => { props.navigation.navigate('Profil') }} />
            <Button title='Sauvegarder' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Paramètres',
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


export default ParametreScreen;