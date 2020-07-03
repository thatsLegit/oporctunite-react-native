import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../../components/UI/HeaderButton';


const EvalRecapScreen = props => {

    return (
        <View>
            <Text>
                Récapitulatif des évaluations effectuées.
            </Text>
            <Button title='Réaliser des évaluations' onPress={() => { props.navigation.navigate('CategSelection') }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Evaluations',
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


export default EvalRecapScreen;