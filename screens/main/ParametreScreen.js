import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';


const ParametreScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const persoDataHandler = useCallback(async () => {
        await dispatch(authActions.setUtilisateur());
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        persoDataHandler();
    }, [dispatch, persoDataHandler]);


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    }

    return (
        <View>
            <Text>Paramètres</Text>
            <Button title='Annuler' onPress={() => { props.navigation.navigate('Profil') }} />
            <Button title='Sauvegarder' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Paramètres',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ParametreScreen;