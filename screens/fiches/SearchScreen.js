import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';


const SearchScreen = props => {
    return (
        <View>
            <Text>
                Rechercher une fiche
            </Text>
            <Button title='Fiche' onPress={() => { props.navigation.navigate('Fiche') }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Rechercher une fiche',
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


export default SearchScreen;