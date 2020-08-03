import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import NetInfo from '@react-native-community/netinfo';

import Spinner from 'react-native-loading-spinner-overlay';
import HeaderButton from '../../components/UI/HeaderButton';
import * as categActions from '../../store/actions/categ';
import * as sousCategActions from '../../store/actions/sousCateg';
import * as evalActions from '../../store/actions/evaluation';
import { dropTests, fetchAllTests } from '../../helper/db/requetes';


const ProfilScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const dispatch = useDispatch();

    const categHandler = useCallback(async () => {
        //Seulement à la 1ère connexion, puis stockage sur sqlite :
        await dispatch(categActions.fetchCateg());
        await dispatch(categActions.fetchSousCategByCateg());
        await dispatch(sousCategActions.fetchSousCateg());
        await dispatch(sousCategActions.fetchEvaluationBySousCateg());
        await dispatch(evalActions.fetchLiaisons());
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setIsConnected(false);
                return Alert.alert('Hors-ligne', `Votre connexion est faible ou absente, certaines fonctionnalités seront limitées.`, [{ text: 'Compris', style: 'destructive' }]);
            }
        });
        if (isConnected) {
            fetchAllTests().then(result => console.log(result.rows._array));
            dropTests();
            categHandler();
        }
    }, [dispatch, categHandler, isConnected]);


    if (isLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner
                    visible={isLoading}
                    textContent={'Chargement'}
                    textStyle={{ color: '#FFF' }}
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
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});


export default ProfilScreen;