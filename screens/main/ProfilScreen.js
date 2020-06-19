import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as categActions from '../../store/actions/categ';


const ProfilScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const categHandler = useCallback(() => {
        dispatch(categActions.fetchCateg());
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true);
        categHandler();
        dispatch(categActions.fetchSousCategByCateg("Bonne santé"));
        dispatch(categActions.fetchSousCategByCateg("Comportement approprié"));
        dispatch(categActions.fetchSousCategByCateg("Bonne alimentation"));
        dispatch(categActions.fetchSousCategByCateg("Hébergement approprié")).then(() => setIsLoading(false));
        // for (let categ of categories) {

        // }
    }, [dispatch, categHandler]);


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
    }

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