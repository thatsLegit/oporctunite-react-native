import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as categActions from '../../store/actions/categ';
import * as sousCategActions from '../../store/actions/sousCateg';
import * as bilanActions from '../../store/actions/bilan';
import * as authActions from '../../store/actions/auth';


const ProfilScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const categHandler = useCallback(async () => {
        //Seulement à la 1ère connexion, puis stockage sur sqlite
        await dispatch(categActions.fetchCateg());
        await dispatch(categActions.fetchSousCategByCateg());
        await dispatch(sousCategActions.fetchSousCateg());
        await dispatch(sousCategActions.fetchEvaluationBySousCateg());
        //A chaque connexion
        await dispatch(bilanActions.fetchNoteCategories());
        await dispatch(bilanActions.fetchNoteGlobaleCategories());
        await dispatch(bilanActions.fetchNoteSousCategories());
        await dispatch(bilanActions.fetchNoteGlobaleSousCategories());
        await dispatch(bilanActions.fetchNoteEvaluations());
        await dispatch(bilanActions.fetchNoteGlobaleEvaluations());
        await dispatch(authActions.setUtilisateur());
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true);
        categHandler();
    }, [dispatch, categHandler]);


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
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ProfilScreen;