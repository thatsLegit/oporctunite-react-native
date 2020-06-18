import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as sousCategActions from '../../store/actions/sousCateg';


const ProfilScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(sousCategActions.fetchSousCateg()).then(() => setIsLoading(false));
    }, [dispatch]);

    //Loading spinner
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    };

    return (
        <View>
            <Text>
                Profil
            </Text>
            <Button title='Paramètres' onPress={() => { props.navigation.navigate('Parametre') }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Profil',
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


export default ProfilScreen;